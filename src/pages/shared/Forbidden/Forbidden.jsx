import React from 'react';
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
