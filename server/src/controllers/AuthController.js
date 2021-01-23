import User from '../models/UserModel.js'

export default class UserController {
  static login = (request, response) => {
    response.status(200).json({
      message: 'logged in!'
    })
  }
}