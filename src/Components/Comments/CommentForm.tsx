import React from "react";
import { useForm } from "react-hook-form";
import { createComment } from "./api/apiComments";
import { Typography, Grid, TextField, Button } from "@mui/material";

type FormData = {
  headline: string;
  comment: string;
};

const Comment = () => {
  const {
    register,
    handleSubmit,
    watch,
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

        <Grid item sx={{ width: 300 }} marginBottom={2}>
          <TextField
            {...register("headline")}
            sx={{ width: 300 }}
            id='outlined-basic'
            label='Headline'
            variant='outlined'
          />
        </Grid>

        <Grid item xs={6} md={20} marginBottom={2}>
          <TextField
            {...register("comment")}
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

export default Comment;
