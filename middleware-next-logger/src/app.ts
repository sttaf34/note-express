import { Application } from "express"
import * as express from "express"

import logger from "./middlewares/logger"
import index from "./routes/index"

class App {
  public app: Application

  public constructor() {
    this.app = express()

    // next()するmiddlewareが最初に来て
    this.app.use(logger)

    // next()しないmiddlewareが後にくるようにする
    this.app.use("/", index)
  }
}

export default new App().app
