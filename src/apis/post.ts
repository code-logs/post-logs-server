import { Router, Request } from 'express'
import { NamespaceBody } from 'typescript'
import { PostController } from '../controllers/post-controller'
import { Post } from '../types/post'
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

postRouter.post(
  '/posts',
  asyncHandler(
    async (
      req: Request<
        Record<string, unknown>,
        Record<string, unknown>,
        Post & { content: string; thumbnail: File }
      >,
      res
    ) => {
      const { content, thumbnail, ...post } = req.body
      PostController.create(post, content, thumbnail)
      res.json({})
    }
  )
)
