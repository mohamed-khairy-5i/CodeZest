/* ============================================================================
 * CodeZest Service Worker
 *
 * Purpose: make CodeZest fully usable with no network connection.
 * None of the major competitors (CodePen, JSFiddle, StackBlitz, CodeSandbox,
 * PlayCode) work offline, so this is our clearest point of differentiation -
 * and it costs nothing to run on Netlify's free tier.
 *
 * Strategy
 *   - App shell (index.html, manifest, icons): network-first, cache fallback.
 *     Network-first keeps deploys fresh; the cache covers offline.
 *   - CDN assets (CodeMirror, Font Awesome, pako, JSZip, ...): cache-first.
 *     These are immutable version-pinned URLs, so once cached they never
 *     need revalidating - and this is what actually makes offline work.
 *   - Everything else: pass through untouched.
 * ==========================================================================*/

const VERSION     = 'v2.4.0';
const SHELL_CACHE = `codezest-shell-${VERSION}`;
const CDN_CACHE   = `codezest-cdn-${VERSION}`;

/* App shell files served from our own origin. */
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  /*
   * Icons. The PNGs are the ones that matter: an installed instance must be
   * able to render its own launcher icon offline, and iOS only accepts a PNG
   * touch icon. `favicon.ico` is included because some clients request it by
   * convention regardless of what the document declares.
   */
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon.ico',
  './icon-512.svg',
  './offline.html',
  /*
   * Template gallery data (~94 KB). Pre-cached rather than lazily cached
   * because it is the one feature a first-time offline user is most
   * likely to want: 17 runnable starter projects with no network. It is
   * NOT loaded by index.html on boot, so pre-caching it here costs
   * nothing on the critical path.
   */
  './templates.js',
  /*
   * AI Copilot engine (~8 KB). Pre-cached deliberately: the on-device
   * provider needs no network at all, so an offline visitor can still get
   * a working AI assistant. Caching this is what makes that promise real.
   */
  './ai.js',
  /*
   * Python controller (~7 KB only). Pyodide itself (~12 MB) is NOT cached
   * here — the browser caches it from jsDelivr after the user consents.
   * Pre-caching 12 MB uninvited would betray a metered data plan.
   */
  './python.js',
  /*
   * Distribution layer (~27 KB): QR encoder, share targets, embed builder.
   * Pre-cached so a user who is offline — on a plane, on a train, in a
   * classroom with no wifi — can still generate a QR code and hand their
   * project to the person sitting next to them. That works precisely
   * because the QR code is computed locally instead of being fetched from
   * a QR web service, which is also why the user's code never leaves the
   * device.
   */
  './share.js'
];

/*
 * Third-party assets required for the editor to boot offline.
 * Pinned to exact versions so cache-first is always safe.
 */
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/monokai.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/dracula.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/material.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/xml/xml.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/javascript/javascript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/css/css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/htmlmixed/htmlmixed.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/closebrackets.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/closetag.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/matchbrackets.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/search/search.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/search/searchcursor.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/search/jump-to-line.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/dialog/dialog.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/dialog/dialog.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/comment/comment.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/show-hint.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/show-hint.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/html-hint.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/css-hint.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/javascript-hint.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/hint/anyword-hint.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/foldcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/foldgutter.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/foldgutter.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/brace-fold.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/xml-fold.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/fold/indent-fold.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/selection/active-line.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css',
  // Lazy-loaded bundles are pre-cached too, so Format / ZIP / Screenshot
  // still work after the connection drops.
  'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/2.0.3/beautify.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/2.0.3/beautify-css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/2.0.3/beautify-html.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  // Prettier 3.7.3 (primary formatter, served from jsDelivr).
  // The TypeScript plugin (~900 KB) is deliberately NOT pre-cached; it is
  // cached opportunistically on first use to keep the install lightweight.
  'https://cdn.jsdelivr.net/npm/prettier@3.7.3/standalone.js',
  'https://cdn.jsdelivr.net/npm/prettier@3.7.3/plugins/estree.js',
  'https://cdn.jsdelivr.net/npm/prettier@3.7.3/plugins/babel.js',
  'https://cdn.jsdelivr.net/npm/prettier@3.7.3/plugins/postcss.js',
  'https://cdn.jsdelivr.net/npm/prettier@3.7.3/plugins/html.js'
];

/* Hosts whose assets are immutable and safe to serve cache-first. */
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

/* --------------------------------------------------------------- install */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    // Shell must succeed for the app to be installable.
    await shell.addAll(SHELL_ASSETS).catch(async () => {
      // If one shell file 404s, cache them individually so a single
      // missing optional file cannot break the whole install.
      await Promise.all(SHELL_ASSETS.map(u => shell.add(u).catch(() => {})));
    });

    const cdn = await caches.open(CDN_CACHE);
    // CDN assets are best-effort: never fail the install over one of them.
    await Promise.all(
      CDN_ASSETS.map(url =>
        fetch(new Request(url, { mode: 'cors', credentials: 'omit' }))
          .then(res => (res && res.ok ? cdn.put(url, res) : null))
          .catch(() => null)
      )
    );

    self.skipWaiting();
  })());
});

/* -------------------------------------------------------------- activate */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Drop caches from previous versions.
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.startsWith('codezest-') && k !== SHELL_CACHE && k !== CDN_CACHE)
          .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* ----------------------------------------------------------------- fetch */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET; never interfere with anything else.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignore extension and non-http(s) schemes.
  if (!url.protocol.startsWith('http')) return;

  // ---- CDN assets: cache-first (immutable, version-pinned) -------------
  // Covers cdnjs (CodeMirror, Font Awesome, pako, JSZip, js-beautify) and
  // jsDelivr (Prettier 3), including lazily-used plugins such as the
  // TypeScript parser, which get cached the first time they are fetched.
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith((async () => {
      const cached = await caches.match(req, { ignoreVary: true });
      if (cached) return cached;
      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const cdn = await caches.open(CDN_CACHE);
          cdn.put(req, res.clone());
        }
        return res;
      } catch (e) {
        // Offline and not cached - let the page degrade gracefully.
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })());
    return;
  }

  // ---- Same-origin navigations: network-first, cache fallback ----------
  if (req.mode === 'navigate' || (url.origin === location.origin && req.destination === 'document')) {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const shell = await caches.open(SHELL_CACHE);
          shell.put('./index.html', res.clone());
        }
        return res;
      } catch (e) {
        return (await caches.match('./index.html'))
            || (await caches.match('./offline.html'))
            || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' }, status: 503 });
      }
    })());
    return;
  }

  // ---- Other same-origin assets: cache-first with background refresh ---
  if (url.origin === location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) {
        // Refresh in the background without delaying the response.
        fetch(req).then(res => {
          if (res && res.ok) caches.open(SHELL_CACHE).then(c => c.put(req, res));
        }).catch(() => {});
        return cached;
      }
      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const shell = await caches.open(SHELL_CACHE);
          shell.put(req, res.clone());
        }
        return res;
      } catch (e) {
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })());
  }
});

/* Allow the page to trigger an immediate update. */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
