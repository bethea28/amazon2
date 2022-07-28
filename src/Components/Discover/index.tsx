import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Grid,
    Link
} from "@mui/material"
import ProjectData from '../../types/Project';
import ProjectService from '../../services/ProjectService';
import ProjectCard from '../Project/ProjectCard';

export default function ProjectsByCategories() {

    // const {projectCategory} = useParams<string>()

    const projectCategory = "Tech"

    const [categoryProjects, setCategoryProjects] = useState<Array<ProjectData> | []>()

    useEffect(() => {
        const fetchProjects = async () => {
            await ProjectService.getProjectsByCategory(projectCategory)
            .then((response) => {setCategoryProjects(response.data)})
    }
    fetchProjects()
    }, [])



    return (
        <Grid
            container
            spacing={0}
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
        >
            <Grid
            container
            sx={{
                flexDirection: "row",
            }}>
        {categoryProjects && !categoryProjects.length && (<Typography variant="body2"> No projects yet for {projectCategory}! </Typography>)}
        {categoryProjects && categoryProjects.length > 0 && categoryProjects.map((project) => {
        return  <ProjectCard props={project} key={project.projectId} />
        })}
            </Grid>

        </Grid>
    )
}