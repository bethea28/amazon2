import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { useNavigate } from 'react-router-dom'
import UserData, { Interests } from '../../types/User'

import {
    Container,
    Paper,
    Grid,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    Typography
} from "@mui/material"
import UserService from "../../services/UserService";


export default function ProfileForm() {

    // To be updated once we have current user:
    let userId = "d8ff08d1-6f3b-4e38-b6fb-218e88663891"

    let navigate = useNavigate()

    const [userProfile, setUserProfile] = useState<UserData>()
    const [interests, setInterests] = useState<Interests>({})

    useEffect(() => {
        const fetchData = async () => {
                await UserService.getProfile(userId).then((response) => {
                setUserProfile(response.data)
                setInterests(response.data.interests)
            })
        }
        fetchData()
    }, [])

    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<UserData>()

   /** handles the submission of the changes on user's profile 
    * @param data   The updated user's name, bio and interests from the form 
                    which has been obtained by using "register" of the useForm hook
    * @return       Sends HTTP request to Update the user's profile using the updated @param data and the @param userId to be updated
                    Redirects to profile page on successful update
   */
    const onSubmit = handleSubmit(async (data: UserData) => {

        data['interests'] = interests

        try {
            return await UserService.updateProfile(data, userId).then(() => {
                navigate(`/profile/${userId}`);
            })
        
        } catch(e) {
            throw e
        }

    })

    /** handles the checkbox changes of the user's interests 
     * if the particular interest checkbox has now been unselected, to update the value of the interest in the interests object to false
     * if the particular interest checkbox has now been selected, to update the value of the interest in the interests object to true
    */
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
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <Typography> {message}</Typography>}
                    />
                    {userProfile && (<TextField
                        {...register("name", {required: "Name is required", minLength: {value: 3, message: 'Name should be at least 3 characters'}})}
                        variant="outlined"
                        label="Name"
                        name="name"
                        size="small"
                        margin="dense"
                        defaultValue={userProfile.name}
                    />)}
                </Grid>
                <Grid item>
                    {userProfile && (<TextField
                        {...register("bio")}
                        variant="outlined"
                        label="Bio"
                        name="bio"
                        multiline
                        margin="dense"
                        defaultValue={userProfile.bio}
                    />)}
                </Grid>
                <Grid item>
                    <FormGroup>
                    {userProfile && Object.entries(userProfile.interests).map(([field, isInterested]) => {
                    return <FormControlLabel control={<Checkbox defaultChecked={isInterested} {...register("interests")} name={field} key={field} value={field} onChange={handleChange} />} label={field} key={field}/>
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