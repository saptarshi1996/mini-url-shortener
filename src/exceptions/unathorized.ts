export default class UnAuthorizedError extends Error {
  statusCode: number
  constructor (message: string) {
    super(message)
    this.statusCode = 401
  }
}
