import React, { useState, Fragment } from "react";
import Comment from "./Components/Comments/CommentForm";
import Signup from "./Components/Auth/signUp";
import SignIn from "./Components/Auth/signIn";
import AutoDismissAlert, {
  AutoDismissAlertProps,
} from "./Components/core/AutoDismissAlert";
import { v4 as uuid } from "uuid";
import { Box, Typography, Link } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CreateProjectForm from "./Components/Project/CreateProjectForm"

function App() {
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
            <Route
              path='/createProject'
              element={<CreateProjectForm />}
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
      <Comment />
    </>
  );
}

export default App;
