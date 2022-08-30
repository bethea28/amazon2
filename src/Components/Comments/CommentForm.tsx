import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Grid, TextField, Button } from '@mui/material'
import commentService from '../../services/CommentService'
import CommentData from '../../types/Comment';
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext';

const CommentForm = () => {

  const { projectId } = useParams();

  const navigate = useNavigate()

  const { user, sessionId } = useContext(UserContext)

  const { register, handleSubmit } = useForm<CommentData>();

  const onSubmit = async (data: CommentData) => {

    if (user) {
      data.userId = sessionId;
      data.userName = user.username;
      data.projectId = projectId;
    }
    await commentService.saveComment(data).then(() => navigate(`/projects/${projectId}`))
  }

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      padding={2}
      bgcolor='#E9F3FF'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item sx={{ width: 300 }} marginBottom={2}>
          <Typography variant='h6' component='h5'>
            Leave a Comment
          </Typography>
        </Grid>
        <Grid item xs={6} md={20} marginBottom={2}>
          <TextField
            variant='outlined'
            {...register('content')}
            sx={{ width: 300, backgroundColor: 'background.paper' }}
          />
        </Grid>
        <Grid>
          <Button type='submit' variant='contained'>Post Comment</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default CommentForm;
