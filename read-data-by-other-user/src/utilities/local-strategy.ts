import { Strategy, IVerifyOptions, VerifyFunction } from "passport-local"

import { User, userRepository } from "../entities/user"

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

    // form > input > name を username, password にしとけば、
    // ユーザが入力した値が渡ってくる（デフォルト）
    console.log(username, password)

    // 認証OKだった場合、実際はDBのデータと照らし合わせたりする
    const user = userRepository.findByNameAndPassword(username, password)
    if (user) {
      return done(null, user, { message: "こんにちは！" })
    }

    // 認証NGだった場合、パスワード間違いとか
    return done(null, false, { message: "何かが違うようです" })
  }

  return new Strategy(verifyFunction)
}

export default localStrategy
