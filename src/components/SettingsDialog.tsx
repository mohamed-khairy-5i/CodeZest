import { useState, useEffect, useCallback } from 'react'

interface SettingsDialogProps {
  open: boolean
  onClose: () => void
}

const STORAGE_KEY = 'gemini-api-key'

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (open) {
      setApiKey(localStorage.getItem(STORAGE_KEY) || '')
      setSaved(false)
    }
  }, [open])

  const handleSave = useCallback(() => {
    if (apiKey.trim()) {
      localStorage.setItem(STORAGE_KEY, apiKey.trim())
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setSaved(true)
    setTimeout(() => onClose(), 1200)
  }, [apiKey, onClose])

  const handleClear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setApiKey('')
    setSaved(true)
    setTimeout(() => onClose(), 1200)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-white">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-300">
            Enter your <strong className="text-purple-400">Gemini API key</strong> to enable the AI Assistant.
            Get a free key at{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Google AI Studio
            </a>.
          </p>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your API key here..."
              className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>

          {saved && (
            <div className="bg-green-900/40 border border-green-700 rounded-lg p-3 text-sm text-green-300 text-center">
              ✅ API key saved!
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-500 transition"
            >
              💾 Save Key
            </button>
            <button
              onClick={handleClear}
              className="py-2.5 px-4 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
            >
              Clear
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            Your key is stored locally in your browser and never sent anywhere except Google's API.
          </p>
        </div>
      </div>
    </div>
  )
}
