import github from '../utils/github'
import { ConfigController } from './config-controller'

import { Post } from '../types/post'

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

  private static async getPostMarkdownContent(post: Post) {
    const { content, encoding } = await github.getPostMarkdown(
      post.category,
      post.fileName
    )

    return Buffer.from(content, encoding).toString('utf-8')
  }
}
