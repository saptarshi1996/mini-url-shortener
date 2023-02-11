import {
  Plugin,
  Server,
} from '@hapi/hapi'

import * as authController from '../controllers/login.controller'

import userLoginValidation from '../validations/auth/login.validation'

const tags = ['api', 'Authentication']

export default {

  name: 'Authentication',

  register: (server: Server) => {

    server.route([
      {
        method: 'POST',
        path: '/auth/userLogin',
        options: {
          auth: false,
          description: 'User login',
          tags,
          handler: authController.userLogin,
          validate: userLoginValidation,
        },
      },
    ])

  },

} as Plugin<unknown>
