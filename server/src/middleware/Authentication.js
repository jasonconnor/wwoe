import AccessToken from '../utils/AccessToken.js'

export default class Authentication {
  static checkToken = async (request, response, next) => {
    const authHeader = req.header.authorization
    const accessToken = authHeader.split(' ')[1]

    let token = null

    try {
      token = await AccessToken.verify(accessToken)
    } catch(error) {
      return response.status(401).json({
        message: 'Failed to validate token',
        error: error.message
      })
    }

    if (!token) {
      return response.status(500).json({
        message: 'Unable to verify access token.'
      })
    }

    request.token = token
    next()
  }
}