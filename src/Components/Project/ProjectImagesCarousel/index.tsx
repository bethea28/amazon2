import React, { useState } from 'react'
import { Grid, Box } from "@mui/material";
import ProjectData from '../../../types/Project'
import Carousel from 'react-material-ui-carousel';
import { DefaultSettingsT, SettingsT } from '../../../utils/CarouselSettings/Settings';

const ImgCarousel = (data: ProjectData) => {

  const settings = useState<SettingsT>(DefaultSettingsT);

  return (
    <Box>
      <Grid
        style={{ marginTop: "50px", color: "#494949", width:'500px'}}>
        <Carousel
          {...settings}>
          {data &&
            data.images.length > 0 &&
            data.images.map((imgSrc, idx) => {
              return (
                <Grid marginBottom={2} key={idx} display='flex' alignItems='center' justifyContent='center'>
                  <img alt='project img' src={imgSrc} style={{height: '500px'}}  />
                </Grid>
              )
            })}
        </Carousel>
      </Grid>
    </Box>
  )
}
export default ImgCarousel
