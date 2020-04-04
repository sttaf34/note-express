import { Router } from "express"
import { check, validationResult } from "express-validator"

const router = Router()

// curl 'http://localhost:10300?name=sttaf34&age=38'
// curl 'http://localhost:10300?name=sttaf34sttaf34&age=38'
router.get(
  "/",
  [check("name").isLength({ max: 10 }), check("age").isNumeric()],
  (request, response) => {
    const result = validationResult(request)
    if (result.isEmpty()) {
      response.send("Good Parameter!\n")
    } else {
      response.send("Bad Parameter...\n")
      console.log(result.array())
    }
  }
)

export default router
