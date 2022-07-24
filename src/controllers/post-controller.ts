import github from '../utils/github'
import { ConfigController } from './config-controller'

import { Post } from '../types/post'
import { TemplateController } from './template-controller'

export class PostController {
  public static async getPosts() {
    const { posts } = await ConfigController.getPostConfig()
    return posts
  }

  public static async getPost(fileName: string) {
    const posts = await this.getPosts()
    const post = posts.find(
      (post: Post) => post.fileName.replace(/\.md$/, '') === fileName
    )
    if (!post) throw new Error('Failed to find post')

    const content = await this.getPostMarkdownContent(post)

    return { post, content }
  }

  public static async create(
    postConfig: Post,
    content: string,
    thumbnailFile: File
  ): Promise<void> {
    await github.cloneRepository()
    const postConfigTemplate = TemplateController.generatePostConfig(postConfig)
    const markdownTemplate = TemplateController.generateContentMarkdown(content)
    // await github.updatePostConfig(postConfigTemplate)
    // await github.updateMarkdown(postConfig.fileName, markdownTemplate)
    // await github.updateThumbnail(thumbnailFile, postConfig.thumbnailName)

    // if (await github.hasDiff()) {
    //   await github.pushLocalChanges()
    // } else {
    //   throw new Error('No differences found')
    // }
  }

  private static async getPostMarkdownContent(post: Post) {
    const { content, encoding } = await github.getPostMarkdown(
      post.category,
      post.fileName
    )

    return Buffer.from(content, encoding).toString('utf-8')
  }
}
