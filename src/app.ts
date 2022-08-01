import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { apiRouters } from './apis'
import { dataSource } from './utils/data-source'
import { DirUtil } from './utils/dir-util'
import vividConsole from './utils/vivid-console'

const app = express()
const PORT = process.env.PORT || 8080

config()

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:8000', credentials: true }))
}

app.use(express.json())
app.use(apiRouters)
app.use(express.static(DirUtil.THUMBNAIL_PATH))
app.use(express.static('./static'))

dataSource.initialize().then(() => {
  vividConsole.log(`💽 Database connection is established.`, true)

  app.listen(PORT, () => {
    vividConsole.log(`🚀 Application is running on ${PORT}`)
  })
})
