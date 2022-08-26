import axiosInstance from '../apiConfig'
import UserData from '../types/User'
import { getTheCookie } from "../utils/cookies";

async function getProfile(userId: string | undefined) {
    try {
        return await axiosInstance.get<UserData>(`/users/${userId}` )
    } catch (error) {
        throw error;
    }
}

async function updateProfile(data: UserData, userId: string | undefined) {

    try {
        return await axiosInstance.put<UserData>(`/users/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${getTheCookie("accessToken")}`
            }
        })
    } catch (error) {
        throw error;
    }
}

async function updateAvatar(avatar: string | undefined, userId: string | undefined) {

    try {
        return await axiosInstance.patch<UserData>(`/users/${userId}/avatar`, avatar, {
            headers: {
                Authorization: `Bearer ${getTheCookie("accessToken")}`
            }
        })
    } catch (error) {
        throw error;
    }
}



const UserService = {
    getProfile,
    updateProfile,
    updateAvatar
}

export default UserService;