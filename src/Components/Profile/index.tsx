import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    Avatar,
    Paper,
    Box,
    IconButton,
    List,
    ListItem
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import UserService from "../../services/UserService";
import UserData from '../../types/User'
import ProjectService from '../../services/ProjectService';
import ProjectData from '../../types/Project';

export default function Profile() {

    // To be updated once we have current user:
    let userId = "d8ff08d1-6f3b-4e38-b6fb-218e88663891"

    const [userProfile, setUserProfile] = useState<UserData>()
    const [userProjects, setUserProjects] = useState<Array<ProjectData> | []>()

    useEffect(() => {
        const fetchData = async () => {
            await UserService.getProfile(userId)
            .then((response) => {setUserProfile(response.data)})
            .then(() => ProjectService.getProjectsByUser(userId)
            .then((response) => {setUserProjects(response.data)})) 
    }
    fetchData()
    }, [])

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{padding: 20}}> 

                <Grid sx= {{display: 'flex '}}>
                    <Typography variant="h6">
                        Profile
                    </Typography>
                    <IconButton aria-label="edit" size="large" >
                        <Link to={`/profile/${userId}/edit`}>
                            <EditIcon />
                        </Link>
                    </IconButton>
                </Grid>

                <Box sx= {{display: 'flex '}}>
                    <Avatar alt="user" src="blank-profile-picture.webp" variant="square" style={{ marginRight: "14px" }} />
                    <Grid>
                        <Typography variant="body2"> {userProfile && userProfile.name} </Typography>
                        <Typography variant="body2"> {userProfile && userProfile.username} </Typography>
                        <Typography variant="body2"> {userProfile && userProfile.bio}</Typography>
                    </Grid>
                </Box>

                <Grid>
                    <Typography variant="h6">
                        Interests
                    </Typography>
                    <List>
                        {userProfile && Object.entries(userProfile.interests).map(function([field, isInterested]) {
                            if (isInterested) {
                                return <ListItem dense key={field} > {field} </ListItem>
                        }
                        })}                  
                    </List>
                </Grid>

                <Grid>
                    <Typography variant="h6">
                        Projects Posted
                        {userProjects && !userProjects.length && (<Typography variant="body2"> No projects yet! </Typography>)}

                        {userProjects && userProjects.length > 0 && userProjects.map((project) => {
                        return <Link to={`/projects/${project.projectId}`}> {project.projectName} </Link>
                        })}
                    </Typography>
                </Grid>

                <Grid>
                    <Typography variant="h6">
                        Projects Backed
                    </Typography>
                </Grid>

                <Grid>
                    <Typography variant="h6">
                        Projects Liked
                    </Typography>
                </Grid>
            </Paper>
        </Container>
        
    )
}

