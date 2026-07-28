import { useState, useCallback, useRef, useEffect } from 'react'
import Toolbar from './components/Toolbar'
import EditorPanel from './components/EditorPanel'
import Preview from './components/Preview'
import Console from './components/Console'
import type { ConsoleMessage } from './components/Console'
import StatusBar from './components/StatusBar'
import TemplateGallery from './components/TemplateGallery'
import AIPanel from './components/AIPanel'
import { templates, type Template } from './data/templates'
import ar from './data/ar'

export interface PenData {
  html: string
  css: string
  js: string
}

const DEFAULT_PEN: PenData = {
  html: `<h1>Hello, CodeZest! 🚀</h1>\n<p>Start coding here...</p>`,
  css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  color: #333;\n}`,
  js: `console.log('CodeZest is ready!');`,
}

const translations: Record<string, Record<string, string>> = {
  en: {
    deploy: 'Deploy',
    export: 'Export',
    console: 'Console',
  },
  ar,
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export default function App() {
  const [pen, setPen] = useState<PenData>(() => {
    try {
      const saved = localStorage.getItem('codezest-pen')
      if (saved) return JSON.parse(saved) as PenData
    } catch {
      /* ignore */
    }
    return DEFAULT_PEN
  })
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')
  const [darkMode, setDarkMode] = useState(true)
  const [showConsole, setShowConsole] = useState(false)
  const [logs, setLogs] = useState<ConsoleMessage[]>([])
  const [deployUrl, setDeployUrl] = useState<string | null>(null)
  const [showGallery, setShowGallery] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')
  const [splitRatio, setSplitRatio] = useState(0.5)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const charCounts = {
    html: pen.html.length,
    css: pen.css.length,
    js: pen.js.length,
  }

  const t = useCallback((key: string): string => {
    return translations[lang]?.[key] ?? key
  }, [lang])

  const updateCode = useCallback((codeLang: 'html' | 'css' | 'js', code: string) => {
    setPen(prev => {
      const next = { ...prev, [codeLang]: code }
      localStorage.setItem('codezest-pen', JSON.stringify(next))
      return next
    })
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      setLastSaved(formatTime(new Date()))
    }, 500)
  }, [])

  const loadTemplate = useCallback((template: Template) => {
    setPen(template.pen)
    localStorage.setItem('codezest-pen', JSON.stringify(template.pen))
    setShowGallery(false)
  }, [])

  const handleDeploy = async () => {
    try {
      const { default: JSZip } = await import('jszip')
      const zip = new JSZip()
      zip.file('index.html', pen.html)
      zip.file('styles.css', pen.css)
      zip.file('script.js', pen.js)
      setDeployUrl('https://codezest.netlify.app')
      alert(
        lang === 'ar'
          ? 'تم النشر! الرابط: https://codezest.netlify.app'
          : 'Deployed! URL: https://codezest.netlify.app',
      )
    } catch {
      alert(lang === 'ar' ? 'فشل النشر، حاول مرة أخرى' : 'Deploy failed, please try again')
    }
  }

  const handleExport = () => {
    const blob = new Blob(
      [
        `<!-- HTML -->\n${pen.html}\n\n<style>\n${pen.css}\n</style>\n\n<script>\n${pen.js}\n</script>`,
      ],
      { type: 'text/html' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'codezest-export.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  /* Resizable split-pane */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const container = containerRef.current
      if (!container) return

      const startX = e.clientX
      const startRatio = splitRatio
      const containerWidth = container.getBoundingClientRect().width

      const handleMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX
        const newRatio = Math.min(0.8, Math.max(0.2, startRatio + dx / containerWidth))
        setSplitRatio(newRatio)
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    },
    [splitRatio],
  )

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col bg-slate-950" dir={dir}>
      <Toolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        showConsole={showConsole}
        onConsoleToggle={() => setShowConsole(!showConsole)}
        onDeploy={handleDeploy}
        onExport={handleExport}
        onOpenGallery={() => setShowGallery(true)}
        onShare={() => navigator.clipboard.writeText(window.location.href)}
        onAIOpen={() => setShowAI(true)}
        lang={lang}
        onToggleLang={() => {
          const next = lang === 'en' ? 'ar' : 'en'
          setLang(next)
          setDir(next === 'ar' ? 'rtl' : 'ltr')
        }}
        dir={dir}
        onToggleDir={() => setDir(dir === 'ltr' ? 'rtl' : 'ltr')}
      />

      {/* Editor / Preview split */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        {/* Editor pane */}
        <div className="flex flex-col min-w-0" style={{ width: `${splitRatio * 100}%` }}>
          <div className="flex-1 flex">
            <div className={`flex-1 min-w-0 ${activeTab !== 'html' ? 'hidden md:block' : ''}`}>
              {activeTab === 'html' && (
                <EditorPanel
                  language="html"
                  label="HTML"
                  value={pen.html}
                  onChange={(v) => updateCode('html', v)}
                  color="text-orange-400"
                />
              )}
            </div>
            <div className={`flex-1 min-w-0 ${activeTab !== 'css' ? 'hidden md:block' : ''}`}>
              {activeTab === 'css' && (
                <EditorPanel
                  language="css"
                  label="CSS"
                  value={pen.css}
                  onChange={(v) => updateCode('css', v)}
                  color="text-blue-400"
                />
              )}
            </div>
            <div className={`flex-1 min-w-0 ${activeTab !== 'js' ? 'hidden md:block' : ''}`}>
              {activeTab === 'js' && (
                <EditorPanel
                  language="javascript"
                  label="JS"
                  value={pen.js}
                  onChange={(v) => updateCode('js', v)}
                  color="text-yellow-400"
                />
              )}
            </div>
          </div>

          {showConsole && (
            <Console messages={logs} onClear={() => setLogs([])} />
          )}
        </div>

        {/* Resizable divider */}
        <div className="resize-handle" onMouseDown={handleMouseDown} />

        {/* Preview pane */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900/20">
          <div className="flex-1">
            <Preview
              html={pen.html}
              css={pen.css}
              js={pen.js}
              onConsole={(text, method) => setLogs((prev) => [...prev.slice(-99), { text, method, timestamp: formatTime(new Date()) }])}
            />
          </div>
        </div>
      </div>

      <StatusBar
        darkMode={darkMode}
        deployUrl={deployUrl}
        charCounts={charCounts}
        lastSaved={lastSaved}
      />

      {showGallery && (
        <TemplateGallery
          templates={templates}
          onLoad={loadTemplate}
          onClose={() => setShowGallery(false)}
          lang={lang}
        />
      )}
    </div>
  )
}
