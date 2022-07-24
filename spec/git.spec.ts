import fs from 'fs'
import github from '../src/utils/github'
import { REPOSITORY_PATH } from './../src/utils/github'

test('Git clone test', async () => {
  github.cloneRepository()
  expect(fs.existsSync(`${REPOSITORY_PATH}/package.json`)).toBeTruthy()
})

afterAll(() => {
  fs.rmSync(REPOSITORY_PATH, { recursive: true, force: true })
})
