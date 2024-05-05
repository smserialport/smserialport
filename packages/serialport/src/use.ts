import { SerialPort } from 'serialport'
import { Utils } from '@smserialport/utils'

import { WindowsOpenOptions } from '@smserialport/types'

export const useSerialport = (options: WindowsOpenOptions) => {
  return new ISerialPort(options)
}

class ISerialPort {
  private serialport: SerialPort

  constructor(options: WindowsOpenOptions) {
    this.serialport = new SerialPort(options)
  }

  async send(commands: string[]): Promise<string[]> {
    return new Promise(async (resolve) => {
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
}
