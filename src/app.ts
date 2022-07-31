import cors from 'cors'
import express from 'express'
import { apiRouters } from './apis'
import { dataSource } from './utils/data-source'
import { DirUtil } from './utils/dir-util'
import { env } from './utils/env'
import vividConsole from './utils/vivid-console'

const app = express()
const PORT = env.get('PORT')

app.use(cors({ origin: 'http://localhost:8000', credentials: true }))
app.use(express.json())
app.use(apiRouters)
app.use(express.static(DirUtil.THUMBNAIL_PATH))

dataSource.initialize().then(() => {
  vividConsole.log(`💽 Database connection is established.`, true)

  app.listen(PORT, () => {
    vividConsole.log(`🚀 Application is running on ${PORT}`)
  })
})
