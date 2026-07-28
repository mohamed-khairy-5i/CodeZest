import { useState, useCallback } from 'react'
import { encodePen, decodePen } from '../lib/url'
import { importFromGist, exportToGist } from '../lib/gist'
import type { PenData } from '../lib/url'

interface ShareDialogProps {
  open: boolean
  pen: PenData
  onClose: () => void
  onLoadPen: (pen: PenData) => void
}

type Tab = 'share' | 'import' | 'export'

export default function ShareDialog({ open, pen, onClose, onLoadPen }: ShareDialogProps) {
  const [tab, setTab] = useState<Tab>('share')
  const [copied, setCopied] = useState(false)
  const [gistUrl, setGistUrl] = useState('')
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState('')
  const [token, setToken] = useState('')
  const [exporting, setExporting] = useState(false)
  const [exportResult, setExportResult] = useState('')
  const [exportError, setExportError] = useState('')

  const handleCopyLink = useCallback(async () => {
    try {
      const url = encodePen(pen)
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for non-https environments
      const url = encodePen(pen)
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [pen])

  const handleImport = useCallback(async () => {
    if (!gistUrl.trim()) return
    setImporting(true)
    setImportError('')
    try {
      const data = await importFromGist(gistUrl)
      onLoadPen(data)
      onClose()
    } catch (e: any) {
      setImportError(e.message || 'Failed to import Gist')
    } finally {
      setImporting(false)
    }
  }, [gistUrl, onLoadPen, onClose])

  const handleExport = useCallback(async () => {
    if (!token.trim()) return
    setExporting(true)
    setExportError('')
    setExportResult('')
    try {
      const url = await exportToGist(pen, token)
      setExportResult(url)
      setToken('')
    } catch (e: any) {
      setExportError(e.message || 'Failed to export Gist')
    } finally {
      setExporting(false)
    }
  }, [pen, token])

  const resetState = useCallback(() => {
    setCopied(false)
    setGistUrl('')
    setImportError('')
    setToken('')
    setExportResult('')
    setExportError('')
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-white">Share &amp; Sync</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-600">
          {(
            [
              { id: 'share' as const, label: '🔗 Share' },
              { id: 'import' as const, label: '📥 Import' },
              { id: 'export' as const, label: '📤 Export' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); resetState() }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'text-purple-400 border-b-2 border-purple-400 bg-slate-700/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5">
          {tab === 'share' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                Share your current pen with a link. The code is embedded directly in the URL (no server needed).
              </p>
              <button
                onClick={handleCopyLink}
                className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-500'
                }`}
              >
                {copied ? '✅ Copied to clipboard!' : '📋 Copy Shareable Link'}
              </button>
              {copied && (
                <p className="text-xs text-green-400 text-center">
                  Paste this URL anywhere to share your code
                </p>
              )}
            </div>
          )}

          {tab === 'import' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                Paste a GitHub Gist URL or Gist ID to load its contents.
              </p>
              <input
                type="text"
                placeholder="https://gist.github.com/user/abc123"
                value={gistUrl}
                onChange={(e) => setGistUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleImport()}
              />
              {importError && (
                <p className="text-xs text-red-400">{importError}</p>
              )}
              <button
                onClick={handleImport}
                disabled={!gistUrl.trim() || importing}
                className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {importing ? '⏳ Importing...' : '📥 Import from Gist'}
              </button>
            </div>
          )}

          {tab === 'export' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                Create a public Gist from your current pen. You need a
                {' '}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  GitHub personal access token
                </a>
                {' '}with the <code className="text-xs bg-slate-700 px-1 rounded">gist</code> scope.
              </p>
              <input
                type="password"
                placeholder="GitHub personal access token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleExport()}
              />
              {exportError && (
                <p className="text-xs text-red-400">{exportError}</p>
              )}
              {exportResult && (
                <div className="text-xs text-green-400 break-all">
                  <p>✅ Exported successfully!</p>
                  <a
                    href={exportResult}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    {exportResult}
                  </a>
                </div>
              )}
              <button
                onClick={handleExport}
                disabled={!token.trim() || exporting}
                className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {exporting ? '⏳ Exporting...' : '📤 Export to Gist'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
