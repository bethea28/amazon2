import React, { FormEvent, FormEventHandler, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { signUp, signIn } from '../../services/AuthService'
import { Message } from '../core/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Box, Typography } from '@mui/material';
import { AutoDismissAlertProps } from '../core/AutoDismissAlert'
interface SignUpProps {
  msgAlert: (msg: AutoDismissAlertProps) => void,
  setUser: (user: string) => void
}

const SignUp = ({ msgAlert, setUser }: SignUpProps) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false)

  const onSignUp: FormEventHandler = async event => {
    event.preventDefault()

    try {
      await signUp(userName, password)
      const res = await signIn(userName, password)
      setUser(res.data.user)
      msgAlert({

        message: Message.Alert.SignUp.Success,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error: unknown) {
      setUserName('')
      setPassword('')
      msgAlert({
        message: Message.Alert.SignUp.Failure,
        variant: 'error'
      })
    }
  }

  if (shouldNavigate) {
    return <Navigate to='/registerAvatar' />
  }

  return (
    <Box>
      <Box>
        <h3>Sign Up</h3>
        <Form onSubmit={onSignUp}>
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

export default SignUp