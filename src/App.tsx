import React, { useState, Fragment } from 'react'
// import './App.css';

import Signup from './authComponents/signUp';
import SignIn from './authComponents/signIn';
import AutoDismissAlert, { AutoDismissAlertProps } from './AutoDismissAlert/AutoDismissAlert';
import { v4 as uuid } from 'uuid'


function App() {
  const [user, setUser] = useState<string | null>(null)
  const [msgAlerts, setMsgAlerts] = useState<(AutoDismissAlertProps & {id: string})[]>([])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }: AutoDismissAlertProps) => {
    const id = uuid()
    setMsgAlerts(msgAlerts => [...msgAlerts, { heading, message, variant, id }])
  }
  return (
    <div className="App">
      <header className="App-header">
      {msgAlerts.map(msgAlert => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          // id={msgAlert.id}
        />
      ))}
        <p>
        <Fragment>
   
   
  </Fragment>
          Hello World! 
          <SignIn msgAlert={msgAlert} setUser={setUser} />
          <Signup msgAlert={msgAlert} setUser={setUser} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      
     
    </header>
    </div>
  );
}

export default App;
