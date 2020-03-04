import { Router, Request, Response } from "express"
import { authenticate } from "passport"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  // localStrategy の中で { message: "" } でセットされたもの
  const message = request.flash("success")
  response.render("index", { user: request.user, message })
})

router.get("/login", (request: Request, response: Response) => {
  if (request.user) {
    response.redirect("/")
  }

  response.render("login")
})

// https://knimon-software.github.io/www.passportjs.org/guide/authenticate/
router.post(
  "/login",
  authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/error",
    successFlash: true, // localStrategy 内の { message: "" } の有効化
    failureFlash: true // localStrategy 内の { message: "" } の有効化
  })
)

router.get("/error", (request: Request, response: Response) => {
  // localStrategy の中で { message: "" } でセットされたもの
  const message = request.flash("error")
  response.render("error", { message })
})

router.get("/logout", (request: Request, response: Response) => {
  request.logout()
  response.redirect("/")
})

router.get("/mypage", (request: Request, response: Response) => {
  if (request.user) {
    response.render("mypage", { user: request.user })
    return
  }
  response.redirect("/login")
})

router.get("/favicon.ico", (request: Request, response: Response) => {
  response.send()
})

export default router
