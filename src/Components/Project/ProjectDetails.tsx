import React, { useState, MouseEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { UserData } from "amazon-cognito-identity-js";
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

    const [currentProject, setCurrentProject] = useState<ProjectData>();
    const [userProfile, setUserProfile] = useState<UserData>();
    const { projectId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                await projectService.getProjectById(projectId)
                    .then(response => {
                        setCurrentProject(response.data)
                    })
            }
        }
        fetchData();
    }, [projectId])


    // const likeProject = async () => {
    //     return await ProjectService.updateProject(props.projectId, props.userId);
    // };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={6} justifyItems={"center"}>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        <img alt='project img' src={currentProject?.images} />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        <Card variant='outlined'>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h4">
                                        Project Name
                                        {currentProject?.projectName}
                                    </Typography>
                                    <Typography variant='h6' gutterBottom>
                                        Project Description
                                        {currentProject?.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        By User Name
                                        {currentProject?.userId.name}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Amount
                                        {currentProject?.targetFundingAmount}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Date
                                        {currentProject?.targetFundingDate}
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