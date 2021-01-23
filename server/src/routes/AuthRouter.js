import express from 'express'

import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

AuthRouter.get('/login', AuthController.login)

export default AuthRouter