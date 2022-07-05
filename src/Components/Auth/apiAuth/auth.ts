import axiosInstance from '../../../apiConfig'


export const signUp = (userName: string, password: string, passwordConfirmation: string) => {
  return axiosInstance.post('/signup/', {
    credentials: {
      userName,
      password,
      passwordConfirmation: passwordConfirmation
    }
  })
}

export const signIn = (userName: string, password: string) => {
  return axiosInstance.post( '/signin/', {
    credentials: {
      userName,
      password
    }
  })
}

