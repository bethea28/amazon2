import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    Avatar,
    Paper,
    Box,
    IconButton
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import UserService from "../../services/UserService";
import UserData from '../../types/User'

export default function Profile() {

    // const [userProfile, setUserProfile] = useState<UserData>()


    useEffect(() => {
        const fetchData = async () => {
            const response = await UserService.getProfile("ffsdfsf")
            console.log(response.data)
            // setUserProfile(response.data)
        }
        fetchData()
    }, [])

    let userProfile = {"name": "Kevin Abdul", 
    "username": "kevinabdul",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    "interests": {"Art": true, "Comics and Illustrations": true, "Fashion": false, "Film": false, "Games": true, "Tech": true, "Music": false, "Publishing": false },
    "projects": []}
    

    // let userInterests = Object.entries(userProfile.interests).map(function([key, value]) {
    //     if (value) {
    //         return key
    //     }
    // });

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{padding: 20}}> 

                <Grid sx= {{display: 'flex '}}>
                    <Typography variant="h6">
                        Profile
                    </Typography>
                    <IconButton aria-label="edit" size="large">
                        <Link to = {`/profile/edit`} >
                            <EditIcon />
                        </Link>
                    </IconButton>
                </Grid>

                <Box sx= {{display: 'flex '}}>
                    <Avatar alt="user" src="blank-profile-picture.webp" variant="square" style={{ marginRight: "14px" }} />
                    <Grid>
                        <Typography variant="body2"> {userProfile.name} </Typography>
                        <Typography variant="body2"> {userProfile.username} </Typography>
                        <Typography variant="body2"> {userProfile.bio}</Typography>
                    </Grid>
                </Box>

                <Grid>
                    <Typography variant="h6">
                        Interests
                    </Typography>
                        {/* {userInterests.map((interest) => {
                        return <Typography display="inline" variant="body2" > {interest}, </Typography>
                        })}                   */}

                        {Object.entries(userProfile!.interests).map(function([key, value]) {
                            if (value == true) {
                                return <Typography display="inline" variant="body2" > {key}, </Typography>
                            }
                        
                        })}                  
                </Grid>

                <Grid>
                    <Typography variant="h6">
                        Projects Posted
                        {userProfile!.projects.length == 0 && (<Typography variant="body2"> No projects yet! </Typography>)}

                        {userProfile!.projects.length > 0 && userProfile!.projects.map((project) => {
                        return <Typography display="inline" variant="body2" > {project}, </Typography>
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

