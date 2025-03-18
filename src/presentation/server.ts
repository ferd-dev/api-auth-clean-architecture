import express, { Router } from 'express'

interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly _port: number = 3000
  private readonly _routes: Router

  constructor(options: Options) {
    const { port = 3100, routes } = options

    this._port = port
    this._routes = routes
  }

  async start() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use(this._routes)

    this.app.listen(this._port, () => {
      console.log(`Server is running on port ${this._port}`)
    })
  }
}
