import { sign, verify } from 'jsonwebtoken'

import environment from '../config/environment'

export const generateToken = (payload: Record<string, unknown>): string => {
  return sign(payload, environment.JWT_SECRET, {
    expiresIn: '1d'
  })
}

export const validateToken = (token: string): string => {
  return verify(token, environment.JWT_SECRET) as string
}
