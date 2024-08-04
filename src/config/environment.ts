import { config } from 'dotenv'

config()

const environment = {
  SERVER_PORT: process.env.SERVER_PORT as string,
  SERVER_HOST: process.env.SERVER_HOST as string,
  JWT_SECRET: process.env.JWT_SECRET as string
}

export default environment
