import { config } from 'dotenv'

import IEnvironment from '../interfaces/config/environment.interface'

config()

export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  STAGE: process.env.STAGE,
} as IEnvironment
