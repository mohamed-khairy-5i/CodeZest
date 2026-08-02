/*
 * CodeZest Python runtime.
 *
 * Runs real CPython in the browser via Pyodide (CPython compiled to
 * WebAssembly). No server, so no hosting bill and no execution quota.
 *
 * Three decisions worth knowing:
 *
 *  1. Pyodide is ~12 MB. It is fetched from jsDelivr, NOT from our own origin,
 *     so it costs our host nothing. It is also gated behind an explicit consent
 *     dialog: shipping 12 MB to someone on a metered mobile plan without asking
 *     would be indefensible.
 *
 *  2. Execution happens in a Web Worker. A student's first `while True:` must
 *     not freeze the tab, and a worker can be terminated; a main-thread loop
 *     cannot.
 *
 *  3. The worker source is a plain ASCII string joined from an array rather than
 *     a template literal. Nested backticks and escapes inside an inline script
 *     in an HTML file are a proven source of silent syntax breakage.
 */
(function () {
    'use strict';

    /* Pinned, not floating: a surprise major version must never break users. */
    var PYODIDE_VERSION = '314.0.3';
    var PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v' + PYODIDE_VERSION + '/full/';

    /* Shown in the consent dialog so the number comes from one place. */
    var APPROX_MB = 12;

    var WORKER_SRC = [
        'var pyodide = null;',
        '',
        'function post(type, data) {',
        '    data = data || {};',
        '    data.type = type;',
        '    self.postMessage(data);',
        '}',
        '',
        'async function boot(base) {',
        '    if (pyodide) return pyodide;',
        '    post("status", { stage: "downloading" });',
        '    importScripts(base + "pyodide.js");',
        '    post("status", { stage: "initialising" });',
        '    pyodide = await loadPyodide({',
        '        indexURL: base,',
        '        stdout: function (text) { post("stdout", { text: text }); },',
        '        stderr: function (text) { post("stderr", { text: text }); }',
        '    });',
        '    post("ready", { version: pyodide.version });',
        '    return pyodide;',
        '}',
        '',
        '/*',
        ' * Installs whatever the script imports. Learners paste code that needs',
        ' * numpy or requests without knowing an install step exists; making that',
        ' * work is the difference between a toy and a usable runtime.',
        ' */',
        'async function autoInstall(code) {',
        '    var found = {};',
        '    var re = /^\\s*(?:import\\s+([A-Za-z_][\\w]*)|from\\s+([A-Za-z_][\\w]*))/gm;',
        '    var m;',
        '    while ((m = re.exec(code)) !== null) {',
        '        var name = m[1] || m[2];',
        '        if (name) found[name] = true;',
        '    }',
        '    var missing = [];',
        '    for (var name2 in found) {',
        '        if (!Object.prototype.hasOwnProperty.call(found, name2)) continue;',
        '        try {',
        '            pyodide.pyimport(name2);',
        '        } catch (e) {',
        '            missing.push(name2);',
        '        }',
        '    }',
        '    if (!missing.length) return;',
        '    post("status", { stage: "installing", packages: missing });',
        '    try {',
        '        await pyodide.loadPackagesFromImports(code);',
        '    } catch (e) {',
        '        /*',
        '         * Do not abort. If a package genuinely does not exist, Python\'s',
        '         * own ModuleNotFoundError is a better teacher than our guess.',
        '         */',
        '        post("stderr", { text: "Could not preload: " + missing.join(", ") });',
        '    }',
        '}',
        '',
        'self.onmessage = async function (event) {',
        '    var msg = event.data || {};',
        '    try {',
        '        if (msg.type === "boot") {',
        '            await boot(msg.base);',
        '            return;',
        '        }',
        '        if (msg.type === "run") {',
        '            await boot(msg.base);',
        '            await autoInstall(msg.code);',
        '            post("status", { stage: "running" });',
        '            var started = Date.now();',
        '            var result = await pyodide.runPythonAsync(msg.code);',
        '            var ms = Date.now() - started;',
        '            post("done", {',
        '                ms: ms,',
        '                result: (result === undefined || result === null) ? "" : String(result)',
        '            });',
        '            return;',
        '        }',
        '    } catch (err) {',
        '        post("error", { text: (err && (err.message || err.toString())) || "Unknown error" });',
        '    }',
        '};'
    ].join('\n');

    /* --------------------------------------------------------- main thread */

    var worker = null;
    var blobUrl = null;
    var booted = false;
    var busy = false;
    var listeners = {};

    function on(event, fn) {
        (listeners[event] = listeners[event] || []).push(fn);
    }
    function emit(event, data) {
        (listeners[event] || []).forEach(function (fn) { fn(data); });
        /* '*' lets a caller observe everything without subscribing per event. */
        (listeners['*'] || []).forEach(function (fn) { fn(event, data); });
    }

    function ensureWorker() {
        if (worker) return worker;
        var blob = new Blob([WORKER_SRC], { type: 'text/javascript' });
        blobUrl = URL.createObjectURL(blob);
        worker = new Worker(blobUrl);
        worker.onmessage = function (event) {
            var msg = event.data || {};
            if (msg.type === 'ready') booted = true;
            if (msg.type === 'done' || msg.type === 'error') busy = false;
            emit(msg.type, msg);
        };
        worker.onerror = function (err) {
            busy = false;
            emit('error', { text: (err && err.message) || 'Worker failed to start' });
        };
        return worker;
    }

    /*
     * The escape hatch for an infinite loop. Terminating discards the whole
     * interpreter, so the next run pays the boot cost again — an acceptable
     * price for never having to kill the browser tab.
     */
    function terminate() {
        if (worker) {
            worker.terminate();
            worker = null;
        }
        if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
            blobUrl = null;
        }
        booted = false;
        busy = false;
        emit('terminated', {});
    }

    function boot() {
        ensureWorker().postMessage({ type: 'boot', base: PYODIDE_BASE });
    }

    function run(code) {
        if (busy) return false;
        busy = true;
        ensureWorker().postMessage({ type: 'run', base: PYODIDE_BASE, code: code });
        return true;
    }

    window.CODEZEST_PYTHON = {
        version: '1.0.0',
        pyodideVersion: PYODIDE_VERSION,
        baseUrl: PYODIDE_BASE,
        approxMB: APPROX_MB,
        on: on,
        boot: boot,
        run: run,
        terminate: terminate,
        isReady: function () { return booted; },
        isBusy: function () { return busy; }
    };
})();
