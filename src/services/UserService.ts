import axiosInstance from '../apiConfig'

type FormData = {
    name: string,
    bio: string,
    // interests: Object<{string: boolean}>
}

export function getProfile(userId: String) {
    // return axiosInstance.get(`/users/${userId}`)
    return {
    "name": "Kevin Abdul", 
    "username": "kevinabdul",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    "interests": {"Art": true, "Comics and Illustrations": true, "Fashion": false, "Film": false, "Games": true, "Tech": true, "Music": false, "Publishing": false },
    "projects": []}
}

export async function updateProfile(data: FormData, userId: String) {
    return axiosInstance.put(`/users/${userId}`, {
        data
    })
}