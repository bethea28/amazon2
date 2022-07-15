import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className='footer-container'>
        <div className='footer-links-container'>
          <div className='footer-section-container'>
            <div className='footer-label'>Company</div>
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className='footer-link'>JumpStarter</div>
            </Link>
            <Link to='/about' style={{ textDecoration: "none" }}>
              <div className='footer-link'>About</div>
            </Link>
          </div>

          <div className='footer-section-container'>
            <div className='footer-label'>Shop</div>
            <Link to='/discover' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Discover</div>
            </Link>
            <Link to='/createnewproject' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Create a New Project</div>
            </Link>
          </div>

          <div className='footer-section-container'>
            <div className='footer-label'>Support</div>
            <Link to='/shipping' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Shipping</div>
            </Link>
            <Link to='/customer-service' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Customer Service</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
