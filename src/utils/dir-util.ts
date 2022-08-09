import path from 'path'

export class DirUtil {
  public static readonly RESOURCE_DIR = path.resolve(
    __dirname,
    '../../resources'
  )
  public static readonly POST_CONFIG_TS_NAME = 'posts.config.ts'
  public static readonly REPOSITORY_PATH = `${this.RESOURCE_DIR}/repo`
  public static readonly CONFIG_TS_PATH = `${this.REPOSITORY_PATH}/config/${this.POST_CONFIG_TS_NAME}`
  public static readonly POSTS_PATH = `${this.REPOSITORY_PATH}/posts`
  public static readonly THUMBNAIL_PATH = `${this.REPOSITORY_PATH}/public/assets/images`
}
