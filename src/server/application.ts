import express from 'express'
import {
  type Request,
  type Response,
  type NextFunction
} from 'express'

import logger from '../config/logger'

import NotFoundError from '../exceptions/not-found'

const Application = async () => {
  const app = express()

  app.use(express.urlencoded({
    extended: false
  }))
  app.use(express.json())

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack)

    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Internal Server Error' })
  })

  return app
}

export default Application
