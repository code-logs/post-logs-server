import chalk from 'chalk'

export class VividConsole {
  public static log(text: string) {
    console.log(chalk.blue(text))
  }

  public static warn(text: string) {
    console.log(chalk.yellowBright(text))
  }

  public static error(text: string) {
    console.log(chalk.redBright(text))
  }
}
