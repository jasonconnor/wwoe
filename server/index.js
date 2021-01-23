import fs from 'fs'
import https from 'https'
import express from 'express'

const app = express()

const httpsOptions = {
  key: fs.readFileSync('../bin/key.pem'),
  cert: fs.readFileSync('../bin/cert.pem')
}

const server = https.createServer(httpsOptions, app)

server.listen(443, () => {
  console.log('https server started.')
})