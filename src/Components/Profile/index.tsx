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
import TransactionType from '../../types/transactions'
import TransactionService from '../../services/transactionService'

export default function Profile() {

  const { userId } = useParams()

  const { sessionId } = useContext(UserContext)
  const canEdit: boolean = userId === sessionId;

  const [userProfile, setUserProfile] = useState<UserData>()
  const [userProjects, setUserProjects] = useState<Array<ProjectData> | []>()
  const [backedProjects, setBackedProjects] = useState<Array<TransactionType> | []>()

  useEffect(() => {
    fetchUserAndProjects()
  }, [])

  const fetchUserAndProjects = async () => {
    const userResponse = UserService.getProfile(userId)
    const projectResponse = await ProjectService.getProjectsByUser(userId)
    const backedProjectsResponse = await TransactionService.getProjectsBackedByUser(userId)

    Promise.all([userResponse, projectResponse, backedProjectsResponse])
      .then((values: any) => {
        setUserProfile(values[0].data)
        setUserProjects(values[1].data)
        setBackedProjects(values[2].data)
      })
  } 

  const userBGColor: string = canEdit ? "#E9F3FF" : "white";

  const userAvatar: string = (userProfile && userProfile.avatar) ? userProfile.avatar : 'https://picsum.photos/400/300'

  return (
    <Container maxWidth='xs' style={{ margin: 20 }}>
      <Paper elevation={3} style={{ padding: 20, minWidth: 400, backgroundColor: userBGColor }}>
        <Grid margin={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h4' margin={2}>Profile</Typography>
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
                variant='square'
                src={userAvatar}
                alt='User Avatar'
                sx={{ width: 100, height: 100}}
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
            {backedProjects && !backedProjects.length && (
              <Typography variant='body2'> No backed projects yet! </Typography>
            )}
            <List sx={{ fontSize: 14}}>
              {backedProjects &&
                backedProjects.length > 0 &&
                backedProjects.map((transaction, idx) => {
                  return (
                    <ListItem dense key={idx}>
                      <Link to={`/projects/${transaction.projectId}`} className="internalLinks">
                        {transaction.projectId}
                      </Link>
                    </ListItem>
                  )
                })}
            </List>
          </Grid>

        </Grid>
      </Paper>
    </Container>
  )
}
