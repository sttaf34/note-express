import * as express from "express"
import * as session from "express-session"
import * as path from "path"

import index from "./routes/index"

class App {
  public app: express.Application

  public constructor() {
    this.app = express()

    // セッション設定
    // オプションの説明 -> https://www.npmjs.com/package/express-session
    // 日本語訳 -> https://qiita.com/MahoTakara/items/8495bbafc19859ef463b
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || "session_secret"
      })
    )

    // View 設定
    this.app.set("views", path.join(__dirname, "views"))
    this.app.set("view engine", "pug")

    // ルーティング設定
    this.app.use("/", index)
  }
}

export default new App().app
