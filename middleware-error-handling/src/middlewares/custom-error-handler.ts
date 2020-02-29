import { Request, Response, NextFunction } from "express"

// 自作のエラー処理用のミドルウェアの定義
const customErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  // 例えば Loggly(https://www.loggly.com/) とかに送っといて
  console.log("customErrorHandler()", error)

  // あとは express のデフォルトエラーハンドラーにおまかせ
  next(error)

  // このミドルウェアを通ってから、
  // デフォルトのエラーハンドラに渡るという順序になる
}

export default customErrorHandler
