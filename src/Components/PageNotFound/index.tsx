import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid
  } from '@mui/material'
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

export default function PageNotFound() {
  return (
    <Container style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <NoAccountsIcon fontSize='large' />
            <Typography variant='h2'>404</Typography>
            <Typography variant='h2'>Page Not Found</Typography>
        </Grid>
     </Paper>
    </Container>
  )
}