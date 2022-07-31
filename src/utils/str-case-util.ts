export const kebabCase = (str: string) =>
  str.replace(/( |\t)+/g, '-').toLowerCase()
