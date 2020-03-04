/* eslint-disable lines-between-class-members */
export class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

const users: User[] = [
  new User(1, "Alice"),
  new User(2, "Bob"),
  new User(3, "Charles")
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
