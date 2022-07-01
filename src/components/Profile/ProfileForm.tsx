import * as React from 'react';
import {
    Grid,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button
} from "@mui/material"

export default function ProfileForm() {
    return (
        <Grid container direction="column">
            <Grid item>
                <TextField
                    variant="outlined"
                    label="Name"
                    name="name"
                    size="small"
                    margin="dense"
                    required
                />
            </Grid>
            <Grid item>
                <TextField
                    variant="outlined"
                    label="Bio"
                    name="bio"
                    margin="dense"
                />
            </Grid>
            <Grid item>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Art" />
                    <FormControlLabel control={<Checkbox />} label="Comics and Illustrations " />
                    <FormControlLabel control={<Checkbox />} label="Fashion" />
                    <FormControlLabel control={<Checkbox />} label="Film" />
                    <FormControlLabel control={<Checkbox />} label="Games" />
                    <FormControlLabel control={<Checkbox />} label="Tech" />
                    <FormControlLabel control={<Checkbox />} label="Music" />
                    <FormControlLabel control={<Checkbox />} label="Publishing" />
                </FormGroup>
            </Grid>
            <Grid item>
                <Button variant="contained">Save Changes</Button>
            </Grid>
            
        </Grid>
        
    )
}