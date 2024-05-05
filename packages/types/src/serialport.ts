export interface OpenOptions {
  /** The system path of the serial port you want to open. For example, `/dev/tty.XXX` on Mac/Linux, or `COM1` on Windows */
  path: string
  /**
   * The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
   */
  baudRate: number
  /** Must be one of these: 5, 6, 7, or 8 defaults to 8 */
  dataBits?: 5 | 6 | 7 | 8
  /** Prevent other processes from opening the port. Windows does not currently support `false`. Defaults to true */
  lock?: boolean
  /** Must be 1, 1.5 or 2 defaults to 1 */
  stopBits?: 1 | 1.5 | 2
  parity?: string
  /** Flow control Setting. Defaults to false */
  rtscts?: boolean
  /** Flow control Setting. Defaults to false */
  xon?: boolean
  /** Flow control Setting. Defaults to false */
  xoff?: boolean
  /** Flow control Setting defaults to false*/
  xany?: boolean
  /** drop DTR on close. Defaults to true */
  hupcl?: boolean
}

export interface WindowsOpenOptions extends OpenOptions {
  /** Device parity defaults to none */
  parity?: 'none' | 'even' | 'odd' | 'mark' | 'space'
  /** RTS mode defaults to handshake */
  rtsMode?: 'handshake' | 'enable' | 'toggle'
}

export abstract class ISerialPortAbstract {
  abstract send(commands: Array<string | Buffer>): Promise<string[]>
  abstract close(): void
}
