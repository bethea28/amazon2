import React from 'react'
import ProjectData from '../../types/Project'
import { Link } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  Paper
} from '@mui/material'

const ProjectCard = (data: ProjectData) => {

  const image: string = (data.images[0]) ? data.images[0] : 'https://picsum.photos/200'

  return (
    <Container maxWidth='xs'>
      <Paper>
        <Card variant='outlined'>
          <CardActionArea>
            <Link to={`/projects/${data.projectId}`} style={{ textDecoration: "none" }}>
              <img alt='project img' src={image} />
              <CardContent>
                <Typography gutterBottom variant='h5'>
                  {data.projectName}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {data.description}
                </Typography>
              </CardContent>
            </Link>
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                By {data.username}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Container>
  )
}
export default ProjectCard
