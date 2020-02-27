import { Application } from "express"
import * as express from "express"
import * as helmet from "helmet"
import * as listEndpoints from "express-list-endpoints"

import index from "./routes/index"
import users from "./routes/users"

class App {
  public app: Application

  public constructor() {
    this.app = express()

    // https://expressjs.com/ja/advanced/best-practice-security.html
    // 公式推奨のセキュリティ対策、HTTPヘッダを適切にしてくれる
    this.app.use(helmet())

    // request.body でデータを受け取る設定
    // 設定しておかないと undefined になる
    this.app.use(express.urlencoded({ extended: true }))

    // ルーターのミドルウェア設定
    this.app.use("/", index)
    this.app.use("/users", users)

    // ルーティング設定を出力
    console.log(listEndpoints(this.app))
  }
}

export default new App().app
