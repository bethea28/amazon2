import React, { useState, Fragment } from "react";
import Signup from "./signUp";
import SignIn from "./signIn";
import AutoDismissAlert, {
  AutoDismissAlertProps,
} from "../core/AutoDismissAlert";
import { v4 as uuid } from "uuid";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";

function LogInOrSignUp() {
  const [user, setUser] = useState<string | null>(null);
  const [msgAlerts, setMsgAlerts] = useState<
    (AutoDismissAlertProps & { id: string })[]
  >([]);

  const clearUser = () => setUser(null);

  const msgAlert = ({ message, variant }: AutoDismissAlertProps) => {
    const id = uuid();
    setMsgAlerts((msgAlerts) => [...msgAlerts, { message, variant, id }]);
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent='center'
        alignItems='center'
        paddingTop={20}
      >
        <Box>
          <header className='App-header'>
            {msgAlerts.map((msgAlert) => (
              <AutoDismissAlert key={msgAlert.id} {...msgAlert} />
            ))}
            <Routes>
              <Route
                path='/signup'
                element={<Signup setUser={setUser} msgAlert={msgAlert} />}
              />
              <Route
                path='/signin'
                element={<SignIn setUser={setUser} msgAlert={msgAlert} />}
              />
            </Routes>
            <SignIn msgAlert={msgAlert} setUser={setUser} />
            <Signup msgAlert={msgAlert} setUser={setUser} />
            <Link
              className='App-link'
              href='https://reactjs.org'
              target='_blank'
              rel='noopener noreferrer'
            ></Link>
          </header>
        </Box>
      </Grid>
    </>
  );
}

export default LogInOrSignUp;
