import { sign } from 'jsonwebtoken'

import environment from '../config/environment'

export const generateToken = (payload: Record<string, unknown>): string => {
  return sign(payload, environment.JWT_SECRET, {
    expiresIn: '1d'
  })
}
