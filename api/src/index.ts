import dotenv from 'dotenv'
import express from 'express'
import { sarcasticResponse } from './controllers/sarcastic.controller'
import { setupSwagger } from './swagger'

dotenv.config()

const app = express()

app.use(express.json())

setupSwagger(app)

const router = express.Router()

router.get('/', (req, res) => {
  res.send('DevFest - 2024!')
})

router.post('/sarcasm', sarcasticResponse)

app.use('/', router)

export const sarcasticApp = app
