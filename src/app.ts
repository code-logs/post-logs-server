import { VividConsole } from './utils/vivid-console'
import { Env } from './utils/env'
import express from 'express'

const app = express()
const env = new Env()
const PORT = env.get('PORT')

app.listen(PORT, () => {
  VividConsole.log(`🚀 Application is running on ${PORT}`)
})
