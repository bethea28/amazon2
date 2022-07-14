import React, { useState, Fragment } from "react";
import Comment from "./Components/Comments/CommentForm";
import NavigationBar from "./Components/Navigation/Navigation";
import Homepage from "./Components/Homepage/Homepage";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import LogInOrSignUp from "./Components/Auth/LogInOrSignUp";
import Footer from "./Components/Navigation/Footer";

function App() {
  return (
    <>
      <Grid container spacing={0} justifyContent='center' alignItems='center'>
        <NavigationBar />
        <Homepage />
        <LogInOrSignUp />
        <Comment />
      </Grid>
      <Footer />
    </>
  );
}

export default App;
