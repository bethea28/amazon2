import { Box, Typography } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
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


  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  // };

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