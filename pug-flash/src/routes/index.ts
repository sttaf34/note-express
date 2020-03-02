import { Router, Request, Response } from "express"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  // キーを指定して取得
  const message = request.flash("message")

  // views/index.pug を使ってレスポンスを返す
  response.render("index", { name: "sttaf34", message })
})

router.post("/", (request: Request, response: Response) => {
  // キーと値を指定して格納
  request.flash("message", "登録しました")

  response.redirect("/")
})

// response.render でなく response.send だと、
// browser-sync が動いてはいるけど、ブラウザの方は更新がされないっぽい
router.get("/test", (request: Request, response: Response) => {
  response.send("ABC")
})

export default router
