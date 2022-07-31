import { Octokit } from '@octokit/core'
import child_process from 'child_process'
import fs from 'fs'
import { DirUtil } from './dir-util'
import { env } from './env'
import vividConsole from './vivid-console'

class Github {
  private readonly POST_CONFIG_PATH
  private readonly POSTS_DIR_PATH
  private readonly octokit

  constructor() {
    this.POST_CONFIG_PATH = env.get('POST_CONFIG_PATH')
    this.POSTS_DIR_PATH = env.get('POSTS_DIR_PATH')
    this.octokit = new Octokit({
      auth: env.get('GITHUB_API_TOKEN'),
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
      const cloneCommand = this.buildCloneCommand(
        env.get('GITHUB_API_TOKEN'),
        DirUtil.REPOSITORY_PATH
      )
      child_process.execSync(cloneCommand)
      this.checkoutDraft()
      this.configGithubUser(env.get('GITHUB_USERNAME'))
      this.configGithubEmail(env.get('GITHUB_EMAIL'))
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
      const token = env.get('GITHUB_API_TOKEN')
      const username = env.get('GITHUB_USERNAME')
      const email = env.get('GITHUB_EMAIL')

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
