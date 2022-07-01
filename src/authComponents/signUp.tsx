import React, { FormEvent, FormEventHandler, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { signUp, signIn } from './apiAuth/auth'
import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface SignUpProps {
    msgAlert: (msg: any) => void,
    setUser: (user: string) => void
}

const SignUp = ({ msgAlert, setUser }: SignUpProps) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false)

  const onSignUp: FormEventHandler = async event => {
    event.preventDefault()

    try {
      await signUp(userName, password, passwordConfirmation)
      const res = await signIn(userName, password)
      setUser(res.data.user)
      msgAlert({
        heading: 'Sign Up Success',
        message: signUpSuccess,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error: any) {
      setUserName('')
      setPassword('')
      setPasswordConfirmation('')
      msgAlert({
        heading: 'Sign Up Failed with error: ' + error.message,
        message: signUpFailure,
        variant: 'danger'
      })
    }
  }

  if (shouldNavigate) {
    return <Navigate to='/' />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
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
          <Form.Group controlId='passwordConfirmation'>
            <Form.Label className='label'>Password Confirmation</Form.Label>
            <Form.Control
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              type='password'
              placeholder='Confirm Password'
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
          </Form.Group>
          <Button className='start-btn' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignUp