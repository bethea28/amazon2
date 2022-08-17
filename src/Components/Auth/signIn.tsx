import React, { FormEvent, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Box, Typography } from '@mui/material'
import { FormControl } from '@mui/material';
import { getCookie, setCookie } from 'typescript-cookie'
import { signIn } from '../../services/AuthService'
import { Message } from '../core/messages'
import { AutoDismissAlertProps } from '../core/AutoDismissAlert'
import UserContext from '../../context/user/UserContext'
import UserService from '../../services/UserService'

export interface SignInProps {
  msgAlert: (msg: AutoDismissAlertProps) => void,
}

const SignIn = ({ msgAlert }: SignInProps) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const setAccessCookie = (accessToken: string | undefined) => {
    setCookie("accessToken", accessToken, {expires: 1})
  }

  const {user, setUser, sessionId, setSessionId, accessToken, setAccessToken} = useContext(UserContext)



  const onSignIn = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await signIn(userName, password)

      if (res.data) {
        setAccessToken(res.data.accessToken)
        setSessionId("d8ff08d1-6f3b-4e38-b6fb-218e88663891")
        setAccessCookie(res.data.accessToken)
        await fetchUser(res.data.userId)
      }

      msgAlert({
        message: Message.Alert.SignIn.Success,
        variant: 'success'
      })

      navigate(`/`)

    } catch (error: unknown) {
      setUserName('')
      setPassword('')
      msgAlert({
        message: Message.Alert.SignIn.Failure,
        variant: 'error'
      })
    }
  }

  const fetchUser = async (userId: string | undefined) => {
    await UserService.getProfile(userId)
      .then((response) => setUser(response.data))}

  // if (user) {
  //   navigate("/")
  // }

  return (
    <Box>
      <Box>
        <Typography>Sign In</Typography>
        <Form onSubmit={onSignIn}>
          <Form.Group controlId='userName'>
            <Form.Label className='label'>User Name</Form.Label>
            <Form.Control
              required
              type='userName'
              name='userName'
              value={userName}
              placeholder='Enter userName'
              onChange={event => setUserName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label className='label'>Password</Form.Label>
            <Form.Control
              className='input'
              required
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              onChange={event => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button className='start-btn' type='submit'>
            Submit
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

export default SignIn