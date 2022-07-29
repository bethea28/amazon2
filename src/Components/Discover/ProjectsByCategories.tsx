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
    await ProjectService.getProjectsByCategory(projectCategory).then(
      (response) => {
        setCategoryProjects(response.data)
      }
    )
  }

  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid container sx={{ flexDirection: 'row' }}>
        {categoryProjects && !categoryProjects.length && (
          <Typography gutterBottom variant='h4'>
            No projects yet for {projectCategory}
          </Typography>
        )}
        {categoryProjects &&
          categoryProjects.length > 0 &&
          categoryProjects.map((project) => {
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
