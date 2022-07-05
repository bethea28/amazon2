import React, { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { signIn } from './apiAuth/auth'
import { Message } from '../core/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Box, Typography } from '@mui/material'
import { FormControl } from '@mui/material';

export interface SignInProps {
    msgAlert: (msg: any) => void,
    setUser: (user: string) => void,

}

const SignIn = ({ msgAlert, setUser }: SignInProps) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false)

  const onSignIn = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await signIn(userName, password)
      setUser(res.data.user)

      msgAlert({
         
        message: Message.Alert.SignIn.Success,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error: any) {
      setUserName('')
      setPassword('')
      msgAlert({
        
        message: Message.Alert.SignIn.Failure,
        variant: 'error'
      })
    }
  }

  if (shouldNavigate) {
    return <Navigate to='/' />
  }

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
              className= 'input'
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