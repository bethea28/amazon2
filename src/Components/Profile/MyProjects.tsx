import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Grid } from '@mui/material'
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'
import TransactionService from '../../services/transactionService'
import ProjectCard from '../Project/ProjectCard'
import UserContext from '../../context/user/UserContext'

export default function MyProjects() {
  const { userId } = useParams()

  const { sessionId } = useContext(UserContext)

  const header = sessionId === userId ? "My Projects" : `User's Projects`

  const [userProjects, setUserProjects] = useState<Array<ProjectData> | []>()
  const [backedProjects, setBackedProjects] = useState<Array<ProjectData> | []>()

  useEffect(() => {
    fetchUserProjects()
  }, [])

  const fetchUserProjects = async () => {
    const userProjectsresponse = await ProjectService.getProjectsByUser(userId)
    if (userProjectsresponse) {
      setUserProjects(userProjectsresponse.data)
    }

    const backedProjectsResponse = await TransactionService.getProjectsBackedByUser(userId)
    if (backedProjectsResponse) {
      setBackedProjects(backedProjectsResponse.data)
    }
  }

  return (
    
    <Grid container justifyContent='center' alignItems='center' flexDirection='column'>
      <Grid marginTop={2}>
        <Typography sx={{ fontWeight: "bold" }} variant='h3'>
          {header}
        </Typography>
      </Grid>
      {userProjects && !userProjects.length && (
        <Typography gutterBottom variant='h5'>
          No projects yet!
        </Typography>
      )}
      <Grid container justifyContent='center' alignItems='center' marginTop={2}>
      {userProjects &&
        userProjects.length > 0 &&
        userProjects.map((project) => (
            <Grid key={project.projectId}>
              <ProjectCard {...project} />
            </Grid>
          )
        )}
      </Grid>
      <Grid marginTop={2}>
        <Typography sx={{ fontWeight: "bold" }} variant='h3'>
          Projects Backed
        </Typography>
      </Grid>
      {backedProjects && !backedProjects.length && (
        <Typography gutterBottom variant='h5'>
          No projects yet!
        </Typography>
      )}
      <Grid container justifyContent='center' alignItems='center' marginTop={2}>
      {backedProjects &&
        backedProjects.length > 0 &&
        backedProjects.map((project) => (
            <Grid key={project.projectId}>
              <ProjectCard {...project} />
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  )
}
