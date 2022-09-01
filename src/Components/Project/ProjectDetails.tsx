import React, { useState, useEffect, useContext } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import CommentsSection from "../Comments/CommentsSection";

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

    const toImageUpload = async () => {
        navigate(`/projects/${projectId}/imagesUpload`)
    }

    const likeCount: number = currentProject?.likedCount ? currentProject.likedCount : 0

    return (
        <Container>
            <Grid container spacing={12}>
            
                <Grid item xs={6}>
                    <Paper>
                    {currentProject && !currentProject.images && <img alt='project images' src='https://picsum.photos/400/300' />}
                    {currentProject && currentProject.images && <ImgCarousel {...currentProject} />}
                    </Paper>
                </Grid>
            </Grid>
            {canEdit &&
                <Grid item display='flex' justifyContent='center' marginBottom={3}>
                    <Button variant='outlined' size="small" color="primary" onClick={toImageUpload}>
                        Add Images
                    </Button>
                </Grid>}
            <Divider component="li">
                <Chip label="Project Details" />
            </Divider>
            <Grid container justifyContent="space-evenly" spacing={12} paddingTop={14} paddingBottom={3}>
                <Paper elevation={0}>
                    <Grid item xs={12} paddingTop={2} paddingBottom={10} paddingLeft={2} paddingRight={2}>
                        <Grid display='flex' justifyContent='space-between'>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                {currentProject && currentProject.projectName}
                            </Typography>

                            {canEdit && <IconButton aria-label='edit' size='medium' >
                                <Link to={`/projects/${projectId}/edit`}>
                                    <EditIcon />
                                </Link>
                            </IconButton>}
                        </Grid>

                        <Typography gutterBottom variant='h5'>
                            {currentProject && currentProject.category}
                        </Typography>
                        <Typography gutterBottom variant='h6' width='500px'>
                            {currentProject && currentProject.description}
                        </Typography>
                        {currentProject && (
                            <Typography variant="body2" color="textSecondary" component="p">
                                By <Link to={`/profile/${currentProject.userId}`}>
                                    {currentProject && currentProject.username}
                                </Link>
                            </Typography>)}

                    </Grid>
                </Paper>
                <Paper elevation={0}>
                    <Grid item xs={12} padding={2} paddingBottom={10} paddingLeft={2} paddingRight={2}>
                        <ProjectFundingInfo />
                    </Grid>
                </Paper>
                <Grid container justifyContent="center" spacing={3}>
                    {warning && <Alert severity="warning">{warning}</Alert>}
                    <Grid item display='flex' alignItems='center'>
                        <Typography variant="body2" color="textSecondary" component="p" marginRight={5}>
                            {likeCount} likes
                        </Typography>
                        {isLoggedIn && <Button type="submit" onClick={likeProject} variant='outlined' size="small">
                            Like
                        </Button>}
                    </Grid>
                    {isLoggedIn && <Grid item>
                        <Button variant='outlined' size="small" color="primary" onClick={toTransactionForm}>
                            Back this project
                        </Button>
                    </Grid>}
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