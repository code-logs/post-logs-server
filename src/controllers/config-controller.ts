import fs from 'fs'
import * as tsNode from 'ts-node'
import { Configuration } from '../entities/configuration'
import { PostConfig } from '../types/post-config'
import { DirUtil } from '../utils/dir-util'
import github from '../utils/github'
import { PostController } from './post-controller'

export const CONFIG_KEYS = {
  TEMP_CONFIG_NAME: 'TEMP_CONFIG_NAME',
  LAST_SYNC_DATETIME: 'LAST_SYNC_DATETIME',
}
export class ConfigController {
  private static async destroyConfig() {
    const tempConfigName = await this.readTempConfigName()
    if (tempConfigName) fs.rmSync(tempConfigName, { force: true })
  }

  public static async compilePostConfig() {
    await this.destroyConfig()

    const postConfigTs = fs.readFileSync(DirUtil.CONFIG_TS_PATH)
    const postConfigJs = tsNode
      .create()
      .compile(postConfigTs.toString(), DirUtil.CONFIG_TS_PATH)

    const tempConfigName = await this.generateTempConfigName()
    fs.writeFileSync(tempConfigName, postConfigJs)
  }

  public static async getPostConfig() {
    const tempConfigName = await this.readTempConfigName()
    if (!tempConfigName) {
      throw new Error('No config name found')
    }

    if (!fs.existsSync(tempConfigName)) {
      throw new Error('Failed to find config file')
    }

    return (await import(tempConfigName)) as {
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

  public static async syncRepository() {
    try {
      github.cloneRepository()
      await ConfigController.compilePostConfig()
      await PostController.synchronize()
      await ConfigController.setLastSyncDatetime()
      return true
    } catch (e) {
      github.destroyRepository()
      return false
    }
  }

  public static async getTemplate() {
    return await Configuration.findOne({
      where: {
        name: 'TEMPLATE',
      },
    })
  }

  public static async saveTemplate(content: string) {
    let templateConfig = await this.getTemplate()
    if (!templateConfig) {
      templateConfig = Configuration.create()
      templateConfig.name = 'TEMPLATE'
    }

    templateConfig.value = content
    return await templateConfig.save()
  }

  public static async generateTempConfigName() {
    let tempConfigName = await Configuration.findOne({
      where: { name: CONFIG_KEYS.TEMP_CONFIG_NAME },
    })
    if (!tempConfigName) {
      tempConfigName = Configuration.create()
      tempConfigName.name = CONFIG_KEYS.TEMP_CONFIG_NAME
    }
    tempConfigName.value = String(Date.now())
    const { value } = await tempConfigName.save()

    return `${DirUtil.RESOURCE_DIR}/${value}`
  }

  public static async readTempConfigName() {
    const tempConfigName = await Configuration.findOne({
      where: { name: CONFIG_KEYS.TEMP_CONFIG_NAME },
    })

    if (!tempConfigName?.value) return null

    return `${DirUtil.RESOURCE_DIR}/${tempConfigName.value}`
  }
}
