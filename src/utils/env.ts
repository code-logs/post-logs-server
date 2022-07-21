import dotenv from 'dotenv'

type EnvKey = 'PORT'

export class Env {
  private config

  constructor() {
    this.config = dotenv.config()
  }

  get(key: EnvKey) {
    return this.config.parsed?.[key] || null
  }
}
