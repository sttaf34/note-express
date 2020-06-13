import { users, userBooks } from "./db"
import { Log, logRepository } from "./log"

export type User = {
  id: number
  name: string
}

type UserBook = {
  id: number
  userId: number
  bookId: number
}

class UserRepository {
  private users: User[]

  private userBooks: UserBook[]

  constructor() {
    this.users = users
    this.userBooks = userBooks
  }

  public findByNameAndPassword = (
    name: string,
    password: string
  ): User | undefined => {
    if (password.length <= 0) {
      return undefined
    }
    return users.find((user) => user.name === name)
  }

  public findUser = (userId: number): User | undefined => {
    return this.users.find((user) => user.id === userId)
  }

  // userId の人物が見ても良い UserBook の配列
  public findUserBooks = (userId: number): UserBook[] => {
    return this.userBooks.filter((userBook) => userBook.userId === userId)
  }

  // userId の人物が見ても良い UserBook の Log の配列
  public findLogs = (userId: number, userBookId: number): Log[] => {
    const allowedUserBooks = this.findUserBooks(userId)
    const allowedUserBookIds = allowedUserBooks.map((userBook) => userBook.id)
    if (allowedUserBookIds.includes(userBookId)) {
      return logRepository.filterByUserBookId(userBookId)
    }
    return []
  }
}

export const userRepository = new UserRepository()
