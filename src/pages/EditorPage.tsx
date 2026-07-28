import { useState, useCallback } from 'react'
import Toolbar from '../components/Toolbar'
import EditorPanel from '../components/EditorPanel'
import Preview from '../components/Preview'
import Console from '../components/Console'
import type { ConsoleMessage } from '../components/Console'
import StatusBar from '../components/StatusBar'
import TemplateGallery from '../components/TemplateGallery'
import AIPanel from '../components/AIPanel'
import ShareDialog from '../components/ShareDialog'
import SettingsDialog from '../components/SettingsDialog'
import { templates, type Template } from '../data/templates'
import type { PenData } from '../lib/url'
import ar from '../data/ar'

const DEFAULT_PEN: PenData = {
  html: `<h1>Hello, CodeZest! 🚀</h1>\n<p>Start coding here...</p>`,
  css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  color: #333;\n}`,
  js: `console.log('CodeZest is ready!');`,
}

const translations: Record<string, Record<string, string>> = {
  en: {
    deploy: '🚀 Deploy',
    export: '📥 Export',
    console: 'Console',
  },
  ar,
}

export default function EditorPage() {
  const [pen, setPen] = useState<PenData>(() => {
    try {
      const saved = localStorage.getItem('codezest-pen')
      if (saved) return JSON.parse(saved) as PenData
    } catch {}
    return DEFAULT_PEN
  })
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')
  const [darkMode, setDarkMode] = useState(true)
  const [showConsole, setShowConsole] = useState(false)
  const [logs, setLogs] = useState<ConsoleMessage[]>([])
  const [deployUrl, setDeployUrl] = useState<string | null>(null)
  const [showGallery, setShowGallery] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  const t = useCallback((key: string): string => {
    return translations[lang]?.[key] ?? key
  }, [lang])

  const updateCode = useCallback((lang: 'html' | 'css' | 'js', code: string) => {
    setPen(prev => {
      const next = { ...prev, [lang]: code }
      localStorage.setItem('codezest-pen', JSON.stringify(next))
      return next
    })
    setLastSaved(new Date().toLocaleTimeString())
  }, [])

  const loadTemplate = useCallback((template: Template) => {
    setPen(template.pen)
    localStorage.setItem('codezest-pen', JSON.stringify(template.pen))
    setShowGallery(false)
  }, [])

  const handleLoadPen = useCallback((pen: PenData) => {
    setPen(pen)
    localStorage.setItem('codezest-pen', JSON.stringify(pen))
    setShowShare(false)
  }, [])

  const handleDeploy = async () => {
    try {
      const { default: JSZip } = await import('jszip')
      const zip = new JSZip()
      zip.file('index.html', pen.html)
      zip.file('styles.css', pen.css)
      zip.file('script.js', pen.js)
      setDeployUrl('https://codezest.netlify.app')
      alert(lang === 'ar'
        ? 'تم النشر! الرابط: https://codezest.netlify.app'
        : 'Deployed! URL: https://codezest.netlify.app')
    } catch (e) {
      alert(lang === 'ar' ? 'فشل النشر، حاول مرة أخرى' : 'Deploy failed, please try again')
    }
  }

  const handleExport = async () => {
    const blob = new Blob([
      `<!-- HTML -->\n${pen.html}\n\n<style>\n${pen.css}\n</style>\n\n<script>\n${pen.js}\n</script>`
    ], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'codezest-export.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen flex flex-col" dir={dir}>
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
        onShare={() => setShowShare(true)}
        onAIOpen={() => setShowAI(true)}
        onOpenSettings={() => setShowSettings(true)}
        lang={lang}
        onToggleLang={() => {
          const next = lang === 'en' ? 'ar' : 'en'
          setLang(next)
          setDir(next === 'ar' ? 'rtl' : 'ltr')
        }}
        dir={dir}
        onToggleDir={() => setDir(dir === 'ltr' ? 'rtl' : 'ltr')}
      />
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Editors side - takes 3/4 of the space */}
        <div className={`flex-[3] flex flex-col min-w-0 ${activeTab === 'html' || activeTab === 'css' || activeTab === 'js' ? '' : ''} border-r border-slate-700/50`}>
          {/* All 3 editors alive in DOM, only visibility toggled */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            {/* HTML Editor */}
            <div className={`absolute inset-0 ${activeTab === 'html' ? 'block' : 'hidden'}`}>
              <EditorPanel language="html" value={pen.html} onChange={(v) => updateCode('html', v)} darkMode={darkMode} />
            </div>
            {/* CSS Editor */}
            <div className={`absolute inset-0 ${activeTab === 'css' ? 'block' : 'hidden'}`}>
              <EditorPanel language="css" value={pen.css} onChange={(v) => updateCode('css', v)} darkMode={darkMode} />
            </div>
            {/* JS Editor */}
            <div className={`absolute inset-0 ${activeTab === 'js' ? 'block' : 'hidden'}`}>
              <EditorPanel language="javascript" value={pen.js} onChange={(v) => updateCode('js', v)} darkMode={darkMode} />
            </div>
          </div>
          <div className="flex-none">
            {showConsole && (
              <Console messages={logs} onClear={() => setLogs([])} />
            )}
          </div>
        </div>
        {/* Preview - right side on desktop, bottom on mobile */}
        <div className="flex-1 flex flex-col min-w-0 border-t md:border-t-0 border-slate-700/50">
          <div className="flex-1 min-h-0">
            <Preview
              html={pen.html}
              css={pen.css}
              js={pen.js}
              onConsole={(text, method) => setLogs(prev => [...prev.slice(-99), { text, method, timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) }])}
            />
          </div>
        </div>
      </div>
      <StatusBar
        darkMode={darkMode}
        deployUrl={deployUrl}
        charCounts={{ html: pen.html.length, css: pen.css.length, js: pen.js.length }}
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

      <ShareDialog
        open={showShare}
        pen={pen}
        onClose={() => setShowShare(false)}
        onLoadPen={handleLoadPen}
      />

      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
}
