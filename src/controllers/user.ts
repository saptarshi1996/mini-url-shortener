import { type Request } from 'express'

import logger from '../config/logger'

import { getUserFromDB } from '../repository/user'

export const getUser = async (req: Request) => {
  logger.info(req.user)

  const user = getUserFromDB({
    where: {
      id: req.user.id as number
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      is_verified: true,
      created_at: true,
      updated_at: true,
      deleted_at: true,
      mobile: true
    }
  })

  return user
}
