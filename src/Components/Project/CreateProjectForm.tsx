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

export default function ProjectForm() {

  const navigate = useNavigate()

  const { projectId } = useParams();

  const { register, handleSubmit, control } = useForm<ProjectData>()

  const { user, sessionId } = useContext(UserContext)

  const [currentProject, setCurrentProject] = useState<ProjectData>();

  const [warning, setWarning] = useState<string>("")

  const toProfile = () => {
    navigate(`/projects/${projectId}`)
  }

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
  const onSubmit = async (data: ProjectData) => {

    try {
      if (user) {
        data.userId = sessionId
        data.username = user.username
      }
      return await projectService.createProject(data)
        .then((response) => navigate(`/projects/${response.data.projectId}/milestones`))
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
            <TextField
              {...register('projectName', { required: 'Project Name is required' })}
              variant='outlined'
              size='small'
              margin='dense'
              fullWidth
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item>
            <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Description</Typography>
            <TextField
              variant='outlined'
              margin='dense'
              fullWidth
              sx={{ backgroundColor: "white" }}
              {...register('description', { required: 'Description is required' })}
            />
          </Grid>
          <Grid item container>
            <Typography variant='body2' sx={{ color: 'rgb(133, 133, 133)' }}>Target Funding Amount</Typography>
            <TextField
              size='small'
              margin='dense'
              fullWidth
              sx={{ backgroundColor: "white" }}
              type='number'
              InputProps={{ inputProps: { min: 10 } }}
              {...register('targetFundingAmount', { required: 'Target funding amount is required' })}
            />
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
                  placeholderText="Select funding deadline"
                />
              )}
            />
          </Grid>
          <Grid item container justifyContent="space-between" pt={3} alignItems="center">
            <Button type='submit' variant='contained' color='primary' onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}