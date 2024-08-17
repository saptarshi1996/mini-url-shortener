import { type Request } from 'express'

export const userLogin = async (req: Request) => {
  return { message: 'ok' }
}

export const userRegister = async (req: Request) => {
  return { message: 'User registered successfully' }
}
