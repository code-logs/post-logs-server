import child_process from 'child_process'
import fs from 'fs'
import { Post } from '../entities/post'
import { DirUtil } from '../utils/dir-util'
import { publishedAtNow } from '../utils/date-util'
import { kebabCase } from '../utils/str-case-util'
import { PostController } from './post-controller'

export class DeployController {
  public static async buildPostConfigContent() {
    const posts = await PostController.getPosts()

    return `
      ${this.generatePostRefInterface()}
      ${this.generatePostInterface()}
      ${this.generateCategories(posts)}
      ${this.generatePostList(posts)}

      export default posts
    `
  }

  public static async generatePostConfig() {
    const template = await this.buildPostConfigContent()
    this.writeFile(DirUtil.CONFIG_TS_PATH, template)
    this.formatFile(DirUtil.CONFIG_TS_PATH)
  }

  public static async generateMarkdowns() {
    const posts = await Post.find()

    posts.forEach(({ fileName, content, category }) => {
      const markdownPath = `${DirUtil.POSTS_PATH}/${kebabCase(
        category
      )}/${fileName}`
      this.writeFile(markdownPath, content)
      this.formatFile(markdownPath)
    })
  }

  private static writeFile(dest: string, content: string) {
    const dirPath = dest
      .split('/')
      .filter((_, idx, arr) => idx < arr.length - 1)
      .join('/')

    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(dest, content)
  }
  private static formatFile(filePath: string) {
    child_process.execSync(`npx prettier --write ${filePath}`)
  }

  private static generatePostRefInterface() {
    return `
      export interface PostRef {
        title: string,
        url: string,
      }
    `
  }

  private static generatePostInterface() {
    return `
      export interface Post {
        title: string,
        fileName: string,
        description: string,
        category: typeof CATEGORIES[keyof typeof CATEGORIES],
        published: boolean,
        publishedAt: string,
        thumbnailName: string,
        tags: string[],
        references?: PostRef[],
        series?: {
          prevPostTitle?: string,
          nextPostTitle?: string
        }
      }
    `
  }

  private static generateCategories(posts: Post[]) {
    const categories = Array.from(
      new Set(posts.map(({ category }) => category))
    )

    return `
      export const CATEGORIES = {
        ${categories.map(
          (category) => `
          ['${kebabCase(category)}']: '${category}'
        `
        )}
      }
    `
  }

  private static generatePostList(posts: Post[]) {
    const postConfigs = posts.map((post) => {
      return `
        {
          title: \`${post.title}\`,
          description: \`${post.description}\`,
          fileName: '${post.fileName}',
          category: '${kebabCase(post.category)}',
          published: ${post.published},
          publishedAt: \`${post.publishedAt || publishedAtNow()}\`,
          thumbnailName: \`${post.thumbnailName}\`,
          tags: [${post.tags.map(({ name }) => `\`${name}\``)}]
        }
      `
    })

    return `
      export const posts: Post[] = [${postConfigs}]
    `
  }
}
