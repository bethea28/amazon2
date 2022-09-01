import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ProjectData from '../../types/Project'
import projectService from '../../services/ProjectService'
import { categories } from '../../types/Categories'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
    TextField,
    Button,
    Grid,
    Container,
    Paper,
    Typography,
    Alert
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'
import { width } from '@mui/system'

export default function EditProjectForm() {

    const navigate = useNavigate()

    const { projectId } = useParams();

    const { register, handleSubmit, control, formState: { errors } } = useForm<ProjectData>()

    const { user, sessionId } = useContext(UserContext)

    const [currentProject, setCurrentProject] = useState<ProjectData>();

    const [warning, setWarning] = useState<string>("")

    const backBtnStyle = {
        color: "#212121",
        textTransform: "none",
    };

    useEffect(() => {
        fetchProject();
    });

    const fetchProject = async () => {
        if (projectId) {
            const response = await projectService.getProjectById(projectId)
            if (response.data) {
                setCurrentProject(response.data)
            }
        }
    };

    /** handles the submission of general details for a project */
    const onSubmit = handleSubmit(async (data: ProjectData) => {

        try {
            if (user) {
                data.userId = sessionId
                data.username = user.username
            }
            return await projectService.updateProject(projectId, data).then(() => {
                toProjectDetail()
            })
        } catch (error: any) {
            if (error) {
                if (error.response.status === 401) {
                    setWarning("You are not authorised. Please login")
                }

                else {
                    setWarning("Sorry, the server encountered an unexpected condition that prevented it from fulfilling the request")
                }
            }
        }
    })

    const toProjectDetail = () => {
        navigate(`/projects/${projectId}`)
    }

    return (
        <Container maxWidth='xs' style={{ margin: 20 }}>
            <Paper elevation={3} style={{ padding: 20, minWidth: 400, backgroundColor: "#E9F3FF" }}>
                <Grid marginBottom={2}>
                    {projectId ?
                        <Typography variant='h5'>
                            Edit Project
                        </Typography> :
                        <Typography variant='h5'>
                            Create New Project
                        </Typography>}
                </Grid>
                <Grid container direction='column'>
                    {warning && <Alert severity="warning">{warning}</Alert>}
                    <Grid item>
                        <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Project Name</Typography>
                        {currentProject && (
                            <TextField
                                {...register('projectName', { required: 'Project Name is required' })}
                                variant='outlined'
                                size='small'
                                margin='dense'
                                fullWidth
                                sx={{ backgroundColor: "white" }}
                                defaultValue={currentProject?.projectName}
                            />)}
                    </Grid>
                    <Grid item>
                        <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Description</Typography>
                        {currentProject && (
                            <TextField
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                multiline
                                sx={{ backgroundColor: "white" }}
                                {...register('description', { required: 'Description is required' })}
                                defaultValue={currentProject?.description}
                            />)}
                    </Grid>
                    <Grid item container>
                        <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Target Funding Amount</Typography>
                        {currentProject && (
                            <TextField
                                size='small'
                                margin='dense'
                                fullWidth
                                sx={{ backgroundColor: "white" }}
                                type='number'
                                InputProps={{ inputProps: { min: 10 } }}
                                {...register('targetFundingAmount', { required: 'Target funding amount is required' })}
                                defaultValue={currentProject.targetFundingAmount}
                            />)}
                    </Grid>
                    <Grid item>
                        <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Select Category</Typography>
                        <select {...register('category', { required: 'Category is required' })}>
                            {categories.map((category) => (
                                <option value={category} key={category}>{category}</option>
                            ))}
                        </select>
                    </Grid>
                    <Grid item paddingTop={2}>
                        <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Target Funding Date</Typography>
                        <Controller
                            name='targetFundingDate'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <DatePicker
                                    onChange={(e) => field.onChange(e)}
                                    selected={field.value}
                                    placeholderText={currentProject?.targetFundingDate.toString().split("T")[0]}
                                />
                            )}
                        />
                        {errors.targetFundingDate && <Typography fontSize={10} color='red'>Target Funding Date is required.</Typography>}
                    </Grid>
                    <Grid item container justifyContent="space-between" pt={3} alignItems="center">
                        <Button sx={backBtnStyle} onClick={toProjectDetail} startIcon={<KeyboardArrowLeftIcon />}>
                            Go Back
                        </Button>
                        <Button type='submit' variant='contained' color='primary' onClick={onSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}