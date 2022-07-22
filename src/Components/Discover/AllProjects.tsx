import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ProjectCard from "../Homepage/Card";

// placeholder card components
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

const Discover = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
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

export default Discover;
