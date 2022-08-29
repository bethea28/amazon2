import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// make alert const to make custom messages and colors for snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export interface AutoDismissAlertProps {
    variant: 'success' | 'info' | 'warning' | 'error' | undefined,
    message: string
}

function AutoDismissAlert({ variant, message }: AutoDismissAlertProps) {
console.log(message)



    return (
        <Snackbar autoHideDuration={6000} >
        <Alert severity= {variant}  sx={{ width: '100%' }}
        >
            {message}
        </Alert>
        </Snackbar>
    )
}

export default AutoDismissAlert