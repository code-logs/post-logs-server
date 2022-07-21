import { Router } from 'express'
import { postingRouter } from './posting'

export const apiRouter = Router()

apiRouter.use('/apis', postingRouter)
