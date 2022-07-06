import React, {useState} from 'react';
import axiosInstance from '../../../apiConfig'
import { useForm } from 'react-hook-form';
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
    interests: Array<{field: string, isInterested: boolean}>
}

export default function ProfileForm() {

    const {register,
        handleSubmit,
        formState: {errors} 
    } = useForm<FormData>()

    const [interests, setInterests] = useState([{"field": "Art", "isInterested": true}, 
                                                {"field": "Comics and Illustrations", "isInterested": false}, 
                                                {"field": "Film", "isInterested": false}, 
                                                {"field": "Fashion", "isInterested": true}, 
                                                {"field": "Games", "isInterested": true}, 
                                                {"field": "Tech", "isInterested": true}, 
                                                {"field": "Music", "isInterested": false}, 
                                                {"field": "Publishing", "isInterested": true}])

    console.log("Errors:", errors)

    const onSubmit = handleSubmit((data: FormData) => {

        data['interests'] = interests
        console.log(data)

        try {
            return axiosInstance.post('/profile', {
                data
            })
        } catch(e) {
            console.log(e)
        }

    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // find index of matched object using the name
        const idx = interests.findIndex((interest => interest.field === event.target.name));
        
        // unselect -> mark it false
        if (event.target.checked !== true) {
            
            interests[idx]['isInterested'] = false;
            console.log(interests[idx])
        }
        // select -> mark it true
        else {
            interests[idx]['isInterested'] = true;
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
                    
                    {interests.map((interest) => {
                    return <FormControlLabel control={<Checkbox defaultChecked={interest.isInterested} name={interest.field} onChange={handleChange} />} label={interest.field} key={interest.field}/>
                    })}
                    </FormGroup>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={onSubmit} > Save Changes</Button>
                </Grid>
                
            </Grid>
        </Paper>
        </Container>
        
    )
}