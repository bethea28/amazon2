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
      <Grid container spacing={0} justifyContent='center' alignItems='center'>
        <NavigationBar />
        <Homepage />
        <LogInOrSignUpRoutes />
        <Comment />
      </Grid>
      <Footer />
    </>
  );
}

export default App;
