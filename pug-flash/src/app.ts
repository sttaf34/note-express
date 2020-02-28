import { Application } from "express"
import * as express from "express"
import * as session from "express-session"
import * as path from "path"

import index from "./routes/index"

import flash = require("connect-flash")

class App {
  public app: Application

  public constructor() {
    this.app = express()

    // セッション設定
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || "session_secret"
      })
    )

    // セッションが必要とのこと
    this.app.use(flash())

    // View 設定
    this.app.set("views", path.join(__dirname, "views"))
    this.app.set("view engine", "pug")

    this.app.use("/", index)
  }
}

export default new App().app
