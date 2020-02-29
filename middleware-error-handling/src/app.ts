import { Application } from "express"
import * as express from "express"

import index from "./routes/index"
import customErrorHander from "./middlewares/custom-error-handler"

class App {
  public app: Application

  public constructor() {
    this.app = express()
    this.app.use("/", index)
    this.app.use(customErrorHander)
  }
}

export default new App().app
