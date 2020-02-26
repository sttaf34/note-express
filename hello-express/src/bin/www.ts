#!/usr/bin/env ts-node

import * as http from "http"
import app from "../app"

const port = process.env.PORT || 9700
app.set("port", port)

const onError = (error: Error): void => {
  console.log(error)
  throw error
}

const onListening = (): void => {
  console.log(`listening on port ${port}!`)
}

const server = http.createServer(app)
server.listen(port)
server.on("error", onError)
server.on("listening", onListening)
