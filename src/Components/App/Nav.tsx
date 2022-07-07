import React from "react";
import { Link } from "react-router-dom";
import "../Style/Nav.css";

const Nav = () => {
  return (
    <>
      <div className='nav-container'>
        <div className='nav-project-content'>
          <Link to='/' style={{ textDecoration: "none" }}>
            <div className='nav-logo'>JumpStarter</div>
          </Link>
          <div className='nav-project-copy-container'>
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className='nav-project-copy'>Discover</div>
            </Link>
            <Link to='' style={{ textDecoration: "none" }}>
              <div className='nav-project-copy'>Create a New Project</div>
            </Link>
          </div>
        </div>

        <div className='nav-account-content'>
          <div className='nav-project-copy-container'>
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className='nav-account-copy'>Search</div>
            </Link>
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className='nav-account-copy'>Account</div>
            </Link>
            <Link to='' style={{ textDecoration: "none" }}>
              <div className='nav-account-copy'>Settings</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
