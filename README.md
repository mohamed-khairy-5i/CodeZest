# CodeZest

**A free online code editor with live preview that works offline.**

CodeZest is a zero-build web app: no bundler, no server, no database, no
account. It runs an AI assistant and a real Python interpreter **inside your
browser**, and it deploys to Netlify's free tier for $0.

🔗 **Live:** https://codezest.netlify.app/

A first visit costs **62 KB gzipped** — measured, not estimated — which is why
the free tier can absorb roughly **250,000 first visits a month**. Everything
heavy (AI, Python, templates, sharing) loads only when you ask for it.

---

## Why it exists

Every browser-based editor (CodePen, JSFiddle, StackBlitz, CodeSandbox,
PlayCode) requires a network connection, and none ships an Arabic interface.
CodeZest targets exactly those gaps.

| | CodePen | JSFiddle | StackBlitz | PlayCode | **CodeZest** |
|---|---|---|---|---|---|
| Works offline | ✗ | ✗ | ✗ | ✗ | **✓ (PWA)** |
| Arabic / RTL UI | ✗ | ✗ | ✗ | ✗ | **✓** |
| AI assistance | paid | ✗ | paid | paid | **✓ free, on-device** |
| Run Python | ✗ | ✗ | ✓ | ✗ | **✓ in-browser** |
| Console panel free | paid | ✓ | ✓ | limited | **✓** |
| Share without an account | ✗ | ✓ | ✗ | ✗ | **✓ (URL hash + QR)** |
| Embed anywhere | paid | ✓ | ✓ | paid | **✓ free** |
| Usable on a phone | poor | poor | poor | poor | **✓** |
| Sign-up required | for saving | ✗ | for saving | for saving | **never** |
| Cost to the operator | — | — | — | — | **$0** |

## Features

- **Live preview** for HTML, CSS, JS, JSON and Markdown, with sibling
  `<link>` / `<script>` references resolved and inlined automatically.
- **Offline-first PWA** — a service worker caches the app shell, all CDN
  dependencies and the whole template gallery. Fully usable with no network.
- **Template gallery** — 17 ready-to-run projects, every one bilingual
  (English + Arabic), lazily loaded so they never slow down first paint.
- **Built-in console** — output from the sandboxed preview is bridged back to
  a panel via `postMessage`.
- **Formatting** — Prettier 3.7.3 as the primary engine, js-beautify 2.0.3 as
  an offline fallback. Genuine syntax errors are reported, not swallowed.
- **Safe minifiers** — string- and comment-aware per language, so quoted
  content and template literals survive.
- **60+ languages** with CodeMirror modes fetched on demand.
- **Arabic / RTL** interface; code panes deliberately stay LTR.

### AI Copilot (`ai.js`)

Three engines, tried in this order:

1. **On-device** — Chrome's built-in `LanguageModel` (Gemini Nano). No key, no
   network, no cost, and the code never leaves the machine. Chrome 148+ on
   desktop.
2. **Bring your own key** — Gemini, OpenAI or OpenRouter. The key lives in your
   `localStorage` and the request goes **browser → provider directly**; it never
   touches any server of ours, because we don't have one.
3. Six one-click actions: explain, find bugs, improve, comment, write tests,
   convert.

The assistant's answer is rendered with `textContent` and `createElement`
**only** — never `innerHTML` — so a model that emits `<img onerror=…>` produces
visible text, not script. Your open file is passed as fenced **context, not
instructions**.

### Python, actually executed (`python.js`)

Real CPython via **Pyodide 314.0.3**, in a Web Worker created from a Blob URL.
Two consequences that matter: an infinite loop can't freeze the tab (the worker
is `terminate()`-ed), and the ~12 MB download happens **only after you
explicitly consent** — it is never pre-cached and never in the service worker.

### Distribution (`share.js`)

- **Share by link** — the project is DEFLATE-compressed (pako) into the URL
  hash. No server, no storage, no cost.
- **QR code, generated locally.** A complete QR encoder — Reed–Solomon over
  GF(256), all 40 versions, BCH format/version bits, all 8 masks with the four
  penalty rules — written from scratch so no pixel of your code is sent to a
  QR-as-a-service API. Verified **175/175 against ZXing** (the lineage real
  phone scanners are built on), matching `segno 1.6.6` on the same inputs, and
  additionally proven end-to-end by decoding the pixels the browser actually
  painted.
- **Embeddable editor** — `/embed` renders a chrome-free editor for iframing
  into any blog or docs page. `X-Frame-Options` is scoped so **only** that route
  is frameable; the main app still refuses to be framed.
- **Native share sheet** on mobile, plus WhatsApp, Telegram, X, Facebook,
  LinkedIn and Reddit. WhatsApp and Telegram come first, deliberately: that is
  where the Arabic-speaking audience actually shares things.
- **Install prompt** — a dismissible banner (the refusal is remembered) so
  repeat visits cost zero bandwidth.

### Installed-app behaviour

- Real PNG/ICO icons for every surface, including a **maskable** icon for
  Android launchers and a 180 px **PNG** touch icon for iOS (which ignores SVG,
  so an SVG touch icon means iPhone users get a blurry screenshot instead).
- **App shortcuts** — long-press the installed icon for New File, Templates or
  AI Copilot. Each one is genuinely handled; a shortcut that silently does
  nothing just teaches people the install is broken.
- **Web Share Target** — once installed, CodeZest appears in the OS share sheet.
  A snippet arriving in WhatsApp or Telegram can be pushed straight into the
  editor, and the file extension is inferred from the content.
- **Install screenshots** in the manifest, so Chrome shows its richer install
  dialog instead of a one-line prompt.

## Tech

Static HTML/CSS/JS. Dependencies are loaded from CDNs at pinned versions:

| Library | Version | Loading |
|---|---|---|
| CodeMirror | 6.65.7 | core eager, modes on demand |
| Prettier | 3.7.3 | on demand |
| js-beautify | 2.0.3 | on demand (fallback) |
| pako | 2.1.0 | eager (sharing) |
| Font Awesome | 7.3.0 | non-blocking |
| JSZip | 3.10.1 | on demand |
| html2canvas | 1.4.1 | on demand |
| Pyodide | 314.0.3 | on demand, **after consent only** |

First-party modules are lazy bundles registered with the internal loader, so
none of them is on the critical path:

| Module | Purpose | Loaded when |
|---|---|---|
| `templates.js` | 17 bilingual starter projects | gallery opened |
| `ai.js` | AI Copilot engines + rendering | AI panel opened |
| `python.js` | Pyodide worker bridge | Python run consented |
| `share.js` | QR encoder + share targets + embed | share hub opened |

## Local development

No build step and no dependencies to install:

```bash
git clone https://github.com/mohamed-khairy-5i/CodeZest.git
cd CodeZest
python3 -m http.server 8899
```

Then open <http://localhost:8899/>.

A service worker is involved, so use a hard reload (or DevTools →
Application → Service Workers → Update on reload) when iterating.

## Tests

Two harnesses run in a real browser against a served copy of the app:

```bash
python3 -m http.server 8899 &

# 211 assertions: public API, i18n parity (en/ar, all namespaces), file ids,
# share round-trip, preview builder, iframe sandboxing, template gallery,
# SEO/PWA tags, AI providers + prompt contract, XSS resistance, key privacy,
# Python consent gating, QR structural invariants, embed mode, OG image
open http://localhost:8899/functional-test.html

# 22 assertions: real gzip payload budget, script-element balance,
# lazy-loading guarantees, service-worker audit
open http://localhost:8899/perf-test.html
```

Both print a pass/fail summary to the page and to the console. Current state:
**243 passed / 0 failed** and **22 passed / 0 failed**.

Notable guards, each of which exists because the corresponding bug actually
happened:

- **XSS**: a hostile model answer is asserted to produce *no* `img`/`svg`/
  `script` element and to survive as literal text.
- **Key privacy**: a stored API key is asserted to be absent from the share
  payload.
- **Script-element balance**: the harness simulates the HTML parser, because a
  literal closing script tag inside a comment silently truncates a script.
- **QR capacity**: the default starter project is asserted to fit in a QR code —
  a cap that looked reasonable once made it silently refuse exactly that case.
- **Real visibility**: panels are opened through their public methods and then
  measured with `checkVisibility()`, walking the ancestor chain. Four features
  once shipped completely invisible — nested inside a modal whose `opacity: 0`
  blanked the whole subtree — while every test passed, because the tests
  asserted that a CSS *class* had been added. A class records what we intended;
  the computed style records what the user gets.
- **Declared assets exist**: every icon and screenshot named in the manifest is
  fetched and checked, because "declared but absent" has bitten this project
  twice already.

A guard is only trusted here once it has been run against the broken version and
seen to fail. The visibility guard was verified that way: 9 failures before the
fix, 0 after.

## Deployment

Netlify, from the repository root. `netlify.toml` sets the security and
cache-control headers, including `Service-Worker-Allowed`, the `/embed` rewrite,
and the narrowly-scoped framing policy.

```
publish = "."
```

There is nothing to build, so deploys are instant and stay within the free tier.

**On staying free.** Netlify's free plan is 300 credits/month and it is a *hard*
limit — there is no auto-recharge, so there is no surprise bill; the risk is the
opposite one, that the site is paused. Bandwidth is the only meaningful line item
(20 credits/GB ≈ 15 GB), which is exactly why the first-visit payload is measured
in the test suite rather than assumed. Deploy previews and branch deploys cost 0
credits, and Forms are free.

The code is deliberately 100% portable — no Netlify Functions, no Edge
Functions, no Forms — so it can be mirrored to Cloudflare Pages (unlimited
bandwidth) unchanged if it ever needs to be. See `docs/05` for the full study.

## Security notes

- The preview runs in an iframe sandboxed with `allow-scripts` **without**
  `allow-same-origin`, giving it an opaque origin. Previewed code cannot read
  the editor's `localStorage`, cookies or DOM.
- Because storage is unreachable in an opaque origin, the preview installs an
  in-memory `localStorage` / `sessionStorage` shim so tutorial code that
  persists a preference keeps working, without weakening the boundary.
- All user-supplied text rendered into the UI goes through `escapeHtml`, and
  console output is written with `textContent`.
- **AI output is never HTML.** The renderer uses `textContent` and
  `createElement` exclusively; there is no `innerHTML`, no `insertAdjacentHTML`,
  no `eval` and no `new Function` anywhere in the AI path. The test suite asserts
  this against the source with comments stripped.
- **Your API key stays yours.** It is held in `localStorage`, sent in a request
  *header* (never a query string, which would leak it into logs and referrers),
  excluded from share payloads, and clearable in one click.
- **Python is isolated and opt-in.** It runs in a Web Worker, so it cannot touch
  the page, and nothing is downloaded until you consent.
- **Framing is scoped, not disabled.** Removing `X-Frame-Options` globally to
  make embedding work would have been a hole; instead only `/embed` declares
  `frame-ancestors *`, while `/` keeps `SAMEORIGIN`.
- The QR encoder performs **zero network calls** — asserted in the test suite —
  so sharing never discloses your code to a third party.

## Project structure

```
index.html          the application shell, editor and UI
ai.js               AI Copilot: engines, prompt contract, safe rendering
python.js           Pyodide worker bridge
share.js            QR encoder, share targets, embed snippet
templates.js        17 bilingual starter projects
sw.js               service worker: offline shell + CDN cache
manifest.json       PWA manifest
offline.html        offline fallback page
netlify.toml        headers, /embed rewrite, publish config
robots.txt          crawler rules
sitemap.xml         sitemap with en/ar hreflang
llms.txt            machine-readable description for AI crawlers
og-image.png        1200×630 social preview card
screenshot-*.png    install-dialog screenshots (wide + narrow)
icon-*.png          app icons, incl. maskable for Android launchers
apple-touch-icon.png  180×180 PNG for iOS home screens
favicon.ico / favicon-32.png / icon-512.svg   favicons
functional-test.html / perf-test.html   browser test harnesses
docs/               analysis, market study and development plans (Arabic)
```

## Documentation

The reasoning behind the project lives in `docs/` (Arabic): project and
competitor analysis, multi-persona reviews, a full market study answering
whether Netlify is the right host and why, the zero-cost development plan, and
the growth/distribution plan — including the defects that were found and how
they were fixed. Start at `docs/README.md`.

## License

MIT
