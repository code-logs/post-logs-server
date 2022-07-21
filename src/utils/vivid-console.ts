import chalk from 'chalk'

export default {
  log(text: unknown, withPadding = false) {
    if (withPadding) text = `\n${text}`
    console.log(chalk.blue(text))
  },

  warn(text: unknown, withPadding = false) {
    if (withPadding) text = `\n${text}`
    console.log(chalk.yellowBright(text))
  },

  error(text: unknown, withPadding = false) {
    if (withPadding) text = `\n${text}`
    console.log(chalk.redBright(text))
  },
}
