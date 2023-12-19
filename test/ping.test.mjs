import test from 'ava'
import fetch from 'node-fetch'
import { exit, SERVER_HOST } from './server.mjs'
import mongoose from 'mongoose'

test('should respond to ping', async t => {
  const url = new URL('/ping', SERVER_HOST)
  const r = await fetch(url.toString())
  const { pong } = await r.json()
  t.is(r.status, 200)
  t.true(pong)
})

test.after.always('close the server', async t => {
  await exit()
})
