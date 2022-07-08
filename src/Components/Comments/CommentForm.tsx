import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../apiConfig";
import { TextField, Button } from "@mui/material";
import "../Style/Comments.css";

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
  const onSubmit = (data: FormData) => console.log(FormData);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div className='comment-form-container'>
        <div className='comment-form-content'>
          <div className='form-between-spacing'>
            <TextField
              {...register("headline")}
              id='outlined-basic'
              label='Headline'
              variant='outlined'
            />
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className='form-between-spacing'>
            <TextField
              {...register("comment")}
              id='outlined-basic'
              label='Comment'
              variant='outlined'
            />
          </div>

          <Button variant='contained'>Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default Comment;
