import { PrismaClient } from '@prisma/client'

const {
  user,
  userVerification
} = new PrismaClient()

export {
  user,
  userVerification
}
