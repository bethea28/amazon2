import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography, Box} from "@mui/material";
import ProjectCard from "../Project/ProjectCard";
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'
import Carousel from 'react-material-ui-carousel';
import Settings, { DefaultSettingsT, SettingsT } from '../../utils/CarouselSettings/Settings'
const TrendingProjects = () => {

  const [settings, setSettings] = useState<SettingsT>(DefaultSettingsT);
  
    const [trendingProjects, setTrendingProjects]=useState<Array<ProjectData> | []>()
  
    useEffect(() => {
      fetchProjects()
    }, [])
  
    const fetchProjects = async () => {
      const response= await ProjectService.getTrendingProjectsBasedOnLikeCount()
         setTrendingProjects(response.data)
    }
    
    return (
      <Box>

<Grid marginTop={16} marginBottom={2}>
  <Typography sx={{ fontWeight: "bold" }} variant='caption'>
    TRENDING PROJECTS
  </Typography>
</Grid>

<Grid
  style={{ marginTop: "50px", color: "#494949" }}
>
<Carousel
{...settings}>
{trendingProjects &&
        trendingProjects.length > 0 &&
        trendingProjects.map((project) => {
          return (
            
            <Grid key={project.projectId} marginBottom={2}>
              <ProjectCard {...project}/>
            </Grid> 
          )
        })}
</Carousel>

</Grid>
</Box>
)
}

export default TrendingProjects