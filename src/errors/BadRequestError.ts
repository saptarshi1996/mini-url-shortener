export default class BadRequestError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 400
  }
}
