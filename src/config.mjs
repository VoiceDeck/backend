import fs from 'fs/promises'
import _fs from 'fs'
import os from 'os'
import path from 'path'
import url from 'url'
import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export const HTTP_PORT = process.env.HTTP_PORT ?? 8000

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/db'

mongoose.connect(MONGO_URL)
  .catch(err => {
    console.log(err)
    console.log('Error establishing connection to db')
    process.exit(1)
  })

