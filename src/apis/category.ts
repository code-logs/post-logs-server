import { Router } from 'express'
import { asyncHandler } from '../utils/async-handler'
import { ConfigController } from './../controllers/config-controller'

export const categoryRouter = Router()

categoryRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const { Categories } = await ConfigController.getPostConfig()
    res.json(Object.keys(Categories))
  })
)
