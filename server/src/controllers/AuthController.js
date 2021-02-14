import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'

import User from '../models/UserModel.js'
import AccessToken from '../utils/AccessToken.js'
import RefreshToken from '../utils/RefreshToken.js'

export default class UserController {
  static login = async (request, response) => {
    const loginError = validationResult(request)

    if (!loginError.isEmpty()) {
      return response.status(422).json({
        error: loginError.array()[0].msg
      })
    }

    let user = null

    try {
      user = await User.findOne({username: request.body.username}).select('password')
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to check for existing user.',
        cause: error.message
      })
    }

    if (!user) {
      return response.status(400).json({
        error: 'Invalid username or password.'
      })
    }

    let validPassword = null 

    try {
      validPassword = await bcrypt.compare(request.body.password, user.password)
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to compare passwords.',
        cause: error.message
      })
    }

    if (!validPassword) {
       return response.status(400).json({
          error: 'Invalid username or password.'
       })
    }

    let accessToken = null
    let refreshToken = null

    try {
      accessToken = await AccessToken.create(user)
      refreshToken = await RefreshToken.create(user)
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to create new tokens.',
        cause: error.message
      })
    }

    // TODO: Abstract to its own cookie module in Utils
    response.cookie('token', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 86400000 * 7,
      path: '/refresh_token'
    })

    return response.status(200)
      .header('Authentication', accessToken)
      .json({message: 'logged in!'})
  }

  static register = async (request, response) => {
    // TODO: Provide access token/sign in upon registration
    const registrationError = validationResult(request)

    if (!registrationError.isEmpty()) {
      return response.status(422).json({
        error: registrationError.array()[0].msg
      })
    }
    let userExists = null

    try {
      userExists = await User.findOne({username: request.body.username})
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to search for existing user.',
        cause: error.message
      })
    }

    if (userExists) {
      return response.status(409).json({
        error: 'That username is already registered.'
      })
    }

    let hashedPassword = null

    try {
      hashedPassword = await bcrypt.hash(request.body.password, 10)
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to hash password.',
        cause: error.message
      })
    }

    let newUser = new User({
      username: request.body.username,
      password: hashedPassword
    })

    let result = null

    try {
      result = await newUser.save()
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to save new user.',
        cause: error.message
      })
    }

    return response.status(200).json({
      message: `Successfully added new user: ${result.username}.`
    })
  }

  static refreshToken = async (request, response) => {
    const token = request.cookies.token

    if (!token) {
      return response.status(500).json({
        error: 'No token was provided.'
      })
    }

    let validToken = null

    try {
      validToken = await RefreshToken.verify(token)
    } catch(error) {
      return response.status(500).json({
        error: 'Invalid token.',
        cause: error.message
      })
    }

    if (!validToken) {
      return response.status(500).json({
        error: 'Failed to verify refresh token.'
      })
    }

    let accessToken = null
    let refreshToken = null

    try {
      accessToken = await AccessToken.create(validToken.sub)
      refreshToken = await RefreshToken.create(validToken.sub)
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to create new tokens.',
        cause: error.message
      })
    }

    // TODO: Abstract to its own cookie module in Utils
    response.cookie('token', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 86400000 * 7,
      path: '/refresh_token'
    })

    return response.status(200)
      .header('Authentication', accessToken)  
      .json({
        message: 'New tokens assigned!'
      })
  }

  // TODO: Place in UserController
  static getAccount = async (request, response) => {
    let user = null

    try {
      user = await User.findOne({_id: request.token.sub})
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to get current user.',
        cause: error.message
      })
    }

    return response.status(200).json(user)
  }
}