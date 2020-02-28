import { Router, Request, Response } from "express"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  const message = request.flash("message")
  response.render("index", { name: "sttaf34", message })
})

router.post("/", (request: Request, response: Response) => {
  request.flash("message", "登録しました")
  response.redirect("/")
})

export default router
