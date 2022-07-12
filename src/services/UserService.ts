import axiosInstance from '../apiConfig'
import UserData from '../types/User'

function getProfile(userId: String) {
    // return axiosInstance.get<UserData>(`/users/${userId}`)
    return {
    "name": "Kevin Abdul", 
    "username": "kevinabdul",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    "interests": {"Art": true, "Comics and Illustrations": true, "Fashion": false, "Film": false, "Games": true, "Tech": true, "Music": false, "Publishing": false },
    "projects": []}
}

function updateProfile(data: UserData, userId: String) {
    return axiosInstance.put<any>(`/users/${userId}`, data)
}

const UserService = {
    getProfile,
    updateProfile
}

export default UserService;