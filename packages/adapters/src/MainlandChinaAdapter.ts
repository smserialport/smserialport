import { useSerialport } from '@smserialport/serialport'

import { Unicode } from '@smserialport/utils'
import { Adapter, AdapterOptinos } from '@smserialport/types'

import type { WindowsOpenOptions } from '@smserialport/types'

/**
 * 中国大陆地区
 */
export class MainlandChinaAdapter extends Adapter<MainlandChinaHandleReturn> {
  send(options: AdapterOptinos): Promise<boolean>
  send(receiver: string, message: string): Promise<boolean>
  async send(receiverOrOptions: unknown, message?: unknown): Promise<boolean> {
    const options: AdapterOptinos =
      typeof receiverOrOptions === 'string'
        ? { receiver: receiverOrOptions, message: message as string }
        : (receiverOrOptions as AdapterOptinos)

    if (!options.sender) {
      const sender = await this.getSender()

      if (!sender) {
        throw new Error('Get sender failed')
      }

      options.sender = sender
    }

    // 发送人手机号的处理
    const sender = '089168' + this.reverse(`${options.sender}F`)
    // 接收人手机号的处理
    const receiver = '68' + this.reverse(`${options.receiver}F`)
    // 信息内容转 unicode
    const messageUnicode = Unicode.from(options.message)
    // CMGS 长度字符串
    const CMGSLengthString = `11000D91${receiver}0008AA${messageUnicode}`
    // CMGS 长度
    const CMGSLength = CMGSLengthString.length / 2

    const sendMessage = sender + CMGSLengthString

    return new Promise((resolve, reject) => {
      // 10 秒超时
      const timer = setTimeout(() => {
        reject(new Error('Timed out'))
      }, 10000)

      this.serialport
        .send([
          'AT+CMGF=0',
          'AT+CSCS="GSM"',
          `AT+CMGS=${CMGSLength}`,
          sendMessage,
          Buffer.from([0x1a]),
          '\r'
        ])
        .then(() => {
          resolve(true)
          clearTimeout(timer)
        })
    })
  }

  async config(options: WindowsOpenOptions) {
    this.serialport = useSerialport(options)
  }

  async getSender(): Promise<string | undefined> {
    const response = await this.serialport.send(['AT+CNUM'])
    const [, sender] = /"(\d{11})"/.exec(response.join('')) || []
    return sender
  }

  /**
   * 手机号码奇偶交换
   * @param phone
   * @returns
   */
  private reverse(phone: string) {
    const phoneReverse: string[] = []

    phone.split('').forEach((char, index) => {
      if (index % 2 === 0) {
        phoneReverse.push(phone[index + 1] as string, char)
      }
    })

    return phoneReverse.join('')
  }
}

export interface MainlandChinaHandleReturn {
  CMGSLength: number
  message: string
}
