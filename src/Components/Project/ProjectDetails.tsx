import React, { useState, useEffect } from "react";
import ProjectData from '../../types/Project';
import projectService from "../../services/ProjectService";
import { useParams } from "react-router-dom";
import ImgCarousel from "../Project/ProjectImagesCarousel/index"
import Carousel from 'react-material-ui-carousel';
import Settings, { DefaultSettingsT, SettingsT } from '../../utils/CarouselSettings/Settings';

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
    const { projectId } = useParams();
    const settings = useState<SettingsT>(DefaultSettingsT);

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
        return await projectService.addLike(projectId!);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={6} justifyItems={"center"}>
                <Grid item>
                    <Paper style={{ padding: 20 }}>
                        <Card variant='outlined'>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h4">
                                        {currentProject && currentProject.projectName}
                                    </Typography>

                                    <Grid
                                        style={{ marginTop: "50px", color: "#494949" }}>
                                        <Carousel
                                            {...settings}>
                                            {currentProject &&
                                                currentProject.images.length > 0 &&
                                                currentProject.images.map((imgSrc) => {
                                                    return (
                                                        <Grid marginBottom={2}>
                                                            <img alt='project img' src={imgSrc} />

                                                        </Grid>
                                                    )
                                                })}
                                        </Carousel>
                                    </Grid>
                                    <Typography gutterBottom variant='h5'>
                                        {currentProject && currentProject.category}
                                    </Typography>
                                    <Typography gutterBottom variant='h6'>
                                        {currentProject && currentProject.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        By {currentProject && currentProject.username}
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
                                        {currentProject && currentProject.targetFundingDate.toString()}
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