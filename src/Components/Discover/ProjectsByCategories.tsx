import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Grid } from '@mui/material'
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'
import ProjectCard from '../Project/ProjectCard'

export default function ProjectsByCategories() {
  const { projectCategory } = useParams()

  const [categoryProjects, setCategoryProjects] = useState<Array<ProjectData> | []>()

  useEffect(() => {
    fetchProjects()
  }, [projectCategory])

  const fetchProjects = async () => {
    const response = await ProjectService.getProjectsByCategory(projectCategory)
    if (response.data) {
      setCategoryProjects(response.data)
    }
  }

  return (
    
    <Grid container justifyContent='center' alignItems='center' flexDirection='column'>
      <Grid marginTop={2}>
        <Typography sx={{ fontWeight: "bold" }} variant='h3'>
          {projectCategory}
        </Typography>
      </Grid>
      {categoryProjects && !categoryProjects.length && (
        <Typography gutterBottom variant='h5'>
          No projects yet for {projectCategory}
        </Typography>
      )}
      <Grid container justifyContent='center' alignItems='center' marginTop={2}>
      {categoryProjects &&
        categoryProjects.length > 0 &&
        categoryProjects.map((project) => (
            <Grid key={project.projectId}>
              <ProjectCard {...project} />
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  )
}
