import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
  Alert,
  AlertTitle,
  Dialog,
  TextField,
} from '@mui/material'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import UserContext from '../../context/user/UserContext'
import TransactionService from '../../services/TransactionService'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { PaymentInput } from '../../types/Transactions'


export default function TrasactionForm() {
  //PM to be added: projectIdInput: string

  const { projectId } = useParams()

  const navigate = useNavigate()

  //CONTROL: pop up dialog
  const { control, handleSubmit, formState: { errors } } = useForm<PaymentInput>()
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  //CONTROL: on form submission states
  const [status, setStatus] = useState('IN_PROCESSING')

  const { sessionId } = useContext(UserContext)

  const onSubmit = async (data: PaymentInput) => {
    //Open Pop up Dialog display Transaction Result
    setOpen(true)
    data.projectId = projectId
    data.userId = sessionId

    // Back End points to deal with: /data.date = new Date; data.status = 'COMPLETE';

    //CHECK: Request Status, setStatus
    try {
      const transaction = await TransactionService.createTransaction(data)
      setStatus('COMPLETE')
    } catch (error) {
      setStatus('ERROR')
    }
  }
  
  let regexpExpiry = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/

  const validateExpiryDate= (value: string) => {
    if (!value.match(regexpExpiry)) {
      return "Invalid expiry credit card date format"
    }
  }

  const toProject = () => {
    navigate(`/projects/${projectId}`)
  }

  const backBtnStyle = {
    color: "#212121",
    textTransform: "none",
};

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item xs>
        <Card sx={{ maxWidth: 300 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Enter a Pledge Amount
              </Typography>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    label='Pledge Amount ($)'
                    onChange={(e) => field.onChange(e.target.value)}
                    type='number'
                    margin='dense'
                    error={errors["amount"] !== undefined}
                    helperText={errors.amount ? errors.amount.message : null}
                    fullWidth
                  />
                )}
                name='amount'
                rules={{ required: "Amount is required", 
                          min: {
                            value: 1,
                            message: 'Amount cannot be less than 1',
                          } }}
                control={control}
                defaultValue={0}
                
              />
              <Typography variant='h6' component='div' marginTop='15px'>
                Payment Information
              </Typography>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    label='First Name'
                    onChange={(e) => field.onChange(e.target.value)}
                    margin='dense'
                    error={errors["firstName"] !== undefined}
                    helperText={errors.firstName ? errors.firstName.message : null}
                    fullWidth
                  />
                )}
                name='firstName'
                rules={{ required: "First Name is required" }}
                control={control}
                defaultValue=''
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    label='Last Name'
                    onChange={(e) => field.onChange(e.target.value)}
                    margin='dense'
                    error={errors["lastName"] !== undefined}
                    helperText={errors.lastName ? errors.lastName.message : null}
                    fullWidth
                  />
                )}
                name='lastName'
                rules={{ required: "Last Name is required" }}
                control={control}
                defaultValue=''
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    label='Credit Card Number'
                    onChange={(e) => field.onChange(e.target.value)}
                    type='number'
                    margin='dense'
                    error={errors["creditNumber"] !== undefined}
                    helperText={errors.creditNumber ? errors.creditNumber.message : null}
                    fullWidth
                  />
                )}
                name='creditNumber'
                rules={{ required: "Credit Card Number is required",
                        minLength: {
                          value: 13,
                          message: 'The field length is invalid for Card Number',
                        },
                        maxLength: {
                          value: 16,
                          message: 'The field length is invalid for Card Number',
                        } }}
                control={control}
                defaultValue=''
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    label='Expiration Date (MM/YY)'
                    onChange={(e) => field.onChange(e.target.value)}
                    margin='dense'
                    error={errors["expDate"] !== undefined}
                    helperText={errors.expDate ? errors.expDate.message : null}
                    fullWidth
                  />
                )}
                name='expDate'
                rules={{ required: "Expiration Date is required", validate: value => validateExpiryDate(value) }}
                control={control}
                defaultValue=''
              />
            </CardContent>
            <CardActions>
              <Grid item container justifyContent="space-between" pt={3} alignItems="center">
                <Button sx={backBtnStyle} onClick={toProject} startIcon={<KeyboardArrowLeftIcon/>}>
                  Go Back
                </Button>
                <Button type='submit' size='small'>
                Submit
              </Button>
            </Grid>
            </CardActions>
          </form>
          <Dialog open={open} onClose={handleClose}>
            {status == 'COMPLETE' ? (
              <Alert severity='success'>
                <AlertTitle> Success</AlertTitle>
                <strong>Transaction was Successful!</strong>
              </Alert>
            ) : status == 'ERROR' ? (
              <Alert severity='error'>
                <AlertTitle> Error </AlertTitle>
                <strong> Transacation Failed! </strong>
              </Alert>
            ) : (
              <Alert severity='info'>
                <AlertTitle> Pending </AlertTitle>
                <strong> Processing Issue </strong>
              </Alert>
            )}
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}
