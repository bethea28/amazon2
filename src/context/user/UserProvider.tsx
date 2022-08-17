import React, { useState } from 'react'
import UserContext from './UserContext'
import UserService from '../../services/UserService'
import UserData from '../../types/User'
import TokenData from '../../types/Tokens'
import { getTheCookie, removeTheCookie, setTheCookie } from '../../utils/cookies'

// @ts-ignore
const UserProvider = ({ children }) => {

    const [user, setUser] = useState<UserData| undefined>()
    const [sessionId, setSessionId] = useState<string>()

    const isLoggedIn = () => {
        const accessToken = getTheCookie("accessToken")

        if (accessToken === undefined) {
            return false;
        } else {
            return true;
        }
    }

    const loginUser = async (response: TokenData) => {
        setSessionId("d8ff08d1-6f3b-4e38-b6fb-218e88663891")
        // setSessionId(response.data.userId)
        setTheCookie("accessToken", response.accessToken, response.expiresIn)
        await fetchUser("d8ff08d1-6f3b-4e38-b6fb-218e88663891")
        // fetchUser(response.data.userId)
    }

    const logoutUser = async () => {
        setSessionId(undefined)
        setUser(undefined)
        removeTheCookie("accessToken")
    }

    const fetchUser = async (userId: string | undefined) => {
        await UserService.getProfile(userId)
          .then((response) => setUser(response.data))}


    return ( 
    <UserContext.Provider value = {{user, sessionId, loginUser, logoutUser, isLoggedIn}}>
        {children}
    </UserContext.Provider> )

}

export default UserProvider;