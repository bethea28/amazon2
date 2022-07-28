import React, { useState, useEffect } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import UserService from "../../services/UserService";
import UserData from "../../types/User";
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    Paper
} from "@mui/material";

const ProjectDetails = () => {

    const [currentProject, setCurrentProject] = useState<ProjectData>();
    const [userProfile, setUserProfile] = useState<UserData>();

    // To be updated once we have current user and project:
    let loggedInUserId = "d8ff08d1-6f3b-4e38-b6fb-218e88663891"
    let projectId = "552c252b-236b-4ec3-bbde-1de4cc35067e"

    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                await projectService.getProjectById(projectId)
                    .then(response => {
                        setCurrentProject(response.data)
                    })
            }
        }
        fetchProject();
    }, [projectId])

    // To be updated once we have projects created by users:
    // let projectUserId = currentProject && currentProject.userId;
    let projectUserId = "d8ff08d1-6f3b-4e38-b6fb-218e88663891";

    useEffect(() => {
        const fetchUser = async () => {
            await UserService.getProfile(projectUserId).then((response) => {
                setUserProfile(response.data)
            })
        }
        fetchUser()
    }, [])

    const likeProject = async () => {
        return await projectService.addLike(projectId, loggedInUserId);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={6} justifyItems={"center"}>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        {currentProject && currentProject.images.map(src =>
                            <img alt='project images' src={src} />
                        )}
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        <Card variant='outlined'>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h4">
                                        {currentProject && currentProject.projectName}
                                    </Typography>
                                    <Typography variant='h6' gutterBottom>
                                        {currentProject && currentProject.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        By {userProfile && userProfile.name}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Amount
                                        {currentProject && currentProject.targetFundingAmount}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Date
                                        {currentProject && currentProject.targetFundingDate.toDateString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant='outlined' size="small" color="primary">
                                    {/* funding component to be imported */}
                                    Back this project
                                </Button>
                                <Button type="submit" onClick={likeProject} variant='outlined' size="small">
                                    Like
                                </Button>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {currentProject && (currentProject.likedBy == null ? 0 : currentProject.likedBy.length)} likes
                                </Typography>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
}
export default ProjectDetails;