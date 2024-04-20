import {
  Adapter,
  AdapterOptinos,
  WindowsOpenOptions
} from '@smserialport/types'

export default class SMSerialport<TConfig> {
  private _adapter: Adapter<TConfig>

  constructor(adapter: new () => Adapter<TConfig>) {
    this._adapter = new adapter()
  }

  config(options: AdapterOptinos) {
    this.hasAdapter()

    this._adapter.config(options)

    return this
  }

  send(options: WindowsOpenOptions) {
    this.hasAdapter()

    this._adapter.send(options)
  }

  private hasAdapter() {
    if (!this._adapter) {
      throw new Error('Please use the "use" method to select an adapter')
    }
  }
}
