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
      bgcolor='#E9F3FF'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item marginBottom={2} marginTop={2}>
          <TextField
            variant='outlined'
            {...register('content')}
            sx={{ width: 200, backgroundColor: 'background.paper' }}
          />
        </Grid>
        <Grid marginBottom={2}>
          <Button type='submit' variant='contained'>Comment</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default CommentForm;
