import React, { useState, useEffect} from 'react'
import { getCookie, setCookie } from 'typescript-cookie'
import UserContext from './UserContext'
import UserService from '../../services/UserService'
import UserData from '../../types/User'
import TokenData from '../../types/Tokens'

// @ts-ignore
const UserProvider = ({ children }) => {
    const [user, setUser] = useState<UserData>()
    const [tokens, setTokens] = useState()

    let userId = "d8ff08d1-6f3b-4e38-b6fb-218e88663891"

    useEffect(() => {

        fetchUser()
        // Check if user is logged in ? if they are logged in then call user api to retrieve user data : if not logged in then just return empty object
    }, [])

    const fetchUser = async () => {
        await UserService.getProfile(userId)
          .then((response) => {setUser(response.data)})
      }

    const isLoggedIn = () => {
        // Call Amplify to see if user is logged in? return boolean value
    }

    const login = () => {
    }

    return ( <UserContext.Provider value={{user, isLoggedIn, login}}>{children}</UserContext.Provider> )

}

export default UserProvider