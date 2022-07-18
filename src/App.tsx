import React, { useState, Fragment } from "react";
import Comment from "./Components/Comments/CommentForm";
import NavigationBar from "./Components/Navigation/Navigation";
import Homepage from "./Components/Homepage/Homepage";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import LogInOrSignUpRoutes from "./Components/Auth/LogInOrSignUpRoutes";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <NavigationBar />
      {/* <Routes> */}
      <Grid container spacing={0} justifyContent='center' alignItems='center'>
        {/* <Route
            path='/'
            element={
              <>
                <Homepage />
              </>
            }
          /> */}
        <Homepage />
        <LogInOrSignUpRoutes />
        {/* <Discover /> */}
        {/* <CreateProject /> */}
        <Comment />
      </Grid>
      {/* </Routes> */}
      <Footer />
    </>
  );
}

export default App;
