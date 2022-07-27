import axiosInstance from '../apiConfig'
import UserData from '../types/User'


async function getProfile(userId: String) {
    return await axiosInstance.get<UserData>(`/users/${userId}/`)
}

async function updateProfile(data: UserData, userId: String) {
    return await axiosInstance.put<any>(`/users/${userId}/`, data)
}



const UserService = {
    getProfile,
    updateProfile
}

export default UserService;