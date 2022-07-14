import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import ProjectCard from "./Cards";

const Homepage = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Grid marginTop={4}>
          <Typography variant='h2'>Making Creative Ideas a Reality</Typography>
        </Grid>
        <Grid marginTop={4}>
          <Button variant='contained'>Explore Projects</Button>
        </Grid>
      </Grid>
      <Grid>
        <Grid marginTop={16} marginBottom={2}>
          <Typography variant='caption'>THE LATEST</Typography>
        </Grid>
        <ProjectCard />
      </Grid>
      <Grid>
        <Grid marginTop={16} marginBottom={2}>
          <Typography variant='caption'>TRENDING</Typography>
        </Grid>
        <ProjectCard />
      </Grid>
    </>
  );
};

export default Homepage;
