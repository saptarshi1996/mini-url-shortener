import { type Request } from 'express'

import {
  createUserToDB,
  getUserFromDB
} from '../repository/user'

import { hashPassword, verifyPassword } from '../helpers/bcrypt'
import { generateToken } from '../helpers/auth'

import NotFoundError from '../exceptions/not-found'
import ForbiddenError from '../exceptions/forbidden'

import type IUser from '../interfaces/models/user'
import logger from '../config/logger'

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
  const registerPayload = req.body as {
    first_name: string
    last_name: string
    email: string
    password: string
  }

  const userExists = await getUserFromDB({
    where: {
      email: registerPayload.email
    },
    select: {
      id: true
    }
  }) as IUser

  if (!userExists) {
    throw new ForbiddenError('User already exists.')
  }

  const hash = hashPassword(registerPayload.password)

  const newUser = await createUserToDB({
    first_name: registerPayload.first_name,
    last_name: registerPayload.last_name,
    email: registerPayload.email,
    password: hash
  })

  logger.info(newUser)

  return { message: 'User registered successfully.' }
}

export const verifyUser = async (req: Request) => {

}

export const resendToken = async (req: Request) => {

}
