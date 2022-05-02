import { config } from 'dotenv'

config()

export default {
  dbHost: process.env.HOST,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,
  dbDatabase: process.env.DATABASE,
}
