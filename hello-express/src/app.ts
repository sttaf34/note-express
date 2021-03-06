import { Express, Request, Response } from "express"
import * as express from "express"

class App {
  public app: Express

  public constructor() {
    this.app = express()

    this.app.get("/", (request: Request, response: Response) => {
      console.log(request.header("User-Agent"))
      response.send("Hello Express!")
    })
  }
}

export default new App().app
