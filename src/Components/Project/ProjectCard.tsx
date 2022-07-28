import React from 'react';
import ProjectData from '../../types/Project';
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
    Paper,
    Link
} from "@mui/material";

const ProjectCard = (props: any) => {
    //later to include (props: ProjectData) in params

    console.log(props)

    return (
        <Container maxWidth="xs">
            <Paper>
                <Card variant='outlined'>
                    <CardActionArea>
                        {/* place holder */}
                        <img alt='project img' src='https://picsum.photos/400/300' />
                        {/* props.image */}
                        <Link href={`/projects/${props.projectId}`} underline="none">
                            <CardContent>
                                <Typography gutterBottom variant="h4">
                                    Project Name
                                    {props.projectName}
                                </Typography>
                                <Typography variant='h6' gutterBottom>
                                    Project Description
                                    {props.description}
                                </Typography>
                            </CardContent>
                        </Link>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                By User Name
                                {/* {props.userId.username} */}
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