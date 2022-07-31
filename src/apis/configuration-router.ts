import { Router } from 'express'
import { ConfigController } from './../controllers/config-controller'
import { asyncHandler } from './../utils/async-handler'

export const configRouter = Router()

configRouter.get(
  '/configurations/last-sync-datetime',
  asyncHandler(async (req, res) => {
    const lastSyncDatetime = await ConfigController.getLastSyncDatetime()
    res.json(lastSyncDatetime?.value ? Number(lastSyncDatetime.value) : null)
  })
)

configRouter.post(
  '/configurations/sync-repository',
  asyncHandler(async (_req, res) => {
    res.json(await ConfigController.syncRepository())
  })
)

configRouter.post(
  '/configurations/save-template',
  asyncHandler(async (req, res) => {
    const { content } = req.body
    if (!content) res.status(403).send('No content provided')

    const { value } = await ConfigController.saveTemplate(content)
    res.json(value)
  })
)

configRouter.get(
  '/configurations/template',
  asyncHandler(async (req, res) => {
    const templateConfig = await ConfigController.getTemplate()
    if (!templateConfig) return res.json(null)

    res.json(templateConfig.value)
  })
)
