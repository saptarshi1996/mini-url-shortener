import { Request } from '@hapi/hapi'

import {
  getUser,
  createUser,
  updateUser,
  getUserVerification,
  createUserVerification,
} from '../dao/user.dao'

import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'
import InternalServerError from '../errors/InternalServerError'
import UnAuthenticatedError from '../errors/UnAuthenticatedError'

import {
  comparePassword,
  generateOtp,
  generateToken,
  hashPassword,
} from '../helpers/user.helper'

import { addTimeInMinutesToCurrentTime } from '../helpers/date.helper'

export async function userLogin(req: Request) {
  try {

    const userLoginPayload = req.payload as {
      email: string,
      password: string,
    }

    const userExists = await getUser({
      where: {
        email: userLoginPayload.email,
      },
      select: {
        id: true,
        password: true,
        is_verified: true,
      },
    })

    if (!userExists) {
      return new NotFoundError('User does not exists')
    }

    if (!userExists.is_verified) {
      return new UnAuthenticatedError('User not verified')
    }

    // Match password
    const isMatch = comparePassword({
      password: userLoginPayload.password,
      hash: userExists.password as string,
    })

    if (!isMatch) {
      return new UnAuthenticatedError('Invalid credentials')
    }

    const token = await generateToken({ id: userExists.id as number })

    return {
      token,
    }

  } catch (ex: any) {
    return new InternalServerError(ex)
  }
}

export async function userRegister(req: Request) {
  try {

    const userRegisterPayload = req.payload as {
      first_name: string,
      last_name: string,
      email: string,
      password: string,
    }

    const userExists = await getUser({
      where: {
        email: userRegisterPayload.email,
      },
      select: {
        id: true,
      }
    })

    if (userExists) {
      return new BadRequestError('User already exists')
    }

    const hashedPassword = hashPassword({
      password: userRegisterPayload.password,
    })

    const userCreated = await createUser({
      data: {
        first_name: userRegisterPayload.first_name,
        last_name: userRegisterPayload.last_name,
        email: userRegisterPayload.email,
        password: hashedPassword,
      }
    })

    const otp = generateOtp()
    const {
      created_at,
      expires_at,
    } = addTimeInMinutesToCurrentTime(15)

    // Create user verification.
    await createUserVerification({
      data: {
        otp,
        created_at,
        expires_at,
        user_id: userCreated.id,
      },
    })

    return {
      'message': 'User created successfully',
    }

  } catch (ex: any) {
    return new Error(ex)
  }
}

export async function userVerify(req: Request) {
  try {

    const userVerifyPayload = req.payload as {
      email: string,
      otp: number,
    }

    // Check if user exists
    const userFound = await getUser({
      where: {
        email: userVerifyPayload.email,
      },
      select: {
        id: true,
      },
    })

    if (!userFound) {
      return new NotFoundError('User does not exists')
    }

    if (userFound.is_verified) {
      return new BadRequestError('User already verified')
    }

    const userVerificationFound = await getUserVerification({
      where: {
        otp: userVerifyPayload.otp,
        user_id: userFound.id,
      },
      select: {
        id: true,
        is_verified: true,
        is_revoked: true,
      },
    })

    if (!userVerificationFound) {
      return new BadRequestError('User verification not valid')
    }

    if (!userVerificationFound.is_expired || !userVerificationFound.is_revoked) {
      return new BadRequestError('User verification not valid')
    }

    // Verify user and update user verification object.
    await updateUser({
      where: {
        id: userFound.id,
      },
      data: {
        is_verified: true,
      },
      many: false,
    })

    return {
      'message': 'User verified successfully',
    }

  } catch (ex: any) {
    return new Error(ex)
  }
}

export async function userResend(req: Request) {
  try {

    const userResendPayload = req.payload as {
      email: string
    }

    const userExists = await getUser({
      where: {
        email: userResendPayload.email,
      },
      select: {
        id: true,
        is_verified: true,
      }
    })

    if (!userExists) {
      return new NotFoundError('User does not exists')
    }

    // Check if user verification exists.
    const userVerificationFound = await getUserVerification({
      where: {
        user_id: userExists.id,
      },
      select: {
        id: true,
        is_verified: true,
        is_expired: true,
      }
    })

    if (!userVerificationFound) {
      return new NotFoundError('User verification does not exists')
    }

    if (userVerificationFound.is_expired || userVerificationFound) {
      return new BadRequestError('Invalid Request verification')
    }

  } catch (ex: any) {
    return new Error(ex)
  }
}
