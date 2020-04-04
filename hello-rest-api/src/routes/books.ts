import { Router, Request, Response } from "express"

import BookRepository from "../entities/book"

const router = Router()

// curl localhost:10300/books
// curl localhost:10300/books?page=1
router.get("/", (request: Request, response: Response) => {
  const repository = new BookRepository()

  const page = Number(request.query.page)
  if (Number.isNaN(page)) {
    const books = repository.findAll()
    response.json(books)
    return
  }
  const books = repository.find(page)
  response.json(books)
})

// curl -X POST http://localhost:10300/books -d "title=IRONMAN&price=2980"
router.post("/", (request: Request, response: Response) => {
  // request.body のバリデーションしてない
  const repository = new BookRepository()
  const newBook = repository.create(request.body.title, request.body.price)
  response.status(201)
  response.json(newBook)
})

// curl localhost:10300/books/1
router.get("/:id", (request: Request, response: Response) => {
  const repository = new BookRepository()
  const id = Number(request.params.id)
  const book = repository.findById(id)
  if (book) {
    response.json(book)
    return
  }
  response.status(404)
  response.send("")
})

// curl -X PATCH http://localhost:10300/books/2 -d "title=Book&price=39800"
router.patch("/:id", (request: Request, response: Response) => {
  const repository = new BookRepository()
  const id = Number(request.params.id)
  const book = repository.update(id, request.body.title, request.body.price)
  if (book) {
    response.json(book)
    return
  }
  response.status(404)
  response.send("")
})

// curl -X DELETE localhost:10300/books/1
router.delete("/:id", (request: Request, response: Response) => {
  const repository = new BookRepository()
  const id = Number(request.params.id)
  const result = repository.delete(id)
  response.status(204)
  response.send(result)
})

// curl localhost:10300/books/1/comments
router.get("/:id/comments", (request: Request, response: Response) => {
  // コメントの一覧を取ろう。
  // 最初にある程度データを用意しとくと良いかも。
  const repository = new BookRepository()
  const id = Number(request.params.id)
  const book = repository.findById(id)
  if (book) {
    response.json(book.comments)
    return
  }
  response.status(404)
  response.send("")
})

export default router
