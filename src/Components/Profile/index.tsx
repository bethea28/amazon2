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

  const userBGColor = canEdit ? "#E9F3FF" : "white";

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20, minWidth: 400, backgroundColor: userBGColor }}>
        <Grid margin={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Profile</Typography>
          {canEdit && <IconButton aria-label='edit' size='medium' >
            <Link to={`/profile/${userId}/edit`}>
              <EditIcon />
            </Link>
          </IconButton>}
        </Grid>
        <Grid container spacing={2} margin={2} sx={{ display: 'flex', flexDirection:'column' }}>
          <Box sx={{ display: 'flex ' }}>
            <Grid marginLeft={2} sx={{ alignSelf: 'center'}}>
              <Avatar
                alt='user'
                variant='square'
                sx={{ width: 70, height: 70}}
              />
              <Link to={`/avatarUpload`} style={{fontSize: '12px'}} className="internalLinks">Edit avatar</Link>
            </Grid>
            <Grid marginLeft={3}>
              <Typography variant='body1'>
                {userProfile && userProfile.name}
              </Typography>
              <Typography variant='body1'>
                {userProfile && userProfile.username}
              </Typography>
              <Typography variant='body2' sx={{marginTop: 1}}>
                {userProfile && userProfile.bio}
              </Typography>
            </Grid>
          </Box>

          <Grid item>
            <Typography variant='h6'>Interests</Typography>
            <List sx={{ fontSize: 14}}>
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

          <Grid item>
            <Typography variant='h6'>Projects Posted</Typography>
            {userProjects && !userProjects.length && (
              <Typography variant='body2'> No projects yet! </Typography>
            )}
            <List sx={{ fontSize: 14}}>
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

          <Grid item>
            <Typography variant='h6'>Projects Backed</Typography>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  )
}
