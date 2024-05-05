import { SerialPort } from 'serialport'
import { Utils } from '@smserialport/utils'

import { WindowsOpenOptions } from '@smserialport/types'

export const useSerialport = (options: WindowsOpenOptions) => {
  return new ISerialPort(options)
}

class ISerialPort {
  private serialport: SerialPort

  private isOpened = false

  constructor(options: WindowsOpenOptions) {
    this.serialport = new SerialPort(options)

    this.serialport.on('open', () => {
      this.isOpened = true
    })
  }

  private async checkIsOpen() {
    if (this.isOpened) {
      return true
    }

    return new Promise((resolve) => {
      this.serialport.on('open', () => {
        this.isOpened = true
        resolve(true)
      })
    })
  }

  async send(commands: string[]): Promise<string[]> {
    return new Promise(async (resolve) => {
      await this.checkIsOpen()

      const response: string[] = []

      const listener = (data: Buffer) => {
        const result = data.toString().replace(/(\r|\n)/g, '')

        if (result === 'ATOK') {
          resolve(response)
          this.serialport.off('data', listener)
          return
        }

        response.push(result)
      }

      this.serialport.on('data', listener)

      for (const command of [...commands, 'AT']) {
        this.serialport.write(`${command}\r`)
        await Utils.sleep(500)
      }
    })
  }

  close() {
    this.serialport.close()
  }
}
