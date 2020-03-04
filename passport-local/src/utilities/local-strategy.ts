import { Strategy, IVerifyOptions, VerifyFunction } from "passport-local"

import { User, findUserByNameAndPassword } from "../entities/user"

const localStrategy = (): Strategy => {
  const verifyFunction: VerifyFunction = (
    username: string,
    password: string,
    done: (
      error: Error | null,
      user?: User | false,
      options?: IVerifyOptions
    ) => void
  ): void => {
    // パスワード欄が空っぽの場合は、ここに来ないで failureRedirect に行く

    // DB接続エラー等が起きてしまった想定
    if (Math.random() < 0.1) {
      return done(new Error("何かしらのエラーが発生"))
    }

    // form > input > name を username, password にしとけば、
    // ユーザが入力した値が渡ってくる（デフォルト）
    console.log(username, password)

    // 認証OKだった場合、実際はDBのデータと照らし合わせたりする
    const user = findUserByNameAndPassword(username, password)
    if (user) {
      return done(null, user, { message: "こんにちは！" })
    }

    // 認証NGだった場合、パスワード間違いとか
    return done(null, false, { message: "何かが違うようです" })
  }

  return new Strategy(verifyFunction)
}

export default localStrategy
