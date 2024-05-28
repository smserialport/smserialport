import {
  AbstractAdapter,
  AdapterOptinos,
  WindowsOpenOptions
} from '@smserialport/types'

export default class SMSerialport {
  private _adapter: AbstractAdapter

  constructor(adapter: new () => AbstractAdapter) {
    this._adapter = new adapter()
  }

  send(options: AdapterOptinos): Promise<boolean>
  send(receiver: string, message: string): Promise<boolean>
  send(receiverOrOptions: unknown, message?: unknown): Promise<boolean> {
    this.hasAdapter()

    return this._adapter.send(receiverOrOptions as any, message as any)
  }

  config(options: WindowsOpenOptions) {
    this.hasAdapter()

    return this._adapter.config(options)
  }

  async getSender() {
    this.hasAdapter()

    return this._adapter.getSender()
  }

  close() {
    this.hasAdapter()

    return this._adapter.close()
  }

  private hasAdapter() {
    if (!this._adapter) {
      throw new Error('Please use the "use" method to select an adapter')
    }
  }
}
