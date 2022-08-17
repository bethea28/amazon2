import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Paper,
  Box,
  IconButton,
  List,
  ListItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import UserService from '../../services/UserService'
import UserData from '../../types/User'
import ProjectService from '../../services/ProjectService'
import ProjectData from '../../types/Project'
import UserContext from '../../context/user/UserContext'

export default function Profile() {

  const { userId } = useParams()

  const { sessionId } = useContext(UserContext)

  console.log(sessionId, "SESSION!!")

  const canEdit: boolean = userId === sessionId;

  const [userProfile, setUserProfile] = useState<UserData>()
  const [userProjects, setUserProjects] = useState<Array<ProjectData> | []>()

  useEffect(() => {
    fetchUserAndProjects()
  }, [])

  const fetchUserAndProjects = async () => {
    await UserService.getProfile(userId)
      .then((response) => {setUserProfile(response.data)})
      .then(() => ProjectService.getProjectsByUser(userId))
      .then((response) => {setUserProjects(response.data)})
  } 

  const userBGColor = canEdit ? "rgb(235, 243, 254)" : "white";

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20, minWidth: 350, backgroundColor: userBGColor }}>
        <Grid margin={2} sx={{ display: 'flex ' }}>
        <Typography variant='h5'>Profile</Typography>
            {canEdit && <IconButton aria-label='edit' size='large'>
              <Link to={`/profile/${userId}/edit`}>
                <EditIcon />
              </Link>
            </IconButton>}
        </Grid>

        <Box sx={{ display: 'flex ' }}>
          <Avatar
            alt='user'
            src='blank-profile-picture.webp'
            variant='square'
            style={{ marginRight: '14px' }}
          />
          <Grid>
            <Typography variant='body2'>
              {userProfile && userProfile.name}
            </Typography>
            <Typography variant='body2'>
              {userProfile && userProfile.username}
            </Typography>
            <Typography variant='body2'>
              {userProfile && userProfile.bio}
            </Typography>
          </Grid>
        </Box>

        <Grid>
          <Typography variant='h6'>Interests</Typography>
          <List>
            {userProfile &&
              Object.entries(userProfile.interests).map(function ([
                field,
                isInterested,
              ]) {
                if (isInterested) {
                  return (
                    <ListItem dense key={field}>
                      {field}
                    </ListItem>
                  )
                }
              })}
          </List>
        </Grid>

        <Grid>
          <Typography variant='h6'>Projects Posted</Typography>
          {userProjects && !userProjects.length && (
            <Typography variant='body2'> No projects yet! </Typography>
          )}
          <List>
            {userProjects &&
              userProjects.length > 0 &&
              userProjects.map((project) => {
                return (
                  <ListItem dense key={project.projectId}>
                    <Link to={`/projects/${project.projectId}`} className="internalLinks">
                      {project.projectName}
                    </Link>
                  </ListItem>
                )
              })}
          </List>
        </Grid>

        <Grid>
          <Typography variant='h6'>Projects Backed</Typography>
        </Grid>

        <Grid>
          <Typography variant='h6'>Projects Liked</Typography>
        </Grid>
      </Paper>
    </Container>
  )
}
