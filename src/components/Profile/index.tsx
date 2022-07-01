import * as React from "react";
import {
    Container,
    Grid,
    Typography,
    Avatar,
    Paper,
    Box
} from "@mui/material"


export default function Profile() {

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
                    <Typography variant="body2"> 
                        Art, Comics and Illustrations, Film
                    </Typography>                   
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

