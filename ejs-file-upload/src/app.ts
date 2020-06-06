import { Application } from "express"
import * as express from "express"
import * as path from "path"

import index from "./routes/index"

class App {
  public app: Application

  public constructor() {
    this.app = express()

    // View 設定
    this.app.set("views", path.join(__dirname, "views"))
    this.app.set("view engine", "ejs")

    this.app.use("/", index)
  }
}

export default new App().app
