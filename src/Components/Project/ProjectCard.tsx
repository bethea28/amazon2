import React from 'react'
import ProjectData from '../../types/Project'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, positions } from '@mui/system';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  Paper,
  Grid,
  makeStyles,
  CardMedia,
  IconButton,
  CardActions
} from '@mui/material'

const ProjectCard = (data: ProjectData) => {

  const projectCoverImage: string = (data.images && (data?.images.length > 0)) ? data?.images[0] : 'https://picsum.photos/400/300'

  return (
    <Container maxWidth='xs'>
      <Paper>
        <Card variant='outlined'>
          <CardActionArea>
            <Link to={`/projects/${data.projectId}`} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                height="300"
                image={projectCoverImage}
                alt="project cover image"
              />
              {/* <Grid display='flex' justifyContent='center' flexDirection='column'>
              <img alt='project img' src={projectCoverImage} style={{height: '400px'}}/>
              </Grid> */}
              <CardContent>
                <Typography gutterBottom variant='h5'>
                  {data.projectName}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {data.description}
                </Typography>
              </CardContent>
            </Link>
            <CardActions disableSpacing>
              <Typography variant='body2' color='textSecondary' component='p'>
                By {data.username}
              </Typography>
              <IconButton sx={{ position: 'absolute', right: '20%' }} aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Typography
                sx={{ position: 'absolute', right: '10%' }}
                variant='body2' color='textSecondary' component='p'
              >{data.likedCount} likes</Typography>
            </CardActions>
          </CardActionArea>
        </Card>
      </Paper>
    </Container>
  )
}
export default ProjectCard
