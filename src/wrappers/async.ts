import {
  type Request,
  type Response,
  type NextFunction
} from 'express'

import logger from '../config/logger'

export default function (handler: any) {
  return async (req: Request, res: Response, next?: NextFunction) => {
    try {
      logger.info(`${req.method} :: ${req.protocol}://${req.headers.host}/${req.originalUrl}`)
      const response = await handler(req, res, next)
      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }
}
