import express from 'express'

import upload from '../middleware/upload.js'
import Validator from '../middleware/Validator.js'
import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

// POST Routes
AuthRouter.post('/login', Validator.login, AuthController.login)
AuthRouter.post('/register', upload.none(), Validator.register, AuthController.register)

export default AuthRouter