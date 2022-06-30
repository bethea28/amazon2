import apiUrl from '../../apiConfig'
import axios from 'axios'

export const signUp = (userName: string, password: string, passwordConfirmation: string) => {
  return axios.post(apiUrl + '/sign-up/', {
    credentials: {
      userName,
      password,
      password_confirmation: passwordConfirmation
    }
  })
}

export const signIn = (userName: string, password: string) => {
  return axios.post(apiUrl + '/sign-in/', {
    credentials: {
      userName,
      password
    }
  })
}

