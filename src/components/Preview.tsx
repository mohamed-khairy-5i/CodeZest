import { useEffect, useRef, useState } from 'react'

interface PreviewProps {
  html: string
  css: string
  js: string
  onConsole: (text: string, method: 'log' | 'warn' | 'error') => void
}

type DeviceType = 'desktop' | 'tablet' | 'mobile'

const DEVICE_CONFIG: Record<DeviceType, { width: number | '100%'; height: number | '100%'; label: string }> = {
  desktop: { width: '100%', height: '100%', label: 'Desktop' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  mobile: { width: 375, height: 812, label: 'Mobile' },
}

export default function Preview({ html, css, js, onConsole }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [refreshKey, setRefreshKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Stable callback ref to avoid re-attaching listener on every render
  const onConsoleRef = useRef(onConsole)
  onConsoleRef.current = onConsole

  const currentDevice = DEVICE_CONFIG[device]

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    const combinedHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    const _origLog = console.log;
    const _origWarn = console.warn;
    const _origError = console.error;

    console.log = (...args) => {
      _origLog.apply(console, args);
      parent.postMessage({ type: 'console', method: 'log', args: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)) }, '*');
    };
    console.warn = (...args) => {
      _origWarn.apply(console, args);
      parent.postMessage({ type: 'console', method: 'warn', args: args.map(a => String(a)) }, '*');
    };
    console.error = (...args) => {
      _origError.apply(console, args);
      parent.postMessage({ type: 'console', method: 'error', args: args.map(a => String(a)) }, '*');
    };
  </script>
  <script>${js}</script>
</body>
</html>`

    doc.open()
    doc.write(combinedHtml)
    doc.close()
  }, [html, css, js, refreshKey])

  // Listen for console messages from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'console') {
        onConsoleRef.current(e.data.args.join(' '), e.data.method)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  // Track fullscreen state
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const isConstrained = device !== 'desktop'

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-slate-900/20">
      {/* Top bar: device buttons + actions */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-slate-700/30 shrink-0 bg-slate-900/40">
        {/* Device frame buttons */}
        <div className="flex items-center gap-0.5">
          {(Object.keys(DEVICE_CONFIG) as DeviceType[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                device === d
                  ? 'bg-slate-700/70 text-slate-200'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
              }`}
              title={DEVICE_CONFIG[d].label}
            >
              {d === 'desktop' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              )}
              {d === 'tablet' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              )}
              {d === 'mobile' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              )}
              <span className="hidden sm:inline">{DEVICE_CONFIG[d].label}</span>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
            title="Refresh preview"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Device frame / preview area */}
      <div className="flex-1 flex items-start justify-center overflow-auto bg-[#0a0e1a] p-2">
        <div
          className={`bg-white shadow-lg overflow-hidden transition-all duration-300 ${
            isConstrained ? 'rounded-sm' : 'rounded-none w-full h-full'
          }`}
          style={
            isConstrained
              ? {
                  width: `${currentDevice.width}px`,
                  height: `${currentDevice.height}px`,
                  maxWidth: '100%',
                  maxHeight: '100%',
                }
              : undefined
          }
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            title="Preview"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
}
