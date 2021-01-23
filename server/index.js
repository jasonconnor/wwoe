import fs from 'fs'
import https from 'https'
import dotenv from 'dotenv'
import express from 'express'

import connect from './conf/db.js'

const app = express()
dotenv.config()

const httpsOptions = {
  key: fs.readFileSync('../bin/key.pem'),
  cert: fs.readFileSync('../bin/cert.pem')
}

const server = https.createServer(httpsOptions, app)

server.listen(443, () => {
  console.log('HTTPS server started.')
  connect(process.env.MONGO_URI)
})