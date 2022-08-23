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

  const [formError, setFormError] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>()

  const onSignUp = async (data: AuthData) => {

    try {

      await signUp(data)
      const res = await signIn(data)

      if (res.data) {
        await loginUser(res.data)
        navigate(`/profile/${res.data.idUser}/edit`)

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

  const validatePassword = (value: string) => {
    if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)) {
      return "Password must contain a number, an uppercase, a lowercase and a special character"
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
                minLength: {
                  value: 3,
                  message: 'User Name must have at least 3 characters',
                },
              })}
              variant='outlined'
              label='User Name'
              name='userName'
              size='small'
              margin='dense'
              fullWidth
              error={errors["userName"] !== undefined}
              helperText={errors.userName ? errors.userName.message : null}
            />
            <TextField
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
                validate: value => validatePassword(value)
              })}
              variant='outlined'
              type='password'
              label='Password'
              name='password'
              size='small'
              margin='dense'
              fullWidth
              error={errors["password"] !== undefined}
              helperText={errors.password ? errors.password.message : null}
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