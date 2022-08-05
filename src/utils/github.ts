import { Octokit } from '@octokit/core'
import child_process from 'child_process'
import fs from 'fs'
import { DirUtil } from './dir-util'
import vividConsole from './vivid-console'

class Github {
  private readonly octokit

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_API_TOKEN,
    })
  }

  public async getIssues() {
    const { data } = await this.octokit.request(
      'GET /repos/{owner}/{repo}/issues',
      {
        owner: 'code-logs',
        repo: 'code-logs.github.io',
      }
    )

    return data
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
