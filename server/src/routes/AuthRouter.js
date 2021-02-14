import express from 'express'

import upload from '../middleware/upload.js'
import Validator from '../middleware/Validator.js'
import Authentication from '../middleware/Authentication.js'
import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

// TODO: Move to UserRouter
AuthRouter.get('/account', Authentication.checkToken, AuthController.getAccount)

// POST Routes
AuthRouter.post('/login', upload.none(), Validator.login, AuthController.login)
AuthRouter.post('/register', upload.none(), Validator.register, AuthController.register)
AuthRouter.post('/refresh_token', AuthController.refreshToken)

export default AuthRouter