import {
  type Request,
  type Response,
  type NextFunction
} from 'express'

import { validateToken } from '../helpers/auth'

import logger from '../config/logger'

import { getUserFromDB } from '../repository/user'

import type IUser from '../interfaces/models/user'

export default async function (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers as {
    authorization: string
  }

  const bearerToken = authorization?.split(' ')
  const token = bearerToken[1]

  const tokenResponse = validateToken(token)
  logger.info(tokenResponse.id)

  const userExists = await getUserFromDB({
    where: {
      id: tokenResponse.id
    },
    select: {
      id: true
    }
  }) as IUser

  if (userExists) {
    req.user = {
      id: userExists.id
    }
    next()
  } else {
    return res.status(403).json({ message: 'Invalid authorization' })
  }
}
