import { kebabCase } from '../src/utils/str-case-util'

test('Kebab Case test', () => {
  expect(kebabCase('HELLO WORLD')).toEqual('hello-world')
  expect(kebabCase('HELLO   WORLD')).toEqual('hello-world')
  expect(kebabCase('HELLO        WORLD')).toEqual('hello-world')
  expect(kebabCase(`HELLO        WORLD`)).toEqual('hello-world')
})
