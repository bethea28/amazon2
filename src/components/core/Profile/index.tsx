import React from "react";
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
import { getProfile } from "../../../services/UserService";

export default function Profile() {

    const userProfile = getProfile("hfksdhfksfh")

    let allInterests = Object.keys(userProfile.interests);

    // let userInterests = allInterests.filter(function([key: string]: boolean) {
    //     return userProfile.interests[interest]
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
                        return <Typography display="inline" variant="body2" key={interest}> {interest}, </Typography>
                        })}                   */}
                </Grid>

                <Grid>
                    <Typography variant="h6">
                        Projects Posted
                        {userProfile.projects.length == 0 && (<Typography variant="body2"> No projects yet! </Typography>)}

                        {userProfile.projects.length > 0 && userProfile.projects.map((interest) => {
                        return <Typography display="inline" variant="body2" key={interest}> {interest}, </Typography>
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

