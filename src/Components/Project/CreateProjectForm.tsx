import React from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../../apiConfig';
import {
    TextField,
    Button,
    Grid,
    Container,
    Paper,
    Typography
} from "@mui/material"

type FormData = {
    name: string;
    description: string;
    targetFund: number;
    deadline: Date;
}

export default function ProjectForm() {
    const {
        register,
        handleSubmit,
        control
    } = useForm<FormData>();

    const formSubmitHandler: SubmitHandler<FormData> = (data: FormData) => {
        console.log(data);
    }
  
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{padding: 20}}>
                <Typography variant='h4' align='left' margin='dense'>
                    Create New Project 
                </Typography>
                <Grid container direction="column">
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                        <Typography variant='h6' align='left' margin='dense'>
                        Project Name 
                        </Typography>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="dense"
                                {...register('name', {required: true})}
                            />
                        </Grid>
                        <Typography variant='h6' align='left' margin='dense'>
                        Project Description
                        </Typography>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                {...register('description', {required: true})}
                            />
                        </Grid>
                        <Typography variant='h6' align='left' margin='dense'>
                        Target Fund 
                        </Typography>
                        <Grid item>
                            <TextField
                                margin="dense"
                                {...register('targetFund', {required: true})}
                            />
                        </Grid>
                        <Grid item>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({field}) => (
                                    <DatePicker onChange={(e) => field.onChange(e)}
                                        selected={field.value}
                                        placeholderText="Enter funding deadline"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </Container>
    )
};