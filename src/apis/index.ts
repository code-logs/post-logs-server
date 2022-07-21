import { Router } from 'express'
import { postRouter } from './post'

export const apiRouters = Router()

apiRouters.use('/apis', postRouter)
