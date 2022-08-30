import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ProjectData from '../../types/Project'
import projectService from '../../services/ProjectService'
import { categories } from '../../types/Categories'
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
  Alert
} from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'

export default function ProjectForm() {

  const navigate = useNavigate()

  const { projectId } = useParams();

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<ProjectData>()

  const { user, sessionId } = useContext(UserContext)

  const [currentProject, setCurrentProject] = useState<ProjectData>();

  const [warning, setWarning] = useState<string>("")

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
      if (projectId) {
        return await projectService.updateProject(projectId, data)
      } else {
        return await projectService.createProject(data)
          .then((response) => navigate(`/projects/${response.data.projectId}/milestones`))
      }
    } catch (error: any) {
      if (error) {
        if (error.response.status == 401) {
          setWarning("You are not authorised. Please login")
        }

        else {
          setWarning("Sorry, the server encountered an unexpected condition that prevented it from fulfilling the request")
        }
      }
    }
  }

  return (
    <Container maxWidth='xs'>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant='h4' align='left' margin='dense'>
          Create New Project
        </Typography>
        <Grid container direction='column'>
          {warning && <Alert severity="warning">{warning}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6' align='left' margin='dense'>
              Project Name
            </Typography>
            <Grid item>
              {currentProject && (
                <TextField
                  variant='outlined'
                  size='small'
                  margin='dense'
                  defaultValue={currentProject.projectName}
                  {...register('projectName', { required: 'Project Name is required' })}
                />
              )}
            </Grid>
            <Grid item>
              <Typography variant='h6' align='left' margin='dense'>
                Select Category
              </Typography>
              <select {...register('category', { required: 'Category is required' })}>
                {categories.map((category) => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
            </Grid>
            <Typography variant='h6' align='left' margin='dense'>
              Project Description
            </Typography>
            <Grid item>
              {currentProject && (
                <TextField
                  variant='outlined'
                  margin='dense'
                  defaultValue={currentProject && currentProject.description}
                  {...register('description', { required: 'Description is required' })}
                />
              )}
            </Grid>
            <Typography variant='h6' align='left' margin='dense'>
              Target Fund
            </Typography>
            <Grid item>
              {currentProject && (
                <TextField
                  margin='dense'
                  defaultValue={currentProject.targetFundingAmount}
                  type='number'
                  InputProps={{ inputProps: { min: 10 } }}
                  {...register('targetFundingAmount', { required: 'Target funding amount is required' })}
                />
              )}
            </Grid>
            <Grid item>
              <Controller
                name='targetFundingDate'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    placeholderText={currentProject && currentProject.targetFundingDate.toString().split("T")[0]}
                  />
                )}
              />
              {errors.targetFundingDate && <Typography fontSize={10} color='red'>Target Funding Date is required.</Typography>}
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Container>
  )
}
