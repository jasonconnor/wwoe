import {getAccessToken} from '../accessToken'

const ProfileService = () => {
  return new Promise(async (resolve, reject) => {
    const accessToken = getAccessToken()

    let response = null
    let result = null

    // TODO: Set header conditionally if accessToken is not null
    try {
      response = await fetch('/account', {
        method: 'GET',
        headers: {
          authorization: accessToken ? `bearer ${accessToken}` : ''
        }
      })

      result = await response.json()
    } catch(error) {
      console.log(error)
      reject(error)
    }

    if (!result) {
      reject('Received empty response from the server.')
    }

    resolve(result)
  })
}

export default ProfileService