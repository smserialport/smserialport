import { SerialPort } from 'serialport'
import { Utils } from '@smserialport/utils'

import { MaybeArray, WindowsOpenOptions } from '@smserialport/types'

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

  async send(commands: Array<MaybeArray<string | Buffer>>): Promise<string[]> {
    return new Promise(async (resolve) => {
      await this.checkIsOpen()

      const response: string[] = []

      const listener = (data: Buffer) => {
        const result = data.toString().replace(/(\r|\n)/g, '')

        if (result.endsWith('ATOK')) {
          resolve(response)
          this.serialport.off('data', listener)
          return
        }

        response.push(result)
      }

      this.serialport.on('data', listener)

      for (const command of [...commands, 'AT']) {
        // if command is an array, no need to sleep
        if (Array.isArray(command)) {
          for (const c of command) {
            this.serialport.write(`${c}\r`)
          }
        } else {
          this.serialport.write(`${command}\r`)
        }

        await Utils.sleep(500)
      }
    })
  }

  close() {
    if (!this.serialport.isOpen) {
      return
    }

    this.serialport.close()
  }
}
