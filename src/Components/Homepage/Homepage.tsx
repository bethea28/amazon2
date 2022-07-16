import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ProjectCard from "./Card";

const data = [
  {
    projectName: "nameOne",
    projectDescription: "descONe",
    userName: "nameOne",
  },
  {
    projectName: "nameTwo",
    projectDescription: "descTwo",
    userName: "nameTwo",
  },
  {
    projectName: "nameThree",
    projectDescription: "descThree",
    userName: "nameThree",
  },
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

        <Grid
          container
          sx={{
            flexDirection: "row",
          }}
        >
          <Grid>
            <ProjectCard data={data} />
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
          <Grid>
            <ProjectCard data={data} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;
