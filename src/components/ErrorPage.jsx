import React from 'react';
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-zinc-700 shadow-md rounded p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Oops!</h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-4">Page Not Found...</p>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">The page you are looking for does not exist.</p>
        <div className="flex justify-center">
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
