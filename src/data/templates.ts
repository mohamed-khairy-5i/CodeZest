// ═══════════════════════════════════════════════════════════════
// CodeZest v2 — قوالب الأكواد الجاهزة
// جميع التعليقات بالعربية لتسهيل الفهم للمطورين العرب
// ═══════════════════════════════════════════════════════════════

export interface PenData {
  html: string
  css: string
  js: string
}

export interface Template {
  id: string
  name: string
  description: string
  icon: string
  tags: string[]
  category: string // تصنيف القالب: UI | Layout | Animation | Form | Beginner | Interactive
  pen: PenData
}

export const templates: Template[] = [
  // =============================================================
  // 1. Hello World — قالب ترحيبي بسيط
  // =============================================================
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'A simple greeting page to get started',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14h.01"/><path d="M6 10.5h.01"/><path d="M10 17V7a2 2 0 0 1 4 0v10"/><path d="M14 12V9a2 2 0 0 1 4 0v5a6 6 0 0 1-12 0v-3a2 2 0 0 1 4 0v1"/></svg>`,
    tags: ['beginner', 'html'],
    category: 'Beginner',
    pen: {
      html: `<h1>Hello, CodeZest! 👋</h1>
<p>Welcome to the online code editor. Start building something amazing.</p>
<p>Edit the code on the left to see live preview changes.</p>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: fadeIn 0.8s ease-out;
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 500px;
  line-height: 1.6;
  animation: slideUp 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
      js: `console.log('Hello from CodeZest! 🚀');
console.log('Edit the code and see changes live.');`,
    },
  },

  // =============================================================
  // 2. Button Styles — مجموعة متنوعة من تصميمات الأزرار
  // =============================================================
  {
    id: 'button-styles',
    name: 'Button with Styles',
    description: 'Showcase of various button styles and hover effects',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="5"/><circle cx="12" cy="12" r="3"/></svg>`,
    tags: ['css', 'interactive'],
    category: 'UI',
    pen: {
      html: `<div class="container">
  <h2>Button Styles</h2>
  <p>Hover over each button to see the effect</p>
  <div class="button-group">
    <button class="btn primary">Primary</button>
    <button class="btn secondary">Secondary</button>
    <button class="btn outline">Outline</button>
    <button class="btn ghost">Ghost</button>
    <button class="btn gradient">Gradient</button>
    <button class="btn icon">
      <span>★</span> Icon
    </button>
    <button class="btn disabled" disabled>Disabled</button>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a2e;
  color: white;
}

.container { text-align: center; }

h2 { font-size: 2rem; margin-bottom: 0.5rem; color: #e0e0e0; }

p { color: #888; margin-bottom: 2rem; }

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 500px;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn.primary {
  background: #667eea;
  color: white;
}
.btn.primary:hover { background: #5a6fd6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }

.btn.secondary {
  background: #764ba2;
  color: white;
}
.btn.secondary:hover { background: #6a4193; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(118,75,162,0.4); }

.btn.outline {
  background: transparent;
  border-color: #667eea;
  color: #667eea;
}
.btn.outline:hover { background: #667eea; color: white; }

.btn.ghost {
  background: transparent;
  color: #888;
}
.btn.ghost:hover { background: rgba(255,255,255,0.1); color: white; }

.btn.gradient {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}
.btn.gradient:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(102,126,234,0.5); }

.btn.icon {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2d2d44;
  color: #e0e0e0;
}
.btn.icon:hover { background: #3d3d55; transform: translateY(-2px); }

.btn.disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}`,
      js: `console.log('Button styles ready! Try hovering over each button.');
console.log('Available styles: Primary, Secondary, Outline, Ghost, Gradient, Icon, Disabled');`,
    },
  },

  // =============================================================
  // 3. Theme Toggle — مبدّل الوضع الداكن/الفاتح
  // =============================================================
  {
    id: 'theme-toggle',
    name: 'Dark/Light Theme',
    description: 'A theme switcher with CSS variables and smooth transitions',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    tags: ['css', 'javascript', 'interactive'],
    category: 'UI',
    pen: {
      html: `<div class="container" id="app">
  <header>
    <h1>Theme Toggle</h1>
    <label class="switch">
      <input type="checkbox" id="themeToggle">
      <span class="slider"></span>
    </label>
  </header>
  <main>
    <p>Toggle the switch to switch between dark and light mode.</p>
    <div class="cards">
      <div class="card">
        <h3>Design</h3>
        <p>Clean and modern UI</p>
      </div>
      <div class="card">
        <h3>Code</h3>
        <p>Built with CSS variables</p>
      </div>
      <div class="card">
        <h3>UX</h3>
        <p>Smooth transitions</p>
      </div>
    </div>
  </main>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #f8f9fa;
  --surface: #ffffff;
  --text: #1a1a2e;
  --text-secondary: #666;
  --border: #e0e0e0;
  --accent: #667eea;
  --shadow: rgba(0,0,0,0.1);
}

.dark {
  --bg: #1a1a2e;
  --surface: #16213e;
  --text: #e0e0e0;
  --text-secondary: #888;
  --border: #2a2a4a;
  --accent: #667eea;
  --shadow: rgba(0,0,0,0.3);
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s ease, color 0.3s ease;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.container { max-width: 600px; width: 100%; }

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 { font-size: 2rem; }

main p { color: var(--text-secondary); margin-bottom: 1.5rem; }

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px var(--shadow);
}

.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px var(--shadow); }

.card h3 { margin-bottom: 0.5rem; font-size: 1.1rem; }
.card p { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0; }

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
}

.switch input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #444;
  border-radius: 28px;
  transition: 0.3s;
}

.slider::before {
  content: '';
  position: absolute;
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider { background: var(--accent); }
input:checked + .slider::before { transform: translateX(28px); }

@media (max-width: 500px) {
  .cards { grid-template-columns: 1fr; }
}`,
      js: `const toggle = document.getElementById('themeToggle');

// تحميل التفضيل السابق من المتصفح
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem('darkMode', toggle.checked);
  console.log('Theme:', toggle.checked ? 'Dark' : 'Light');
});`,
    },
  },

  // =============================================================
  // 4. Simple Counter — عداد رقمي بسيط
  // =============================================================
  {
    id: 'counter',
    name: 'Simple Counter',
    description: 'A counter app with increment, decrement, and reset',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="20" y2="4"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="20" x2="20" y2="20"/></svg>`,
    tags: ['javascript', 'interactive'],
    category: 'Interactive',
    pen: {
      html: `<div class="counter-app">
  <h1>Counter</h1>
  <div class="display" id="count">0</div>
  <div class="button-row">
    <button id="decrement" class="ctrl-btn">−</button>
    <button id="reset" class="ctrl-btn reset">Reset</button>
    <button id="increment" class="ctrl-btn">+</button>
  </div>
  <div class="history">
    <h3>History</h3>
    <ul id="historyList">
      <li>Started at 0</li>
    </ul>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
}

.counter-app {
  text-align: center;
  padding: 2.5rem;
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  min-width: 320px;
}

h1 { font-size: 1.5rem; color: #888; margin-bottom: 1rem; letter-spacing: 2px; text-transform: uppercase; }

.display {
  font-size: 5rem;
  font-weight: 800;
  margin: 1rem 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.button-row {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.ctrl-btn {
  padding: 0.6rem 1.5rem;
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:hover { background: rgba(255,255,255,0.15); transform: scale(1.05); }
.ctrl-btn:active { transform: scale(0.95); }

.ctrl-btn.reset { font-size: 0.9rem; background: rgba(255,87,87,0.15); border-color: rgba(255,87,87,0.3); }
.ctrl-btn.reset:hover { background: rgba(255,87,87,0.3); }

.history {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.history h3 { font-size: 0.85rem; color: #888; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; }

.history ul { list-style: none; max-height: 120px; overflow-y: auto; }

.history li {
  font-size: 0.85rem;
  color: #aaa;
  padding: 0.25rem 0;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}`,
      js: `let count = 0;
const countEl = document.getElementById('count');
const historyList = document.getElementById('historyList');

function update() {
  countEl.textContent = count;
  // تغيير اللون بناءً على القيمة
  const hue = 240 + count * 10;
  countEl.style.background = \`linear-gradient(135deg, hsl(\${hue}, 70%, 65%), hsl(\${hue + 30}, 60%, 55%))\`;
  countEl.style.webkitBackgroundClip = 'text';
}

function addHistory(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  historyList.appendChild(li);
  historyList.scrollTop = historyList.scrollHeight;
}

document.getElementById('increment').addEventListener('click', () => {
  count++;
  update();
  addHistory(\`تمت الزيادة إلى \${count}\`);
});

document.getElementById('decrement').addEventListener('click', () => {
  count--;
  update();
  addHistory(\`تم النقصان إلى \${count}\`);
});

document.getElementById('reset').addEventListener('click', () => {
  if (count !== 0) addHistory(\`تمت إعادة التعيين من \${count} إلى 0\`);
  count = 0;
  update();
});

console.log('Counter ready! Use +/- to change the count.');`,
    },
  },

  // =============================================================
  // 5. Animated Spinner — مؤشرات تحميل متحركة
  // =============================================================
  {
    id: 'loading-spinner',
    name: 'Animated Spinner',
    description: 'Various loading spinner animations with CSS',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v4l4 5-4 5v4h14v-4l-4-5 4-5V3"/><path d="M5 3h14"/><path d="M5 21h14"/></svg>`,
    tags: ['css', 'animation'],
    category: 'Animation',
    pen: {
      html: `<div class="container">
  <h2>Loading Spinners</h2>
  <p>Pure CSS loading animations for your projects</p>
  <div class="grid">
    <div class="demo">
      <div class="spinner circle"></div>
      <span>Circle</span>
    </div>
    <div class="demo">
      <div class="spinner dots">
        <span></span><span></span><span></span>
      </div>
      <span>Dots</span>
    </div>
    <div class="demo">
      <div class="spinner ring"></div>
      <span>Ring</span>
    </div>
    <div class="demo">
      <div class="spinner pulse"></div>
      <span>Pulse</span>
    </div>
    <div class="demo">
      <div class="spinner wave">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <span>Wave</span>
    </div>
    <div class="demo">
      <div class="spinner hourglass"></div>
      <span>Hourglass</span>
    </div>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a2e;
  color: white;
  padding: 2rem;
}

.container { text-align: center; }

h2 { font-size: 2rem; margin-bottom: 0.5rem; }
p { color: #888; margin-bottom: 2rem; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 600px;
}

.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
}

.demo span { font-size: 0.85rem; color: #888; }

/* Circle Spinner */
.spinner.circle {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(102,126,234,0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Dots */
.spinner.dots { display: flex; gap: 6px; }
.spinner.dots span {
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}
.spinner.dots span:nth-child(1) { animation-delay: -0.32s; }
.spinner.dots span:nth-child(2) { animation-delay: -0.16s; }

/* Ring */
.spinner.ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #667eea;
  border-right-color: #764ba2;
  animation: spin 1s linear infinite;
}

/* Pulse */
.spinner.pulse {
  width: 48px;
  height: 48px;
  background: #667eea;
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

/* Wave */
.spinner.wave { display: flex; gap: 4px; align-items: center; height: 48px; }
.spinner.wave span {
  width: 6px;
  height: 100%;
  background: #667eea;
  border-radius: 6px;
  animation: wave 1.2s ease-in-out infinite;
}
.spinner.wave span:nth-child(2) { animation-delay: 0.1s; }
.spinner.wave span:nth-child(3) { animation-delay: 0.2s; }
.spinner.wave span:nth-child(4) { animation-delay: 0.3s; }
.spinner.wave span:nth-child(5) { animation-delay: 0.4s; }

/* Hourglass */
.spinner.hourglass {
  width: 48px;
  height: 48px;
  border: 4px solid #667eea;
  border-radius: 50%;
  border-bottom-color: transparent;
  animation: hourglass 1.2s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
@keyframes pulse { 0%, 100% { transform: scale(0.6); opacity: 0.4; } 50% { transform: scale(1); opacity: 1; } }
@keyframes wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
@keyframes hourglass {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 500px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}`,
      js: `console.log('Spinner animations ready!');
console.log('Types: Circle, Dots, Ring, Pulse, Wave, Hourglass');`,
    },
  },

  // =============================================================
  // 6. Responsive Card — بطاقات متجاوبة مع جميع الشاشات
  // =============================================================
  {
    id: 'responsive-card',
    name: 'Responsive Card',
    description: 'A card layout that adapts to any screen size',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>`,
    tags: ['css', 'responsive', 'layout'],
    category: 'Layout',
    pen: {
      html: `<div class="container">
  <h2>Responsive Cards</h2>
  <p>Cards that look great on any screen size</p>
  <div class="card-grid">
    <article class="card">
      <div class="card-img" style="background: linear-gradient(135deg, #667eea, #764ba2)"></div>
      <div class="card-body">
        <span class="tag">Design</span>
        <h3>Modern UI</h3>
        <p>Clean, minimal design principles for the modern web.</p>
        <div class="card-footer">
          <span class="author">By Sarah K.</span>
          <button class="card-btn">Read →</button>
        </div>
      </div>
    </article>
    <article class="card">
      <div class="card-img" style="background: linear-gradient(135deg, #f093fb, #f5576c)"></div>
      <div class="card-body">
        <span class="tag">Code</span>
        <h3>Clean Code</h3>
        <p>Write readable, maintainable code that scales with your team.</p>
        <div class="card-footer">
          <span class="author">By Alex M.</span>
          <button class="card-btn">Read →</button>
        </div>
      </div>
    </article>
    <article class="card">
      <div class="card-img" style="background: linear-gradient(135deg, #4facfe, #00f2fe)"></div>
      <div class="card-body">
        <span class="tag">Speed</span>
        <h3>Fast Performance</h3>
        <p>Optimize your apps for speed with best practices.</p>
        <div class="card-footer">
          <span class="author">By Jordan T.</span>
          <button class="card-btn">Read →</button>
        </div>
      </div>
    </article>
  </div>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f0c29;
  color: white;
  padding: 2rem;
}

.container { max-width: 900px; width: 100%; }

h2 { text-align: center; font-size: 2rem; margin-bottom: 0.5rem; }
.container > p { text-align: center; color: #888; margin-bottom: 2rem; }

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s ease;
}

.card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.15); }

.card-img {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.card-body { padding: 1.25rem; }

.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(102,126,234,0.2);
  color: #667eea;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.card-body h3 { font-size: 1.2rem; margin-bottom: 0.4rem; }

.card-body p { color: #999; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem; }

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author { font-size: 0.8rem; color: #666; }

.card-btn {
  padding: 0.4rem 1rem;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.card-btn:hover { background: rgba(255,255,255,0.1); }`,
      js: `console.log('Responsive card layout ready!');
console.log('Resize the preview to see the cards adapt.');`,
    },
  },

  // =============================================================
  // 7. Gradient Background — خلفيات متدرجة متحركة
  // =============================================================
  {
    id: 'gradient-background',
    name: 'Gradient Background',
    description: 'Beautiful animated gradient backgrounds and swatches',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/></svg>`,
    tags: ['css', 'animation', 'design'],
    category: 'Animation',
    pen: {
      html: `<div class="page">
  <header class="hero">
    <h1>Gradient Backgrounds</h1>
    <p>Beautiful animated gradients for your projects</p>
  </header>
  <section class="palette">
    <h3>Gradient Collection</h3>
    <div class="grid">
      <div class="swatch" style="background: linear-gradient(135deg, #667eea, #764ba2)">
        <span>#667eea → #764ba2</span>
      </div>
      <div class="swatch" style="background: linear-gradient(135deg, #f093fb, #f5576c)">
        <span>Sunset</span>
      </div>
      <div class="swatch" style="background: linear-gradient(135deg, #4facfe, #00f2fe)">
        <span>Ocean</span>
      </div>
      <div class="swatch" style="background: linear-gradient(135deg, #43e97b, #38f9d7)">
        <span>Spring</span>
      </div>
      <div class="swatch" style="background: linear-gradient(135deg, #fa709a, #fee140)">
        <span>Sunrise</span>
      </div>
      <div class="swatch" style="background: linear-gradient(135deg, #a18cd1, #fbc2eb)">
        <span>Pastel</span>
      </div>
    </div>
  </section>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  background: #0f0c29;
  color: white;
}

.page { max-width: 700px; margin: 0 auto; padding: 2rem; }

.hero {
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
  border-radius: 20px;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero h1 { font-size: 2.5rem; margin-bottom: 0.5rem; text-shadow: 2px 2px 8px rgba(0,0,0,0.3); }
.hero p { font-size: 1.1rem; opacity: 0.9; }

.palette h3 { margin-bottom: 1rem; color: #888; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.swatch {
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.swatch:hover { transform: scale(1.03); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }

.swatch span {
  font-size: 0.8rem;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  background: rgba(0,0,0,0.3);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}`,
      js: `console.log('Gradient backgrounds ready!');
console.log('The hero section has an animated gradient background.');

// النقر على لون لطباعة التدرج في الكونسول
document.querySelectorAll('.swatch').forEach(el => {
  el.addEventListener('click', () => {
    const bg = getComputedStyle(el).backgroundImage;
    console.log('Selected gradient:', bg.slice(0, 60) + '...');
  });
});`,
    },
  },

  // =============================================================
  // 8. Form with Validation — نموذج تسجيل مع التحقق من المدخلات
  // =============================================================
  {
    id: 'form-validation',
    name: 'Form with Validation',
    description: 'A registration form with real-time input validation',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`,
    tags: ['javascript', 'html', 'interactive'],
    category: 'Form',
    pen: {
      html: `<div class="form-wrapper">
  <form id="form" class="form" novalidate>
    <h2>Create Account</h2>
    <p>Fill in the details below to get started</p>

    <div class="field">
      <label for="name">Full Name</label>
      <input type="text" id="name" placeholder="John Doe" required />
      <small class="error" id="nameError"></small>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="john@example.com" required />
      <small class="error" id="emailError"></small>
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Min 6 characters" required minlength="6" />
      <small class="error" id="passwordError"></small>
    </div>

    <div class="field">
      <label for="confirm">Confirm Password</label>
      <input type="password" id="confirm" placeholder="Repeat password" required />
      <small class="error" id="confirmError"></small>
    </div>

    <button type="submit" id="submitBtn">Sign Up</button>
  </form>
</div>`,
      css: `* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63);
  color: white;
  padding: 2rem;
}

.form-wrapper {
  width: 100%;
  max-width: 420px;
}

.form {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 2.5rem;
}

.form h2 { font-size: 1.75rem; margin-bottom: 0.3rem; }
.form > p { color: #888; margin-bottom: 1.5rem; font-size: 0.9rem; }

.field { margin-bottom: 1.25rem; }

.field label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #aaa;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.field input:focus { border-color: #667eea; background: rgba(255,255,255,0.08); }

.field input::placeholder { color: #555; }

.field input.valid { border-color: #43e97b; }
.field input.invalid { border-color: #f5576c; }

.error {
  display: block;
  font-size: 0.8rem;
  color: #f5576c;
  margin-top: 0.3rem;
  min-height: 1.2em;
}

#submitBtn {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

#submitBtn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102,126,234,0.4); }
#submitBtn:active { transform: translateY(0); }

.success-msg {
  text-align: center;
  padding: 2rem;
  background: rgba(67,233,123,0.1);
  border: 1px solid rgba(67,233,123,0.3);
  border-radius: 12px;
  margin-top: 1rem;
}

.success-msg h3 { color: #43e97b; margin-bottom: 0.5rem; }
.success-msg p { color: #aaa; font-size: 0.9rem; }`,
      js: `const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const submitBtn = document.getElementById('submitBtn');

const errors = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  password: document.getElementById('passwordError'),
  confirm: document.getElementById('confirmError'),
};

function validateField(input, errorEl, check) {
  const result = check(input.value);
  input.classList.toggle('valid', result.valid);
  input.classList.toggle('invalid', !result.valid);
  errorEl.textContent = result.message || '';
  return result.valid;
}

// التحقق من الاسم — يجب ألا يكون فارغاً
nameInput.addEventListener('input', () => {
  validateField(nameInput, errors.name, (v) => {
    if (!v.trim()) return { valid: false, message: 'Name is required' };
    if (v.trim().length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
    return { valid: true };
  });
});

// التحقق من البريد الإلكتروني — يجب أن يكون بصيغة صحيحة
emailInput.addEventListener('input', () => {
  validateField(emailInput, errors.email, (v) => {
    if (!v.trim()) return { valid: false, message: 'Email is required' };
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)) return { valid: false, message: 'Enter a valid email' };
    return { valid: true };
  });
});

// التحقق من كلمة المرور — يجب ألا تقل عن 6 أحرف
passwordInput.addEventListener('input', () => {
  validateField(passwordInput, errors.password, (v) => {
    if (!v) return { valid: false, message: 'Password is required' };
    if (v.length < 6) return { valid: false, message: 'Min 6 characters' };
    return { valid: true };
  });
});

// التحقق من تطابق كلمة المرور
confirmInput.addEventListener('input', () => {
  validateField(confirmInput, errors.confirm, (v) => {
    if (!v) return { valid: false, message: 'Please confirm your password' };
    if (v !== passwordInput.value) return { valid: false, message: 'Passwords do not match' };
    return { valid: true };
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const valid = [
    validateField(nameInput, errors.name, (v) => v.trim().length >= 2 ? { valid: true } : { valid: false, message: 'Name is required' }),
    validateField(emailInput, errors.email, (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) ? { valid: true } : { valid: false, message: 'Enter a valid email' }),
    validateField(passwordInput, errors.password, (v) => v.length >= 6 ? { valid: true } : { valid: false, message: 'Min 6 characters' }),
    validateField(confirmInput, errors.confirm, (v) => v === passwordInput.value ? { valid: true } : { valid: false, message: 'Passwords must match' }),
  ].every(Boolean);

  if (valid) {
    const success = document.createElement('div');
    success.className = 'success-msg';
    success.innerHTML = '<h3>✓ Account Created!</h3><p>Welcome aboard! Check your email to verify.</p>';
    form.replaceWith(success);
    console.log('Form submitted successfully!');
  } else {
    console.log('Form has errors — please fix them.');
  }
});

console.log('Form validation ready! Try submitting with invalid data.');`,
    },
  },

  // =============================================================
  // ★ NEW TEMPLATES — قوالب جديدة مضافة للتوسيع إلى 16+ قالب ★
  // =============================================================

  // =============================================================
  // 9. Navigation Bar — شريط تنقل متجاوب مع قائمة هامبورغر
  // =============================================================
  {
    id: 'navigation-bar',
    name: 'Navigation Bar',
    description: 'Responsive navbar with hamburger menu for mobile screens',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    tags: ['css', 'responsive', 'ui', 'javascript'],
    category: 'UI',
    pen: {
      html: `<nav class="navbar">
  <div class="nav-container">
    <a href="#" class="nav-logo">CodeZest</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-menu" id="navMenu">
      <li><a href="#" class="nav-link active">Home</a></li>
      <li><a href="#" class="nav-link">Features</a></li>
      <li><a href="#" class="nav-link">Pricing</a></li>
      <li><a href="#" class="nav-link">About</a></li>
      <li><a href="#" class="nav-link">Contact</a></li>
    </ul>
  </div>
</nav>
<main class="hero-section">
  <h1>Responsive Navigation</h1>
  <p>Resize the preview to see the hamburger menu appear on mobile.</p>
  <p>Click the hamburger icon ☰ to toggle the menu.</p>
</main>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0f0c29;
  color: white;
  min-height: 100vh;
}

/* شريط التنقل */
.navbar {
  background: rgba(22, 33, 62, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

/* الشعار */
.nav-logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

/* قائمة الروابط */
.nav-menu {
  display: flex;
  list-style: none;
  gap: 0.5rem;
  align-items: center;
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover { background: rgba(255,255,255,0.08); color: white; }
.nav-link.active { color: #667eea; background: rgba(102,126,234,0.12); }

/* زر الهامبورغر — مخفي على سطح المكتب */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* تحويل الهامبورغر إلى X عند الفتح */
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }

/* القسم الرئيسي */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
}

.hero-section h1 { font-size: 2.8rem; margin-bottom: 1rem; }
.hero-section p { color: #888; font-size: 1.1rem; margin-bottom: 0.5rem; }

/* استجابة للجوال */
@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav-menu {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: rgba(22, 33, 62, 0.98);
    flex-direction: column;
    padding: 1rem 0;
    gap: 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-link { display: block; padding: 0.85rem 1.5rem; border-radius: 0; }
}`,
      js: `// الحصول على عناصر القائمة والزر
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// تبديل حالة القائمة عند النقر على الهامبورغر
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// إغلاق القائمة عند تغيير حجم الشاشة للعرض الكبير
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

console.log('Navigation bar ready!');`,
    },
  },

  // =============================================================
  // 10. Data Table — جدول بيانات منسّق مع صفوف
  // =============================================================
  {
    id: 'data-table',
    name: 'Data Table',
    description: 'A styled table with sorting and alternating row colors',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    tags: ['css', 'layout', 'table'],
    category: 'Layout',
    pen: {
      html: `<div class="table-container">
  <h2>Employee Directory</h2>
  <p>Stylised data table with hover effects and alternating rows</p>
  <div class="table-wrapper">
    <table id="dataTable">
      <thead>
        <tr>
          <th data-sort="name">Name <span class="sort-icon">↕</span></th>
          <th data-sort="role">Role <span class="sort-icon">↕</span></th>
          <th data-sort="dept">Department <span class="sort-icon">↕</span></th>
          <th data-sort="salary">Salary <span class="sort-icon">↕</span></th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Alice Johnson</td><td>Developer</td><td>Engineering</td><td>$95,000</td></tr>
        <tr><td>Bob Smith</td><td>Designer</td><td>Creative</td><td>$82,000</td></tr>
        <tr><td>Carol Williams</td><td>Manager</td><td>Operations</td><td>$110,000</td></tr>
        <tr><td>David Brown</td><td>Analyst</td><td>Finance</td><td>$78,000</td></tr>
        <tr><td>Eve Davis</td><td>Developer</td><td>Engineering</td><td>$98,000</td></tr>
        <tr><td>Frank Miller</td><td>Designer</td><td>Creative</td><td>$85,000</td></tr>
        <tr><td>Grace Wilson</td><td>Manager</td><td>HR</td><td>$105,000</td></tr>
        <tr><td>Henry Taylor</td><td>Analyst</td><td>Finance</td><td>$80,000</td></tr>
      </tbody>
    </table>
  </div>
  <p class="table-info">Click a column header to sort</p>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63);
  color: white;
  padding: 2rem;
}

.table-container {
  width: 100%;
  max-width: 800px;
}

.table-container h2 { font-size: 1.8rem; margin-bottom: 0.3rem; }
.table-container > p { color: #888; margin-bottom: 1.5rem; font-size: 0.9rem; }

/* إطار الجدول مع التمرير */
.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
}

/* تصميم الجدول */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

/* رأس الجدول */
thead th {
  background: rgba(102, 126, 234, 0.15);
  color: #a0b0ff;
  padding: 1rem 1.25rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
  white-space: nowrap;
}

thead th:hover { background: rgba(102, 126, 234, 0.25); }

.sort-icon {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-left: 4px;
}

/* خلايا الجدول */
td {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: #ddd;
}

/* تلوين الصفوف بالتناوب */
tbody tr:nth-child(even) {
  background: rgba(255,255,255,0.03);
}

/* تأثير التمرير على الصف */
tbody tr:hover {
  background: rgba(102, 126, 234, 0.1);
}

/* آخر صف — بدون حد سفلي */
tbody tr:last-child td {
  border-bottom: none;
}

.table-info {
  text-align: center;
  color: #666;
  margin-top: 1rem;
  font-size: 0.85rem;
}`,
      js: `const table = document.getElementById('dataTable');
const headers = table.querySelectorAll('thead th');
const tbody = table.querySelector('tbody');

// تخزين حالة الترتيب لكل عمود
let sortState = {};

// دالة ترتيب البيانات
function sortTable(colIndex, ascending) {
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const aVal = a.cells[colIndex].textContent.trim();
    const bVal = b.cells[colIndex].textContent.trim();

    // محاولة المقارنة كأرقام
    const aNum = parseFloat(aVal.replace(/[$,]/g, ''));
    const bNum = parseFloat(bVal.replace(/[$,]/g, ''));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return ascending ? aNum - bNum : bNum - aNum;
    }

    return ascending
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // إعادة ترتيب الصفوف في DOM
  rows.forEach(row => tbody.appendChild(row));
}

// إضافة مستمعي النقر على رؤوس الأعمدة
headers.forEach((th, index) => {
  th.addEventListener('click', () => {
    // تبديل حالة الترتيب
    const isAscending = sortState[index] === 'desc';
    sortState = {};
    sortState[index] = isAscending ? 'asc' : 'desc';
    sortTable(index, isAscending);

    // تحديث أيقونة الترتيب
    headers.forEach(h => {
      h.querySelector('.sort-icon').textContent = '↕';
    });
    th.querySelector('.sort-icon').textContent = isAscending ? '↑' : '↓';
  });
});

console.log('Data table ready! Click column headers to sort.');`,
    },
  },

  // =============================================================
  // 11. CSS Grid Layout — تخطيط شبكي على نمط المجلات
  // =============================================================
  {
    id: 'css-grid-layout',
    name: 'CSS Grid Layout',
    description: 'A magazine-style grid layout with featured and regular articles',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="9" x2="12" y2="21"/></svg>`,
    tags: ['css', 'layout', 'grid', 'responsive'],
    category: 'Layout',
    pen: {
      html: `<div class="magazine">
  <header class="mag-header">
    <h1>Daily Zest</h1>
    <p>Discover the latest in design, code, and creativity</p>
  </header>
  <div class="mag-grid">
    <article class="article featured">
      <div class="article-img" style="background: linear-gradient(135deg, #667eea, #764ba2)">📸</div>
      <div class="article-body">
        <span class="article-tag">Featured</span>
        <h2>The Future of Web Design</h2>
        <p>Discover how modern CSS features like Grid, Container Queries, and Layers are reshaping the way we build for the web.</p>
        <div class="article-meta">By Sarah K. · 5 min read</div>
      </div>
    </article>
    <article class="article">
      <div class="article-img" style="background: linear-gradient(135deg, #f093fb, #f5576c)">🎨</div>
      <div class="article-body">
        <span class="article-tag">Design</span>
        <h3>Color Theory 101</h3>
        <p>Master the basics of color harmony and contrast in UI design.</p>
        <div class="article-meta">By Alex M. · 3 min read</div>
      </div>
    </article>
    <article class="article">
      <div class="article-img" style="background: linear-gradient(135deg, #4facfe, #00f2fe)">⚡</div>
      <div class="article-body">
        <span class="article-tag">Performance</span>
        <h3>Optimising Load Times</h3>
        <p>Practical tips to make your websites load faster than ever.</p>
        <div class="article-meta">By Jordan T. · 4 min read</div>
      </div>
    </article>
    <article class="article">
      <div class="article-img" style="background: linear-gradient(135deg, #43e97b, #38f9d7)">🔒</div>
      <div class="article-body">
        <span class="article-tag">Security</span>
        <h3>Web Security Basics</h3>
        <p>Protect your users with these essential security practices.</p>
        <div class="article-meta">By Priya R. · 6 min read</div>
      </div>
    </article>
    <article class="article">
      <div class="article-img" style="background: linear-gradient(135deg, #fa709a, #fee140)">🚀</div>
      <div class="article-body">
        <span class="article-tag">DevOps</span>
        <h3>CI/CD Pipelines</h3>
        <p>Automate your deployment workflow from commit to production.</p>
        <div class="article-meta">By Chris W. · 7 min read</div>
      </div>
    </article>
    <article class="article">
      <div class="article-img" style="background: linear-gradient(135deg, #a18cd1, #fbc2eb)">🧩</div>
      <div class="article-body">
        <span class="article-tag">Tools</span>
        <h3>Essential Dev Tools</h3>
        <p>Ten tools every developer should have in their toolbox.</p>
        <div class="article-meta">By Jamie L. · 3 min read</div>
      </div>
    </article>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0f0c29;
  color: white;
  padding: 2rem;
}

.magazine {
  max-width: 1100px;
  margin: 0 auto;
}

/* رأس المجلة */
.mag-header {
  text-align: center;
  padding: 2rem 0 3rem;
}

.mag-header h1 {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.mag-header p { color: #888; font-size: 1.1rem; }

/* الشبكة الرئيسية — تخطيط مجلة */
.mag-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  grid-auto-rows: auto;
}

/* المقال المميز — يمتد على عمودين */
.article.featured {
  grid-column: span 2;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
}

.article.featured .article-img {
  height: 220px;
}

.article.featured h2 { font-size: 1.8rem; }
.article.featured p { font-size: 1rem; }

/* تصميم المقال */
.article {
  background: rgba(255,255,255,0.04);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.3s ease;
}

.article:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); }

.article-img {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.article-body { padding: 1.25rem; }

.article-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(102,126,234,0.2);
  color: #667eea;
  margin-bottom: 0.5rem;
}

.article-body h2, .article-body h3 { margin-bottom: 0.4rem; }
.article-body p { color: #999; font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.75rem; }

.article-meta { font-size: 0.8rem; color: #666; }

/* استجابة للشاشات المتوسطة */
@media (max-width: 900px) {
  .mag-grid { grid-template-columns: repeat(2, 1fr); }
  .article.featured { grid-column: span 2; }
}

/* استجابة للجوال */
@media (max-width: 600px) {
  .mag-grid { grid-template-columns: 1fr; }
  .article.featured { grid-column: span 1; }
  .mag-header h1 { font-size: 2rem; }
}`,
      js: `console.log('CSS Grid magazine layout ready!');
console.log('Resize the preview to see the responsive grid adapt.');
console.log('The featured article spans 2 columns on desktop.');`,
    },
  },

  // =============================================================
  // 12. Profile Card — بطاقة ملف شخصي مع الصورة والروابط
  // =============================================================
  {
    id: 'profile-card',
    name: 'Profile Card',
    description: 'A profile card with avatar, name, bio, and social media links',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`,
    tags: ['css', 'ui', 'design'],
    category: 'UI',
    pen: {
      html: `<div class="card-wrapper">
  <div class="profile-card">
    <div class="card-header-bg"></div>
    <div class="card-avatar">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23667eea'/%3E%3Ctext x='40' y='48' font-size='32' text-anchor='middle' fill='white'%3E👩%3C/text%3E%3C/svg%3E" alt="Avatar" class="avatar-img">
    </div>
    <div class="card-content">
      <h2 class="card-name">Amira Al-Sayed</h2>
      <span class="card-title">Full-Stack Developer</span>
      <p class="card-bio">Passionate about building beautiful, accessible web experiences. Open-source contributor and tech writer.</p>
      <div class="card-stats">
        <div class="stat">
          <span class="stat-value">2.4K</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat">
          <span class="stat-value">180</span>
          <span class="stat-label">Following</span>
        </div>
        <div class="stat">
          <span class="stat-value">56</span>
          <span class="stat-label">Projects</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn-follow">Follow</button>
        <button class="btn-message">Message</button>
      </div>
      <div class="card-social">
        <a href="#" class="social-link" aria-label="Twitter">𝕏</a>
        <a href="#" class="social-link" aria-label="GitHub">⌘</a>
        <a href="#" class="social-link" aria-label="LinkedIn">🔗</a>
        <a href="#" class="social-link" aria-label="YouTube">▶</a>
      </div>
    </div>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
  padding: 2rem;
}

.card-wrapper {
  perspective: 1000px;
}

/* بطاقة الملف الشخصي */
.profile-card {
  width: 340px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.4s ease;
}

.profile-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }

/* الغلاف العلوي */
.card-header-bg {
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* الصورة الشخصية */
.card-avatar {
  display: flex;
  justify-content: center;
  margin-top: -40px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.15);
  background: #16213e;
  transition: transform 0.3s ease;
}

.profile-card:hover .avatar-img { transform: scale(1.08); }

/* المحتوى */
.card-content {
  padding: 1rem 1.5rem 1.5rem;
  text-align: center;
}

.card-name { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem; }

.card-title {
  display: inline-block;
  font-size: 0.85rem;
  color: #667eea;
  background: rgba(102,126,234,0.12);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.card-bio { color: #999; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem; }

/* الإحصائيات */
.card-stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 1rem;
}

.stat { display: flex; flex-direction: column; align-items: center; }
.stat-value { font-size: 1.1rem; font-weight: 700; color: white; }
.stat-label { font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }

/* الأزرار */
.card-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.btn-follow, .btn-message {
  flex: 1;
  padding: 0.65rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-follow {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}
.btn-follow:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(102,126,234,0.4); }

.btn-message {
  background: rgba(255,255,255,0.08);
  color: white;
  border: 1px solid rgba(255,255,255,0.12);
}
.btn-message:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }

/* روابط التواصل الاجتماعي */
.card-social {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  color: #aaa;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s;
}

.social-link:hover { background: rgba(102,126,234,0.2); color: #667eea; transform: translateY(-3px); }`,
      js: `// عند النقر على زر Follow — تبديل النص
const followBtn = document.querySelector('.btn-follow');
let isFollowing = false;

followBtn.addEventListener('click', () => {
  isFollowing = !isFollowing;
  followBtn.textContent = isFollowing ? 'Following ✓' : 'Follow';
  followBtn.style.background = isFollowing
    ? 'linear-gradient(135deg, #43e97b, #38f9d7)'
    : 'linear-gradient(135deg, #667eea, #764ba2)';
  console.log(isFollowing ? '✅ Now following Amira' : '👋 Unfollowed');
});

// عند النقر على Message
document.querySelector('.btn-message').addEventListener('click', () => {
  console.log('💬 Opening conversation with Amira...');
});

console.log('Profile card ready! Click Follow or Message.');`,
    },
  },

  // =============================================================
  // 13. Modal Dialog — نافذة منبثقة مع طبقة خلفية
  // =============================================================
  {
    id: 'modal-dialog',
    name: 'Modal Dialog',
    description: 'A popup dialog with overlay backdrop and animations',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    tags: ['javascript', 'ui', 'interactive', 'css'],
    category: 'UI',
    pen: {
      html: `<div class="page">
  <h1>Modal Dialog</h1>
  <p>Click the buttons below to open different modal dialogs.</p>
  <div class="btn-group">
    <button id="openModalInfo" class="modal-btn info">ℹ️ Show Info</button>
    <button id="openModalConfirm" class="modal-btn confirm">⚠️ Confirm Action</button>
    <button id="openModalForm" class="modal-btn form">📝 Quick Form</button>
  </div>
</div>

<!-- طبقة الخلفية المعتمة -->
<div class="overlay" id="overlay"></div>

<!-- نافذة المعلومات -->
<div class="modal" id="modalInfo">
  <div class="modal-content">
    <div class="modal-header">
      <h2>ℹ️ Information</h2>
      <button class="close-btn" data-close="modalInfo">&times;</button>
    </div>
    <div class="modal-body">
      <p>This is an information modal. It provides additional context or details without navigating away from the current page.</p>
      <p>You can close this modal by:</p>
      <ul>
        <li>Clicking the ✕ button</li>
        <li>Clicking outside the modal</li>
        <li>Pressing the <kbd>Esc</kbd> key</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button class="modal-close-btn" data-close="modalInfo">Got it</button>
    </div>
  </div>
</div>

<!-- نافذة التأكيد -->
<div class="modal" id="modalConfirm">
  <div class="modal-content">
    <div class="modal-header">
      <h2>⚠️ Confirm Action</h2>
      <button class="close-btn" data-close="modalConfirm">&times;</button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </div>
    <div class="modal-footer">
      <button class="modal-cancel-btn" data-close="modalConfirm">Cancel</button>
      <button class="modal-danger-btn" id="confirmDelete">Delete</button>
    </div>
  </div>
</div>

<!-- نافذة النموذج السريع -->
<div class="modal" id="modalForm">
  <div class="modal-content">
    <div class="modal-header">
      <h2>📝 Quick Contact</h2>
      <button class="close-btn" data-close="modalForm">&times;</button>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="modalName">Your Name</label>
        <input type="text" id="modalName" placeholder="Enter your name" />
      </div>
      <div class="form-field">
        <label for="modalEmail">Email</label>
        <input type="email" id="modalEmail" placeholder="Enter your email" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-cancel-btn" data-close="modalForm">Cancel</button>
      <button class="modal-submit-btn" id="submitForm">Submit</button>
    </div>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63);
  color: white;
  padding: 2rem;
}

.page { text-align: center; }

.page h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
.page p { color: #888; margin-bottom: 2rem; }

.btn-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.modal-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
}

.modal-btn.info { background: linear-gradient(135deg, #667eea, #764ba2); }
.modal-btn.confirm { background: linear-gradient(135deg, #f5576c, #fa709a); }
.modal-btn.form { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.modal-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }

/* طبقة الخلفية المعتمة */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  animation: fadeIn 0.25s ease;
}

.overlay.active { display: block; }

/* النافذة المنبثقة */
.modal {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  z-index: 1000;
  width: 90%;
  max-width: 460px;
  background: #1a1a2e;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  animation: modalIn 0.3s ease forwards;
}

.modal.active { display: block; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.modal-header h2 { font-size: 1.2rem; }

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255,255,255,0.06);
  color: #888;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover { background: rgba(255,255,255,0.12); color: white; }

.modal-body {
  padding: 1.5rem;
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
}

.modal-body ul { padding-left: 1.25rem; margin-top: 0.5rem; }
.modal-body ul li { margin-bottom: 0.3rem; }

kbd {
  background: rgba(255,255,255,0.08);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
  border: 1px solid rgba(255,255,255,0.1);
}

/* حقول النموذج داخل النافذة */
.form-field { margin-bottom: 1rem; text-align: left; }

.form-field label {
  display: block;
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.form-field input {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  color: white;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.2s;
}

.form-field input:focus { border-color: #667eea; }

/* تذييل النافذة */
.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.modal-footer button {
  padding: 0.55rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close-btn { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.modal-cancel-btn { background: rgba(255,255,255,0.08); color: #ccc; border: 1px solid rgba(255,255,255,0.1); }
.modal-cancel-btn:hover { background: rgba(255,255,255,0.14); }
.modal-danger-btn { background: linear-gradient(135deg, #f5576c, #fa709a); color: white; }
.modal-submit-btn { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.modal-footer button:hover { transform: translateY(-1px); }`,
      js: `// دوال فتح وإغلاق النوافذ المنبثقة
function openModal(id) {
  document.getElementById('overlay').classList.add('active');
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden'; // منع التمرير
}

function closeModal(id) {
  document.getElementById('overlay').classList.remove('active');
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// فتح النوافذ
document.getElementById('openModalInfo').addEventListener('click', () => openModal('modalInfo'));
document.getElementById('openModalConfirm').addEventListener('click', () => openModal('modalConfirm'));
document.getElementById('openModalForm').addEventListener('click', () => openModal('modalForm'));

// إغلاق النوافذ — زر ✕ وأزرار الإغلاق
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

// إغلاق عند النقر على الخلفية
document.getElementById('overlay').addEventListener('click', closeAllModals);

// إغلاق عند الضغط على Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// تأكيد الحذف
document.getElementById('confirmDelete').addEventListener('click', () => {
  closeModal('modalConfirm');
  console.log('Item deleted!');
  alert('Item has been deleted.');
});

// إرسال النموذج
document.getElementById('submitForm').addEventListener('click', () => {
  const name = document.getElementById('modalName').value.trim();
  const email = document.getElementById('modalEmail').value.trim();
  if (name && email) {
    closeModal('modalForm');
    console.log('Form submitted:', { name, email });
    alert('Thanks, ' + name + '! We will contact you at ' + email + '.');
  } else {
    alert('Please fill in both fields.');
  }
});

console.log('Modal dialog ready! Click a button to open a modal.');`,
    },
  },

  // =============================================================
  // 14. Accordion/FAQ — أقسام قابلة للطي للأسئلة الشائعة
  // =============================================================
  {
    id: 'accordion-faq',
    name: 'Accordion / FAQ',
    description: 'Collapsible accordion sections for FAQs and content',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
    tags: ['javascript', 'ui', 'interactive', 'css'],
    category: 'UI',
    pen: {
      html: `<div class="faq-container">
  <h2>Frequently Asked Questions</h2>
  <p>Click on a question to expand the answer.</p>

  <div class="accordion">
    <div class="accordion-item">
      <button class="accordion-header">
        <span>What is CodeZest?</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body">
        <p>CodeZest is an online code editor that lets you write HTML, CSS, and JavaScript in your browser and see the results live. It makes learning and prototyping web development quick and fun!</p>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header">
        <span>How do I save my projects?</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body">
        <p>Your code is automatically saved in the browser's local storage. You can also copy the URL to share your work with others.</p>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header">
        <span>Can I use external libraries?</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body">
        <p>Yes! You can include any external CSS or JavaScript library by adding its CDN link in the HTML section using a <code>&lt;link&gt;</code> or <code>&lt;script&gt;</code> tag.</p>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header">
        <span>Is it mobile-friendly?</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body">
        <p>Absolutely! CodeZest is fully responsive and works on tablets and phones. The editor adapts to smaller screens for a great coding experience on the go.</p>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header">
        <span>How can I report a bug?</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body">
        <p>If you encounter a bug or have a feature request, please open an issue on our GitHub repository. We appreciate your feedback!</p>
      </div>
    </div>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63);
  color: white;
  padding: 2rem;
}

.faq-container {
  width: 100%;
  max-width: 650px;
}

.faq-container h2 { font-size: 2rem; margin-bottom: 0.3rem; }
.faq-container > p { color: #888; margin-bottom: 2rem; }

/* عنصر الأكورديون */
.accordion { display: flex; flex-direction: column; gap: 0.75rem; }

.accordion-item {
  background: rgba(255,255,255,0.04);
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  transition: border-color 0.3s;
}

.accordion-item.active { border-color: rgba(102,126,234,0.3); }

/* رأس الأكورديون — زر قابل للنقر */
.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.25rem;
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, color 0.2s;
}

.accordion-header:hover { background: rgba(255,255,255,0.04); color: white; }

.accordion-icon {
  font-size: 1.3rem;
  font-weight: 300;
  color: #667eea;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.accordion-item.active .accordion-icon {
  transform: rotate(45deg);
}

/* جسم الأكورديون — المحتوى القابل للطي */
.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
}

.accordion-item.active .accordion-body {
  max-height: 300px;
}

.accordion-body p {
  padding: 0 1.25rem 1.1rem;
  color: #999;
  font-size: 0.92rem;
  line-height: 1.6;
}

.accordion-body code {
  background: rgba(102,126,234,0.15);
  color: #667eea;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-size: 0.85rem;
}`,
      js: `// الحصول على جميع عناصر الأكورديون
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');

  header.addEventListener('click', () => {
    // إغلاق العناصر الأخرى المفتوحة (سلوك الأكورديون)
    accordionItems.forEach(other => {
      if (other !== item && other.classList.contains('active')) {
        other.classList.remove('active');
      }
    });

    // تبديل حالة العنصر الحالي
    item.classList.toggle('active');
  });
});

// فتح أول عنصر تلقائياً
accordionItems[0].classList.add('active');

console.log('Accordion/FAQ ready! Click on a question to expand.');`,
    },
  },

  // =============================================================
  // 15. Tab Component — مكون علامات تبويب باستخدام JavaScript
  // =============================================================
  {
    id: 'tab-component',
    name: 'Tab Component',
    description: 'JavaScript tabbed interface with smooth transitions',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
    tags: ['javascript', 'ui', 'interactive', 'css'],
    category: 'UI',
    pen: {
      html: `<div class="tabs-container">
  <h2>Tab Component</h2>
  <p>Click on each tab to switch between content panels.</p>

  <div class="tabs">
    <div class="tabs-header">
      <button class="tab-btn active" data-tab="tab1">🚀 Overview</button>
      <button class="tab-btn" data-tab="tab2">⚙️ Features</button>
      <button class="tab-btn" data-tab="tab3">📊 Stats</button>
      <button class="tab-btn" data-tab="tab4">📞 Contact</button>
    </div>

    <div class="tab-panels">
      <!-- لوحة نظرة عامة -->
      <div class="tab-panel active" id="tab1">
        <h3>Welcome to CodeZest</h3>
        <p>CodeZest is a powerful online code editor built for developers who want to quickly prototype and experiment with HTML, CSS, and JavaScript — all from within your browser.</p>
        <p>No installation required. Just write code and see the results instantly.</p>
      </div>

      <!-- لوحة الميزات -->
      <div class="tab-panel" id="tab2">
        <h3>Key Features</h3>
        <ul class="feature-list">
          <li><span class="check">✓</span> Live preview as you type</li>
          <li><span class="check">✓</span> Multiple template starters</li>
          <li><span class="check">✓</span> Dark &amp; light themes</li>
          <li><span class="check">✓</span> Responsive preview mode</li>
          <li><span class="check">✓</span> Export and share your code</li>
        </ul>
      </div>

      <!-- لوحة الإحصائيات -->
      <div class="tab-panel" id="tab3">
        <h3>Platform Stats</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-num">50K+</span>
            <span class="stat-desc">Active Users</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">10K+</span>
            <span class="stat-desc">Projects Created</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">99.9%</span>
            <span class="stat-desc">Uptime</span>
          </div>
        </div>
      </div>

      <!-- لوحة الاتصال -->
      <div class="tab-panel" id="tab4">
        <h3>Get In Touch</h3>
        <p>Have questions or feedback? We'd love to hear from you.</p>
        <p class="contact-info">📧 support@codezest.dev</p>
        <p class="contact-info">🐦 @codezest on Twitter</p>
        <p class="contact-info">💬 Join our Discord community</p>
      </div>
    </div>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63);
  color: white;
  padding: 2rem;
}

.tabs-container {
  width: 100%;
  max-width: 650px;
}

.tabs-container h2 { font-size: 2rem; margin-bottom: 0.3rem; }
.tabs-container > p { color: #888; margin-bottom: 1.5rem; }

/* رأس التبويبات */
.tabs {
  background: rgba(255,255,255,0.04);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.15);
}

/* أزرار التبويبات */
.tab-btn {
  flex: 1;
  padding: 1rem 0.75rem;
  border: none;
  background: none;
  color: #888;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab-btn:hover { color: #ccc; background: rgba(255,255,255,0.03); }

.tab-btn.active {
  color: #667eea;
  background: rgba(102,126,234,0.08);
}

/* خط التحديد السفلي للتبويب النشط */
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px 3px 0 0;
}

/* لوحات المحتوى */
.tab-panels { padding: 1.5rem; }

.tab-panel {
  display: none;
  animation: tabFadeIn 0.35s ease;
}

.tab-panel.active { display: block; }

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.tab-panel h3 { font-size: 1.3rem; margin-bottom: 0.75rem; }

.tab-panel p {
  color: #aaa;
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

/* قائمة الميزات */
.feature-list {
  list-style: none;
}

.feature-list li {
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: #ccc;
}

.check {
  color: #43e97b;
  font-weight: 700;
  margin-right: 0.5rem;
}

/* بطاقات الإحصائيات */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.06);
}

.stat-num {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
}

.stat-desc { font-size: 0.8rem; color: #888; }

.contact-info { font-size: 1rem; padding: 0.3rem 0; }

/* استجابة للجوال */
@media (max-width: 500px) {
  .stats-grid { grid-template-columns: 1fr; }
  .tab-btn { font-size: 0.8rem; padding: 0.8rem 0.4rem; }
}`,
      js: `// الحصول على أزرار التبويبات واللوحات
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// إضافة مستمعي النقر على كل زر تبويب
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // إزالة التفعيل من جميع الأزرار
    tabBtns.forEach(b => b.classList.remove('active'));
    // إخفاء جميع اللوحات
    tabPanels.forEach(p => p.classList.remove('active'));

    // تفعيل الزر الحالي
    btn.classList.add('active');

    // إظهار اللوحة المرتبطة
    const tabId = btn.dataset.tab;
    document.getElementById(tabId).classList.add('active');

    console.log(\`Switched to tab: \${btn.textContent.trim()}\`);
  });
});

console.log('Tab component ready! Click on a tab to switch content.');`,
    },
  },

  // =============================================================
  // 16. Progress Bar — شريط تقدم متحرك
  // =============================================================
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    description: 'Animated progress bars with percentage display and controls',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    tags: ['css', 'animation', 'javascript', 'ui'],
    category: 'Animation',
    pen: {
      html: `<div class="progress-page">
  <h2>Progress Bars</h2>
  <p>Animated progress indicators with different styles</p>

  <div class="progress-controls">
    <div class="control-group">
      <label for="progressSlider">Set Value: <span id="valueDisplay">65</span>%</label>
      <input type="range" id="progressSlider" min="0" max="100" value="65" />
    </div>
    <div class="btn-row">
      <button id="startAnim" class="ctrl-btn">▶ Start</button>
      <button id="resetAnim" class="ctrl-btn reset">↺ Reset</button>
      <button id="randomAnim" class="ctrl-btn random">🎲 Random</button>
    </div>
  </div>

  <div class="bars-list">
    <!-- شريط أساسي -->
    <div class="bar-item">
      <div class="bar-label">
        <span>Default</span>
        <span class="bar-percent" id="percent1">65%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill default" id="bar1" style="width: 65%"></div>
      </div>
    </div>

    <!-- شريط متدرج -->
    <div class="bar-item">
      <div class="bar-label">
        <span>Gradient</span>
        <span class="bar-percent" id="percent2">65%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill gradient" id="bar2" style="width: 65%"></div>
      </div>
    </div>

    <!-- شريط مخطط (Striped) -->
    <div class="bar-item">
      <div class="bar-label">
        <span>Striped</span>
        <span class="bar-percent" id="percent3">65%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill striped" id="bar3" style="width: 65%"></div>
      </div>
    </div>

    <!-- شريط متحرك (Animated Stripes) -->
    <div class="bar-item">
      <div class="bar-label">
        <span>Animated Stripes</span>
        <span class="bar-percent" id="percent4">65%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill striped animated" id="bar4" style="width: 65%"></div>
      </div>
    </div>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63);
  color: white;
  padding: 2rem;
}

.progress-page {
  width: 100%;
  max-width: 560px;
}

.progress-page h2 { font-size: 2rem; margin-bottom: 0.3rem; }
.progress-page > p { color: #888; margin-bottom: 2rem; }

/* عناصر التحكم */
.progress-controls {
  background: rgba(255,255,255,0.04);
  border-radius: 14px;
  padding: 1.25rem;
  border: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 2rem;
}

.control-group { margin-bottom: 1rem; }

.control-group label {
  display: block;
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

#valueDisplay { color: #667eea; font-size: 1.1rem; }

/* شريط التمرير (Range Slider) — تخصيص */
input[type="range"] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  cursor: pointer;
  border: 2px solid rgba(255,255,255,0.2);
  transition: transform 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.15); }

.btn-row {
  display: flex;
  gap: 0.5rem;
}

.ctrl-btn {
  flex: 1;
  padding: 0.55rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
}

.ctrl-btn { background: linear-gradient(135deg, #667eea, #764ba2); }
.ctrl-btn.reset { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); }
.ctrl-btn.random { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.ctrl-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }

/* قائمة الأشرطة */
.bars-list { display: flex; flex-direction: column; gap: 1.25rem; }

.bar-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  color: #aaa;
  font-weight: 600;
}

.bar-percent { color: #667eea; }

/* مسار الشريط (الخلفية) */
.bar-track {
  width: 100%;
  height: 24px;
  background: rgba(255,255,255,0.06);
  border-radius: 12px;
  overflow: hidden;
}

/* تعبئة الشريط */
.bar-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}

/* الأنواع المختلفة */
.bar-fill.default {
  background: #667eea;
}

.bar-fill.gradient {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.bar-fill.striped {
  background: linear-gradient(45deg,
    #667eea 25%,
    #764ba2 25%,
    #764ba2 50%,
    #667eea 50%,
    #667eea 75%,
    #764ba2 75%);
  background-size: 40px 40px;
}

/* شرائط متحركة */
.bar-fill.striped.animated {
  animation: stripeMove 1s linear infinite;
}

@keyframes stripeMove {
  0% { background-position: 0 0; }
  100% { background-position: 40px 0; }
}`,
      js: `const slider = document.getElementById('progressSlider');
const valueDisplay = document.getElementById('valueDisplay');
const bars = [
  { bar: document.getElementById('bar1'), percent: document.getElementById('percent1') },
  { bar: document.getElementById('bar2'), percent: document.getElementById('percent2') },
  { bar: document.getElementById('bar3'), percent: document.getElementById('percent3') },
  { bar: document.getElementById('bar4'), percent: document.getElementById('percent4') },
];

// تحديث جميع الأشرطة عند تغيير قيمة المنزلق
slider.addEventListener('input', () => {
  const val = slider.value;
  valueDisplay.textContent = val;
  bars.forEach(({ bar, percent }) => {
    bar.style.width = val + '%';
    percent.textContent = val + '%';
  });
});

// تشغيل حركة التقدم التلقائي
document.getElementById('startAnim').addEventListener('click', () => {
  let val = 0;
  slider.value = 0;
  valueDisplay.textContent = '0';
  bars.forEach(({ bar, percent }) => { bar.style.width = '0%'; percent.textContent = '0%'; });

  const interval = setInterval(() => {
    val += 1;
    if (val > 100) { clearInterval(interval); return; }
    slider.value = val;
    valueDisplay.textContent = val;
    bars.forEach(({ bar, percent }) => {
      bar.style.width = val + '%';
      percent.textContent = val + '%';
    });
  }, 25); // 2.5 ثانية للوصول إلى 100%
});

// إعادة التعيين إلى الصفر
document.getElementById('resetAnim').addEventListener('click', () => {
  slider.value = 0;
  valueDisplay.textContent = '0';
  bars.forEach(({ bar, percent }) => { bar.style.width = '0%'; percent.textContent = '0%'; });
});

// قيمة عشوائية
document.getElementById('randomAnim').addEventListener('click', () => {
  const val = Math.floor(Math.random() * 101);
  slider.value = val;
  valueDisplay.textContent = val;
  bars.forEach(({ bar, percent }) => {
    bar.style.width = val + '%';
    percent.textContent = val + '%';
  });
});

console.log('Progress bar ready! Use the slider or buttons to control the bars.');`,
    },
  },

  // =============================================================
  // 17. Image Gallery — معرض صور على شكل شبكة مع تأثيرات
  // =============================================================
  {
    id: 'image-gallery',
    name: 'Image Gallery',
    description: 'A grid gallery of images with hover zoom effects and captions',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
    tags: ['css', 'layout', 'design', 'responsive'],
    category: 'Layout',
    pen: {
      html: `<div class="gallery-page">
  <h2>Image Gallery</h2>
  <p>Hover over each image to see the zoom effect</p>

  <div class="gallery-grid">
    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #667eea, #764ba2)">
        <span class="gallery-emoji">🌄</span>
      </div>
      <div class="gallery-caption">Mountain Sunrise</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #f093fb, #f5576c)">
        <span class="gallery-emoji">🌺</span>
      </div>
      <div class="gallery-caption">Tropical Bloom</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #4facfe, #00f2fe)">
        <span class="gallery-emoji">🌊</span>
      </div>
      <div class="gallery-caption">Ocean Wave</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #43e97b, #38f9d7)">
        <span class="gallery-emoji">🌿</span>
      </div>
      <div class="gallery-caption">Forest Path</div>
    </div>

    <div class="gallery-item wide">
      <div class="gallery-img" style="background: linear-gradient(135deg, #fa709a, #fee140)">
        <span class="gallery-emoji">🌅</span>
      </div>
      <div class="gallery-caption">Golden Hour</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #a18cd1, #fbc2eb)">
        <span class="gallery-emoji">🌸</span>
      </div>
      <div class="gallery-caption">Cherry Blossom</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #667eea, #f093fb)">
        <span class="gallery-emoji">🌌</span>
      </div>
      <div class="gallery-caption">Night Sky</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #764ba2, #4facfe)">
        <span class="gallery-emoji">🏔️</span>
      </div>
      <div class="gallery-caption">Snow Peak</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #38f9d7, #43e97b)">
        <span class="gallery-emoji">🌴</span>
      </div>
      <div class="gallery-caption">Palm Beach</div>
    </div>

    <div class="gallery-item">
      <div class="gallery-img" style="background: linear-gradient(135deg, #f5576c, #fa709a)">
        <span class="gallery-emoji">🌇</span>
      </div>
      <div class="gallery-caption">City Sunset</div>
    </div>
  </div>
</div>`,
      css: `/* إعدادات عامة */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  background: #0f0c29;
  color: white;
  padding: 2rem;
}

.gallery-page {
  max-width: 1000px;
  margin: 0 auto;
}

.gallery-page h2 { text-align: center; font-size: 2rem; margin-bottom: 0.3rem; }
.gallery-page > p { text-align: center; color: #888; margin-bottom: 2rem; }

/* شبكة المعرض */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  grid-auto-flow: dense;
}

/* عنصر الصورة */
.gallery-item {
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.3s ease;
}

.gallery-item:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.12); }

/* عنصر عريض — يمتد على عمودين */
.gallery-item.wide {
  grid-column: span 2;
}

/* حاوية الصورة */
.gallery-img {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
}

.gallery-item:hover .gallery-img {
  height: 180px;
}

/* تأثير الزوم عند التمرير */
.gallery-emoji {
  font-size: 3.5rem;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.gallery-item:hover .gallery-emoji {
  transform: scale(1.25) rotate(-4deg);
}

/* طبقة شفافة عند التمرير */
.gallery-img::after {
  content: '🔍';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: rgba(0,0,0,0);
  transition: all 0.3s ease;
  opacity: 0;
}

.gallery-item:hover .gallery-img::after {
  background: rgba(0,0,0,0.25);
  opacity: 1;
}

/* التسمية التوضيحية */
.gallery-caption {
  padding: 0.75rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #ccc;
  transition: color 0.3s;
}

.gallery-item:hover .gallery-caption { color: white; }

/* استجابة للشاشات المتوسطة */
@media (max-width: 700px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-item.wide { grid-column: span 2; }
}

@media (max-width: 450px) {
  .gallery-grid { grid-template-columns: 1fr; }
  .gallery-item.wide { grid-column: span 1; }
}`,
      js: `// إضافة تفاعل بسيط عند النقر على الصورة
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const caption = item.querySelector('.gallery-caption').textContent;
    const emoji = item.querySelector('.gallery-emoji').textContent;
    console.log(\`🖼️ Selected: \${emoji} — \${caption}\`);
  });
});

console.log('Image gallery ready! Hover over images to see the zoom effect.');
console.log('Click on any image to see its caption in the console.');`,
    },
  },
]
