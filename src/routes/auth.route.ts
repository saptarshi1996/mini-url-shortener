import {
  Plugin,
  Server,
} from '@hapi/hapi'

import * as authController from '../controllers/auth.controller'

import userLoginValidation from '../validations/auth/login.validation'
import userRegisterValidation from '../validations/auth/register.validation'

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
      {
        method: 'POST',
        path: '/auth/userRegister',
        options: {
          auth: false,
          description: 'User Register',
          tags,
          handler: authController.userRegister,
          validate: userRegisterValidation,
        }
      }
    ])

  },

} as Plugin<unknown>
