import { SerialPort } from 'serialport'

import { Unicode, Utils } from '@smserialport/utils'
import { Adapter, AdapterOptinos } from '@smserialport/types'

import type { WindowsOpenOptions } from '@smserialport/types'

/**
 * 中国大陆地区
 */
export class MainlandChinaAdapter extends Adapter<MainlandChinaHandleReturn> {
  public config(options: AdapterOptinos) {
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

    this._config = {
      CMGSLength,
      message: sender + CMGSLengthString
    }
  }

  async send(options: WindowsOpenOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const port = new SerialPort(options)

      // 10 秒超时
      const timer = setTimeout(() => {
        reject(new Error('Timed out'))
      }, 10000)

      let isCMGS = false

      port.on('data', (data: Buffer) => {
        const result = data.toString()

        // 匹配 +CMGS 开头的
        if (/^\+CMGS/.test(result.trim())) {
          isCMGS = true
        }

        // 已匹配到 +CMGS 并且匹配到 OK 则发送成功
        if (isCMGS && /^OK$/.test(result.trim())) {
          port.close()
          port.destroy()
          clearTimeout(timer)
          resolve(true)
        }
      })

      port.on('open', async () => {
        port.write('AT+CMGF=0\r')
        await Utils.sleep(500)
        port.write('AT+CSCS="GSM"\r')
        await Utils.sleep(500)
        port.write(`AT+CMGS=${this._config.CMGSLength}\r`)
        await Utils.sleep(500)
        port.write(this._config.message)
        await Utils.sleep(500)
        port.write(Buffer.from([0x1a]))
        port.write('\r')
      })
    })
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
