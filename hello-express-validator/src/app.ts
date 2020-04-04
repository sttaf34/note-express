import { Application } from "express"
import * as express from "express"

import index from "./routes/index"

class App {
  public app: Application

  public constructor() {
    this.app = express()

    // ルーターのミドルウェア設定
    this.app.use("/", index)
  }
}

export default new App().app
