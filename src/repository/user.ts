import {
  user as User
} from '../config/prisma'

export const getUserFromDB = async ({
  where,
  select
}: {
  where: any
  select: any
}) => {
  return await User.findFirst({
    where,
    select
  })
}

export const createUserToDB = async (payload: any) => {
  return await User.create({ data: payload, select: { id: true } })
}
