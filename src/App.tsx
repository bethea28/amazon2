import React, { useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./context/user/UserProvider";
import NavigationBar from "./Components/Navigation";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";
import RegisterImageIndex from "./Components/Profile/AvatarUpload/index";
import AdditionalImageIndex from "./Components/Project/ProjectImagesUpload/index";
import Signup from "./Components/Auth/signUp";
import SignIn from "./Components/Auth/signIn";
import Profile from "./Components/Profile";
import ProfileForm from "./Components/Profile/ProfileForm";
import AutoDismissAlert, {
  AutoDismissAlertProps,
} from "./utils/Auth Alerts/AutoDismissAlert";
import { v4 as uuid } from "uuid";
import { Box, Grid } from "@mui/material";
import CreateProjectForm from "./Components/Project/CreateProjectForm";
import ProjectDetails from "./Components/Project/ProjectDetails";
import ProjectsByCategories from "./Components/Discover/ProjectsByCategories";
import TransactionForm from "./Components/Transactions/Transactions";
import AllProjects from "./Components/Discover/AllProjects";
import About from "./Components/Footer/About";
import PageNotFound from "./Components/PageNotFound";
import MyProjects from "./Components/Profile/MyProjects";
import Milestones from "./Components/Milestones/milestones";
import ProjectFundingInfo from "./Components/ProjectFundingInfo/fundingCard";

function App() {
  const [msgAlerts, setMsgAlerts] = useState<
    (AutoDismissAlertProps & { id: string })[]
  >([]);

  const msgAlert = ({ message, variant }: AutoDismissAlertProps) => {
    const id = uuid();
    setMsgAlerts((msgAlerts) => [...msgAlerts, { message, variant, id }]);
  };

  return (
    <UserProvider>
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
                  element={<Signup msgAlert={msgAlert} />}
                />
                <Route
                  path='/signin'
                  element={<SignIn msgAlert={msgAlert} />}
                />
                <Route path='/avatarUpload' element={<RegisterImageIndex />} />
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/profile/:userId/edit' element={<ProfileForm />} />
                <Route path='/createProject' element={<CreateProjectForm />} />
                <Route path='/projects/:projectId/edit' element={<CreateProjectForm />} />
                <Route path='/projects' element={<AllProjects />} />
                <Route path='/projects/:projectId' element={<ProjectDetails />} />
                <Route path='/projects/:projectId/imagesUpload' element={<AdditionalImageIndex />} />
                <Route
                  path='/categories/:projectCategory'
                  element={<ProjectsByCategories />}
                />
                <Route
                  path='/users/:userId/projects'
                  element={<MyProjects />}
                />
                <Route path='/projects/:projectId/transactions' element={<TransactionForm />} />
                <Route path='projects/:projectId/milestones' element={<Milestones />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </header>
          </Box>
        </Grid>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
