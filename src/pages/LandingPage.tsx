import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/* ---------- Feature data ---------- */

interface Feature {
  icon: string
  title: string
  desc: string
}

const features: Feature[] = [
  {
    icon: '⌨️',
    title: 'Monaco Editor',
    desc: 'محرر أكواد متكامل مع إبراز الصياغة، الإكمال التلقائي، وتقسيم الشاشة لـ HTML/CSS/JS.',
  },
  {
    icon: '👁️',
    title: 'Live Preview',
    desc: 'معاينة فورية للتغييرات دون الحاجة لإعادة التحميل. شاهد النتيجة أثناء الكتابة.',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    desc: 'مساعد ذكي لكتابة الأكواد، طرح الأفكار، واقتراح التحسينات.',
  },
  {
    icon: '🔤',
    title: 'RTL / Arabic',
    desc: 'دعم كامل للغة العربية والاتجاه من اليمين لليسار. واجهة مريحة للمطورين العرب.',
  },
  {
    icon: '📱',
    title: 'PWA Offline',
    desc: 'تطبيق ويب تدريجي يعمل بدون إنترنت. حمّله واعمل في أي وقت.',
  },
  {
    icon: '📦',
    title: 'Templates',
    desc: 'مجموعة قوالب جاهزة للانطلاق السريع. بطاقات، أزرار، نماذج، وأكثر.',
  },
]

/* ---------- Template showcase ---------- */

interface ShowcaseTemplate {
  title: string
  desc: string
  icon: string
}

const showcaseTemplates: ShowcaseTemplate[] = [
  {
    icon: '🌍',
    title: 'Hello World',
    desc: 'صفحة ترحيبية بسيطة تشرح أساسيات HTML و CSS.',
  },
  {
    icon: '🎨',
    title: 'بطاقة متجاوبة',
    desc: 'بطاقة عرض مع صور ونصوص تتكيف مع جميع أحجام الشاشات.',
  },
  {
    icon: '🔢',
    title: 'عداد تفاعلي',
    desc: 'تطبيق عداد بسيط مع أزرار تحكم وجافاسكريبت تفاعلية.',
  },
  {
    icon: '⏳',
    title: 'مؤشر تحميل',
    desc: 'مؤشرات تحميل وأنيميشن متحركة بتقنية CSS Keyframes.',
  },
]

/* ---------- Component ---------- */

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
      {/* ─── Nav ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-slate-950/90 backdrop-blur border-b border-slate-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">Code</span>Zest
          </span>
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <button
              onClick={() => navigate('/about')}
              className="hover:text-emerald-300 transition-colors"
            >
              عن المنصة
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="hover:text-emerald-300 transition-colors"
            >
              التوثيق
            </button>
            <button
              onClick={() => navigate('/editor')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              ابدأ البرمجة
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo / badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-emerald-500/20">
            <span className="text-lg">⚡</span>
            <span>CodeZest v2 — محرر الأكواد الأسرع</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            اكتب كودك.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              شاهد المعاينة.
            </span>
            <br />
            شارك العالم.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            محرر أكواد متكامل في المتصفح — مع محرر Monaco، معاينة فورية، ومساعد ذكي.
            ادعم اللغة العربية واتجاه RTL، واعمل حتى بدون إنترنت.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/editor')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
            >
              🚀 ابدأ البرمجة مجاناً
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="border border-slate-600 hover:border-slate-500 text-slate-300 font-medium text-lg px-8 py-4 rounded-xl transition-all"
            >
              📖 كيف يعمل؟
            </button>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            لماذا <span className="text-emerald-400">CodeZest</span>؟
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-xl mx-auto">
            كل ما تحتاجه لتجربة برمجة سريعة وممتعة، مباشرة في المتصفح.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/30 rounded-xl p-6 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Templates Showcase ─── */}
      <section className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            قوالب <span className="text-emerald-400">جاهزة</span>
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-xl mx-auto">
            انطلق بسرعة مع قوالب معدة مسبقاً. اختر، عدّل، وانشر.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseTemplates.map((t) => (
              <div
                key={t.title}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="font-bold mb-2">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/editor')}
              className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4 decoration-emerald-500/30 transition-colors"
            >
              اكتشف كل القوالب ←
            </button>
          </div>
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className="py-16 px-4 border-t border-slate-800 bg-gradient-to-r from-emerald-500/5 to-blue-500/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد؟</h2>
          <p className="text-slate-400 mb-8">
            افتح المحرر الآن وابدأ بكتابة أول كود لك.
          </p>
          <button
            onClick={() => navigate('/editor')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
          >
            ✨ ابدأ الآن
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-4 border-t border-slate-800 text-slate-500 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold text-white">
              <span className="text-emerald-400">Code</span>Zest
            </span>
            <p className="mt-2 leading-relaxed">
              محرر أكواد متكامل للمطورين العرب. يدعم اللغة العربية، المعاينة الفورية، والذكاء الاصطناعي.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">روابط</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/editor')} className="hover:text-emerald-400 transition-colors">المحرر</button></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-emerald-400 transition-colors">عن المنصة</button></li>
              <li><button onClick={() => navigate('/docs')} className="hover:text-emerald-400 transition-colors">التوثيق</button></li>
            </ul>
          </div>

          {/* Built with */}
          <div>
            <h4 className="font-semibold text-white mb-3">التقنيات</h4>
            <ul className="space-y-1">
              <li>React 19 + TypeScript 5</li>
              <li>Monaco Editor</li>
              <li>Tailwind CSS v4</li>
              <li>Vite 6 + PWA</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 text-center">
          <p>© {new Date().getFullYear()} CodeZest — اختبر، ابدع، شارك.</p>
        </div>
      </footer>
    </div>
  )
}
