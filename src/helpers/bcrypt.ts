import { hashSync, compareSync, genSaltSync } from 'bcryptjs'

export const hashPassword = (password: string) => hashSync(password, genSaltSync(10))

export const verifyPassword = (password: string, hash: string) => compareSync(password, hash)
