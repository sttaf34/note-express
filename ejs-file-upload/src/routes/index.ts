import { Router, Request, Response } from "express"
import { diskStorage, DiskStorageOptions, StorageEngine } from "multer"
import * as multer from "multer"
import * as dayjs from "dayjs"

const router = Router()

// 1. multer の保存の設定を用意し・・・
const configuredStorage = (): StorageEngine => {
  const options: DiskStorageOptions = {
    // プロジェクトルートから見たパス
    destination: "./upload",

    // アップロードされたファイル名をそのまま使う場合、同じ名前だと上書きされる
    filename: (request, file, callback) => {
      // 上書きにならないように、現在時刻を付与してみる
      const now = dayjs().format("YYYYMMDDHHmmss")
      callback(null, `${now}_${file.originalname}`)
    },
  }
  const storage = diskStorage(options)
  return storage
}

router.get("/", (request: Request, response: Response) => {
  // views/index.ejs を使ってレスポンスを返す
  response.render("index", { name: "sttaf34" })
})

// 2. POST されて動作するところに追記すればアップロードされる
// single("file") は <input name="file"> への対応
router.post(
  "/",
  multer({ storage: configuredStorage() }).single("file"),
  (request: Request, response: Response) => {
    response.redirect("/result")
  }
)

router.get("/result", (request: Request, response: Response) => {
  response.render("result")
})

// React からファイルアップロードする用のエンドポイント
router.post(
  "/upload",
  multer({ storage: configuredStorage() }).single("file"),
  (request: Request, response: Response) => {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.status(200)
    response.json("")
  }
)

export default router
