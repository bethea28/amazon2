import React from 'react'
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
} from '@mui/material'

export default function ProjectForm() {
  const { register, handleSubmit, control } = useForm<ProjectData>()

  /** handles the submission of general details for a project */
  const onSubmit = async (data: ProjectData) => {
    return await projectService.createProject(data)
  }

  return (
    <Container maxWidth='xs'>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant='h4' align='left' margin='dense'>
          Create New Project
        </Typography>
        <Grid container direction='column'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6' align='left' margin='dense'>
              Project Name
            </Typography>
            <Grid item>
              <TextField
                variant='outlined'
                size='small'
                margin='dense'
                {...register('projectName', { required: true })}
              />
            </Grid>
            <Grid item>
              <Typography variant='h6' align='left' margin='dense'>
                Select Category
              </Typography>
              <select {...register('category', { required: true })}>
                {categories.map((category) => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
            </Grid>
            <Typography variant='h6' align='left' margin='dense'>
              Project Description
            </Typography>
            <Grid item>
              <TextField
                variant='outlined'
                margin='dense'
                {...register('description', { required: true })}
              />
            </Grid>
            <Typography variant='h6' align='left' margin='dense'>
              Target Fund
            </Typography>
            <Grid item>
              <TextField
                margin='dense'
                {...register('targetFundingAmount', { required: true })}
              />
            </Grid>
            <Grid item>
              <Controller
                name='targetFundingDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    placeholderText='Enter funding deadline'
                  />
                )}
              />
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
