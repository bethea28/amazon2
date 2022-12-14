import React, { useState, useEffect, useContext } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { useParams, Link, useNavigate } from "react-router-dom";
import ImgCarousel from "../Project/ProjectImagesCarousel/index"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
    Container,
    Grid,
    Button,
    Typography,
    Paper,
    Divider,
    Chip,
    IconButton,
    Alert,
    fabClasses
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import ProjectFundingInfo from "../ProjectFundingInfo/fundingCard";
import UserContext from '../../context/user/UserContext'
import CommentsSection from "../Comments/CommentsSection";

const ProjectDetails = () => {

    const navigate = useNavigate()

    const [currentProject, setCurrentProject] = useState<ProjectData>();
    const [warning, setWarning] = useState<string>()
    const [canEdit, setCanEdit] = useState<boolean>();
    const [liked, setLike] = useState<boolean>(true);

    const { projectId } = useParams();
    const { sessionId, isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        fetchProject();
    }, [projectId]);

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
            setLike(false)
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
        <Container maxWidth='xl'>
            <Grid container justifyContent="center" paddingBottom={2}>
                <Grid item>
                    {currentProject && !currentProject.images && <img alt='project images' src='https://picsum.photos/400/300' />}
                    {currentProject && currentProject.images && <ImgCarousel {...currentProject} />}
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
            <Grid container justifyContent="space-evenly" paddingTop={5} paddingBottom={3}>
                <Paper elevation={0}>
                    <Grid item xs={12} paddingTop={2} paddingBottom={10}>
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

                <Paper elevation={2}>
                    <Grid item xs={12} padding={2} paddingBottom={10} paddingLeft={2} paddingRight={2}>
                        <ProjectFundingInfo />
                        <Grid marginTop={2}>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                All funds will be released on: {currentProject && currentProject.targetFundingDate.toString().split("T", 1)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container justifyContent="space-evenly" alignItems="center">
                {warning && <Alert severity="warning">{warning}</Alert>}
                <Grid item xs={2} md={6} >
                    {isLoggedIn && <Button
                        type="submit" onClick={likeProject} variant='text' size="small">
                        <IconButton>
                            {!liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>

                    </Button>}
                    <Typography variant="body1" color="textSecondary">
                        {likeCount} likes
                    </Typography >
                </Grid>

                {isLoggedIn && <Grid item>
                    <Button
                        variant='outlined' size="small" color="primary" onClick={toTransactionForm}>
                        Back this project
                    </Button>
                </Grid>}
            </Grid>

            <Divider component="li">
                <Chip label="Comments" />
            </Divider>
            <CommentsSection />
        </Container>
    )
}
export default ProjectDetails;