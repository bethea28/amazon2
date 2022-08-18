import React, { FormEvent, FormEventHandler, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../services/AuthService'
import { Message } from '../core/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Box, Typography } from '@mui/material';
import { AutoDismissAlertProps } from '../core/AutoDismissAlert'
import UserContext from '../../context/user/UserContext'

interface SignUpProps {
  msgAlert: (msg: AutoDismissAlertProps) => void
}

const SignUp = ({ msgAlert }: SignUpProps) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { loginUser } = useContext(UserContext)

  const onSignUp: FormEventHandler = async event => {
    event.preventDefault()

    try {
      await signUp(userName, password)
      const res = await signIn(userName, password)

      if (res.data) {
        // Commented out code to be added and hard coded values to be removed once backend has been merged

        await loginUser(res.data)
        navigate(`/profile/d8ff08d1-6f3b-4e38-b6fb-218e88663891/edit`)
        // navigate(`/profile/${res.data.idUser}/edit`)
      }

      msgAlert({
        message: Message.Alert.SignUp.Success,
        variant: 'success'
      })

    } catch (error: unknown) {
      setUserName('')
      setPassword('')
      msgAlert({
        message: Message.Alert.SignUp.Failure,
        variant: 'error'
      })
    }
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