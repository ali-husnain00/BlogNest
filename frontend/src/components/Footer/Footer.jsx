import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">BlogNest</h2>
        <p className="footer-text">
          Empowering ideas through words. Explore blogs on tech, travel, food & more.
        </p>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BlogNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
