import jwt from 'jsonwebtoken'

export default class RefreshToken {
  static create = (user) => {
    return new Promise((resolve, reject) => {
      const currentTime = Math.floor(Date.now() / 1000)

      jwt.sign({
        iss: 'localhost',
        iat: currentTime,
        exp: currentTime + (86400 * 7),
        sub: user
      }, process.env.REFRESH_SECRET, (error, token) => {
        if (error) reject(error)

        resolve(token)
      })
    })
  }

  static verify = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.REFRESH_SECRET, (error, decoded) => {
        if (error) reject(error)

        resolve(decoded)
      })
    })
  }
}