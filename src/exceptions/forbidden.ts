export default class ForbiddenError extends Error {
  statusCode: number
  constructor (message: string) {
    super(message)
    this.statusCode = 403
  }
}
