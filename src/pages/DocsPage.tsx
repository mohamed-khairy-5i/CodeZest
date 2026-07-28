import { useNavigate } from 'react-router-dom'

const shortcuts = [
  { keys: ['Ctrl', 'S'], desc: 'حفظ المشروع (تخزين محلي)' },
  { keys: ['Ctrl', 'Z'], desc: 'تراجع عن التعديل' },
  { keys: ['Ctrl', 'Shift', 'Z'], desc: 'إعادة التعديل' },
  { keys: ['Ctrl', 'D'], desc: 'تحديد الكلمة التالية' },
  { keys: ['Ctrl', '/'], desc: 'تعليق / إلغاء تعليق' },
  { keys: ['Alt', '↑/↓'], desc: 'تحريك السطر لأعلى/أسفل' },
  { keys: ['Ctrl', 'Space'], desc: 'إظهار الإكمال التلقائي' },
  { keys: ['F11'], desc: 'ملء الشاشة' },
]

const faqs = [
  {
    q: 'ما هو CodeZest؟',
    a: 'CodeZest هو محرر أكواد يعمل في المتصفح — يمكنك كتابة HTML و CSS و JavaScript ومشاهدة النتيجة فوراً دون الحاجة لتثبيت أي برامج.',
  },
  {
    q: 'هل يدعم CodeZest اللغة العربية؟',
    a: 'نعم! CodeZest يدعم اللغة العربية والاتجاه من اليمين لليسار (RTL) بشكل كامل، ويمكنك التبديل بين العربية والإنجليزية بنقرة واحدة.',
  },
  {
    q: 'هل يمكنني العمل بدون إنترنت؟',
    a: 'نعم. بعد تحميل CodeZest لأول مرة، يمكنك استخدامه بدون اتصال بالإنترنت بفضل تقنية PWA (تطبيق الويب التدريجي).',
  },
  {
    q: 'كيف أحفظ عملي؟',
    a: 'يتم حفظ الكود تلقائياً في التخزين المحلي للمتصفح (localStorage) عند كل تعديل. يمكنك أيضاً تصدير الكود كملفع HTML واحد.',
  },
  {
    q: 'هل يمكنني مشاركة الكود مع الآخرين؟',
    a: 'نعم! استخدم زر المشاركة لنسخ رابط الصفحة الحالية، أو زر التصدير لإنشاء ملف HTML قابل للمشاركة.',
  },
  {
    q: 'ماذا عن القوالب الجاهزة؟',
    a: 'يوفر CodeZest مجموعة من القوالب الجاهزة التي يمكنك تحميلها وتعديلها فوراً، مثل بطاقات العرض، الأزرار، العدادات، والمزيد.',
  },
  {
    q: 'كيف يعمل المساعد الذكي (AI)؟',
    a: 'يمكن للمساعد الذكي توليد أكواد بناءً على وصفك، اقتراح تحسينات، أو شرح أكواد موجودة. فقط اضغط على زر AI واكتب طلبك.',
  },
  {
    q: 'هل المنصة مفتوحة المصدر؟',
    a: 'نعم، CodeZest مشروع مفتوح المصدر بالكامل على GitHub برخصة MIT.',
  },
]

export default function DocsPage() {
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
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          التوثيق <span className="text-emerald-400">والمساعدة</span>
        </h1>
        <p className="text-slate-400 text-lg mb-16">
          كل ما تحتاج معرفته لبدء استخدام CodeZest.
        </p>

        {/* ─── Quick Start ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-emerald-400">🚀</span> بداية سريعة
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm ml-3">1</span>
              افتح <button onClick={() => navigate('/editor')} className="text-emerald-400 hover:text-emerald-300 underline">المحرر</button>.
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm ml-3">2</span>
              اكتب كود HTML في علامة التبويب الأولى (أو اختر من القوالب الجاهزة).
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm ml-3">3</span>
              أضف CSS و JavaScript في علامات التبويب الخاصة بهما.
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm ml-3">4</span>
              شاهد النتيجة فوراً في لوحة المعاينة.
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm ml-3">5</span>
              استخدم زر التصدير لحفظ عملك أو زر المشاركة لمشاركته مع الآخرين.
            </div>
          </div>
        </section>

        {/* ─── Keyboard Shortcuts ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-emerald-400">⌨️</span> اختصارات لوحة المفاتيح
          </h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-sm">
                  <th className="px-5 py-3 font-medium">الاختصار</th>
                  <th className="px-5 py-3 font-medium">الوصف</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map((s) => (
                  <tr key={s.desc} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3" dir="ltr">
                      <kbd className="inline-flex items-center gap-1">
                        {s.keys.map((k, i) => (
                          <span key={k}>
                            <span className="bg-slate-800 text-slate-200 text-xs font-mono px-2 py-1 rounded border border-slate-700">
                              {k}
                            </span>
                            {i < s.keys.length - 1 && <span className="text-slate-500 mx-1 text-xs">+</span>}
                          </span>
                        ))}
                      </kbd>
                    </td>
                    <td className="px-5 py-3 text-slate-300">{s.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-emerald-400">❓</span> الأسئلة الشائعة
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
              >
                <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-slate-800/50 transition-colors list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-slate-500 group-open:rotate-180 transition-transform text-lg">▼</span>
                </summary>
                <div className="px-5 pb-4 text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── Back ─── */}
        <div className="text-center">
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
        © {new Date().getFullYear()} CodeZest
      </footer>
    </div>
  )
}
