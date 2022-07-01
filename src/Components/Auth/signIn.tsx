import React, { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { signIn } from './apiAuth/auth'
import { signInSuccess, signInFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface SignInProps {
    msgAlert: (msg: any) => void,
    setUser: (user: string) => void
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
        heading: 'Sign In Success',
        message: signInSuccess,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error: any) {
      setUserName('')
      setPassword('')
      msgAlert({
        heading: 'Sign In Failed with error: ' + error.message,
        message: signInFailure,
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
        <h3>Sign In</h3>
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
      </div>
    </div>
  )
}

export default SignIn