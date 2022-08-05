export const kebabCase = (str: string) =>
  str.replace(/( |\t)+/g, '-').toLowerCase()

export const readableCase = (str: string) => kebabCase(str).replace(/-/g, ' ')
