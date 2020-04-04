interface Book {
  id: number
  title: string
  price: number
  comments: { id: number; body: string }[]
}

// DBの代わり
const books = [
  {
    id: 1,
    title: "Apple",
    price: 1980,
    comments: [
      { id: 1, body: "Good." },
      { id: 2, body: "Very useful!" }
    ]
  },
  { id: 2, title: "Bob", price: 4400, comments: [] },
  { id: 3, title: "Charles", price: 1480, comments: [] },
  { id: 4, title: "Dave", price: 3280, comments: [] },
  { id: 5, title: "Ear", price: 980, comments: [] }
]

export default class BookRepository {
  private readonly COUNT_PER_PAGE = 2

  private books: Book[]

  constructor() {
    this.books = books
  }

  public findById = (id: number): Book | undefined => {
    return this.books.find(book => book.id === id)
  }

  public findAll = (): Book[] => {
    return this.books
  }

  public find = (page: number): Book[] => {
    const startIndex = (page - 1) * this.COUNT_PER_PAGE
    const endIndex = page * this.COUNT_PER_PAGE
    return this.books.slice(startIndex, endIndex)
  }

  public create = (title: string, price: number): Book => {
    // 同時アクセスで id が重複する可能性がある処理になっている
    const ids = this.books.map(book => book.id)
    const maxId = Math.max(...ids)
    const newBook = {
      id: maxId + 1,
      title,
      price,
      comments: []
    }
    this.books.push(newBook)
    return newBook
  }

  public update = (
    id: number,
    title: string,
    price: number
  ): Book | undefined => {
    const book = this.findById(id)
    if (book == null) {
      return undefined
    }
    book.title = title
    book.price = price
    return book
  }

  public delete = (id: number): boolean => {
    const before = this.books.length
    this.books = this.books.filter(book => book.id !== id)
    const after = this.books.length
    return before > after
  }
}
