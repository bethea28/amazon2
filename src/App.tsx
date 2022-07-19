import React, { useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/Navigation/Navigation";
import CommentForm from "./Components/Comments/CommentForm";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer/Footer";
import ProjectImageIndex from "./Components/Images_Pictures/ProjectImageIndex";
import RegisterImageIndex from "./Components/Images_Pictures/RegisterImageIndex";
import AdditionalImageIndex from "./Components/Images_Pictures/AdditionalImageIndex";
import Signup from "./Components/Auth/signUp";
import SignIn from "./Components/Auth/signIn";
import Profile from "./Components/Profile";
import ProfileForm from "./Components/Profile/ProfileForm";
import AutoDismissAlert, {
  AutoDismissAlertProps,
} from "./Components/core/AutoDismissAlert";
import { v4 as uuid } from "uuid";
import { Box, Grid } from "@mui/material";
import CreateProjectForm from "./Components/Project/CreateProjectForm";
import ProjectsByCategories from "./Components/Discover/ProjectsByCategories";
import TransactionForm from "./Components/Transactions/Transactions";
import AllProjects from "./Components/Discover/AllProjects";


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
      <BrowserRouter>
        <NavigationBar />
        <Grid container spacing={0} justifyContent='center' alignItems='center'>
          <Box>
            <header className='App-header'>
              {msgAlerts.map((msgAlert) => (
                <AutoDismissAlert key={msgAlert.id} {...msgAlert} />
              ))}

              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route
                  path='/signup'
                  element={<Signup setUser={setUser} msgAlert={msgAlert} />}
                />
                <Route
                  path='/signin'
                  element={<SignIn setUser={setUser} msgAlert={msgAlert} />}
                />
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/profile/:userId/edit' element={<ProfileForm />} />
                <Route path='/createProject' element={<CreateProjectForm />} />
                <Route path='/projects' element={<AllProjects />} />
                <Route path='/projects/:projectId' element={<CommentForm />} />
                <Route
                  path='/projects/:projectId/:commentId'
                  element={<CommentForm />}
                />
                <Route
                  path='/categories/:projectCategory'
                  element={<ProjectsByCategories />}
                />
                <Route path='/transaction' element={<TransactionForm />} />
              </Routes>
            </header>
          </Box>
        </Grid>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
