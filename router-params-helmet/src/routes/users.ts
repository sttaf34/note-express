import { Router, Request, Response } from "express"

import users from "../entities/user"

const router = Router()

router.get("/", (request: Request, response: Response) => {
  response.send(users)
})

router.get("/:id", (request: Request, response: Response) => {
  // ちゃんとしたバリデーションではない
  const id = Number(request.params.id)
  const aUser = users.find(user => user.id === id)
  if (aUser) {
    response.send(aUser)
    return
  }
  response.send("Userが見つかりません")
})

export default router
