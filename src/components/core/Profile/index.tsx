import React, {useState} from "react";
import {
    Container,
    Grid,
    Typography,
    Avatar,
    Paper,
    Box
} from "@mui/material"


export default function Profile() {

    const [interests, setInterests] = useState([{"name": "Art", "hasInterest": true}, 
                                                {"name": "Comics and Illustrations", "hasInterest": false}, 
                                                {"name": "Film", "hasInterest": false}, 
                                                {"name": "Fashion", "hasInterest": true}, 
                                                {"name": "Games", "hasInterest": true}, 
                                                {"name": "Tech", "hasInterest": true}, 
                                                {"name": "Music", "hasInterest": false}, 
                                                {"name": "Publishing", "hasInterest": true}])

    let userInterests = interests.filter(interest => interest.hasInterest)

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{padding: 20}}> 

                <Grid>
                    <Typography variant="h6">
                        Profile
                    </Typography>
                </Grid>

                <Box sx= {{display: 'flex '}}>
                    <Avatar alt="user" src="blank-profile-picture.webp" variant="square" style={{ marginRight: "14px" }} />
                    <Grid>
                        <Typography variant="body2"> Name</Typography>
                        <Typography variant="body2"> Bio</Typography>
                    </Grid>
                </Box>

                <Grid>
                    <Typography variant="h6">
                        Interests
                    </Typography>
                        {userInterests.map((interest) => {
                        return <Typography display="inline" variant="body2" key={interest.name}> {interest.name}, </Typography>
                        })}                  
                </Grid>

                <Grid>
                    <Typography variant="h6">
                        Projects Posted
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

