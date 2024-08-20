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

export const updateUserByIdToDB = async ({
  id,
  data
}: {
  id: number
  data: any
}) => {
  return await User.update({
    where: { id },
    data
  })
}

export const updateUserToDB = async ({
  where,
  data
}: {
  where: any
  data: any
}) => {
  return await User.update({
    where,
    data
  })
}

export const createUserToDBBulk = async (payload: any[]) => {
  return await User.createMany({ data: payload })
}

export const deleteUserByIDFromDB = async (id: number) => {
  return await User.delete({ where: { id } })
}
