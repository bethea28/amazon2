import React, {useState} from 'react';
import {
    Container,
    Paper,
    Grid,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button
} from "@mui/material"

export default function ProfileForm() {

    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [interests, setInterests] = useState([{"name": "Art", "hasInterest": true}, 
                                                {"name": "Comics and Illustrations", "hasInterest": false}, 
                                                {"name": "Film", "hasInterest": false}, 
                                                {"name": "Fashion", "hasInterest": true}, 
                                                {"name": "Games", "hasInterest": true}, 
                                                {"name": "Tech", "hasInterest": true}, 
                                                {"name": "Music", "hasInterest": false}, 
                                                {"name": "Publishing", "hasInterest": true}])

    const handleChange = (event) => {
        
        if (event.target.checked !== true) {
            setInterests({...interests, [event.target.name]: event.target.checked})
        } else {
            setInterests({...interests, [event.target.name]: event.target.checked})
        }
    }

    return (
        <Container maxWidth="xs">
        <Paper elevation={3} style={{padding: 20}}>
            <Grid container direction="column">
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Name"
                        name="name"
                        size="small"
                        margin="dense"
                        value={name}
                        required
                    />
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Bio"
                        name="bio"
                        value={bio}
                        margin="dense"
                    />
                </Grid>
                <Grid item>
                    <FormGroup>
                    {interests.map((interest) => {
                    return <FormControlLabel control={<Checkbox defaultChecked={interest.hasInterest} name={interest.name} />} label={interest.name} key={interest.name}/>
                    })}
                    </FormGroup>
                </Grid>
                <Grid item>
                    <Button variant="contained">Save Changes</Button>
                </Grid>
                
            </Grid>
        </Paper>
        </Container>
        
    )
}