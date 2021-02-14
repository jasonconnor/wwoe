import AccessToken from '../utils/AccessToken.js'

export default class Authentication {
  static checkToken = async (request, response, next) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(401).json({
        message: 'No access token was provided.'
      })
    }
    const accessToken = authHeader.split(' ')[1]

    let token = null

    try {
      token = await AccessToken.verify(accessToken)
    } catch(error) {
      return response.status(401).json({
        error: 'Failed to validate token.',
        cause: error.message
      })
    }

    if (!token) {
      return response.status(500).json({
        error: 'Unable to verify access token.'
      })
    }

    request.token = token
    next()
  }
}