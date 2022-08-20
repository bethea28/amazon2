import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Grid,
  Container,
  Paper,
  Typography,
  Button
} from '@mui/material'
import { signIn } from '../../services/AuthService'
import { Message } from '../core/messages'
import { AutoDismissAlertProps } from '../core/AutoDismissAlert'
import UserContext from '../../context/user/UserContext'
import AuthData from '../../types/Auth'

export interface SignInProps {
  msgAlert: (msg: AutoDismissAlertProps) => void,
}

const SignIn = ({ msgAlert }: SignInProps) => {

  const navigate = useNavigate()

  const { loginUser } = useContext(UserContext)

  const {
    register,
    handleSubmit
  } = useForm<AuthData>()

  const onSignIn = async (data: AuthData) => {

    try {
      const res = await signIn(data)

      if (res.data) {
        await loginUser(res.data)

        msgAlert({
          message: Message.Alert.SignIn.Success,
          variant: 'success'
        })

        navigate(`/`, {replace: true})
      }

    } catch (error: unknown) {
      msgAlert({
        message: Message.Alert.SignIn.Failure,
        variant: 'error'
      })
    }
  }

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid margin={2} width={350}>
          <Typography variant='h4' align='left' margin='dense'>
            Sign In
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSignIn)}>
          <Grid container direction='column'>
            <TextField
              {...register('userName', {
                required: 'User Name is required',
              })}
              variant='outlined'
              label='User Name'
              name='userName'
              size='small'
              margin='dense'
              fullWidth
            />
            <TextField
              {...register('password', {
                required: 'Password is required',
              })}
              variant='outlined'
              type='password'
              label='Password'
              name='password'
              size='small'
              margin='dense'
              fullWidth
            />
            <Grid item alignSelf='center' margin={1}>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default SignIn