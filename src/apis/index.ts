import { Router } from 'express'
import { categoryRouter } from './category-router'
import { configRouter } from './configuration-router'
import { postRouter } from './post-router'
import { tagRouter } from './tag-router'
import { articleMaterialRouter } from './article-material-router'

export const apiRouters = Router()

apiRouters.use('/apis', postRouter)
apiRouters.use('/apis', categoryRouter)
apiRouters.use('/apis', tagRouter)
apiRouters.use('/apis', configRouter)
apiRouters.use('/apis', articleMaterialRouter)
