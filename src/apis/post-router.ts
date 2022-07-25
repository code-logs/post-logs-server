import { DirUtil } from './../utils/dir-util'
import { Request, Router } from 'express'
import multer from 'multer'
import { PostController } from '../controllers/post-controller'
import { Post } from '../entities/post'
import { asyncHandler } from '../utils/async-handler'

const thumbnailUploader = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, callback) {
      callback(null, DirUtil.THUMBNAIL_PATH)
    },
    filename(_req, file, callback) {
      callback(null, file.originalname)
    },
  }),
})

export const postRouter = Router()

postRouter.get(
  '/posts',
  asyncHandler(async (req, res) => {
    const posts = await PostController.getPosts()

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
  thumbnailUploader.single('thumbnail'),
  asyncHandler(
    async (
      req: Request<
        unknown,
        unknown,
        { tempPost: string; content: string; thumbnail: File }
      >,
      res
    ) => {
      const post: Post = JSON.parse(req.body.tempPost)
      const content = req.body.content

      res.json({})
    }
  )
)
