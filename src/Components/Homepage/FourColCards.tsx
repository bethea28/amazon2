import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import img1 from "./img/game.png";

const ProjectCard = () => {
  return (
    <>
      <Box sx={{ justifyContent: "center" }} marginTop={2}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
          sx={{ maxWidth: 1000 }}
        >
          {Array.from(Array(4)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
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
                      Project Name
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
