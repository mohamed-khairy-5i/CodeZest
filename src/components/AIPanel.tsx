import { useState } from 'react'
import { getCodeSuggestions, explainCode, getCodeCompletion } from '../lib/ai'

type AITab = 'suggest' | 'explain' | 'complete'

interface AIPanelProps {
  isOpen: boolean
  onClose: () => void
  /** Current code from the active editor */
  currentCode: string
  /** Current language ('html', 'css', 'javascript') */
  currentLanguage: string
}

export default function AIPanel({ isOpen, onClose, currentCode, currentLanguage }: AIPanelProps) {
  const [tab, setTab] = useState<AITab>('suggest')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAction = async () => {
    setLoading(true)
    setError('')
    setResult('')
    try {
      let text: string
      switch (tab) {
        case 'suggest':
          text = await getCodeSuggestions(currentCode, currentLanguage)
          break
        case 'explain':
          text = await explainCode(currentCode, currentLanguage)
          break
        case 'complete':
          text = await getCodeCompletion(prompt || 'finish this code', currentLanguage, currentCode)
          break
      }
      setResult(text)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const tabs: { id: AITab; label: string }[] = [
    { id: 'suggest', label: 'Suggest' },
    { id: 'explain', label: 'Explain' },
    { id: 'complete', label: 'Complete' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sidebar */}
      <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <h2 className="text-white font-bold text-lg">🤖 AI Assistant</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none p-1"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 py-3 border-b border-slate-700 bg-slate-800/50">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setResult(''); setError('') }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                tab === t.id
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {tab === 'complete' && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                What do you want to generate?
              </label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="e.g. Add a form with validation..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-purple-500"
                rows={3}
              />
            </div>
          )}

          {tab !== 'complete' && (
            <p className="text-sm text-slate-400">
              {tab === 'suggest'
                ? 'Get AI suggestions to improve your current code.'
                : 'Get a line-by-line explanation of your current code.'}
            </p>
          )}

          <div className="text-xs text-slate-500 bg-slate-800 rounded-lg p-3 font-mono break-all line-clamp-3">
            <span className="text-purple-400">Current: </span>
            {currentLanguage.toUpperCase()}
            <span className="text-slate-600 mx-2">|</span>
            <span className="text-green-400">{currentCode.length} chars</span>
          </div>

          <button
            onClick={handleAction}
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${
              loading
                ? 'bg-purple-800 text-purple-300 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-500'
            }`}
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                {tab === 'suggest' && '💡 Get Suggestions'}
                {tab === 'explain' && '📖 Explain Code'}
                {tab === 'complete' && '✨ Generate Code'}
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-lg p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-slate-800/70 border border-slate-600 rounded-lg p-4">
              <div className="text-xs text-slate-500 mb-2">AI Response</div>
              <div className="text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-700 text-xs text-slate-500 text-center">
          Powered by Gemini 2.0 Flash (Free Tier)
        </div>
      </div>
    </div>
  )
}
