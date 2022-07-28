import axiosInstance from '../../../apiConfig'


export const signUp = (userName: string, password: string) => {
  return axiosInstance.post('/users/', 
    {
      userName,
      password
    }
  )
}

export const signIn = (userName: string, password: string) => {
  return axiosInstance.post( '/users/signin/', 
    {
      userName,
      password
    }
  )
}


