import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'
import ProjectCard from '../Project/ProjectCard'

export default function AllProjects() {

  const [allProjects, setAllProjects] = useState<Array<ProjectData> | []>()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    await ProjectService.getAllProjects()
    .then((response) => {setAllProjects(response.data)})
  }

  return (
    <Grid container justifyContent='center' alignItems='center' flexDirection='column'>
      <Grid marginTop={2}>
        <Typography sx={{ fontWeight: "bold" }} variant='h3'>
          All Projects
        </Typography>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' marginTop={2}>
      {allProjects &&
        allProjects.length > 0 &&
        allProjects.map((project) => {
          return (
            <Grid key={project.projectId} marginBottom={2}>
              <ProjectCard {...project} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
