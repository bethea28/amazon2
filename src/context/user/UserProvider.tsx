import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import UserService from '../../services/UserService'
import UserData from '../../types/User'
import TokenData from '../../types/Tokens'
import { getTheCookie, removeTheCookie, setTheCookie } from '../../utils/cookies'

const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState<UserData| undefined>()
    const [sessionId, setSessionId] = useState<string | undefined>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>()

    const fetchUser = async (userId: string | undefined) => {
        const response = await UserService.getProfile(userId)
        if (response) {
            setUser(response.data)
        }
    }

    const fetchDataOnRefresh = async (userId: string) => {
        await fetchUser(userId)
        setSessionId(userId)
        setIsLoggedIn(true)
        tokenInCookies()
    }
    
    useEffect(() => {
        const userId = getTheCookie("userId")
        if (userId) {
            fetchDataOnRefresh(userId)
        }   
    }, [])

    const tokenInCookies = () => {
        if (getTheCookie("accessToken")) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    const loginUser = async (response: TokenData) => {
        setSessionId(response.idUser)
        setTheCookie("userId", response.idUser )
        setTheCookie("accessToken", response.accessToken)
        await fetchUser(response.idUser)
        tokenInCookies()
    }

    const logoutUser = async () => {
        await removeTheCookie("accessToken")
        removeTheCookie("userId")
        setSessionId(undefined)
        setUser(undefined)
        tokenInCookies()
    }

    return ( 
    <UserContext.Provider value = {{ user, sessionId, loginUser, logoutUser, isLoggedIn }}>
        {children}
    </UserContext.Provider> )

}

export default UserProvider;