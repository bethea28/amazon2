import React, { useState, useEffect } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { Link, NavLink, useParams } from "react-router-dom";
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
import CommentForm from "../Comments/CommentForm";
import ProjectComments from "../Comments/ProjectComments";
import ProjectFundingInfo from "../ProjectFundingInfo/fundingCard";

const ProjectDetails = () => {

    const [currentProject, setCurrentProject] = useState<ProjectData>();

    const { projectId } = useParams();

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

    const likeProject = async () => {
        let response = await projectService.addLike(projectId!);
        setCurrentProject(response.data);
    };
    
    return (
        <Container maxWidth="lg">
            <Grid container spacing={6} justifyItems={"center"}>
                {/* <Grid item>
                    <Paper style={{ padding: 20 }}>
                        {currentProject && currentProject.images.map(src =>
                            <img alt='project images' src={src} />
                        )}
                    </Paper>
                </Grid> */}
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        <Card variant='outlined'>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h4">
                                        {currentProject && currentProject.projectName}
                                    </Typography>
                                    <Typography gutterBottom variant='h5'>
                                        {currentProject && currentProject.category}
                                    </Typography>
                                    <Typography gutterBottom variant='h6'>
                                        {currentProject && currentProject.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    {currentProject && (<Link to={`/profile/${currentProject.userId}`}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        By {currentProject && currentProject.username}
                                    </Typography>
                                    </Link>)}
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <ProjectFundingInfo></ProjectFundingInfo>
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Date
                                        {currentProject && currentProject.targetFundingDate.toString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <NavLink to={`/projects/${projectId}/transactions`}  >
                                <Button variant='outlined' size="small" color="primary">
                                    {/* funding component to be imported */}
                                    Back this project
                                </Button>
                            </NavLink>
                                <Button type="submit" onClick={likeProject} variant='outlined' size="small">
                                    Like
                                </Button>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {currentProject && currentProject.likedCount} likes
                                </Typography>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
            {<CommentForm />}
            {<ProjectComments />}
        </Container>
    )
}
export default ProjectDetails;
