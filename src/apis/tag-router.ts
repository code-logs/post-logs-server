import { Router } from 'express'
import { Post } from '../entities/post'
import { asyncHandler } from './../utils/async-handler'

export const tagRouter = Router()

tagRouter.get(
  '/tags',
  asyncHandler(async (req, res) => {
    const posts = await Post.find({
      select: ['tags'],
      relations: { tags: true },
    })
    res.json(
      posts
        .map(({ tags }) => tags)
        .flat()
        .sort()
    )
  })
)
