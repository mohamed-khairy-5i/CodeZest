import type { PenData } from './url'

const GIST_API = 'https://api.github.com/gists'

/**
 * Parse a GitHub Gist URL to extract the gist ID.
 * Supports:
 *   https://gist.github.com/user/abc123
 *   https://gist.github.com/abc123
 *   abc123 (bare ID)
 */
export function parseGistId(input: string): string | null {
  const trimmed = input.trim()

  // Bare gist ID (alphanumeric, 32 chars typical)
  if (/^[a-f0-9]{32}$/i.test(trimmed)) return trimmed

  try {
    const url = new URL(trimmed)
    const parts = url.pathname.replace(/\/$/, '').split('/')
    // Last part is the gist ID
    const last = parts[parts.length - 1] ?? ''
    if (/^[a-f0-9]{32}$/i.test(last)) return last
    // Also accept shorter IDs
    if (/^[a-f0-9]{8,}$/i.test(last)) return last
  } catch {
    // not a URL
  }

  return null
}

/**
 * Fetch a public Gist and extract its content into a PenData.
 * Expects files named exactly: index.html, styles.css, script.js
 * (or the first 3 files found).
 */
export async function importFromGist(input: string): Promise<PenData> {
  const id = parseGistId(input)
  if (!id) throw new Error('Invalid Gist URL or ID')

  const res = await fetch(`${GIST_API}/${id}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('Gist not found')
    throw new Error(`GitHub API error: ${res.status}`)
  }

  const gist: { files: Record<string, { content?: string; filename?: string }> } = await res.json()
  const files = gist.files
  if (!files || Object.keys(files).length === 0) {
    throw new Error('Gist has no files')
  }

  // Try named files first
  const htmlFile = files['index.html']
  const cssFile = files['styles.css']
  const jsFile = files['script.js']

  if (htmlFile && cssFile && jsFile) {
    return {
      html: htmlFile.content ?? '',
      css: cssFile.content ?? '',
      js: jsFile.content ?? '',
    }
  }

  // Fallback: grab first 3 files in order
  const entries = Object.values(files)
  const [f1, f2, f3] = entries
  const extMap = new Map<string, keyof PenData>([
    ['.html', 'html'],
    ['.htm', 'html'],
    ['.css', 'css'],
    ['.js', 'js'],
    ['.javascript', 'js'],
  ])

  // Determine by extension
  const result: PenData = { html: '', css: '', js: '' }
  for (const file of entries) {
    const name = file.filename ?? ''
    const ext = name.substring(name.lastIndexOf('.')) || name
    const key = extMap.get(ext.toLowerCase())
    if (key && !result[key]) {
      result[key] = file.content ?? ''
    }
    if (result.html && result.css && result.js) break
  }

  return result
}

/**
 * Export pen data as a new public Gist.
 * Requires a valid GitHub personal access token with "gist" scope.
 */
export async function exportToGist(pen: PenData, token: string): Promise<string> {
  if (!token.trim()) throw new Error('GitHub token is required')

  const body = JSON.stringify({
    description: 'Created with CodeZest v2',
    public: true,
    files: {
      'index.html': { content: pen.html },
      'styles.css': { content: pen.css },
      'script.js': { content: pen.js },
    },
  })

  const res = await fetch(GIST_API, {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error: ${res.status}`)
  }

  const data: { html_url: string } = await res.json()
  return data.html_url
}
