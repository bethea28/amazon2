import axiosInstance from '../apiConfig'
import AuthData from '../types/Auth'


export const signUp = (data: AuthData) => {
  return axiosInstance.post('/users/', data)
}

export const signIn = (data: AuthData) => {
  return axiosInstance.post( '/users/signin/', data)
}


