import * as express from "express"
import * as session from "express-session"
import * as path from "path"
import * as cookieParser from "cookie-parser"

import index from "./routes/index"

class App {
  public app: express.Application

  public initAuth(): void {
    // request.body でデータを受け取る設定
    // 設定しておかないと undefined になる
    this.app.use(express.urlencoded({ extended: true }))

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

    // クッキー設定
    this.app.use(cookieParser())
  }

  public constructor() {
    this.app = express()

    // View設定
    this.app.set("views", path.join(__dirname, "views"))
    this.app.set("view engine", "pug")

    // 認証関連設定
    this.initAuth()

    // ルーティング設定
    this.app.use("/", index)
  }
}

export default new App().app
