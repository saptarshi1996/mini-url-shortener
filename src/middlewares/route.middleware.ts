import { Request, ResponseToolkit } from '@hapi/hapi'

import logger from '../config/logger.config'

export default function (req: Request, h: ResponseToolkit) {
  logger.info(`${req.method.toUpperCase()} | ${req.url}`)
  return h.continue
}
