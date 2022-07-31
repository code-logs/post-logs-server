import dotenv from 'dotenv'

type EnvKey =
  | 'PORT'
  | 'GITHUB_API_TOKEN'
  | 'GITHUB_USERNAME'
  | 'GITHUB_EMAIL'
  | 'POST_CONFIG_PATH'
  | 'POSTS_DIR_PATH'

class Env {
  private config

  constructor() {
    this.config = dotenv.config()
  }

  get(key: EnvKey) {
    const value = this.config.parsed?.[key]
    if (!value) throw new Error(`Failed to find env variable via ${key}`)
    return value
  }
}

export const env = new Env()
