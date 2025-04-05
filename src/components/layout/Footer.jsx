// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start">
            <div className="small text-muted">
              &copy; {year} CodeBook - All Rights Reserved
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-end">
            <div className="d-inline-block mx-2">
              <i className="fab fa-facebook"></i>
            </div>
            <div className="d-inline-block mx-2">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="d-inline-block mx-2">
              <i className="fab fa-linkedin"></i>
            </div>
            <div className="d-inline-block mx-2">
              <i className="fab fa-github"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;