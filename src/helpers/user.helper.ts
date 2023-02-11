import { sign, verify } from 'jsonwebtoken'
import { hashSync, compareSync, genSaltSync } from 'bcryptjs'

import Environment from '../config/environment.config'

export function hashPassword({
  password,
}: {
  password: string,
}): string {
  return hashSync(password, genSaltSync(10))
}

export function comparePassword({
  hash,
  password,
}: {
  hash: string,
  password: string,
}): boolean {
  return compareSync(password, hash)
}

export function generateToken(payload: { id: number }) {
  try {
    const token = sign(payload, '1234')
    return Promise.resolve(token)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function verifyToken(token: string) {
  try {
    const user = verify(token, (Environment.JWT_SECRET as string))
    const parsed = JSON.parse(user as string)
    return Promise.resolve(parsed as { id: number })
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000)
}
