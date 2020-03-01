import { Router, Request, Response } from "express"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  if (request.session === undefined) {
    throw new Error("request.session is undefined")
  }

  const newCount: number =
    typeof request.session.count === "number" ? request.session.count + 1 : 1
  request.session.count = newCount
  response.render("index", { count: newCount })

  // Chrome DevTools > Application > Cookies を開くと
  // connect.sid（デフォルトのキー名）がセッションIDとして使われている
  // 同じブラウザの別タブだと同じセッションになる
  // 別ブラウザだと別のセッションになる
})

router.get("/favicon.ico", (request: Request, response: Response) => {
  response.send()
})

export default router
