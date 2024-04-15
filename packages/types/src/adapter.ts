import { WindowsOpenOptions } from './serialport'

export abstract class Adapter<TConfig = void> {
  protected _config!: TConfig

  abstract config(options: AdapterOptinos): void
  abstract send(options: WindowsOpenOptions): boolean
}

export interface SerialPortOptions {
  path: string
  baudRate: number
  dataBits: number
  stopBits: number
  parity?: 'none' | 'even' | 'odd' | 'mark' | 'space'
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
