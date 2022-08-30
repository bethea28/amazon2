import React, { useState, useEffect, useContext } from "react";
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
    Paper,
    Divider,
    Chip,
    Box,
    IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import CommentForm from "../Comments/CommentForm";
import ProjectComments from "../Comments/ProjectComments";
import ProjectFundingInfo from "../ProjectFundingInfo/fundingCard";
import UserContext from "../../context/user/UserContext";

const ProjectDetails = () => {

    const [currentProject, setCurrentProject] = useState<ProjectData>();

    const { projectId } = useParams();

    const { sessionId } = useContext(UserContext);

    const [canEdit, setCanEdit] = useState<boolean>();

    useEffect(() => {
        fetchProject();
    });

    const fetchProject = async () => {
        if (projectId) {
            await projectService.getProjectById(projectId)
                .then(response => {
                    setCurrentProject(response.data)
                    setCanEdit(response.data.userId === sessionId)
                })
        }
    };

    const likeProject = async () => {
        let response = await projectService.addLike(projectId!);
        setCurrentProject(response.data);
    };

    return (
        <Container>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                    <Paper>
                        <img alt='project images' src='https://picsum.photos/400/300' />
                    </Paper>
                </Grid>
                <Grid item xs={6} paddingBottom={10}>
                    <Paper style={{ padding: 10 }}>
                        <Card variant='outlined'>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {currentProject && currentProject.projectName}
                                    </Typography>
                                    {canEdit && <IconButton aria-label='edit' size='medium' >
                                        <Link to={`/profile/${projectId}/edit`}>
                                            <EditIcon />
                                        </Link>
                                    </IconButton>}
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
                                        <ProjectFundingInfo />
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Date
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {currentProject && currentProject.targetFundingDate.toString().split("T", 1)}
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
            <Divider component="li">
                <Chip label="COMMENTS" />
            </Divider>
            <Box sx={{
                width: 360,
                m: 5
            }} >
                <Paper>
                    {<CommentForm />}
                </Paper>
            </Box>
            <Box paddingTop={5}>
                {<ProjectComments />}
            </Box>
        </Container>
    )
}
export default ProjectDetails;