import { SerialPort } from 'serialport'
import { PortInfo } from '@smserialport/types'

export const getSerialportList = async (): Promise<PortInfo[]> => {
  return SerialPort.list()
}
