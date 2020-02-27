import { Router, Request, Response } from "express"

const router = Router()

// curl http://localhost:9900/?name=sttaf34
router.get("/", (request: Request, response: Response) => {
  console.log(request.query)
  response.send(`GET /\n`)
})

// curl -X POST http://localhost:9900 -d "name=sttaf34&age=38"
router.post("/", (request: Request, response: Response) => {
  console.log(request.body)
  response.send("POST /\n")
})

export default router
