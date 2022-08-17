import axiosInstance from '../apiConfig'
import UserData from '../types/User'

async function getProfile(userId: string | undefined) {
    try {
        return await axiosInstance.get<UserData>(`/users/${userId}`)
    } catch (error) {
        throw error;
    }
}

async function updateProfile(data: UserData, userId: string | undefined) {
    try {
        return await axiosInstance.put<UserData>(`/users/${userId}`, data)
    } catch (error) {
        throw error;
    }
}

const UserService = {
    getProfile,
    updateProfile
}

export default UserService;