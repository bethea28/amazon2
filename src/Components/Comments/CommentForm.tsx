import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Grid, TextField, Button } from '@mui/material'
import commentService from '../../services/CommentService'
import CommentData from '../../types/Comment';
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'


const CommentForm = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<CommentData>();


  const { user, sessionId } = useContext(UserContext);

  const [warning, setWarning] = useState<string>("");


  const onSubmit = async (data: CommentData) => {

    try {
      if (user) {
        data.userId = sessionId
        data.username = user.username
      }
      return await commentService.saveComment(data).then(() => navigate(`/users/${data.userId}/projects`))
    } catch (error) {
      
    }
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
            {...register('commentText')}
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
