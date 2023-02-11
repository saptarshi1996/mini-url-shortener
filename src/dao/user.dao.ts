import { PrismaClient } from '@prisma/client'

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
    const userFound = await User.findFirst({
      where,
      select,
    })
    return Promise.resolve(userFound)
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
    const userCreated = await User.create({
      data,
    })

    return Promise.resolve(userCreated)
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
    const userUpdated = many ? User.updateMany({
      where,
      data,
    }) : User.update({
      where,
      data,
    })

    return Promise.resolve(userUpdated)
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

    const userDeleted = many ? User.deleteMany({
      where,
    }) : User.delete({
      where,
    })
    return Promise.resolve(userDeleted)

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
    const userVerificationFound = await UserVerification.findFirst({
      where,
      select,
    })

    return Promise.resolve(userVerificationFound)
  } catch (ex: any) {
    return Promise.reject(ex)
  }
}
