import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from "@mui/material";
import ProjectCard from "../Project/ProjectCard";
import { useNavigate } from 'react-router-dom';
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'

const Homepage = () => {

  const navigate = useNavigate()

  const exploreProjects = () => {
    navigate(`/projects`)
  }

  const [allProjects, setAllProjects] = useState<Array<ProjectData> | []>()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    await ProjectService.getAllProjects()
    .then((response) => {setAllProjects(response.data)})
  }

  let top3;
  if (allProjects) {
    top3 = allProjects.slice(0, 3);
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Grid marginTop={2}>
          <Typography sx={{ fontWeight: "bold" }} variant='h3'>
            Making Creative Ideas a Reality
          </Typography>
        </Grid>
        <Grid marginTop={4}>
          <Button variant='contained' onClick={exploreProjects}>Explore Projects</Button>
        </Grid>
      </Grid>

      <Grid>
        <Grid marginTop={16} marginBottom={2}>
          <Typography sx={{ fontWeight: "bold" }} variant='caption'>
            THE LATEST
          </Typography>
        </Grid>

        <Grid
          container
          sx={{
            flexDirection: "row",
          }}
        >
      <Grid container justifyContent='center' alignItems='center' marginTop={2}>
      {top3 &&
        top3.length > 0 &&
        top3.map((project) => {
          return (
            <Grid key={project.projectId} marginBottom={2}>
              <ProjectCard {...project} />
            </Grid>
          )
        })}
      </Grid>
        </Grid>

        <Grid marginTop={16} marginBottom={2}>
          <Typography sx={{ fontWeight: "bold" }} variant='caption'>
            TRENDING
          </Typography>
        </Grid>

        <Grid
          container
          sx={{
            flexDirection: "row",
          }}
        >
      <Grid container justifyContent='center' alignItems='center' marginTop={2}>
      {top3 &&
        top3.length > 0 &&
        top3.map((project) => {
          return (
            <Grid key={project.projectId} marginBottom={2}>
              <ProjectCard {...project} />
            </Grid>
          )
        })}
      </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;
