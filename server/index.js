import fs from 'fs'
import cors from 'cors'
import https from 'https'
import dotenv from 'dotenv'
import express from 'express'

import connect from './conf/db.js'
import AuthRouter from './src/routes/AuthRouter.js'

const app = express()
dotenv.config()

// CORS config
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

// HTTPS config
const httpsOptions = {
  key: fs.readFileSync('../bin/key.pem'),
  
  cert: fs.readFileSync('../bin/cert.pem')
}
// middleware
app.use(cors(corsOptions))
app.use(express.json())

// routes
app.use('/', AuthRouter)

const server = https.createServer(httpsOptions, app)

server.listen(443, () => {
  console.log('HTTPS server started.')
  connect(process.env.MONGO_URI)
})