import fs from 'fs'
import github from '../utils/github'
import * as tsNode from 'ts-node'
import { Post } from '../types/post'

export class PostController {
  private static async syncPostConfig() {
    const { content, encoding } = await github.getPostConfigContent()
    fs.writeFileSync(
      './resources/posts.config.ts',
      Buffer.from(content, encoding)
    )
  }

  private static async getPostMarkdownContent(post: Post) {
    const { content, encoding } = await github.getPostMarkdown(
      post.category,
      post.fileName
    )

    return Buffer.from(content, encoding).toString('utf-8')
  }

  private static async compilePostConfig() {
    const postConfigTs = fs.readFileSync('./resources/posts.config.ts')
    const postConfigJs = tsNode
      .create()
      .compile(postConfigTs.toString(), './resources/posts.config.ts')

    fs.writeFileSync('./resources/post.config.js', postConfigJs)
  }

  public static async getPosts() {
    const { posts } = await this.getPostConfig()
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

  private static async getPostConfig() {
    const postConfigPath = '../../resources/posts.config'
    await this.syncPostConfig()
    await this.compilePostConfig()
    return await import(postConfigPath)
  }
}
