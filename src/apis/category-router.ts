import { Router } from 'express'
import { PostController } from '../controllers/post-controller'
import { asyncHandler } from '../utils/async-handler'

export const categoryRouter = Router()

categoryRouter.get(
  '/categories',
  asyncHandler(async (_req, res) => {
    res.json(await PostController.getCategories())
  })
)
