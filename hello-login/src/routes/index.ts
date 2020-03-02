import { Router, Request, Response, NextFunction } from "express"

import { findUserByNameAndPassword, findUserById } from "../entities/user"

const getSessionSafety = (
  session: Express.Session | undefined
): Express.Session => {
  if (session === undefined) {
    throw new Error("request.session is undefined")
  }
  return session
}

const router = Router()

router.get("/", (request: Request, response: Response) => {
  const session = getSessionSafety(request.session)
  if (session.userId) {
    const user = findUserById(session.userId)
    if (user) {
      response.render("index", { user })
      return
    }
  }
  response.render("index")
})

router.get("/login", (request: Request, response: Response) => {
  const session = getSessionSafety(request.session)
  if (session.userId) {
    response.redirect("/")
    return
  }
  response.render("login")
})

router.post("/login", (request, response, next: NextFunction) => {
  const { username, password } = request.body
  if (typeof username === "string" && typeof password === "string") {
    const user = findUserByNameAndPassword(username, password)
    if (user === undefined) {
      response.redirect("/error")
      return
    }

    const session = getSessionSafety(request.session)
    session.regenerate(error => {
      if (error) {
        next(error)
      } else if (request.session) {
        request.session.userId = user.id // セッションに保存
        response.redirect("/")
      } else {
        response.redirect("/error")
      }
    })
    return
  }
  response.redirect("/error")
})

router.get("/error", (request: Request, response: Response) => {
  response.render("error")
})

router.get("/logout", (request, response, next: NextFunction) => {
  const session = getSessionSafety(request.session)
  session.destroy(error => {
    if (error) {
      next(error)
    } else {
      response.render("logout")
    }
  })
})

router.get("/favicon.ico", (request: Request, response: Response) => {
  response.send()
})

export default router
