import axios from 'axios'

export class GeminiService {
  private apiKey: string
  private geminiApiUrl: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`
  }

  async generateSarcasticResponse(input: string): Promise<string> {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Genera una respuesta sarcástica al comentario o pregunta: "${input}"`,
            },
          ],
        },
      ],
    }

    try {
      const response = await axios.post(this.geminiApiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Ups, no hay respuesta sarcástica.'
      )
    } catch (error) {
      console.error('Error al generar la respuesta sarcástica:', error)
      throw new Error('Error al generar la respuesta sarcástica.')
    }
  }
}
