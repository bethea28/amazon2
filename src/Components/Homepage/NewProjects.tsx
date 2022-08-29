import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography, Box} from "@mui/material";
import ProjectCard from "../Project/ProjectCard";
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'
import Carousel from 'react-material-ui-carousel';
import Settings, { DefaultSettingsT, SettingsT } from '../../utils/CarouselSettings/Settings'
const NewProjects = () => { 

  const [settings, setSettings] = useState<SettingsT>(DefaultSettingsT);
  
    const [newProjects, setNewProjects] = useState<Array<ProjectData> | []>()
  
    useEffect(() => {
      fetchProjects()
    }, [])
  
    const fetchProjects = async () => {
      const response= await ProjectService.getNewProjects()
         setNewProjects(response.data)
    }
    


    return (
      <Box>

<Grid marginTop={16} marginBottom={2}>
  <Typography sx={{ fontWeight: "bold" }} variant='caption'>
    THE LATEST
  </Typography>
</Grid>

<Grid
  style={{ marginTop: "50px", color: "#494949" }}
>
<Carousel
{...settings}>
{newProjects &&
        newProjects.length > 0 &&
        newProjects.map((project) => {
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

export default NewProjects