import express from 'express'
import {
  type Request,
  type Response,
  type NextFunction
} from 'express'

import logger from '../config/logger'

import NotFoundError from '../exceptions/not-found'

import authRouter from '../routes/auth'
import userRouter from '../routes/user'

import type IUser from '../interfaces/models/user'

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

const Application = async () => {
  const app = express()

  app.use(express.urlencoded({
    extended: false
  }))
  app.use(express.json())

  app.use('/auth', authRouter)
  app.use('/user', userRouter)

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
