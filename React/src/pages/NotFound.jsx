import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="py-6 text-2xl">Oops! Page not found.This not provided in the website</p>
          <button onClick={handleGoHome} className="btn btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;