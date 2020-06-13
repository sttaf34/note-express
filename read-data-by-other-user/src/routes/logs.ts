import { Router, Request, Response } from "express"

import { logRepository } from "../entities/log"
import { User, userRepository } from "../entities/user"

const router = Router()

router.get("/bad", (request: Request, response: Response) => {
  if (request.user === undefined) {
    console.log("認証していません")
    response.redirect("../login")
    return
  }

  if (request.query.userBookId === undefined) {
    console.log("パラメータがない")
    response.render("logs")
    return
  }

  // 適当な userBookId を指定されたときに
  // 他のユーザのデータも見ることができるようになってしまっているような実装
  if (typeof request.query.userBookId === "string") {
    const userBookId = Number(request.query.userBookId)
    const logs = logRepository.filterByUserBookId(userBookId)
    response.render("log", { logs })
    return
  }

  response.render("log")
})

router.get("/", (request: Request, response: Response) => {
  if (request.user === undefined) {
    console.log("認証していません")
    response.redirect("../login")
    return
  }

  if (request.query.userBookId === undefined) {
    console.log("パラメータがない")
    response.render("logs")
    return
  }

  if (typeof request.query.userBookId !== "string") {
    console.log("パラメータの型がおかしい")
    response.render("logs")
    return
  }

  if (request.user === undefined) {
    console.log("request.user is undefined")
    response.render("logs")
    return
  }

  // TODO: request.user が自分が定義している User の方になる書き方があるはず
  const user: User = request.user as User

  // 適当な userBookId を指定されたときでも
  // 他のユーザのデータは見ることができないようにした形
  const userBookId = Number(request.query.userBookId)
  const logs = userRepository.findLogs(user.id, userBookId)
  response.render("log", { logs })
})

export default router
