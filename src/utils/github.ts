import { Octokit } from '@octokit/core'
import child_process from 'child_process'
import fs from 'fs'
import { DirUtil } from './dir-util'
import vividConsole from './vivid-console'

class Github {
  private readonly POST_CONFIG_PATH
  private readonly POSTS_DIR_PATH
  private readonly octokit

  constructor() {
    this.POST_CONFIG_PATH = process.env.POST_CONFIG_PATH
    this.POSTS_DIR_PATH = process.env.POSTS_DIR_PATH
    this.octokit = new Octokit({
      auth: process.env.GITHUB_API_TOKEN,
    })
  }

  public async getPostConfigContent(): Promise<{
    content: string
    encoding: BufferEncoding
  }> {
    try {
      const {
        data: { content, encoding },
      } = await this.octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}?ref={ref}',
        {
          owner: 'code-logs',
          repo: 'code-logs.github.io',
          path: this.POST_CONFIG_PATH,
          ref: 'draft',
        }
      )

      return { content, encoding }
    } catch (e) {
      this.handleError(e)
      throw e
    }
  }

  public async getPostMarkdown(
    category: string,
    fileName: string
  ): Promise<{ content: string; encoding: BufferEncoding }> {
    try {
      const categoryPath = category
        .split(' ')
        .map((char) => char.toLowerCase())
        .join('-')

      const {
        data: { content, encoding },
      } = await this.octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}?ref={ref}',
        {
          owner: 'code-logs',
          repo: 'code-logs.github.io',
          path: `${this.POSTS_DIR_PATH}/${categoryPath}/${fileName}`,
          ref: 'draft',
        }
      )

      return { content, encoding }
    } catch (e) {
      this.handleError(e)
      throw e
    }
  }

  public cloneRepository() {
    try {
      this.destroyRepository()
      const apiToken = process.env.GITHUB_API_TOKEN
      const username = process.env.GITHUB_USERNAME
      const email = process.env.GITHUB_EMAIL

      if (!apiToken || !username || !email)
        throw new Error('Env variable is not set properly')

      const cloneCommand = this.buildCloneCommand(
        apiToken,
        DirUtil.REPOSITORY_PATH
      )
      child_process.execSync(cloneCommand)
      this.checkoutDraft()
      this.configGithubUser(username)
      this.configGithubEmail(email)
    } catch (e) {
      this.handleError(e)
      throw e
    }
  }

  public destroyRepository() {
    try {
      fs.rmSync(DirUtil.REPOSITORY_PATH, { recursive: true, force: true })
    } catch (e) {
      this.handleError(e)
      throw e
    }
  }

  private handleError(e: unknown) {
    if (e instanceof Error) {
      vividConsole.error(e.message)
    } else {
      vividConsole.error('Unexpected error occurred')
    }
  }

  public pushChanges() {
    try {
      const token = process.env.GITHUB_API_TOKEN
      const username = process.env.GITHUB_USERNAME
      const email = process.env.GITHUB_EMAIL

      if (!token || !username || !email)
        throw new Error('env variable is not set properly')

      this.checkoutDraft()
      const pullCommand = this.buildPullCommand()
      child_process.execSync(pullCommand)

      this.configGithubUser(username)
      this.configGithubEmail(email)

      const pushCommand = this.buildPushCommand(
        token,
        `Posting: changed via Post Logs - ${new Date().toLocaleString()}`
      )
      child_process.execSync(pushCommand)
    } catch (e) {
      this.handleError(e)
      throw e
    }
  }

  private buildCloneCommand(token: string, dest: string) {
    return `git clone https://${token}@github.com/code-logs/code-logs.github.io.git ${dest}`
  }

  private buildPullCommand() {
    return `cd ${DirUtil.REPOSITORY_PATH} && git pull`
  }

  private buildPushCommand(token: string, commitMessage: string) {
    return `cd ${DirUtil.REPOSITORY_PATH} && git add . && git commit -m '${commitMessage}' && git push https://${token}@github.com/code-logs/code-logs.github.io.git`
  }

  private configGithubUser(user: string) {
    child_process.execSync(
      `cd ${DirUtil.REPOSITORY_PATH} && git config user.name '${user}'`
    )
  }

  private configGithubEmail(email: string) {
    child_process.execSync(
      `cd ${DirUtil.REPOSITORY_PATH} && git config user.email '${email}'`
    )
  }

  private checkoutDraft() {
    child_process.execSync(
      `cd ${DirUtil.REPOSITORY_PATH} && git checkout draft`
    )
  }
}

export default new Github()
