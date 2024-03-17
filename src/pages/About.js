import React from 'react';

const About = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-700">
          Welcome to the Blog Post App! Explore, create, and engage with our platform.
        </p>
        <ul className="mt-6 text-gray-700">
          <li className="flex items-center mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a1 1 0 100-2 1 1 0 000 2zM5 6a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2zM10 0a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-3-7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            View a list of blog posts.
          </li>
          <li className="flex items-center mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a1 1 0 100-2 1 1 0 000 2zM10 0a8 8 0 100 16 8 8 0 000-16zm3 7h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V3a1 1 0 112 0v4z" clipRule="evenodd" />
            </svg>
            Read the details of a blog post.
          </li>
          <li className="flex items-center mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a1 1 0 100-2 1 1 0 000 2zM5 6a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2zM10 0a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-3-7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Add a new blog post.
          </li>
          <li className="flex items-center mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a1 1 0 100-2 1 1 0 000 2zM10 0a8 8 0 100 16 8 8 0 000-16zm3 7h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V3a1 1 0 112 0v4z" clipRule="evenodd" />
            </svg>
            Edit or delete a blog post.
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a1 1 0 100-2 1 1 0 000 2zM10 0a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-3-7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Like your favorite blog posts.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
