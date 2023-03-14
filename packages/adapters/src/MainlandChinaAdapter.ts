import { Unicode } from '@simple-serialport-gsm/utils'

import { Adapter, AdapterHandleOptinos } from '@simple-serialport-gsm/types'

/**
 * 中国大陆地区
 */
export class MainlandChinaAdapter extends Adapter<MainlandChinaHandleReturn> {
  public handle(options: AdapterHandleOptinos) {
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

    return {
      CMGSLength,
      message: sender + CMGSLengthString
    }
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
