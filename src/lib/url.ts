export interface PenData {
  html: string
  css: string
  js: string
}

const KEY = 'p'

/**
 * Encode pen state into a shareable URL with the data in the hash fragment.
 * Uses JSON + encodeURIComponent (no external deps).
 */
export function encodePen(pen: PenData): string {
  const json = JSON.stringify(pen)
  const encoded = encodeURIComponent(json)
  const url = new URL(window.location.href)
  url.hash = `${KEY}=${encoded}`
  return url.toString()
}

/**
 * Decode pen state from a URL's hash fragment.
 * Returns the PenData if valid, or null if no hash / parse fails.
 */
export function decodePen(url: string): PenData | null {
  try {
    const hash = new URL(url).hash
    if (!hash.startsWith(`#${KEY}=`)) return null
    const encoded = hash.slice(`#${KEY}=`.length)
    const json = decodeURIComponent(encoded)
    const data = JSON.parse(json)
    if (
      typeof data === 'object' &&
      data !== null &&
      typeof data.html === 'string' &&
      typeof data.css === 'string' &&
      typeof data.js === 'string'
    ) {
      return { html: data.html, css: data.css, js: data.js }
    }
    return null
  } catch {
    return null
  }
}
