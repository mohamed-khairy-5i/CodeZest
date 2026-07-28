import { useNavigate } from 'react-router-dom'

const techStack = [
  ['⚛️ React 19', 'مكتبة واجهات المستخدم'],
  ['📘 TypeScript 5', 'لغة برمجة آمنة وقابلة للتوسع'],
  ['⌨️ Monaco Editor', 'محرر الأكواد من VS Code'],
  ['🎨 Tailwind CSS v4', 'إطار عمل CSS سريع ومنخفض المستوى'],
  ['⚡ Vite 6', 'أداة بناء فائقة السرعة'],
  ['📱 PWA', 'تطبيق ويب تدريجي يعمل دون إنترنت'],
  ['🐘 JSZip', 'مكتبة ضغط الملفات في المتصفح'],
  ['🤖 AI Assistant', 'مساعد ذكي لتوليد الأكواد'],
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
      {/* ─── Nav ─── */}
      <nav className="bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">Code</span>Zest
          </button>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <button onClick={() => navigate('/editor')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg transition-colors">
              افتح المحرر
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* ─── About ─── */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            عن <span className="text-emerald-400">CodeZest</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            CodeZest هو محرر أكواد متكامل يعمل في المتصفح، صمم خصيصاً للمطورين العرب.
            يهدف المشروع إلى توفير تجربة برمجة سريعة، سهلة، وممتعة — مع دعم كامل للغة العربية
            والاتجاه من اليمين لليسار.
          </p>
          <p className="text-slate-400 leading-relaxed">
            يمكنك كتابة أكواد HTML و CSS و JavaScript ومشاهدة النتيجة مباشرة في المعاينة الفورية.
            استخدم القوالب الجاهزة للانطلاق السريع، أو استعن بالمساعد الذكي لتوليد الأفكار
            والأكواد. كل هذا دون الحاجة لتثبيت أي شيء — فقط المتصفح.
          </p>
        </section>

        {/* ─── Tech Stack ─── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">التقنيات المستخدمة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map(([tech, desc]) => (
              <div
                key={tech as string}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-lg font-bold mb-1">{tech as string}</div>
                <div className="text-slate-400 text-sm">{desc as string}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Credits ─── */}
        <section>
          <h2 className="text-2xl font-bold mb-6">المطور</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">👨‍💻</div>
            <h3 className="text-2xl font-bold mb-2">Mohamed Khairy</h3>
            <p className="text-slate-400 mb-2">مطور ومصمم واجهات — شغوف ببناء أدوات للمطورين العرب.</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <a
                href="https://github.com/mohamedkhairy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mohamedkhairy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ─── Back ─── */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            ← العودة للصفحة الرئيسية
          </button>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} CodeZest — صنع بـ ❤️ للمطورين العرب
      </footer>
    </div>
  )
}
