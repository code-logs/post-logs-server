import { Router } from 'express'
import { PostController } from '../controllers/post-controller'
import github from '../utils/github'
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
  asyncHandler(async (req, res) => {
    try {
      github.cloneRepository()
      await ConfigController.compilePostConfig()
      await PostController.synchronize()
      await ConfigController.setLastSyncDatetime()
      res.json(true)
    } catch (e) {
      github.destroyRepository()
      res.json(false)
    }
  })
)
