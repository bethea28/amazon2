import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box } from "@mui/material";
import ProjectData from '../../../types/Project'
import Carousel from 'react-material-ui-carousel';
import Settings, { DefaultSettingsT, SettingsT } from '../../../utils/CarouselSettings/Settings';

const ImgCarousel = (data: Array<String>) => {

  const settings = useState<SettingsT>(DefaultSettingsT);

  return (
    <Box>
      <Grid
        style={{ marginTop: "50px", color: "#494949" }}>
        <Carousel
          {...settings}>
          {data &&
            data.length > 0 &&
            data.map((imgSrc) => {
              return (
                <Grid marginBottom={2}>
                  <img alt='project img' src='{imgSrc}' />
                </Grid>
              )
            })}
        </Carousel>
      </Grid>
    </Box>
  )
}
export default ImgCarousel
