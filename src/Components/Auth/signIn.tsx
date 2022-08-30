import React, { useContext, useEffect, useState } from 'react'
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
import { signIn } from '../../services/AuthService'
import { Message } from '../../utils/Auth Alerts/messages'
import { AutoDismissAlertProps } from '../../utils/Auth Alerts/AutoDismissAlert'
import UserContext from '../../context/user/UserContext'
import AuthData from '../../types/Auth'

export interface SignInProps {
  msgAlert: (msg: AutoDismissAlertProps) => void,
}

const SignIn = ({ msgAlert }: SignInProps) => {

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

      setFormError(true)
      msgAlert({
        message: Message.Alert.SignIn.Failure,
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    setFormError(false)
  }, [watch('userName'), watch('password')])

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20, backgroundColor: "#E9F3FF" }}>
        <Grid margin={2} width={350}>
          <Typography variant='h4' align='left' margin='dense'>
            Sign In
          </Typography>
        </Grid>
        {formError && <Alert severity="error">{Message.Alert.SignIn.Failure}</Alert>}
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
              error={errors["userName"] !== undefined}
              helperText={errors.userName ? errors.userName.message : null}
              sx={{ backgroundColor: "white"}}
              FormHelperTextProps={{ style: helperTextStyle }}
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
              error={errors["password"] !== undefined}
              helperText={errors.password ? errors.password.message : null}
              sx={{ backgroundColor: "white"}}
              FormHelperTextProps={{ style: helperTextStyle }}
            />
            <Grid item alignSelf='center' margin={2}>
              <Button type='submit' variant='contained' color='primary'>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid textAlign='center' pt={3}>
          <Typography variant='body2'>Don't have an account? <Link to={`/signup`} className="internalLinks">Register Now!</Link>
          </Typography>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignIn