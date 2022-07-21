import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Grid, TextField, Button } from "@mui/material";
import CommentService from "../../services/CommentService";

type FormData = {
  commentText: string;
};

const CommentForm = () => {
  const [userComment, setUserComment] = useState<FormData>();

  const projectId = "project name";

  useEffect(() => {
    const fetchData = async () => {
      await CommentService(projectId).then((response) => {
        setUserComment(response.data);
      });
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    // return await createComment(data);
  };

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
            {...register("commentText")}
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
  );
};

export default CommentForm;
