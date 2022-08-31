import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, TextField, Button } from '@mui/material'
import commentService from '../../services/CommentService'
import CommentData from '../../types/Comment';
import { useParams } from 'react-router-dom'
import UserContext from '../../context/user/UserContext';

interface setStateProps {
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const CommentForm = ({setIsLoaded}: setStateProps) => {

  const { projectId } = useParams();

  const { user, sessionId } = useContext(UserContext)

  const { register, handleSubmit } = useForm<CommentData>();

  const onSubmit = async (data: CommentData) => {

    if (user) {
      data.userId = sessionId;
      data.userName = user.username;
      data.projectId = projectId;
    }
    await commentService.saveComment(data).then(() => setIsLoaded(true))
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
            {...register('content', { required: 'Content is required' })}
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
