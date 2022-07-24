import { Octokit } from '@octokit/core'
import { env } from './env'
import vividConsole from './vivid-console'
import child_process from 'child_process'
import { config } from 'dotenv'

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
      const {
        data: { content, encoding },
      } = await this.octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}?ref={ref}',
        {
          owner: 'code-logs',
          repo: 'code-logs.github.io',
          path: `${this.POSTS_DIR_PATH}/${category}/${fileName}`,
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
      child_process.execSync(
        'git clone git@$github.com:code-logs/code-logs.github.io.git ../../resources/'
      )
      child_process.execSync(
        `cd ../../resources && git config user.name '${env.get(
          'GITHUB_USERNAME'
        )}' && git config user.email '${env.get('GITHUB_EMAIL')}'`
      )
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
}

export default new Github()
