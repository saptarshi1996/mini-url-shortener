import { type Request } from 'express'

export const userLogin = async (req: Request) => {
  return { message: 'ok' }
}

export const userRegister = async (req: Request) => {
  return { message: 'User registered successfully' }
}

export const verifyUser = async (req: Request) => {

}

export const resendToken = async (req: Request) => {

}
