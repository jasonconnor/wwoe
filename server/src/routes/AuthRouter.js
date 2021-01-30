import express from 'express'

import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

AuthRouter.get('/login', AuthController.login)

// POST Routes
AuthRouter.post('/register', AuthController.register)

export default AuthRouter