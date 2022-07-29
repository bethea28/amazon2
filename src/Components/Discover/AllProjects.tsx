import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
    <Grid container justifyContent='center' alignItems='center'>
      <Grid container sx={{ flexDirection: 'row' }}>
        {allProjects &&
          allProjects.length > 0 &&
          allProjects.map((project) => {
            return (
              <Grid key={project.projectId}>
                <ProjectCard {...project} />
              </Grid>
            )
          })}
      </Grid>
    </Grid>
  )
}
