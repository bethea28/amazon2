import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserData, { Interests } from '../../types/User'

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
import UserService from "../../services/UserService";

export default function ProfileForm() {

    const [userProfile, setUserProfile] = useState<UserData>()
    const [interests, setInterests] = useState<Interests>({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await UserService.getProfile("ffsdfsf")
            console.log(response, "RESPOSNSEEEE")
            setUserProfile(response.data)
            setInterests(response.data.interests)
        }
        fetchData()
    }, [])

    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<UserData>({
        defaultValues: userProfile
    })

   /** handles the submission of the changes on user's profile */
    const onSubmit = handleSubmit((data: UserData) => {
        data['interests'] = interests

        try {
           return UserService.updateProfile(data, "ffsdfsf")
        } catch(e) {
            throw e
        }

    })

    /** handles the checkbox changes of the user's interests */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        let interestChanged = event.target.name
        let interestsObject;

        // unselect -> mark it false
        if (event.target.checked !== true) {
            interestsObject = {...interests, [interestChanged]: false}
        }
        // select -> mark it true
        else {
            interestsObject = {...interests, [interestChanged]: true}
        }

        setInterests(interestsObject)
        event.target.defaultChecked = !event.target.defaultChecked;
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
                    
                    {userProfile && Object.entries(userProfile!.interests).map(([key, value]) => {
                    return <FormControlLabel control={<Checkbox defaultChecked={value} {...register("interests")} name={key}  value={key} onChange={handleChange} />} label={key} key={key}/>
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