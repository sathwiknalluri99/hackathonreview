import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
        <Link to="/login" className="btn btn-primary mt-4">Go to Login</Link>
      </div>
    </div>
  );
}

export default NotFound;
