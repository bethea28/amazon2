import React from 'react'
import ProjectData from '../../types/Project'
import { Link } from 'react-router-dom'
import {
  FavoriteBorderOutlined,
  MonetizationOnOutlined,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Container,
  Paper
} from '@mui/material'

const ProjectCard = (data: ProjectData) => {

  return (
    <Container maxWidth='xs'>
      <Paper>
        <Card variant='outlined'>
          <CardActionArea>
            <Link to={`/projects/${data.projectId}`} >
              {/* place holder */}
              <img alt='project img' src='https://picsum.photos/400/300' />
              {/* data.image */}
              <CardContent>
                <Typography gutterBottom variant='h4'>
                  {data.projectName}
                </Typography>
                <Typography variant='h6' gutterBottom>
                  {data.description}
                </Typography>
              </CardContent>
            </Link>
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                By User Name
                {/* {data.userId.username} */}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant='outlined' size='small' color='primary'>
              Back
            </Button>
            <IconButton>
              {/* funding component to be imported */}
              <MonetizationOnOutlined />
            </IconButton>
            <IconButton>
              {/* like button component to be imported */}
              <FavoriteBorderOutlined />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    </Container>
  )
}
export default ProjectCard
