import { Router } from 'express'
import { Post } from '../entities/post'
import { asyncHandler } from '../utils/async-handler'

export const categoryRouter = Router()

categoryRouter.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const posts = await Post.find({
      select: ['category'],
      order: { category: 'ASC' },
    })
    res.json(posts.map(({ category }) => category))
  })
)
