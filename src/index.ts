import Application from './server/application'

import environment from './config/environment'
import logger from './config/logger'

Application().then((server) => {
  server.listen(+environment.SERVER_PORT, environment.SERVER_HOST, () => {
    logger.info(`Server on ${environment.SERVER_HOST}:${environment.SERVER_PORT}`)
  })
}).catch(err => { throw err })
