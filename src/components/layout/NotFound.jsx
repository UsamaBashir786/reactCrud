
// src/components/layout/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <div className="display-1 text-danger mb-4">404</div>
      <h1 className="display-4 mb-4">Page Not Found</h1>
      <p className="lead mb-4">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;