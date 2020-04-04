import { Application, Request, Response } from "express"
import * as express from "express"
import * as listEndpoints from "express-list-endpoints"

import books from "./routes/books"

class App {
  public app: Application

  public constructor() {
    this.app = express()

    // request.body でデータを受け取る設定
    // 設定しておかないと undefined になる
    this.app.use(express.urlencoded({ extended: true }))

    this.app.get("/", (request: Request, response: Response) => {
      response.send(listEndpoints(this.app))
    })

    // ルーターのミドルウェア設定
    this.app.use("/books", books)
  }
}

export default new App().app
