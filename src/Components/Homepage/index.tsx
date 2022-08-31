import React, { useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewProjects from "./NewProjects";
import TrendingProjects from "./TrendingProjects";
import RecommendedProjects from "./RecommendedProjects";
import UserContext from '../../context/user/UserContext'


const Homepage = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(UserContext)

  const exploreProjects = () => {
    navigate(`/projects`);
  };
  
  return (
    <Grid container display='flex' justifyContent='center' alignItems="center">
      <Grid item container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid marginTop={2}>
          <Typography sx={{ fontWeight: "bold" }} variant="h3">
            Making Creative Ideas a Reality
          </Typography>
        </Grid>
        <Grid marginTop={4}>
          <Button variant="contained" onClick={exploreProjects}>
            Explore Projects
          </Button>
        </Grid>
      </Grid>
      {isLoggedIn && <Grid item container display='flex' justifyContent='center'>
        <Grid item xs>
          <RecommendedProjects />
        </Grid>
      </Grid>}
      <Grid item container display='flex' justifyContent='space-between' spacing={15}>
        <Grid item xs>
          <NewProjects />
        </Grid>
        <Grid item xs>
          <TrendingProjects />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Homepage;
