// Gemini 2.0 Flash API helper
// Free tier: 1000 requests/day
// API key is read from localStorage — set it in Settings dialog

function getApiKey(): string {
  return localStorage.getItem('gemini-api-key') || 'AIzaSyDemoKey'
}

function getApiUrl(): string {
  return 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + getApiKey()
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[]
    }
  }[]
  error?: { message: string }
}

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(getApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        topP: 0.95,
      },
    }),
  })

  const data: GeminiResponse = await res.json()

  if (data.error) {
    throw new Error(`Gemini API error: ${data.error.message}`)
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response from AI'
}

/** Get code suggestions / completions for a given code snippet and language */
export async function getCodeSuggestions(code: string, language: string): Promise<string> {
  return callGemini(
    `You are an expert ${language} code assistant. Given this code, suggest improvements, fix bugs, and provide better alternatives. Keep suggestions concise and practical.\n\n\`\`\`${language}\n${code}\n\`\`\``
  )
}

/** Explain a code snippet */
export async function explainCode(code: string, language: string): Promise<string> {
  return callGemini(
    `Explain this ${language} code in simple terms. Break it down line by line, describing what each part does.\n\n\`\`\`${language}\n${code}\n\`\`\``
  )
}

/** Get completion for code — given a description, generate the code */
export async function getCodeCompletion(
  description: string,
  language: string,
  existingCode: string = ''
): Promise<string> {
  return callGemini(
    `Generate ${language} code for the following request. Return ONLY the code block, no explanations.\n\nRequest: ${description}\n\n${existingCode ? `Existing code for context:\n\`\`\`${language}\n${existingCode}\n\`\`\`` : ''}`
  )
}
