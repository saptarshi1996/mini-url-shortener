import {
  userVerification as UserVerification
} from '../config/prisma'

export const getUserVerificationFromDB = async ({
  where,
  select
}: {
  where: any
  select: any
}) => {
  return await UserVerification.findFirst({
    where,
    select
  })
}

export const createUserVerificationToDB = async (payload: any) => {
  return await UserVerification.create({ data: payload, select: { id: true } })
}

export const updateUserVerificationToDB = async ({
  data,
  where
}: {
  data: any
  where: any
}) => {
  return await UserVerification.updateMany({
    where,
    data
  })
}

export const updateUserVerificationByIdToDB = async ({
  id,
  data
}: {
  id: number
  data: any
}) => {
  return await UserVerification.update({
    where: { id },
    data
  })
}
