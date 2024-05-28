import { WindowsOpenOptions, ISerialPortAbstract } from './serialport'

export abstract class AbstractAdapter {
  abstract serialport: ISerialPortAbstract

  abstract send(options: AdapterOptinos): Promise<boolean>
  abstract send(receiver: string, message: string): Promise<boolean>

  abstract config(options: WindowsOpenOptions): void
  abstract getSender(): Promise<string | undefined>

  close() {
    if (this.serialport) {
      this.serialport.close()
    }
  }
}

/**
 * 处理函数参数
 */
export interface AdapterOptinos {
  /**
   * 发送手机号
   */
  sender?: string

  /**
   * 接收手机号
   */
  receiver: string

  /**
   * 信息内容
   */
  message: string
}
