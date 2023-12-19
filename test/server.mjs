import getPort from 'get-port'
import { v4 } from 'uuid'

process.env.HTTP_PORT = await getPort()
process.env.MONGO_URL = `mongodb://127.0.0.1:27017/db_${v4()}`

export const { exit } = await import('../src/server.mjs')

export const SERVER_HOST = `http://127.0.0.1:${process.env.HTTP_PORT}`
