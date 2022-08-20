<<<<<<< HEAD
import React from 'react';
// import ProjectData from '../../types/Project';
import {
    FavoriteBorderOutlined,
    MonetizationOnOutlined
} from '@mui/icons-material';
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
} from "@mui/material";

const ProjectCard = () => {
    //later to include (props: projectData) in params

    return (
        <Container maxWidth="xs">
            <Paper>
                <Card variant='outlined'>
                    <CardActionArea>
                        {/* place holder */}
                        <img alt='project img' src='https://picsum.photos/400/300' />
                        {/* props.image */}
                        <CardContent>
                            <Typography gutterBottom variant="h4">
                                Project Name
                                {/* {props.name} */}
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                                Project Description
                                {/* {props.description} */}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                By User Name
                                {/* {props.userId.name} */}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant='outlined' size="small" color="primary">
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
    );
}
export default ProjectCard;
=======
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
            <Link to={`/projects/${data.projectId}`} style={{textDecoration: "none"}}>
              {/* place holder */}
              <img alt='project img' src='https://picsum.photos/400/300' />
              {/* data.image */}
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
>>>>>>> 6c7c5c0d7299f1f853f120b5c75ae573a420fb68
