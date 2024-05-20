import { SerialPort } from 'serialport'

export const getSerialportList = async () => {
  return SerialPort.list()
}
