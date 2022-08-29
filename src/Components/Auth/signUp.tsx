import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  Alert
} from '@mui/material'
import { signUp, signIn } from '../../services/AuthService'
import { Message } from '../../utils/Auth Alerts/messages'
import { AutoDismissAlertProps } from '../../utils/Auth Alerts/AutoDismissAlert'
import UserContext from '../../context/user/UserContext'
import AuthData from '../../types/Auth'

interface SignUpProps {
  msgAlert: (msg: AutoDismissAlertProps) => void
}

const SignUp = ({ msgAlert }: SignUpProps) => {

  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])/

  const navigate = useNavigate()

  const { loginUser } = useContext(UserContext)

  const [formError, setFormError] = useState<boolean>(false)

  const helperTextStyle = {
    backgroundColor: '#E9F3FF',
    margin: '0', 
    paddingLeft: '10px', 
    paddingTop: '5px'
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
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

      setFormError(true)

      msgAlert({
        message: Message.Alert.SignUp.Failure,
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    setFormError(false)
  }, [watch('userName'), watch('password')])

  const validatePassword = (value: string) => {
    if (!value.match(passwordValidationRegex)) {
      return "Password must contain a lowercase letter, an uppercase letter, a number and a special character"
    }
  }

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20, backgroundColor: "#E9F3FF" }}>
        <Grid margin={2} width={350}>
          <Typography variant='h4' align='left' margin='dense'>
            Sign Up
          </Typography>
        </Grid >
        {formError && <Alert severity="error">{Message.Alert.SignUp.Failure}</Alert>}
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
              sx={{ backgroundColor: "white"}}
              FormHelperTextProps={{ style: helperTextStyle }}
            />
            <TextField
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
                maxLength: {
                  value: 99,
                  message: 'Password must have less than 99 characters',
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
              sx={{ backgroundColor: "white" }}
              FormHelperTextProps={{ style: helperTextStyle }}
            />
            <Grid item alignSelf='center' margin={2}>
              <Button type='submit' variant='contained' color='primary'>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid textAlign='center' pt={3}>
          <Typography variant='body2'>Already have an account? <Link to={`/signin`} className="internalLinks">Sign in</Link>
          </Typography>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignUp