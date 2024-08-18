import { type Request } from 'express'

import {
  getUserFromDB
} from '../repository/user'

import NotFoundError from '../exceptions/not-found'
import ForbiddenError from '../exceptions/forbidden'
import { generateToken } from '../helpers/auth'

import type IUser from '../interfaces/models/user'
import { verifyPassword } from '../helpers/bcrypt'

export const userLogin = async (req: Request) => {
  const loginPayload = req.body as {
    email: string
    password: string
  }

  const userExists = await getUserFromDB({
    where: {
      email: loginPayload.email
    },
    select: {
      id: true,
      password: true,
      is_verified: true
    }
  }) as IUser

  if (!userExists) {
    throw new NotFoundError('User does not exists.')
  }

  if (!userExists.is_verified) {
    throw new ForbiddenError('User not verified.')
  }

  const passwordMatch = verifyPassword(loginPayload.password, userExists.password as string)
  if (!passwordMatch) {
    throw new ForbiddenError('Invalid password.')
  }

  const token = generateToken({ id: userExists.id })

  return { token }
}

export const userRegister = async (req: Request) => {
  return { message: 'User registered successfully' }
}

export const verifyUser = async (req: Request) => {

}

export const resendToken = async (req: Request) => {

}
