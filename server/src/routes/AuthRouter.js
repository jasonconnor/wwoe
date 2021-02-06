import express from 'express'

import Validator from '../middleware/Validator.js'
import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

// POST Routes
AuthRouter.post('/login', Validator.login, AuthController.login)
AuthRouter.post('/register', AuthController.register)

export default AuthRouter