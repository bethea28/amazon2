import axiosInstance from '../apiConfig'
import UserData from '../types/User'

async function getProfile(userId: String) {
    return await axiosInstance.get<UserData>(`/users/${userId}/`)
    // return {
    // "id": "ffsdfsf",
    // "name": "Kevin Abdul", 
    // "username": "kevinabdul",
    // "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    // "interests": {"Art": true, "Comics and Illustrations": true, "Fashion": false, "Film": false, "Games": true, "Tech": true, "Music": false, "Publishing": false },
    // "projects": []}
}

async function updateProfile(data: UserData, userId: String) {
    return await axiosInstance.put<UserData, String>(`/users/${userId}/`, data)
}

const UserService = {
    getProfile,
    updateProfile
}

export default UserService;