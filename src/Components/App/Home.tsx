import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "../Style/Home.css";

const Home = () => {
  return (
    <>
      <div className='homepage-container'>
        <div className='homepage-header'>Making creative ideas a reality</div>
        <div className='homepage-content'>
          <Button variant='contained'>Explore Projects</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
