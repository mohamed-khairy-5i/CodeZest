interface StatusBarProps {
  darkMode: boolean
  deployUrl: string | null
  charCounts: { html: number; css: number; js: number }
  lastSaved: string | null
}

export default function StatusBar({ darkMode, deployUrl, charCounts, lastSaved }: StatusBarProps) {
  const totalChars = charCounts.html + charCounts.css + charCounts.js

  return (
    <footer className="glass px-4 py-1.5 flex items-center justify-between text-xs text-slate-400 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-500 tracking-wide">CodeZest v2.0</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
          <span className="text-slate-500">Live</span>
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        {/* Char counts per panel */}
        <span className="text-orange-400/60 font-mono tabular-nums" title="HTML chars">{charCounts.html}</span>
        <span className="text-slate-600/60">|</span>
        <span className="text-blue-400/60 font-mono tabular-nums" title="CSS chars">{charCounts.css}</span>
        <span className="text-slate-600/60">|</span>
        <span className="text-yellow-400/60 font-mono tabular-nums" title="JS chars">{charCounts.js}</span>
        <span className="text-slate-600/40">·</span>
        <span className="text-slate-500 font-mono tabular-nums" title="Total characters">{totalChars}</span>

        {/* Last saved time */}
        {lastSaved && (
          <>
            <span className="text-slate-600/40">·</span>
            <span className="text-slate-500 flex items-center gap-1" title="Last saved">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              {lastSaved}
            </span>
          </>
        )}

        {/* Deploy URL badge */}
        {deployUrl && (
          <>
            <span className="text-slate-600/40">·</span>
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400/80 hover:text-violet-300 transition-colors flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {deployUrl.replace('https://', '')}
            </a>
          </>
        )}
      </div>
    </footer>
  )
}
