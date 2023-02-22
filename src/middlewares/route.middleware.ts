import { Request, ReqRefDefaults } from '@hapi/hapi'
import chalk from 'chalk'

import logger from '../config/logger.config'

export default function(request: Request<ReqRefDefaults>) {
  function printMethod(method: string) {
    if (method === 'GET') {
      return chalk.blueBright(method)
    } else if (method === 'POST') {
      return chalk.greenBright(method)
    } else if (method === 'PUT') {
      return chalk.yellowBright(method)
    } else if (method === 'DELETE') {
      return chalk.redBright(method)
    }
  }

  function printStatus(code: number) {
    if (code <= 299) {
      return chalk.greenBright(code)
    } else if (code > 299 && code <= 399) {
      return chalk.yellowBright(code)
    } else {
      return chalk.redBright(code)
    }
  }

  logger.info(printMethod(request.method.toUpperCase()) + ' ' + printStatus((request.response as any).statusCode) + ' ' + request.path)
}
