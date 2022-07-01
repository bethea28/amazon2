import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignIn, { SignInProps } from './authComponents/signIn';
import AutoDismissAlert, { AutoDismissAlertProps } from './AutoDismissAlert/AutoDismissAlert';
import { v4 as uuid } from 'uuid'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

 const msgAlert = ({ heading, message, variant }: AutoDismissAlertProps) => {
    const id = uuid()
    setMsgAlerts(msgAlerts => [...msgAlerts, { heading, message, variant, id }])
  }

const [user, setUser] = useState<string | null>(null)
  const [msgAlerts, setMsgAlerts] = useState<(AutoDismissAlertProps & {id: string})[]>([])


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      </Route>
      <Route
            path='/signin'
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
