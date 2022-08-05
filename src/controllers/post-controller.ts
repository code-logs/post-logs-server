import { DeployController } from './deploy-controller'
import fs from 'fs'
import { In } from 'typeorm'
import { Post } from '../entities/post'
import { PostRef } from '../entities/post-ref'
import { Series } from '../entities/series'
import { PostConfig } from '../types/post-config'
import { dataSource } from '../utils/data-source'
import { Tag } from './../entities/tag'
import { NewPostParam } from './../types/request-body'
import { DirUtil } from './../utils/dir-util'
import { ConfigController } from './config-controller'
import github from '../utils/github'
import { publishedAtNow } from '../utils/date-util'

export class PostController {
  public static async getPostsConfig() {
    const { posts } = await ConfigController.getPostConfig()
    return posts
  }

  public static async getPosts() {
    return await Post.find({
      order: { published: 'ASC', publishedAt: 'DESC' },
      relations: {
        tags: true,
        references: true,
        series: true,
      },
    })
  }

  public static async getPost(fileName: string) {
    const post = await Post.findOne({
      where: { fileName: `${fileName}.md` },
      relations: {
        tags: true,
        references: true,
        series: true,
      },
    })
    if (!post) throw new Error('Failed to find post')

    return post
  }

  public static async getTags() {
    const posts = await Post.find({
      select: ['tags'],
      relations: { tags: true },
    })

    const tags = posts.map(({ tags }) => tags).flat()
    const tagNames = new Set()

    return tags
      .filter(({ name }) => {
        if (!tagNames.has(name)) {
          tagNames.add(name)
          return true
        }

        return false
      })
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
  }

  public static async getCategories() {
    const posts = await Post.find({
      select: ['category'],
      order: { category: 'ASC' },
    })
    return Array.from(new Set(posts.map(({ category }) => category)))
  }

  public static async synchronize() {
    dataSource.transaction(async (trx) => {
      const posts = await this.getPostsConfig()
      const postRepository = trx.getRepository(Post)
      const seriesRepository = trx.getRepository(Series)
      const tagRepository = trx.getRepository(Tag)
      const postRefRepository = trx.getRepository(PostRef)

      const existsPosts = await postRepository.find({
        relations: {
          tags: true,
          references: true,
          series: true,
        },
      })
      if (existsPosts.length) {
        const { tagIds, postRefIds, seriesIds } = existsPosts.reduce<{
          tagIds: string[]
          postRefIds: string[]
          seriesIds: string[]
        }>(
          (acc, { tags, references, series }) => {
            acc.tagIds = [...acc.tagIds, ...tags.map(({ id }) => id)]
            if (references?.length) {
              acc.postRefIds = [
                ...acc.postRefIds,
                ...references.map(({ id }) => id),
              ]
            }

            if (series?.id) {
              acc.seriesIds = [...acc.seriesIds, series.id]
            }

            return acc
          },
          { tagIds: [], postRefIds: [], seriesIds: [] }
        )

        if (tagIds.length) await tagRepository.delete(tagIds)
        if (postRefIds.length) await postRefRepository.delete(postRefIds)
        if (seriesIds.length) await seriesRepository.delete(seriesIds)

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
        })
      )
    })
  }

  public static async createPost(
    newPost: NewPostParam,
    content: string,
    thumbnailName: string
  ) {
    return dataSource.transaction(async (trx) => {
      const postRepository = trx.getRepository(Post)
      const tagRepository = trx.getRepository(Tag)
      const postRefRepository = trx.getRepository(PostRef)
      const seriesRepository = trx.getRepository(Series)

      const {
        title,
        category,
        description,
        fileName,
        tags,
        references,
        series,
        published = false,
        publishedAt,
      } = newPost

      const post: Post = postRepository.create()
      post.title = title
      post.category = category
      post.description = description
      post.fileName = fileName
      post.thumbnailName = thumbnailName
      post.published = published
      if (!publishedAt && published) {
        post.publishedAt = publishedAtNow()
      } else {
        post.publishedAt = publishedAt
      }

      post.content = content

      const newTags = await tagRepository.save(
        tags.filter(({ id }) => !id) as Tag[]
      )
      const existsTags = await tagRepository.find({
        where: { id: In(tags.filter(({ id }) => id).map(({ id }) => id)) },
      })

      post.tags = [...newTags, ...existsTags]
      post.references = await postRefRepository.save(references as PostRef[])
      if (series?.nextPostTitle || series?.prevPostTitle) {
        post.series = await seriesRepository.save(series as Series)

        if (series.nextPostTitle) {
          const nextPost = await postRepository.findOne({
            where: { title: series.nextPostTitle },
            relations: { series: true },
          })

          if (nextPost) {
            const nextPostSeries = nextPost.series || Series.create()
            nextPostSeries.prevPostTitle = title
            nextPost.series = await seriesRepository.save(nextPostSeries)
            await postRepository.save(nextPost)
          }
        }

        if (series.prevPostTitle) {
          const prevPost = await postRepository.findOne({
            where: { title: series.prevPostTitle },
            relations: { series: true },
          })

          if (prevPost) {
            const prevPostSeries = prevPost.series || Series.create()
            prevPostSeries.nextPostTitle = title
            prevPost.series = await seriesRepository.save(prevPostSeries)
            await postRepository.save(prevPost)
          }
        }
      }

      post.isCreated = true
      return await post.save()
    })
  }

  public static async updatePost(
    postId: string,
    post: NewPostParam,
    content: string,
    thumbnailName?: string
  ) {
    return dataSource.transaction(async (trx) => {
      const postRepository = trx.getRepository(Post)
      const tagRepository = trx.getRepository(Tag)
      const referenceRepository = trx.getRepository(PostRef)
      const seriesRepository = trx.getRepository(Series)

      const oldPost = await postRepository.findOne({
        where: { id: postId },
        relations: {
          tags: true,
          references: true,
          series: true,
        },
      })

      if (!oldPost) throw new Error('No old post found')

      if (oldPost.tags.length) {
        await tagRepository.delete(oldPost.tags.map(({ id }) => id))
      }

      if (oldPost.references?.length) {
        await referenceRepository.delete(oldPost.references.map(({ id }) => id))
      }

      if (oldPost.series) {
        await seriesRepository.delete(oldPost.series.id)
      }

      await postRepository.delete(oldPost.id)

      if (thumbnailName) {
        fs.rmSync(`${DirUtil.THUMBNAIL_PATH}/${oldPost.thumbnailName}`, {
          force: true,
        })
      }

      post.tags = post.tags.map((tag) => {
        delete tag.id
        return tag
      })

      const updatedPost = await this.createPost(
        post,
        content,
        thumbnailName || oldPost.thumbnailName
      )

      updatedPost.isCreated = oldPost.isCreated
      updatedPost.isUpdated = true

      if (!oldPost.isCreated) updatedPost.fileName = oldPost.fileName
      return await updatedPost.save()
    })
  }

  public static async deletePost(post: Post) {
    return await dataSource.transaction(async (trx) => {
      if (!post.isCreated) throw new Error('Cannot delete exists posting')

      const postRepository = trx.getRepository(Post)
      const tagRepository = trx.getRepository(Tag)
      const postRefRepository = trx.getRepository(PostRef)
      const seriesRepository = trx.getRepository(Series)

      if (post.tags.length) {
        await tagRepository.delete(post.tags.map(({ id }) => id))
      }

      if (post.references?.length) {
        await postRefRepository.delete(post.references.map(({ id }) => id))
      }

      if (post.series) {
        await seriesRepository.delete(post.series.id)
      }

      fs.rmSync(`${DirUtil.THUMBNAIL_PATH}/${post.thumbnailName}`, {
        force: true,
      })

      await postRepository.delete(post.id)
    })
  }

  public static async getModified() {
    return await Post.find({
      where: [{ isCreated: true }, { isUpdated: true }],
      relations: {
        tags: true,
        references: true,
        series: true,
      },
    })
  }

  public static async deploy() {
    await DeployController.generatePostConfig()
    await DeployController.generateMarkdowns()
    github.pushChanges()
    await ConfigController.syncRepository()
  }

  public static async getPostsCount() {
    return await Post.count()
  }

  public static async getLastPostingDate() {
    const foundPost = await Post.findOne({
      select: ['publishedAt'],
      where: { published: true },
      order: {
        publishedAt: 'DESC',
      },
    })

    if (!foundPost) return null
    return foundPost.publishedAt
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
