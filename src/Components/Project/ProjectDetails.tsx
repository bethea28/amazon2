import React, { useState, MouseEvent } from "react";
// import ProjectData from '../../types/Project';
import ProjectService from "../../services/ProjectService";
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    Paper,
    TextField
} from "@mui/material";

const ProjectDetails = () => {
    //later to include (props: ProjectData) in params


    const likeProject = async () => {
        return await ProjectService.updateProject(props.projectId, props.userId);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={6} justifyItems={"center"}>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        {/* image is a place holder */}
                        <img alt='project img' src='https://picsum.photos/400/300' />
                        {/* props.image */}
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        <Card variant='outlined'>
                            <CardActionArea>
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
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Amount
                                        {/* {props.targetFundingAmount} */}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Date
                                        {/* {props.targetFundingDate} */}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant='outlined' size="small" color="primary">
                                    {/* funding component to be imported */}
                                    Back this project
                                </Button>
                                <Button type="submit" onClick={() => likeProject(projectId, userId)} variant='outlined' size="small">
                                    Like
                                </Button>
                                <TextField label={props.likeCount} />
                                {/* change likeCount to likedBy */}
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
}
export default ProjectDetails;