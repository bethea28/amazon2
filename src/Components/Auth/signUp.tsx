import React, { useContext } from 'react'
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
import { signUp, signIn } from '../../services/AuthService'
import { Message } from '../core/messages'
import { AutoDismissAlertProps } from '../core/AutoDismissAlert'
import UserContext from '../../context/user/UserContext'
import AuthData from '../../types/Auth'

interface SignUpProps {
  msgAlert: (msg: AutoDismissAlertProps) => void
}

const SignUp = ({ msgAlert }: SignUpProps) => {

  const navigate = useNavigate()

  const { loginUser } = useContext(UserContext)

  const {
    register,
    handleSubmit
  } = useForm<AuthData>()

  const onSignUp = async (data: AuthData) => {

    try {
      await signUp(data)
      const res = await signIn(data)

      if (res.data) {
        // Temporary: Commented out code to be added and hard coded values to be removed once backend has been merged
        await loginUser(res.data)
        navigate(`/profile/d8ff08d1-6f3b-4e38-b6fb-218e88663891/edit`)
        // navigate(`/profile/${res.data.idUser}/edit`)

        msgAlert({
          message: Message.Alert.SignUp.Success,
          variant: 'success'
        })
      }

    } catch (error: unknown) {
      msgAlert({
        message: Message.Alert.SignUp.Failure,
        variant: 'error'
      })
    }
  }

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid margin={2} width={350}>
          <Typography variant='h4' align='left' margin='dense'>
            Sign Up
          </Typography>
        </Grid >
        <form onSubmit={handleSubmit(onSignUp)}>
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

export default SignUp