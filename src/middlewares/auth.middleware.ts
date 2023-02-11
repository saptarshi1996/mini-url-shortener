import { Request, ResponseToolkit } from '@hapi/hapi'

import { getUser } from '../dao/user.dao'

import NotFoundError from '../errors/NotFoundError'
import { verifyToken } from '../helpers/user.helper'

export default function () {
  return {
    authenticate: async (request: Request, h: ResponseToolkit) => {
      try {

        const { authorization } = request.headers

        const decoded: { id: number } = await verifyToken(authorization)

        const userFound = await getUser({
          where: {
            id: decoded.id,
          },
          select: {
            id: true,
          }
        })

        if (!userFound) {
          throw new NotFoundError('User does not exists')
        }

        request.user = userFound
        return h.continue

      } catch (err: any) {
        return h.response({
          message: err.message,
        }).code(err.statusCode || 500).takeover()
      }
    },
  }
}
