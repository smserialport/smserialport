import { Adapter, AdapterHandleOptinos } from '@simple-serialport-gsm/types'

export default class Serialport {
  private static _adapter: Adapter
  // private static _

  static use<T = void>(adapter: new () => Adapter<T>) {
    this._adapter = new adapter()
  }

  static config(options: AdapterHandleOptinos) {
    this._adapter.handle(options)
  }
}
