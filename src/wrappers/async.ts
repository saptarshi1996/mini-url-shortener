import {
  type Request,
  type Response,
  type NextFunction
} from 'express'

// Type for route handler
type RouteHandler = (req: Request, res: Response, next?: NextFunction) => Promise<void> | void

// Wrapper function
export default function (handler: RouteHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
