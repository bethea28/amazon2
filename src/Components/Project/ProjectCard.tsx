import React from 'react';
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
    //later to include (props: any) in params

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
                            <MonetizationOnOutlined />
                        </IconButton>
                        <IconButton>
                            <FavoriteBorderOutlined />
                        </IconButton>
                    </CardActions>
                </Card>
            </Paper>
        </Container>
    );
}
export default ProjectCard;
