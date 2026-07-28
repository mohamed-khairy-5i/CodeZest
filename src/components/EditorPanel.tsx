import { useEffect, useRef } from 'react'
import 'monaco-editor'

interface EditorPanelProps {
  language: string
  label?: string
  value: string
  onChange: (value: string) => void
  color?: string
}

export default function EditorPanel({ language, value, onChange, darkMode }: EditorPanelProps & { darkMode?: boolean }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    async function init() {
      const monaco = await import('monaco-editor')
      if (!mounted || !editorRef.current) return

      editorInstance.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: darkMode ? 'vs-dark' : 'vs-light',
        fontSize: 14,
        fontFamily: "var(--font-mono), 'JetBrains Mono', 'Fira Code', monospace",
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        tabSize: 2,
        renderWhitespace: 'selection',
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        padding: { top: 12 },
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        formatOnPaste: true,
        suggestOnTriggerCharacters: true,
      })

      editorInstance.current.onDidChangeModelContent(() => {
        const val = editorInstance.current?.getValue() ?? ''
        onChange(val)
      })
    }

    init()

    return () => {
      mounted = false
      editorInstance.current?.dispose()
    }
  }, [language])

  useEffect(() => {
    const editor = editorInstance.current
    if (editor && editor.getValue() !== value) {
      editor.setValue(value)
    }
  }, [value])

  // Update Monaco theme when darkMode changes
  useEffect(() => {
    async function updateTheme() {
      const monaco = await import('monaco-editor')
      monaco.editor.setTheme(darkMode ? 'vs-dark' : 'vs-light')
    }
    updateTheme()
  }, [darkMode])

  return (
    <div className="h-full flex flex-col bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
      <div ref={editorRef} className="flex-1" />
    </div>
  )
}
