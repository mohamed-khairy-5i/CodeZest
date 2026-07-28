import { useEffect, useRef } from 'react'

export interface ConsoleMessage {
  text: string
  method: 'log' | 'warn' | 'error'
  timestamp: string
}

interface ConsoleProps {
  messages: ConsoleMessage[]
  onClear: () => void
}

export default function Console({ messages, onClear }: ConsoleProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const colorClass = (method: ConsoleMessage['method']) => {
    switch (method) {
      case 'error':
        return 'text-red-400'
      case 'warn':
        return 'text-yellow-400'
      default:
        return 'text-emerald-400'
    }
  }

  const icon = (method: ConsoleMessage['method']) => {
    switch (method) {
      case 'error':
        return '✕'
      case 'warn':
        return '⚠'
      default:
        return '❯'
    }
  }

  return (
    <div className="h-40 bg-slate-900/80 border-t border-slate-700/50 flex flex-col" dir="ltr">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-700/30 shrink-0">
        <span className="text-xs font-medium text-slate-400">Console</span>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-0.5 rounded hover:bg-slate-800/60"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm leading-relaxed">
        {messages.length === 0 ? (
          <span className="text-slate-500 italic">Console ready...</span>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-2 py-[1px]">
              <span className="text-slate-600 text-[10px] leading-5 shrink-0 w-16 text-right tabular-nums">
                {msg.timestamp}
              </span>
              <span className={`${colorClass(msg.method)}`}>
                <span className="font-bold">{icon(msg.method)}</span>
                {' '}{msg.text}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
