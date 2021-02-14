const RegistrationService = (data) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('password', data.password)

    let response = null
    let result = null

    try {
      response = await fetch('/register', {
        method: 'POST',
        body: formData
      })

      result = await response.json()
    } catch(error) {
      console.log(error)
      reject('No response from the server. Try again later.')
    }

    if (!result) reject('Received empty response from the server.')
    else if (result.hasOwnProperty('error')) reject(result.error)
    
    resolve(result)
  })
}

export default RegistrationService