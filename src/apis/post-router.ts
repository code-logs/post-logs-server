import { Request, Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import { PostController } from '../controllers/post-controller'
import { asyncHandler } from '../utils/async-handler'
import { NewPostParam } from './../types/request-body'
import { DirUtil } from './../utils/dir-util'

const thumbnailUploader = multer({ dest: DirUtil.THUMBNAIL_PATH })

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
      req: Request<unknown, unknown, { tempPost: string; content: string }>,
      res
    ) => {
      try {
        if (!req.file) throw new Error('Thumbnail file object is missing')
        const tempPost: NewPostParam = JSON.parse(req.body.tempPost)
        const content = req.body.content

        res.json(
          await PostController.createPost(tempPost, content, req.file.filename)
        )
      } catch (e) {
        const originalFilename = req.file?.originalname
        if (originalFilename) {
          fs.rmSync(`${DirUtil.THUMBNAIL_PATH}/${req.file?.filename}`, {
            force: true,
          })
        }

        throw e
      }
    }
  )
)

postRouter.put(
  '/posts/:postId',
  thumbnailUploader.single('thumbnail'),
  asyncHandler(async (req, res) => {
    try {
      const { postId } = req.params
      const tempPost: NewPostParam = JSON.parse(req.body.tempPost)
      const content = req.body.content

      res.json(
        await PostController.updatePost(
          postId,
          tempPost,
          content,
          req.file?.filename
        )
      )
    } catch (e) {
      if (req.file) {
        const originalFilename = req.file?.originalname
        if (originalFilename) {
          fs.rmSync(`${DirUtil.THUMBNAIL_PATH}/${req.file.filename}`, {
            force: true,
          })
        }
      }

      throw e
    }
  })
)

postRouter.delete(
  '/posts/:fileName',
  asyncHandler(async (req, res) => {
    const fileName = req.params.fileName
    if (!fileName)
      return res
        .status(403)
        .send('삭제 대상 포스팅의 파일명칭을 찾을 수 없습니다.')

    const post = await PostController.getPost(fileName)
    if (!post)
      return res.status(404).send('삭제 대상 포스팅을 찾을 수 없습니다.')

    await PostController.deletePost(post)
    res.json({ result: true })
  })
)

postRouter.get(
  '/modified-posts',
  asyncHandler(async (_req, res) => {
    res.json(await PostController.getModified())
  })
)

postRouter.post(
  '/deploy',
  asyncHandler(async (req, res) => {
    await PostController.deploy()
    res.json({ result: true })
  })
)

postRouter.get(
  '/total-post-count',
  asyncHandler(async (req, res) => {
    res.json(await PostController.getPostsCount())
  })
)

postRouter.get(
  '/last-posting-date',
  asyncHandler(async (req, res) => {
    res.json(await PostController.getLastPostingDate())
  })
)
