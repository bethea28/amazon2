import React, {useState} from 'react';
import { useForm } from 'react-hook-form'

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


type FormData = {
    name: string,
    bio: string,
}

export default function ProfileForm() {

    const {register,
        handleSubmit,
        formState: {errors} 
    } = useForm<FormData>()

    const onSubmit = handleSubmit(data => console.log(data))

    const [interests, setInterests] = useState([{"name": "Art", "hasInterest": true}, 
                                                {"name": "Comics and Illustrations", "hasInterest": false}, 
                                                {"name": "Film", "hasInterest": false}, 
                                                {"name": "Fashion", "hasInterest": true}, 
                                                {"name": "Games", "hasInterest": true}, 
                                                {"name": "Tech", "hasInterest": true}, 
                                                {"name": "Music", "hasInterest": false}, 
                                                {"name": "Publishing", "hasInterest": true}])

    console.log(errors)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // find index of matched object using the name
        const idx = interests.findIndex((interest => interest.name === event.target.name));
        
        // unselect -> mark it false
        if (event.target.checked !== true) {
            
            interests[idx]['hasInterest'] = false;
            console.log(interests[idx])
        }
        // select -> mark it true
        else {
            interests[idx]['hasInterest'] = true;
            console.log(interests[idx])
        }
        event.target.defaultChecked = !event.target.defaultChecked;
        setInterests(interests);
    }


    return (
        <Container maxWidth="xs">
        <Paper elevation={3} style={{padding: 20}}>
            <Grid container direction="column">
                <Grid item>
                    <TextField
                        {...register("name", {required: "Name is required", minLength: {value: 3, message: 'Name should be at least 3 letters'}})}
                        variant="outlined"
                        label="Name"
                        name="name"
                        size="small"
                        margin="dense"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        {...register("bio")}
                        variant="outlined"
                        label="Bio"
                        name="bio"
                        margin="dense"
                    />
                </Grid>
                <Grid item>
                    <FormGroup>
                    {/* {...register("interests")} */}
                    {interests.map((interest) => {
                    return <FormControlLabel control={<Checkbox defaultChecked={interest.hasInterest} name={interest.name} onChange={handleChange} />} label={interest.name} key={interest.name}/>
                    })}
                    </FormGroup>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={onSubmit} >Save Changes</Button>
                </Grid>
                
            </Grid>
        </Paper>
        </Container>
        
    )
}