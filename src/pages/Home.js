import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children }) => {
  return (
    <div className="bg-customBlue rounded-lg shadow-lg p-6 max-w-md w-full">
      {children}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customGray">
      <Card>
        <h1 className="text-4xl font-extrabold mb-8">🚀 Welcome to BlogDown! 📝</h1>
        <button
          className="bg-customGreen hover:bg-gray-300 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          onClick={() => navigate('/add-blogs')}
        >
          📝 Share Your Thoughts
        </button>
      </Card>
    </div>
  );
};

export default Home;
