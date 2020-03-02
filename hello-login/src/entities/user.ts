/* eslint-disable lines-between-class-members */
export class User {
  id: number
  name: string
  age: number

  constructor(id: number, name: string, age: number) {
    this.id = id
    this.name = name
    this.age = age
  }
}

const users: User[] = [
  new User(1, "Alice", 33),
  new User(2, "Bob", 44),
  new User(3, "Charles", 55)
]

export const findUserByNameAndPassword = (
  name: string,
  password: string
): User | undefined => {
  if (password.length <= 0) {
    return undefined
  }
  return users.find(user => user.name === name)
}

export const findUserById = (userId: number): User | undefined => {
  return users.find(user => user.id === userId)
}

export default users
