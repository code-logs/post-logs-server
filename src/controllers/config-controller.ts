import fs from 'fs'
import * as tsNode from 'ts-node'
import { Configuration } from '../entities/configuration'
import { PostConfig } from '../types/post-config'
import { DirUtil } from '../utils/dir-util'

export const CONFIG_KEYS = {
  LAST_SYNC_DATETIME: 'LAST_SYNC_DATETIME',
}
export class ConfigController {
  private static destroyConfig() {
    fs.rmSync(DirUtil.CONFIG_JS_PATH, { force: true })
  }

  public static async compilePostConfig() {
    this.destroyConfig()

    const postConfigTs = fs.readFileSync(DirUtil.CONFIG_TS_PATH)
    const postConfigJs = tsNode
      .create()
      .compile(postConfigTs.toString(), DirUtil.CONFIG_TS_PATH)

    fs.writeFileSync(DirUtil.CONFIG_JS_PATH, postConfigJs)
  }

  public static async getPostConfig() {
    if (!fs.existsSync(DirUtil.CONFIG_TS_PATH))
      throw new Error('Failed to find config file')

    return (await import(DirUtil.CONFIG_JS_PATH)) as {
      posts: PostConfig[]
      CATEGORIES: Record<string, string>
    }
  }

  public static async getPosts() {
    const { posts } = await this.getPostConfig()
    return posts
  }

  public static getLastSyncDatetime() {
    return Configuration.findOne({
      where: { name: CONFIG_KEYS.LAST_SYNC_DATETIME },
    })
  }

  public static async setLastSyncDatetime() {
    let lastSyncDatetimeConfig = await Configuration.findOne({
      where: { name: CONFIG_KEYS.LAST_SYNC_DATETIME },
    })

    if (!lastSyncDatetimeConfig) lastSyncDatetimeConfig = Configuration.create()
    lastSyncDatetimeConfig.name = CONFIG_KEYS.LAST_SYNC_DATETIME
    lastSyncDatetimeConfig.value = Date.now().toString()
    await lastSyncDatetimeConfig.save()
  }
}
