import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'

import User from '../models/UserModel.js'
import AccessToken from '../utils/AccessToken.js'

export default class UserController {
  static login = async (request, response) => {
    const loginError = validationResult(request)

    if (!loginError.isEmpty()) {
      return response.status(422).json({
        error: 'Unable to validate request.',
        cause: loginError.array()[0].msg
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

    try {
      accessToken = await AccessToken.create(user)
    } catch(error) {
      return response.status(500).json({
        error: 'Failed to create access token.',
        cause: error.message
      })
    }

    return response.status(200)
      .header('Authentication', accessToken)
      .json({message: 'logged in!'})
  }

  static register = async (request, response) => {
    const registrationError = validationResult(request)

    if (!registrationError.isEmpty()) {
      return response.status(422).json({
        message: 'Unable to validate request.',
        error: registrationError.array()[0].msg
      })
    }
    let userExists = null

    try {
      userExists = await User.findOne({username: request.body.username})
    } catch(error) {
      return response.status(500).json({
        message: 'Failed to search for existing user.',
        error: error.message
      })
    }

    if (userExists) {
      return response.status(409).json({
        message: 'That username is already registered.'
      })
    }

    let hashedPassword = null

    try {
      hashedPassword = await bcrypt.hash(request.body.password, 10)
    } catch(error) {
      return response.status(500).json({
        message: 'Failed to hash password.',
        error: error.message
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
        message: 'Failed to save new user.',
        error: error.message
      })
    }

    return response.status(200).json({
      message: `Successfully added new user: ${result.username}.`
    })
  }

  // TODO: Place in UserController
  static getAccount = async (request, response) => {
    let user = null

    try {
      user = await User.findOne({_id: request.token.sub})
    } catch(error) {
      return response.status(500).json({
        message: 'Failed to get current user.',
        error: error.message
      })
    }

    return response.status(200).json(user)
  }
}