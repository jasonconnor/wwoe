import {useEffect, useState} from 'react'
import UserService from '../services/ProfileService'

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    UserService()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <span>
        {currentUser 
          ? currentUser.username
          : 'no current user'
        }
      </span>

    </div>
  )
}

export default Profile