import { Server } from '@hapi/hapi'
import environmentConfig from './config/environment.config'
import logger from './config/logger.config'

import { getServer } from './server/application'

getServer().then(async (server: Server) => {
  logger.info(`Server on ${environmentConfig.PORT} at ${environmentConfig.HOST}`)
  await server.start()
}).catch(err => { throw err })
