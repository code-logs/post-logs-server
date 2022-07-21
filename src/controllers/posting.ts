import { asyncHandler } from './../utils/async-handler'
import { Router } from 'express'
import { Posting } from '../entities'

export const postingRouter = Router()

postingRouter.get(
  '/postings',
  asyncHandler(async (req, res) => {
    const postings = await Posting.findAll()

    res.json({ postings })
  })
)
