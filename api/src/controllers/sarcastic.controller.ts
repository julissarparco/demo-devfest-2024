import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { Request, Response } from 'express'
import { GeminiService } from '../services/gemini.service'

const PROJECT_ID = process.env.GCP_PROJECT_ID

const client = new SecretManagerServiceClient()

async function getSecret(secretName: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: `projects/${PROJECT_ID}/secrets/${secretName}/versions/latest`,
  })
  const payload = version.payload?.data?.toString()
  if (!payload) throw new Error('Could not get secret.')
  return payload
}

/**
 * @swagger
 * /sarcasm:
 *   post:
 *     summary: Generar una respuesta sarcástica
 *     description: Genera una respuesta sarcástica basada en la entrada proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: El texto al que se responderá con sarcasmo
 *                 example: "¿Por qué siempre me pasa esto?"
 *     responses:
 *       200:
 *         description: Respuesta generada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 response:
 *                   type: string
 *                   example: "¡Oh, claro, porque eso tiene perfecto sentido!"
 *       500:
 *         description: Error al generar la respuesta
 */
export const sarcasticResponse = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userInput = req.body.input || '¡Oh, qué interesante!'

  try {
    const apiKey = await getSecret('gemini-api-key')
    const geminiService = new GeminiService(apiKey)
    const response = await geminiService.generateSarcasticResponse(
      userInput as string,
    )
    res.status(200).json({ success: true, response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}
