import { Request } from '@hapi/hapi'

import {
  getUser,
} from '../dao/user.dao'

import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'
import InternalServerError from '../errors/InternalServerError'

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

    const token = ''

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

  } catch (ex: any) {
    return new Error(ex)
  }
}
