import { ConfigController } from './../controllers/config-controller'
import { asyncHandler } from './../utils/async-handler'
import { Router } from 'express'

export const tagRouter = Router()

tagRouter.get(
  '/tags',
  asyncHandler(async (req, res) => {
    const { posts } = await ConfigController.getPostConfig()
    res.json(Array.from(new Set(posts.map((post) => post.tags).flat())).sort())
  })
)
