import React, { useState, Fragment } from 'react'
// import './App.css';

import Signup from './Components/Auth/signUp';
import SignIn from './Components/Auth/signIn';
import AutoDismissAlert, { AutoDismissAlertProps } from './Components/core/AutoDismissAlert';
import { v4 as uuid } from 'uuid'
import { Box, Typography } from '@mui/material';
import { Link } from 'react-bootstrap/lib/Navbar';


function App() {
  const [user, setUser] = useState<string | null>(null)
  const [msgAlerts, setMsgAlerts] = useState<(AutoDismissAlertProps & {id: string})[]>([])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }: AutoDismissAlertProps) => {
    const id = uuid()
    setMsgAlerts(msgAlerts => [...msgAlerts, { heading, message, variant, id }])
  }
  return (
    <Box>
      <header className="App-header">
      {msgAlerts.map(msgAlert => (
        <AutoDismissAlert
          key={msgAlert.id}
          {...msgAlert}
        />
      ))}
        <Typography>
          Hello World! 
          <SignIn msgAlert={msgAlert} setUser={setUser} />
          <Signup msgAlert={msgAlert} setUser={setUser} />
        </Typography>
        <Link
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </Link>
      
     
    </header>
    </Box>
  );
}

export default App;
