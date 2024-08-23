import { sign, verify } from 'jsonwebtoken'

import environment from '../config/environment'

export const generateToken = (payload: Record<string, unknown>): string => {
  return sign(payload, environment.JWT_SECRET, {
    expiresIn: '1d'
  })
}

export const validateToken = (token: string): { id: number } => {
  const response = verify(token, environment.JWT_SECRET) as {
    id: number
  }
  return { id: response.id }
}

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000)
