import { asyncHandler } from './../utils/async-handler'
import { Router } from 'express'
import github from '../utils/github'

export const articleMaterialRouter = Router()

articleMaterialRouter.get(
  '/article-materials',
  asyncHandler(async (_req, res) => {
    const issues = await github.getIssues()
    res.json(
      issues
        .filter(
          (issue) =>
            issue.state === 'open' &&
            issue.labels.some(
              (label) =>
                typeof label === 'object' && label.name === 'Posting topic'
            )
        )
        .map(({ html_url: url, body: title, created_at: createdAt }) => ({
          title,
          createdAt,
          url,
        }))
    )
  })
)
