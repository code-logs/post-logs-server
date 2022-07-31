import { Router } from 'express'
import { PostController } from '../controllers/post-controller'
import { asyncHandler } from './../utils/async-handler'

export const tagRouter = Router()

tagRouter.get(
  '/tags',
  asyncHandler(async (_req, res) => {
    res.json(await PostController.getTags())
  })
)
