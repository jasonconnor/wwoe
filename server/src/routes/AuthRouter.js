import express from 'express'

import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()


// POST Routes
AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/register', AuthController.register)

export default AuthRouter