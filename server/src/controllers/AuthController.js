import bcrypt from 'bcryptjs'

import User from '../models/UserModel.js'

export default class UserController {
  static login = async (request, response) => {
    let userExists = null

    try {
      userExists = await User.findOne({username: request.body.username})
    } catch(error) {
      return response.status(500).json({
        message: 'Failed to check for existing user.',
        error: error.message
      })
    }

    if (!userExists) {
      return response.status(400).json({
        message: 'Invalid username.'
      })
    }

    let validPassword = null 

    try {
      validPassword = await bcrypt.compare(request.body.password, userExists.password)
    } catch(error) {
      return response.status(500).json({
        message: 'Failed to compare passwords.',
        error: error.message
      })
    }
    console.log(validPassword)

    if (!validPassword) {
       return response.status(400).json({
          message: 'Invalid password.'
       })
    }

    response.status(200).json({
      message: 'logged in!'
    })
  }

  static register = async (request, response) => {
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

    let savedUser = null

    try {
      savedUser = await newUser.save()
    } catch(error) {
      return response.status(500).json({
        message: 'Failed to save new user.',
        error: error.message
      })
    }

    return response.status(200).json({
      message: `Successfully added new user: ${savedUser.username}.`
    })
  }
}