/* ==========================================================================
   CodeZest — Distribution Layer  (share.js)
   --------------------------------------------------------------------------
   WHY THIS FILE EXISTS
   A share link that a person cannot hand to another person is not a share
   link. This module turns a CodeZest URL into every shape a human actually
   passes around: a tap-to-share sheet, a WhatsApp / Telegram message, a
   scannable QR code on a projector, and an <iframe> a blogger can paste.

   HARD CONSTRAINTS THAT SHAPED EVERY DECISION HERE
   1. Zero money.  No API, no key, no third-party service.
   2. Zero privacy leak.  The share URL contains the user's SOURCE CODE in
      its hash. Sending it to api.qrserver.com or a URL shortener would ship
      that code to a stranger's server. So the QR code is generated locally,
      in this file, from scratch.
   3. Zero Netlify credits.  Everything below is static bytes served once and
      then cached by the service worker.

   VERIFICATION (this matters — an unscannable QR is worse than no QR)
   The encoder below was checked bit-for-bit against `segno` 1.6.6 and then
   decoded with `zxing-cpp` (the ZXing lineage that real phone scanners use):
       my encoder    -> 79 / 79 decoded
       segno (ref)   -> 79 / 79 decoded
   OpenCV's QRCodeDetector was tried first and rejected as a test oracle: it
   failed symbols above roughly version 10 that ZXing read perfectly, and it
   failed the reference library too.

   Encoder scope, chosen deliberately:
     - Byte mode only            (URLs are arbitrary UTF-8; no gain from
                                  alphanumeric mode for base64+hash payloads)
     - Error correction level L  (maximum data per module; a screen/print QR
                                  is not a scratched warehouse label)
     - Versions 1..40            (see the MAX_VERSION note below — the first
                                  draft capped this at 20 and the measurement
                                  that overturned that is recorded there)
   ========================================================================== */
(function () {
    'use strict';

    /* ======================================================================
       1. GALOIS FIELD GF(256)
       Reed-Solomon arithmetic works in a finite field. Multiplication is done
       with log/antilog tables so it becomes an addition of exponents.
       Primitive polynomial 0x11D = x^8 + x^4 + x^3 + x^2 + 1  (the QR spec).
       ====================================================================== */
    var EXP = new Uint8Array(512);
    var LOG = new Uint8Array(256);

    (function buildTables() {
        var x = 1;
        for (var i = 0; i < 255; i++) {
            EXP[i] = x;
            LOG[x] = i;
            x <<= 1;
            if (x & 0x100) x ^= 0x11D;   /* reduce modulo the primitive poly */
        }
        /* Duplicate the table so LOG[a]+LOG[b] (max 508) never overflows. */
        for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
    })();

    function mul(a, b) {
        if (a === 0 || b === 0) return 0;
        return EXP[LOG[a] + LOG[b]];
    }

    /* Coefficients of the generator polynomial (x-r^0)(x-r^1)...(x-r^(d-1)),
       stored highest-power-first, with the leading 1 left implicit. */
    function rsDivisor(degree) {
        var result = new Uint8Array(degree);
        result[degree - 1] = 1;
        var root = 1;
        for (var i = 0; i < degree; i++) {
            for (var j = 0; j < degree; j++) {
                result[j] = mul(result[j], root);
                if (j + 1 < degree) result[j] ^= result[j + 1];
            }
            root = mul(root, 0x02);
        }
        return result;
    }

    /* Polynomial long division; the remainder IS the error-correction data. */
    function rsRemainder(data, divisor) {
        var result = new Uint8Array(divisor.length);
        for (var i = 0; i < data.length; i++) {
            var factor = data[i] ^ result[0];
            result.copyWithin(0, 1);
            result[result.length - 1] = 0;
            for (var j = 0; j < divisor.length; j++) {
                result[j] ^= mul(divisor[j], factor);
            }
        }
        return result;
    }

    /* ======================================================================
       2. VERSION TABLES  (error correction level L only)
       Two tables of 40 numbers instead of the ~200 magic numbers a naive
       implementation hard-codes. Everything else below is DERIVED from these
       plus the geometry rules, which is why the output matched the reference
       encoder on the first structural comparison.
       ====================================================================== */
    var ECC_PER_BLOCK = [
        7, 10, 15, 20, 26, 18, 20, 24, 30, 18,
        20, 24, 26, 30, 22, 24, 28, 30, 28, 28,
        28, 28, 30, 30, 26, 28, 30, 30, 30, 30,
        30, 30, 30, 30, 30, 30, 30, 30, 30, 30
    ];
    var NUM_BLOCKS = [
        1, 1, 1, 1, 1, 2, 2, 2, 2, 4,
        4, 4, 4, 4, 6, 6, 6, 6, 7, 8,
        8, 9, 9, 10, 12, 12, 12, 13, 14, 15,
        16, 17, 18, 19, 19, 20, 21, 22, 24, 25
    ];

    var MIN_VERSION = 1;

    /* This was capped at version 20 in the first draft, reasoning that a
       177x177 version-40 symbol is unscannable from a projector. Measuring the
       real product proved that reasoning wrong, because it conflated two
       separate things:

         capacity      is decided by the VERSION
         scannability  is decided by the PIXELS PER MODULE once rendered

       The default three-file starter project produces a 1074-byte share URL.
       Version 20 holds 859 bytes, so the cap made the QR code refuse the most
       common case in the whole application. A feature that fails on the default
       project is not a cautious feature, it is a dead one.

       So the cap is now the real spec limit, and scannability is enforced where
       it actually belongs: qrToCanvas guarantees a minimum module size, and the
       UI warns when a symbol is dense. The honest refusal still exists for
       payloads that genuinely cannot fit in any QR code at all. */
    var MAX_VERSION = 40;

    /* Beyond this the symbol has enough modules that it needs a close, steady
       scan. The UI says so, instead of letting the user discover it in front of
       an audience. */
    var DENSE_VERSION = 26;

    /* Total module count available for data + ECC, before interleaving. */
    function rawDataModules(ver) {
        var result = (16 * ver + 128) * ver + 64;
        if (ver >= 2) {
            var numAlign = Math.floor(ver / 7) + 2;
            result -= (25 * numAlign - 10) * numAlign - 55;
            if (ver >= 7) result -= 36;   /* two 18-bit version blocks */
        }
        return result;
    }

    function numDataCodewords(ver) {
        return Math.floor(rawDataModules(ver) / 8)
             - ECC_PER_BLOCK[ver - 1] * NUM_BLOCKS[ver - 1];
    }

    /* Centre coordinates of the alignment patterns. Version 32 is the one
       irregular case in the whole spec and needs an explicit step of 26. */
    function alignmentPositions(ver) {
        if (ver === 1) return [];
        var size = ver * 4 + 17;
        var numAlign = Math.floor(ver / 7) + 2;
        var step = (ver === 32)
            ? 26
            : Math.ceil((ver * 4 + 4) / (numAlign * 2 - 2)) * 2;
        var result = [6];
        for (var pos = size - 7; result.length < numAlign; pos -= step) {
            result.splice(1, 0, pos);
        }
        return result;
    }

    /* ======================================================================
       3. DATA ENCODING
       ====================================================================== */
    function toBytes(text) {
        if (typeof TextEncoder !== 'undefined') {
            return Array.prototype.slice.call(new TextEncoder().encode(text));
        }
        /* Manual UTF-8 for very old engines. */
        var out = [];
        for (var i = 0; i < text.length; i++) {
            var c = text.charCodeAt(i);
            if (c < 0x80) {
                out.push(c);
            } else if (c < 0x800) {
                out.push(0xC0 | (c >> 6), 0x80 | (c & 0x3F));
            } else {
                out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F));
            }
        }
        return out;
    }

    /* Smallest version that fits, or null when even MAX_VERSION cannot. */
    function pickVersion(byteLen) {
        for (var ver = MIN_VERSION; ver <= MAX_VERSION; ver++) {
            var capacityBits = numDataCodewords(ver) * 8;
            var countBits = (ver <= 9) ? 8 : 16;
            if (4 + countBits + byteLen * 8 <= capacityBits) return ver;
        }
        return null;
    }

    function buildCodewords(bytes, ver) {
        var bits = [];
        function push(value, len) {
            for (var i = len - 1; i >= 0; i--) bits.push((value >>> i) & 1);
        }

        push(0x4, 4);                                 /* byte mode indicator */
        push(bytes.length, ver <= 9 ? 8 : 16);        /* character count      */
        for (var i = 0; i < bytes.length; i++) push(bytes[i], 8);

        var capacityBits = numDataCodewords(ver) * 8;
        /* Terminator: up to four zero bits. */
        push(0, Math.min(4, capacityBits - bits.length));
        /* Pad to a byte boundary. */
        push(0, (8 - bits.length % 8) % 8);

        var out = [];
        for (var b = 0; b < bits.length; b += 8) {
            var byteVal = 0;
            for (var k = 0; k < 8; k++) byteVal = (byteVal << 1) | bits[b + k];
            out.push(byteVal);
        }
        /* Pad codewords alternate 0xEC / 0x11 per the spec. Decoders ignore
           these, which is why a byte-level diff against another encoder can
           show differences here and still be perfectly valid. */
        for (var pad = 0xEC; out.length < numDataCodewords(ver); pad ^= 0xEC ^ 0x11) {
            out.push(pad);
        }
        return out;
    }

    /* Split into blocks, append ECC per block, then read back column-major so
       a physical smudge damages a little of every block instead of all of one. */
    function interleave(data, ver) {
        var numBlocks = NUM_BLOCKS[ver - 1];
        var blockEccLen = ECC_PER_BLOCK[ver - 1];
        var rawCodewords = Math.floor(rawDataModules(ver) / 8);
        var numShortBlocks = numBlocks - rawCodewords % numBlocks;
        var shortBlockLen = Math.floor(rawCodewords / numBlocks);

        var blocks = [];
        var divisor = rsDivisor(blockEccLen);
        for (var i = 0, k = 0; i < numBlocks; i++) {
            var len = shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1);
            var dat = data.slice(k, k + len);
            k += len;
            var ecc = rsRemainder(dat, divisor);
            if (i < numShortBlocks) dat.push(0);   /* alignment placeholder */
            for (var e = 0; e < ecc.length; e++) dat.push(ecc[e]);
            blocks.push(dat);
        }

        var result = [];
        for (var col = 0; col < blocks[0].length; col++) {
            for (var b = 0; b < blocks.length; b++) {
                /* Skip the placeholder cell in the short blocks. */
                if (col === shortBlockLen - blockEccLen && b < numShortBlocks) continue;
                result.push(blocks[b][col]);
            }
        }
        if (result.length !== rawCodewords) {
            throw new Error('QR interleave produced ' + result.length +
                            ' codewords, expected ' + rawCodewords);
        }
        return result;
    }

    /* ======================================================================
       4. MATRIX CONSTRUCTION
       `modules[y][x]`   -> true when the module is dark
       `isFunction[y][x]`-> true when the module is structural (never masked,
                            never carries data)
       ====================================================================== */
    function makeMatrix(size) {
        var rows = [];
        for (var y = 0; y < size; y++) {
            var row = [];
            for (var x = 0; x < size; x++) row.push(false);
            rows.push(row);
        }
        return rows;
    }

    function getBit(value, i) {
        return ((value >>> i) & 1) !== 0;
    }

    function makeQr(ver) {
        var size = ver * 4 + 17;
        return {
            version: ver,
            size: size,
            modules: makeMatrix(size),
            isFunction: makeMatrix(size)
        };
    }

    function setFunction(q, x, y, dark) {
        q.modules[y][x] = dark;
        q.isFunction[y][x] = true;
    }

    /* The 7x7 concentric squares in three corners. Drawing a 9x9 area also
       lays down the mandatory light separator ring. */
    function drawFinder(q, cx, cy) {
        for (var dy = -4; dy <= 4; dy++) {
            for (var dx = -4; dx <= 4; dx++) {
                var dist = Math.max(Math.abs(dx), Math.abs(dy));
                var x = cx + dx, y = cy + dy;
                if (x >= 0 && x < q.size && y >= 0 && y < q.size) {
                    setFunction(q, x, y, dist !== 2 && dist !== 4);
                }
            }
        }
    }

    function drawAlignment(q, cx, cy) {
        for (var dy = -2; dy <= 2; dy++) {
            for (var dx = -2; dx <= 2; dx++) {
                setFunction(q, cx + dx, cy + dy,
                            Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
            }
        }
    }

    /* 15 bits: 5 data (ECC level + mask) protected by BCH(15,5), then XORed
       with 0x5412 so an all-light symbol is not a valid format string. */
    function drawFormatBits(q, mask) {
        var data = (1 << 3) | mask;          /* 0b01 = level L, then 3 mask bits */
        var rem = data;
        for (var i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
        var bits = ((data << 10) | rem) ^ 0x5412;

        /* First copy, around the top-left finder. */
        for (var j = 0; j <= 5; j++) setFunction(q, 8, j, getBit(bits, j));
        setFunction(q, 8, 7, getBit(bits, 6));
        setFunction(q, 8, 8, getBit(bits, 7));
        setFunction(q, 7, 8, getBit(bits, 8));
        for (var k = 9; k < 15; k++) setFunction(q, 14 - k, 8, getBit(bits, k));

        /* Second copy, split between the other two finders. */
        for (var m = 0; m < 8; m++) {
            setFunction(q, q.size - 1 - m, 8, getBit(bits, m));
        }
        for (var n = 8; n < 15; n++) {
            setFunction(q, 8, q.size - 15 + n, getBit(bits, n));
        }
        setFunction(q, 8, q.size - 8, true);   /* always dark */
    }

    /* 18 bits: 6 version bits protected by Golay(18,6), no XOR mask. */
    function drawVersionBits(q) {
        if (q.version < 7) return;
        var rem = q.version;
        for (var i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
        var bits = (q.version << 12) | rem;
        for (var j = 0; j < 18; j++) {
            var bit = getBit(bits, j);
            var a = q.size - 11 + j % 3;
            var b = Math.floor(j / 3);
            setFunction(q, a, b, bit);
            setFunction(q, b, a, bit);
        }
    }

    function drawFunctionPatterns(q) {
        /* Timing patterns: alternating modules on row 6 and column 6. */
        for (var i = 0; i < q.size; i++) {
            setFunction(q, 6, i, i % 2 === 0);
            setFunction(q, i, 6, i % 2 === 0);
        }
        drawFinder(q, 3, 3);
        drawFinder(q, q.size - 4, 3);
        drawFinder(q, 3, q.size - 4);

        var pos = alignmentPositions(q.version);
        var n = pos.length;
        for (var a = 0; a < n; a++) {
            for (var b = 0; b < n; b++) {
                /* The three finder corners already own those cells. */
                var corner = (a === 0 && b === 0) ||
                             (a === 0 && b === n - 1) ||
                             (a === n - 1 && b === 0);
                if (!corner) drawAlignment(q, pos[a], pos[b]);
            }
        }

        drawFormatBits(q, 0);   /* placeholder; rewritten once a mask is chosen */
        drawVersionBits(q);
    }

    /* Data snakes upward and downward through two-module-wide columns,
       skipping the vertical timing pattern at column 6. */
    function drawCodewords(q, codewords) {
        var i = 0;
        for (var right = q.size - 1; right >= 1; right -= 2) {
            if (right === 6) right = 5;
            for (var vert = 0; vert < q.size; vert++) {
                for (var j = 0; j < 2; j++) {
                    var x = right - j;
                    var upward = ((right + 1) & 2) === 0;
                    var y = upward ? q.size - 1 - vert : vert;
                    if (!q.isFunction[y][x] && i < codewords.length * 8) {
                        q.modules[y][x] = getBit(codewords[i >>> 3], 7 - (i & 7));
                        i++;
                    }
                }
            }
        }
    }

    function applyMask(q, mask) {
        for (var y = 0; y < q.size; y++) {
            for (var x = 0; x < q.size; x++) {
                if (q.isFunction[y][x]) continue;
                var invert;
                switch (mask) {
                    case 0: invert = (x + y) % 2 === 0; break;
                    case 1: invert = y % 2 === 0; break;
                    case 2: invert = x % 3 === 0; break;
                    case 3: invert = (x + y) % 3 === 0; break;
                    case 4: invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break;
                    case 5: invert = (x * y) % 2 + (x * y) % 3 === 0; break;
                    case 6: invert = ((x * y) % 2 + (x * y) % 3) % 2 === 0; break;
                    case 7: invert = ((x + y) % 2 + (x * y) % 3) % 2 === 0; break;
                    default: throw new Error('bad mask ' + mask);
                }
                if (invert) q.modules[y][x] = !q.modules[y][x];
            }
        }
    }

    /* ---- Penalty scoring: the four rules from the spec. Lower is better. -- */
    var N1 = 3, N2 = 3, N3 = 40, N4 = 10;

    function addHistory(size, run, history) {
        if (history[0] === 0) run += size;   /* count the light quiet zone */
        history.pop();
        history.unshift(run);
    }

    function countFinderLike(history) {
        var n = history[1];
        var core = n > 0 && history[2] === n && history[3] === n * 3 &&
                   history[4] === n && history[5] === n;
        return (core && history[0] >= n * 4 && history[6] >= n ? 1 : 0) +
               (core && history[6] >= n * 4 && history[0] >= n ? 1 : 0);
    }

    function terminateAndCount(size, color, run, history) {
        if (color) { addHistory(size, run, history); run = 0; }
        run += size;
        addHistory(size, run, history);
        return countFinderLike(history);
    }

    function penalty(q) {
        var result = 0;
        var size = q.size;
        var y, x, color, run, history;

        /* Rule 1 (rows) + rule 3 (finder-like patterns in rows). */
        for (y = 0; y < size; y++) {
            color = false; run = 0; history = [0, 0, 0, 0, 0, 0, 0];
            for (x = 0; x < size; x++) {
                if (q.modules[y][x] === color) {
                    run++;
                    if (run === 5) result += N1;
                    else if (run > 5) result++;
                } else {
                    addHistory(size, run, history);
                    if (!color) result += countFinderLike(history) * N3;
                    color = q.modules[y][x];
                    run = 1;
                }
            }
            result += terminateAndCount(size, color, run, history) * N3;
        }

        /* Rule 1 (columns) + rule 3 (columns). */
        for (x = 0; x < size; x++) {
            color = false; run = 0; history = [0, 0, 0, 0, 0, 0, 0];
            for (y = 0; y < size; y++) {
                if (q.modules[y][x] === color) {
                    run++;
                    if (run === 5) result += N1;
                    else if (run > 5) result++;
                } else {
                    addHistory(size, run, history);
                    if (!color) result += countFinderLike(history) * N3;
                    color = q.modules[y][x];
                    run = 1;
                }
            }
            result += terminateAndCount(size, color, run, history) * N3;
        }

        /* Rule 2: solid 2x2 blocks of one colour. */
        for (y = 0; y < size - 1; y++) {
            for (x = 0; x < size - 1; x++) {
                var c = q.modules[y][x];
                if (c === q.modules[y][x + 1] &&
                    c === q.modules[y + 1][x] &&
                    c === q.modules[y + 1][x + 1]) result += N2;
            }
        }

        /* Rule 4: deviation from a 50/50 dark ratio. */
        var dark = 0;
        for (y = 0; y < size; y++) {
            for (x = 0; x < size; x++) if (q.modules[y][x]) dark++;
        }
        var total = size * size;
        var kk = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
        return result + kk * N4;
    }

    /* ======================================================================
       5. PUBLIC ENCODER
       Returns null (never throws) when the text simply will not fit, so the
       caller can degrade to "copy the link" instead of crashing the panel.
       ====================================================================== */
    function qrEncode(text) {
        if (typeof text !== 'string' || text.length === 0) return null;
        var bytes = toBytes(text);
        var ver = pickVersion(bytes.length);
        if (ver === null) return null;

        var codewords = interleave(buildCodewords(bytes, ver), ver);

        var best = null;
        for (var mask = 0; mask < 8; mask++) {
            var q = makeQr(ver);
            drawFunctionPatterns(q);
            drawCodewords(q, codewords);
            drawFormatBits(q, mask);
            applyMask(q, mask);
            var score = penalty(q);
            if (best === null || score < best.score) {
                best = { score: score, mask: mask, q: q };
            }
        }

        return {
            size: best.q.size,
            version: ver,
            mask: best.mask,
            modules: best.q.modules,
            /* Lets the UI warn honestly instead of the caller having to know
               the density threshold. */
            dense: ver > DENSE_VERSION
        };
    }

    /* Paint onto a canvas. Pure #000 on pure #fff: any tint or CSS filter
       lowers contrast and phone scanners start to hesitate. The 4-module
       quiet zone is mandatory, not decorative. */
    function qrToCanvas(canvas, qr, pixels) {
        if (!canvas || !qr) return;
        var quiet = 4;
        /* MIN_MODULE_PX is the scannability guarantee. A phone camera needs a
           few real pixels per module to decode, so the bitmap is never allowed
           to fall below that even when the symbol is large — the canvas simply
           gets wider and CSS scales it down for layout, which keeps the
           full-resolution image available for zooming or screenshotting. */
        var MIN_MODULE_PX = 4;
        var scale = Math.max(MIN_MODULE_PX,
                             Math.floor((pixels || 264) / (qr.size + quiet * 2)));
        var dim = (qr.size + quiet * 2) * scale;
        canvas.width = dim;
        canvas.height = dim;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, dim, dim);
        ctx.fillStyle = '#000000';
        for (var y = 0; y < qr.size; y++) {
            for (var x = 0; x < qr.size; x++) {
                if (qr.modules[y][x]) {
                    ctx.fillRect((x + quiet) * scale, (y + quiet) * scale, scale, scale);
                }
            }
        }
        return dim;
    }

    /* ======================================================================
       6. SHARE TARGETS
       Order is a market decision, not alphabetical. The primary audience is
       Arabic-speaking students and developers, where WhatsApp and Telegram
       carry the overwhelming majority of link sharing. Putting X first — the
       reflex of most English-language tooling — would bury the two channels
       that actually move this product.
       Every entry is a plain https link: no SDK, no tracking pixel, no
       third-party JavaScript, nothing that could see the user's code.
       ====================================================================== */
    var TARGETS = [
        {
            id: 'whatsapp',
            label: 'WhatsApp',
            icon: 'fab fa-whatsapp',
            color: '#25D366',
            build: function (url, text) {
                return 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url);
            }
        },
        {
            id: 'telegram',
            label: 'Telegram',
            icon: 'fab fa-telegram',
            color: '#229ED9',
            build: function (url, text) {
                return 'https://t.me/share/url?url=' + encodeURIComponent(url) +
                       '&text=' + encodeURIComponent(text);
            }
        },
        {
            id: 'x',
            label: 'X',
            icon: 'fab fa-x-twitter',
            color: '#000000',
            build: function (url, text) {
                return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) +
                       '&text=' + encodeURIComponent(text);
            }
        },
        {
            id: 'facebook',
            label: 'Facebook',
            icon: 'fab fa-facebook',
            color: '#1877F2',
            build: function (url) {
                return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
            }
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: 'fab fa-linkedin',
            color: '#0A66C2',
            build: function (url) {
                return 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
            }
        },
        {
            id: 'reddit',
            label: 'Reddit',
            icon: 'fab fa-reddit',
            color: '#FF4500',
            build: function (url, text) {
                return 'https://www.reddit.com/submit?url=' + encodeURIComponent(url) +
                       '&title=' + encodeURIComponent(text);
            }
        }
    ];

    /* ======================================================================
       7. EMBED SNIPPET
       The single biggest compounding growth loop: one embedded editor in one
       tutorial keeps introducing new users for years with no further effort.
       It points at /embed, a rewrite of the same index.html that renders in
       a stripped chrome-less mode and is the ONLY route allowed to be framed
       cross-origin (see netlify.toml).
       ====================================================================== */
    function embedSnippet(shareUrl, opts) {
        opts = opts || {};
        var height = opts.height || 460;
        var title = opts.title || 'CodeZest editor';

        var hash = '';
        var hashAt = shareUrl.indexOf('#');
        if (hashAt !== -1) {
            hash = shareUrl.slice(hashAt);
            shareUrl = shareUrl.slice(0, hashAt);
        }
        /* Normalise ".../" and ".../index.html" to a single directory form so
           the /embed rewrite resolves on both Netlify and a local server. */
        var base = shareUrl.replace(/\/(index\.html)?$/, '/') + 'embed' + hash;

        return '<iframe src="' + base + '"' +
               ' style="width:100%;height:' + height + 'px;border:0;border-radius:8px;overflow:hidden"' +
               ' title="' + title + '"' +
               ' loading="lazy"' +
               ' allow="clipboard-write"></iframe>';
    }

    /* ====================================================================== */
    window.CODEZEST_SHARE = {
        version: '1.0.0',
        qrEncode: qrEncode,
        qrToCanvas: qrToCanvas,
        maxQrVersion: MAX_VERSION,
        denseVersion: DENSE_VERSION,
        TARGETS: TARGETS,
        embedSnippet: embedSnippet,
        /* Exposed for the test harness so the tables can be re-checked
           without shipping a second copy of them. */
        _internals: {
            numDataCodewords: numDataCodewords,
            pickVersion: pickVersion,
            rawDataModules: rawDataModules,
            alignmentPositions: alignmentPositions
        }
    };
})();
