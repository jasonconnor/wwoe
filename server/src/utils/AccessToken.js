import jwt from 'jsonwebtoken'

export default class AccessToken {
  static create = (user) => {
    return new Promise((resolve, reject) => {
      const currentTime = Math.floor(Date.now() / 1000)

      jwt.sign({
        iss: 'localhost',
        iat: currentTime,
        exp: currentTime + (60*5),
        sub: user.id,
        aud: user.role
      }, process.env.ACCESS_SECRET,  (error, token) => {
        if (error) reject(error)

        resolve(token)
      })
    })
  }

  static verify = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, node.env.ACCESS_SECRET, () => {
        if (error) reject(error)

        resolve(decoded)
      })
    })
  }
}