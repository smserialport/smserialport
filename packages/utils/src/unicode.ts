export class Unicode {
  /**
   * string to unicode [0000 - FFFF]
   * @param str
   * @returns
   */
  static from(str: string) {
    const message = [...str.split('')]
      .map((str) => Unicode.padStart(str.charCodeAt(0).toString(16)))
      .join('')

    const len = (message.length / 2).toString(16)

    const pre = Unicode.padStart(len, 2)

    return `${pre.toUpperCase()}${message}`
  }

  /**
   * 不足指定位数时前面补 0
   * @param str string
   * @param length returns string length
   * @returns
   */
  private static padStart(str: string, length = 4): string {
    return `000${str}`.slice(-length)
  }
}
