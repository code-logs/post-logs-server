import { Router } from 'express'
import { PostController } from '../controllers/post-controller'
import { asyncHandler } from '../utils/async-handler'

export const postRouter = Router()

postRouter.get(
  '/posts',
  asyncHandler(async (req, res) => {
    const posts = (await PostController.getPosts()).sort((a, b) =>
      a.publishedAt > b.publishedAt ? -1 : 0
    )
    res.json(posts)
  })
)

postRouter.get(
  '/posts/:fileName',
  asyncHandler(async (req, res) => {
    const fileName = req.params.fileName
    if (!fileName) throw new Error('No file name provided')
    res.json(await PostController.getPost(fileName))
  })
)
