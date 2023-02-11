export default class UnAuthenticatedError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 401
  }
}
