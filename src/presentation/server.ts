import express from 'express'

interface Options {
  port?: number
}

export class Server {
  public readonly app = express()
  private readonly _port: number = 3000

  constructor(options: Options) {
    const { port = 3100 } = options

    this._port = port
  }

  async start() {
    this.app.listen(this._port, () => {
      console.log(`Server is running on port ${this._port}`)
    })
  }
}
