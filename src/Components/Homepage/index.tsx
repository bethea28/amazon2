import React, { useEffect, useState, useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectData from "../../types/Project";
import ProjectService from "../../services/ProjectService";
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

  const [allProjects, setAllProjects] = useState<Array<ProjectData> | []>();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await ProjectService.getAllProjects().then((response) => {
      setAllProjects(response.data);
    });
  };

  
  return (
    <>
      <Grid
        container
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

      {isLoggedIn && <Grid>
        <RecommendedProjects />
      </Grid>}
      <Grid>
        <NewProjects />
      </Grid>
      <Grid>
        <TrendingProjects />
      </Grid>

    </>
  );
};

export default Homepage;
