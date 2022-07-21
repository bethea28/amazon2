import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { Box, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 3, sm: 10 }}
      sx={{
        backgroundColor: "#0d1928",
        color: "#FFFFFF",
        align: "center",
      }}
      mt={20}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <Box>
            <Typography
              variant='body2'
              sx={{ textTransform: "uppercase" }}
              mb={1}
              fontWeight='bold'
            >
              Company
            </Typography>
          </Box>
          <Box>
            <Link to='/' style={{ textDecoration: "none" }}>
              <Typography variant='body2' mb={0.5} color='#FFFFFF'>
                JumpStarter
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to='/about' style={{ textDecoration: "none" }}>
              <Typography variant='body2' mb={0.5} color='#FFFFFF'>
                About
              </Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box>
            {" "}
            <Typography
              variant='body2'
              sx={{ textTransform: "uppercase" }}
              mb={1}
              fontWeight='bold'
            >
              Projects
            </Typography>
          </Box>
          <Box>
            <Link to='/discover' style={{ textDecoration: "none" }}>
              <Typography variant='body2' mb={0.5} color='#FFFFFF'>
                Discover
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to='/createnewproject' style={{ textDecoration: "none" }}>
              <Typography variant='body2' mb={0.5} color='#FFFFFF'>
                Create a New Project
              </Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box>
            {" "}
            <Typography
              variant='body2'
              sx={{ textTransform: "uppercase" }}
              mb={1}
              fontWeight='bold'
            >
              Support
            </Typography>
          </Box>
          <Box>
            <Link to='/shipping' style={{ textDecoration: "none" }}>
              <Typography variant='body2' mb={0.5} color='#FFFFFF'>
                Shipping
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link to='/customer-service' style={{ textDecoration: "none" }}>
              <Typography variant='body2' mb={0.5} color='#FFFFFF'>
                Customer Service
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
