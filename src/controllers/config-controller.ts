import fs from 'fs'
import * as tsNode from 'ts-node'
import { Post } from '../types/post'
import github from '../utils/github'

export class ConfigController {
  private static async syncPostConfig() {
    const { content, encoding } = await github.getPostConfigContent()
    fs.writeFileSync(
      './resources/posts.config.ts',
      Buffer.from(content, encoding)
    )
  }

  private static async compilePostConfig() {
    const postConfigTs = fs.readFileSync('./resources/posts.config.ts')
    const postConfigJs = tsNode
      .create()
      .compile(postConfigTs.toString(), './resources/posts.config.ts')

    fs.writeFileSync('./resources/post.config.js', postConfigJs)
  }

  public static async getPostConfig() {
    const postConfigPath = '../../resources/posts.config'
    await this.syncPostConfig()
    await this.compilePostConfig()
    return (await import(postConfigPath)) as {
      posts: Post[]
      Categories: Record<string, string>
    }
  }
}
