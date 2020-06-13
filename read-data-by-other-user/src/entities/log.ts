import { logs } from "./db"

export type Log = {
  id: number
  userBookId: number
  datetime: string
}

class LogRepository {
  private logs: Log[]

  constructor() {
    this.logs = logs
  }

  public findById = (logId: number): Log | undefined => {
    return this.logs.find((log) => log.id === logId)
  }

  public filterByUserBookId = (userBookId: number): Log[] => {
    return this.logs.filter((log) => log.userBookId === userBookId)
  }
}

export const logRepository = new LogRepository()
