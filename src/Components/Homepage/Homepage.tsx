import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ProjectCard from "../Project/ProjectCard";
import { useNavigate } from "react-router-dom";
import ProjectData from "../../types/Project";
import ProjectService from "../../services/ProjectService";
import Carousel from "react-material-ui-carousel";
import NewProjects from "./NewProjects";
import TrendingProjects from "./TrendingProjects";

const Homepage = () => {
  const navigate = useNavigate();

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

  let topThreeProjects;
  if (allProjects) {
    topThreeProjects = allProjects.slice(0, 3);
  }

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
