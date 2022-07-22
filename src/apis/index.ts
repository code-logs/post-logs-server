import { Router } from 'express'
import { categoryRouter } from './category'
import { postRouter } from './post'
import { tagRouter } from './tag'

export const apiRouters = Router()

apiRouters.use('/apis', postRouter)
apiRouters.use('/apis', categoryRouter)
apiRouters.use('/apis', tagRouter)
