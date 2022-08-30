import React, { useState, useEffect, useContext } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { useParams, Link, useNavigate, NavLink } from "react-router-dom";
import ImgCarousel from "../Project/ProjectImagesCarousel/index"

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
    IconButton,
    Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import CommentForm from "../Comments/CommentForm";
import ProjectComments from "../Comments/ProjectComments";
import ProjectFundingInfo from "../ProjectFundingInfo/fundingCard";
import UserContext from '../../context/user/UserContext'

const ProjectDetails = () => {

    const navigate = useNavigate()

    const [currentProject, setCurrentProject] = useState<ProjectData>();

    const [warning, setWarning] = useState<string>()

    const { projectId } = useParams();

    const { sessionId } = useContext(UserContext);

    const [canEdit, setCanEdit] = useState<boolean>();

    const { isLoggedIn } = useContext(UserContext)

    useEffect(() => {
        fetchProject();
    });

    const fetchProject = async () => {
        const response = await projectService.getProjectById(projectId)
        if (response.data) {
            setCurrentProject(response.data)
            setCanEdit(response.data.userId === sessionId)
        }
    };

    const likeProject = async () => {
        try {
            let response = await projectService.addLike(projectId!);
            setCurrentProject(response.data)
        } catch (error: any) {
            setWarning("You have already liked this project")
        }
    };

    const toTransactionForm = async () => {
        navigate(`/projects/${projectId}/transactions`)
    }

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


                                    {currentProject && <ImgCarousel {...currentProject} />}


                                    {canEdit && <IconButton aria-label='edit' size='medium' >
                                        <Link to={`/projects/${projectId}/edit`}>
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
                                    <ProjectFundingInfo />
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
                                        Back this project
                                    </Button>
                                </NavLink>
                                {warning && <Alert severity="warning">{warning}</Alert>}
                                {isLoggedIn && <CardActions>
                                    <Button type="submit" onClick={likeProject} variant='outlined' size="small">
                                        Like
                                    </Button>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {currentProject && currentProject.likedCount} likes
                                    </Typography>
                                </CardActions>}
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