import axiosInstance from '../apiConfig'
import UserData from '../types/User'
import { getTheCookie } from "../utils/cookies";

/**
 * Handles the get request for the user profile requested
 * @param userId    The id of the user requested by client
 * @return          The matching user profile
 */
async function getProfile(userId: string | undefined) {
    try {
        return await axiosInstance.get<UserData>(`/users/${userId}` )
    } catch (error) {
        throw error;
    }
}

/**
 * Handles the put request to update the user profile - Requires a token to update (i.e. User should be logged in)
 * @param userId    The id of the user to be updated
 * @param data      The updated user information
 * @return          The updated user
 */
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


/**
 * Handles the patch request just to update the user avatar - Requires a token to update (i.e. User should be logged in)
 * @param userId    The id of the user to be updated
 * @param avatar    The S3 location of the avatar
 * @return          The updated user with avatar updated
 */
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