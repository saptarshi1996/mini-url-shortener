import { Server, ServerRegisterPluginObject } from '@hapi/hapi'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger, { RegisterOptions } from 'hapi-swagger'
import environmentConfig from '../config/environment.config'

import { version } from '../../package.json'

import IUser from '../interfaces/models/user.interface'

import authMiddleware from '../middlewares/auth.middleware'
import responseMiddleware from '../middlewares/response.middleware'
import routeMiddleware from '../middlewares/route.middleware'

import routes from '../routes'

declare module '@hapi/hapi' {
  export interface Request {
    user?: IUser,
  }
}

async function loadServer(): Promise<Server> {

  const server = new Server({
    port: environmentConfig.PORT,
    host: environmentConfig.HOST,
    routes: {
      cors: true,
    },
  })

  const swaggerOptions: RegisterOptions = {
    info: {
      title: 'Mini Url Shortner API Documentation',
      version,
    },
    grouping: 'tags',
    basePath: '/api',
    documentationPath: '/api/documentation',
    jsonPath: '/api/swagger.json',
    swaggerUIPath: '/api/swagger/ui',
    schemes: environmentConfig.STAGE === 'LOCAL' ? ['http'] : ['http', 'https'],
  }

  const plugins: Array<ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]

  // Auth middleware
  server.auth.scheme('custom', authMiddleware)
  server.auth.strategy('default', 'custom')
  server.auth.default('default')

  server.ext('onRequest', routeMiddleware)
  server.ext('onPreResponse', responseMiddleware)

  await server.register(plugins)
  await server.register(routes, {
    routes: {
      prefix: '/api',
    },
  })

  return server
}

export async function getServerTest() {
  const server = await loadServer()
  await server.initialize()
  return server
}

export function getServer() {
  return loadServer()
}
