import { DirUtil } from './../utils/dir-util'
import fs from 'fs'
import { Post } from '../entities/post'
import { PostRef } from '../entities/post-ref'
import { Series } from '../entities/series'
import { PostConfig } from '../types/post'
import { dataSource } from '../utils/data-source'
import github from '../utils/github'
import { Tag } from './../entities/tag'
import { ConfigController } from './config-controller'

export class PostController {
  public static async getPostsConfig() {
    const { posts } = await ConfigController.getPostConfig()
    return posts
  }

  public static async getPosts() {
    return await Post.find()
  }

  public static async getPost(fileName: string) {
    const posts = await this.getPosts()
    const post = posts.find(
      (post: Post) => post.fileName.replace(/\.md$/, '') === fileName
    )
    if (!post) throw new Error('Failed to find post')

    return post
  }

  public static async synchronize() {
    const posts = await this.getPostsConfig()

    dataSource.transaction(async (trx) => {
      const postRepository = trx.getRepository(Post)
      const seriesRepository = trx.getRepository(Series)
      const tagRepository = trx.getRepository(Tag)
      const postRefRepository = trx.getRepository(PostRef)

      const existsPosts = await postRepository.find()
      if (existsPosts.length) {
        await postRepository.delete(existsPosts.map(({ id }) => id))
      }

      await Promise.all(
        posts.map(async (post) => {
          const {
            title,
            fileName,
            description,
            category,
            published,
            publishedAt,
            thumbnailName,
            tags,
            references,
            series,
          } = post

          const content = this.getPostContentFromRepo(post)

          let newSeries: Series | null = null

          if (series?.prevPostTitle || series?.nextPostTitle) {
            const { prevPostTitle, nextPostTitle } = series
            newSeries = await seriesRepository.save({
              prevPostTitle,
              nextPostTitle,
            })
          }

          const tempPost = Post.create()
          tempPost.title = title
          tempPost.fileName = fileName
          tempPost.description = description
          tempPost.category = category
          tempPost.published = published
          tempPost.publishedAt = publishedAt
          tempPost.thumbnailName = thumbnailName
          tempPost.content = content
          if (newSeries) tempPost.series = newSeries

          const newPost = await postRepository.save(tempPost)

          await Promise.all(
            tags.map(async (tag) => {
              tagRepository.save({ name: tag, post: newPost })
            })
          )

          if (references) {
            await Promise.all(
              references.map(async ({ title, url }) => {
                await postRefRepository.save({ title, url, post: newPost })
              })
            )
          }

          if (references) {
            for (const { title, url } of references) {
              await PostRef.save({ title, url, post: newPost })
            }
          }
        })
      )
    })
  }

  public static async create(
    postConfig: Post,
    content: string,
    thumbnailFile: File
  ): Promise<void> {
    // await github.cloneRepository()
    // const postConfigTemplate = TemplateController.generatePostConfig(postConfig)
    // const markdownTemplate = TemplateController.generateContentMarkdown(content)
    // await github.updatePostConfig(postConfigTemplate)
    // await github.updateMarkdown(postConfig.fileName, markdownTemplate)
    // await github.updateThumbnail(thumbnailFile, postConfig.thumbnailName)
    // if (await github.hasDiff()) {
    //   await github.pushLocalChanges()
    // } else {
    //   throw new Error('No differences found')
    // }
  }

  private static getPostContentFromRepo(post: PostConfig) {
    const categoryPath = post.category
      .split(' ')
      .map((char) => char.toLowerCase())
      .join('-')
    return fs
      .readFileSync(`${DirUtil.POSTS_PATH}/${categoryPath}/${post.fileName}`)
      .toString('utf-8')
  }
}
