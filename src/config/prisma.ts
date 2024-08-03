import { PrismaClient } from '@prisma/client'

const { user } = new PrismaClient()

export default {
  User: user
}
