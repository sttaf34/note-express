import { Router, Request, Response, NextFunction } from "express"
import { readFile } from "fs"

const router = Router()

// 公式のエラー処理のドキュメント
// https://expressjs.com/ja/guide/error-handling.html

router.get("/", (request: Request, response: Response) => {
  // デフォルトのエラーハンドラがエラーをキャッチした時に、
  // NODE_ENV=develop    => スタックトレースがブラウザに表示される
  // NODE_ENV=production => スタックトレースがブラウザに表示されない
  // yarn develop と yarn production で区別するようにしてある
  console.log(process.env.NODE_ENV)
  response.send(`GET / \n`)
})

router.get("/error-sync", () => {
  // 同期的な処理でエラーが発生した場合は、
  // デフォルトのエラーハンドラで自動的にキャッチされる
  throw new Error("error-sync")
})

router.get("/error-async-server-stop", () => {
  // 非同期な処理でエラーが発生した場合は、
  // デフォルトのエラーハンドラで自動的にキャッチされないので、サーバが停止する
  setTimeout(() => {
    throw new Error("error-async-server-stop")
  }, 2000)
})

router.get("/error-async", (request, response, next: NextFunction) => {
  // ↑のをデフォルトのエラーハンドラでキャッチしたい場合はこうなる
  setTimeout(() => {
    try {
      throw new Error("error-async")
    } catch (error) {
      next(error)
    }
  }, 2000)
})

router.get("/error-async", (request, response, next: NextFunction) => {
  // これだと
  // デフォルトのエラーハンドラで自動的にキャッチされないので、サーバが停止する
  try {
    setTimeout(() => {
      throw new Error("error-async-server-stop")
    }, 2000)
  } catch (error) {
    next(error)
  }
})

router.get("/error-async-file", (request, response, next: NextFunction) => {
  // 非同期な処理から返されたエラーを next() に渡せば、自動的にキャッチされる
  readFile("filefilefile", (error, data) => {
    if (error) {
      // next() に渡さない場合、サーバが停止する
      next(error)
    } else {
      response.send(data)
    }
  })
})

export default router
