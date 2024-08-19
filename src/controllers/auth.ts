import { type Request } from 'express'

import {
  createUserToDB,
  getUserFromDB,
  updateUserByIdToDB
} from '../repository/user'
import {
  createUserVerificationToDB,
  getUserVerificationFromDB,
  updateUserVerificationByIdToDB,
  updateUserVerificationToDB
} from '../repository/user-verification'

import logger from '../config/logger'

import { hashPassword, verifyPassword } from '../helpers/bcrypt'
import { generateOtp, generateToken } from '../helpers/auth'

import NotFoundError from '../exceptions/not-found'
import ForbiddenError from '../exceptions/forbidden'

import type IUser from '../interfaces/models/user'
import type IUserVerification from '../interfaces/models/user-verification'

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

  if (userExists) {
    throw new ForbiddenError('User already exists.')
  }

  const hash = hashPassword(registerPayload.password)

  const newUser = await createUserToDB({
    first_name: registerPayload.first_name,
    last_name: registerPayload.last_name,
    email: registerPayload.email,
    password: hash
  }) as IUser

  logger.info(newUser)

  const otp = generateOtp()

  const createdAt = new Date()
  const expiredAt = new Date(createdAt)
  expiredAt.setMinutes(expiredAt.getMinutes() + 10)

  const userVerificationCreated = await createUserVerificationToDB({
    otp,
    user_id: newUser.id,
    created_at: createdAt,
    expired_at: expiredAt
  }) as IUserVerification

  logger.info(userVerificationCreated)

  return { message: 'User registered successfully.' }
}

export const verifyUser = async (req: Request) => {
  const verifyUserPayload = req.body as {
    email: string
    otp: number
  }

  const userExists = await getUserFromDB({
    where: {
      email: verifyUserPayload.email
    },
    select: {
      id: true,
      is_verified: true
    }
  }) as IUser

  if (!userExists) {
    throw new NotFoundError('User does not exists.')
  }

  if (userExists.is_verified) {
    throw new ForbiddenError('User already verified.')
  }

  const userVerificationExists = await getUserVerificationFromDB({
    where: {
      user_id: userExists.id,
      otp: verifyUserPayload.otp,
      is_expired: true,
      is_revoked: true
    },
    select: {
      id: true,
      expires_at: true
    }
  }) as IUserVerification

  if (!userVerificationExists) {
    throw new ForbiddenError('Invalid verification request')
  }

  const currentTime = new Date()
  const expiredAt = new Date(userVerificationExists.expired_at as string)
  if (currentTime > expiredAt) {
    throw new ForbiddenError('Token expired.')
  }

  await updateUserVerificationByIdToDB({
    id: userVerificationExists.id as number,
    data: {
      is_revoked: true,
      is_expired: true
    }
  })

  await updateUserByIdToDB({
    id: userExists.id as number,
    data: {
      is_verified: true
    }
  })

  return { message: 'User verified successfully' }
}

export const resendToken = async (req: Request) => {
  const resendTokenPayload = req.body as {
    email: string
  }

  const userExists = await getUserFromDB({
    where: {
      email: resendTokenPayload.email
    },
    select: {
      id: true,
      is_verified: true
    }
  }) as IUser

  if (!userExists) {
    throw new NotFoundError('User does not exists.')
  }

  if (userExists.is_verified) {
    throw new ForbiddenError('User already verified.')
  }

  await updateUserVerificationToDB({
    where: {
      user_id: userExists.id
    },
    data: {
      is_revoked: true,
      is_expired: true
    }
  })

  const otp = generateOtp()

  const createdAt = new Date()
  const expiredAt = new Date(createdAt)
  expiredAt.setMinutes(expiredAt.getMinutes() + 10)

  const userVerificationCreated = await createUserVerificationToDB({
    otp,
    user_id: userExists.id,
    created_at: createdAt,
    expired_at: expiredAt
  }) as IUserVerification

  logger.info(userVerificationCreated)

  return { message: 'Otp sent successfully' }
}
