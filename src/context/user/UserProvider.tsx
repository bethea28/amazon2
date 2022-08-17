import React, { useState, useEffect} from 'react'
import UserContext from './UserContext'
import UserService from '../../services/UserService'
import UserData from '../../types/User'
import TokenData from '../../types/Tokens'

// @ts-ignore
const UserProvider = ({ children }) => {

    const [user, setUser] = useState<UserData| undefined>()
    const [sessionId, setSessionId] = useState<string>()
    const [accessToken, setAccessToken] = useState<string>()

    useEffect(() => {

        // Check if user is logged in ? if they are logged in then call user api to retrieve user data : if not logged in then just return empty object
    }, [])

    // const isLoggedIn = () => {
    //     // Call Amplify to see if user is logged in? return boolean value
    // }

    const fetchUser = async (userId: string | undefined) => {
        await UserService.getProfile(userId)
          .then((response) => setUser(response.data))}

    return ( 
    <UserContext.Provider value = {{user, setUser, sessionId, setSessionId, accessToken, setAccessToken}}>
        {children}
    </UserContext.Provider> )

}

export default UserProvider;