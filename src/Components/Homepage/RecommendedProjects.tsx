import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box } from "@mui/material";
import ProjectCard from "../Project/ProjectCard";
import ProjectData from '../../types/Project'
import ProjectService from '../../services/ProjectService'
import Carousel from 'react-material-ui-carousel';
import { DefaultSettingsT, SettingsT } from '../../utils/CarouselSettings/Settings'

const RecommendedProjects = () => {

    const [settings, setSettings] = useState<SettingsT>(DefaultSettingsT);

    const [recomProjects, setRecomProjects] = useState<Array<ProjectData> | []>()

    useEffect(() => {
        fetchRecommendedProjects()
    }, [])

    const fetchRecommendedProjects = async () => {
        const response = await ProjectService.getRecommendedProjects();
        setRecomProjects(response.data)
    }

    return (
        <Box>
            <Grid marginTop={10} marginBottom={2}>
                <Typography sx={{ fontWeight: "bold" }} variant='h6' textAlign='center'>
                    RECOMMENDED
                </Typography>
            </Grid>
            {recomProjects && !recomProjects.length && (
              <Typography variant='body2' > Update interests to see Recommended Projects! </Typography>
            )}
            {recomProjects && recomProjects.length > 0 && <Grid style={{ marginTop: "50px", color: "#494949" }}>
                <Carousel
                    {...settings}>
                    {recomProjects.map((project) => {
                            return (
                                <Grid key={project.projectId} marginBottom={2}>
                                    <ProjectCard {...project} />
                                </Grid>
                            )
                        })}
                </Carousel>
            </Grid>}
        </Box>
    )
}

export default RecommendedProjects;