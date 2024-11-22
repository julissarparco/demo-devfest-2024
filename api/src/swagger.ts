import { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sarcastic Response API',
    version: '1.0.0',
    description:
      'API para generar respuestas sarcásticas usando Gemini y Google Cloud Functions.',
    contact: {
      name: 'Julissa Rodriguez',
      email: 'hola@codeanding.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
}

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/controllers/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export const setupSwagger = (app: Application): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log('Swagger docs disponibles en: http://localhost:8080/docs')
}
