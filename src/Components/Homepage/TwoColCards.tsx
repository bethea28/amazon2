import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import artist from "./img/artist.png";

const FeaturedCard = () => {
  return (
    <>
      <Box sx={{ justifyContent: "center" }} marginTop={2}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ maxWidth: 1000 }}
        >
          {Array.from(Array(2)).map((_, index) => (
            <Grid
              item
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              key={index}
            >
              <Card sx={{ maxWidth: 400 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='160'
                    src={artist}
                    alt='quote'
                  />
                  <CardContent>
                    <Typography
                      variant='body2'
                      color='text.primary'
                      sx={{ fontStyle: "italic" }}
                    >
                      “I’m never not working hard on producing and mastering my
                      art, so I’m glad to reduce the stress of sharing my work
                      with JumpStarter.”
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

export default FeaturedCard;
