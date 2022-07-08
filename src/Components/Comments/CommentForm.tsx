import React from "react";
import { useForm } from "react-hook-form";
import { createComment } from "./api/apiComments";
import { Grid, TextField, Button } from "@mui/material";

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
        <Grid item xs={6} md={20} marginBottom={2}>
          <TextField
            {...register("headline")}
            id='outlined-basic'
            label='Headline'
            variant='outlined'
          />
        </Grid>

        <Grid item xs={6} md={20} marginBottom={2}>
          <TextField
            {...register("comment")}
            id='outlined-basic'
            label='Comment'
            variant='outlined'
          />
        </Grid>

        <Grid>
          {" "}
          <Button variant='contained'>Submit</Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default Comment;
