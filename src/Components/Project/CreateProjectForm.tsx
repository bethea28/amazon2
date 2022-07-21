import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProjectData from '../../types/Project';
import projectService from '../../services/ProjectService';
import {
    TextField,
    Button,
    Grid,
    Container,
    Paper,
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from "@mui/material"

export default function ProjectForm() {

    const {
        register,
        handleSubmit,
        control
    } = useForm<ProjectData>();

    const onSubmit = async (data: ProjectData) => {
        // return await projectService.createProject(data);
        console.log(data);
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant='h4' align='left' margin='dense'>
                    Create New Project
                </Typography>
                <Grid container direction="column">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant='h6' align='left' margin='dense'>
                            Project Name
                        </Typography>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="dense"
                                {...register('projectName', { required: true })}
                            />
                        </Grid>
                        <FormControl variant="outlined">
                            <InputLabel id='category'>Category</InputLabel>
                            <Select
                                labelId="category"
                                id='category'
                                autoWidth
                                {...register('category', { required: true })}
                            >
                                <MenuItem value="Arts">
                                    <em>Arts</em>
                                </MenuItem>
                                <MenuItem value="Comics and Illustrations">
                                    <em>Comics and Illustrations</em>
                                </MenuItem>
                                <MenuItem value="Fashion">
                                    <em>Fashion</em>
                                </MenuItem>
                                <MenuItem value="Film">
                                    <em>Film</em>
                                </MenuItem>
                                <MenuItem value="Games">
                                    <em>Games</em>
                                </MenuItem>
                                <MenuItem value="Tech">
                                    <em>Tech</em>
                                </MenuItem>
                                <MenuItem value="Music">
                                    <em>Music</em>
                                </MenuItem>
                                <MenuItem value="Publishing">
                                    <em>Publishing</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant='h6' align='left' margin='dense'>
                            Project Description
                        </Typography>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                {...register('description', { required: true })}
                            />
                        </Grid>
                        <Typography variant='h6' align='left' margin='dense'>
                            Target Fund
                        </Typography>
                        <Grid item>
                            <TextField
                                margin="dense"
                                {...register('targetFundingAmount', { required: true })}
                            />
                        </Grid>
                        <Grid item>
                            <Controller
                                name="targetFundingDate"
                                control={control}
                                render={({ field }) => (
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