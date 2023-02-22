import { PrismaClient } from '@prisma/client'

import IUser from '../interfaces/models/user.interface'
import IUserVerification from '../interfaces/models/user-verification.interface'

const {
  user: User,
  userVerification: UserVerification,
} = new PrismaClient()

export async function getUser({
  where,
  select,
}: {
  select: any,
  where: any,
}) {
  try {
    const found = await User.findFirst({
      where,
      select,
    })
    return Promise.resolve(found as IUser)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function createUser({
  data,
}: {
  data: any,
}) {
  try {
    const created = await User.create({
      data,
    })

    return Promise.resolve(created as IUser)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function updateUser({
  where,
  data,
  many = false,
}: {
  where: any,
  data: any,
  many: boolean,
}) {
  try {
    const updated = many ? User.updateMany({
      where,
      data,
    }) : User.update({
      where,
      data,
    })

    return Promise.resolve(updated)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function deleteUser({
  where,
  many = false,
}: {
  where: any,
  many: boolean,
}) {
  try {

    const deleted = many ? User.deleteMany({
      where,
    }) : User.delete({
      where,
    })
    return Promise.resolve(deleted)

  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function getUserVerification({
  where,
  select,
}: {
  where: any,
  select: any,
}) {
  try {
    const found = await UserVerification.findFirst({
      where,
      select,
    })

    return Promise.resolve(found as IUserVerification)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function createUserVerification({
  data,
}: {
  data: any,
}) {
  try {
    const created = UserVerification.create({
      data,
    })

    return Promise.resolve(created)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}

export async function updateUserVerification({
  where,
  data,
  many = false,
}: {
  where: any,
  data: any,
  many: boolean,
}) {
  try {
    const updated = many ? UserVerification.updateMany({
      where,
      data,
    }) : UserVerification.update({
      where,
      data,
    })

    return Promise.resolve(updated)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}
