import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import ProjectCard from "./Card";

const data = [
  { projectName: "name", projectDescription: "name", userName: "name" },
];

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
        <Grid marginTop={8}>
          <Typography sx={{ fontWeight: "bold" }} variant='h2'>
            Making Creative Ideas a Reality
          </Typography>
        </Grid>
        <Grid marginTop={4}>
          <Button variant='contained'>Explore Projects</Button>
        </Grid>
      </Grid>

      <Grid>
        <Grid marginTop={16} marginBottom={2}>
          <Typography sx={{ fontWeight: "bold" }} variant='caption'>
            THE LATEST
          </Typography>
        </Grid>
        <ProjectCard data={data} />
      </Grid>
    </>
  );
};

export default Homepage;
