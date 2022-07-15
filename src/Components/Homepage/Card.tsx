import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import img1 from "./img/game.png";

export interface ProjectCardProps {
  data: [{ projectName: string; projectDescription: string; userName: string }];
}

const ProjectCard = (props: ProjectCardProps) => {
  console.log(props.data[0]);

  return (
    <>
      <Box sx={{ justifyContent: "center" }} marginTop={2}>
        <Grid container sx={{ maxWidth: 1000 }}>
          {props.data.map((element) => (
            <Grid>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    src={img1}
                    alt='game'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h6' component='div'>
                      {element && element.projectName}
                    </Typography>
                    <Typography variant='body2' color='text.primary'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tellus porttitor feugiat arcu.
                    </Typography>
                    <Typography variant='caption' color='#707070'>
                      <br></br>Username
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProjectCard;
