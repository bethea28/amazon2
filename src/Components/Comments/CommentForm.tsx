import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Grid, TextField, Button } from '@mui/material'
import commentService from '../../services/CommentService'
import CommentData from '../../types/Comment';
import { useNavigate, useParams } from 'react-router-dom'

const CommentForm = () => {

  const { projectId } = useParams();

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<CommentData>();

  const onSubmit = async (data: CommentData) => {
    await commentService.saveComment(data).then(() => navigate(`/projects/${projectId}`))
    console.log(data);
  }

  return (
    <Grid
      container
      spacing={0}
      justifyContent='center'
      alignItems='center'
      paddingTop={20}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item sx={{ width: 300 }} marginBottom={2}>
          <Typography variant='h6' component='h5'>
            Leave a Comment
          </Typography>
        </Grid>

        <Grid item xs={6} md={20} marginBottom={2}>
          <TextField
            {...register('content')}
            sx={{ width: 300 }}
            id='outlined-basic'
            label='Comment'
            variant='outlined'
          />
        </Grid>

        <Grid>
          <Button variant='contained'>Post Comment</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default CommentForm
