import React, { useState, useEffect, useContext } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { useParams, Link, useNavigate } from "react-router-dom";
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
    Alert
} from "@mui/material";
import ProjectFundingInfo from "../ProjectFundingInfo/fundingCard";
import UserContext from '../../context/user/UserContext'

const ProjectDetails = () => {

    const navigate = useNavigate()

    const [currentProject, setCurrentProject] = useState<ProjectData>();
    const [warning, setWarning] = useState<string>()

    const { projectId } = useParams();

    const { isLoggedIn } = useContext(UserContext)

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
                                    </Typography>
                                    <ProjectFundingInfo />
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Target Funding Date
                                        {currentProject && currentProject.targetFundingDate.toString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {warning && <Alert severity="warning">{warning}</Alert>}
                            {isLoggedIn && <CardActions>
                                <Button variant='outlined' size="small" color="primary" onClick={toTransactionForm}>
                                    Back this project
                                </Button>
                                <Button type="submit" onClick={likeProject} variant='outlined' size="small">
                                    Like
                                </Button>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {currentProject && currentProject.likedCount} likes
                                </Typography>
                            </CardActions>}
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
}
export default ProjectDetails;
