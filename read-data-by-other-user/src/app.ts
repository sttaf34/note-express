import express from "express"
import session from "express-session"
import passport from "passport"
import path from "path"
import flash from "connect-flash"

import localStrategy from "./utilities/local-strategy"
import index from "./routes/index"
import logs from "./routes/logs"
import { User, userRepository } from "./entities/user"

class App {
  public app: express.Application

  public initAuth(): void {
    // request.body でデータを受け取る設定
    // 設定しておかないと undefined になる
    this.app.use(express.urlencoded({ extended: true }))

    // セッション設定
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || "secret",
      })
    )

    // 認証設定
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    passport.use(localStrategy())

    // 認証がOKでユーザが特定できたらばここに来る、done に渡すことで
    // { セッションID: ユーザID } の形でセッションストアに保存される
    passport.serializeUser(
      (user: User, done: (error: Error | null, id: number) => void): void => {
        // セッションにユーザ情報を保存したときに呼ばれる
        console.log(`passport.serializeUser user.id -> ${user.id}`)
        done(null, user.id)
      }
    )

    // ブラウザからリクエストが来て、それにはクッキーが含まれていて、
    // クッキーの中にセッションIDが含まれていて、
    // セッションストアからセッションIDをキーとしてユーザIDを取り出す
    // ユーザIDからユーザオブジェクトを特定し done に渡すと
    // request.user で取れるようになる
    passport.deserializeUser(
      (id: number, done: (error: Error | null, user?: User) => void): void => {
        // セッションからユーザ情報を取り出すとき都度呼ばれる
        console.log(`passport.deserializeUser id -> ${id}`)
        const user = userRepository.findUser(id)
        if (user) {
          done(null, user)
        } else {
          done(new Error("ユーザが見つからない"))
        }
      }
    )
  }

  public constructor() {
    this.app = express()

    // View設定
    this.app.set("views", path.join(__dirname, "views"))
    this.app.set("view engine", "pug")

    // 認証関連設定
    this.initAuth()

    this.app.use(flash())

    // ルーティング設定
    this.app.use("/", index)
    this.app.use("/logs", logs)
  }
}

export default new App().app
