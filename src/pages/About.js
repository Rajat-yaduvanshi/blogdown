import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = ({header}) => {
  const navigate = useNavigate()

  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" /><main className="grid min-h-screen w-full place-items-center bg-customGray">
      <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl bg-gray-400"></div>

      <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 space-y-6 rounded-2xl bg-customBlue p-6 transition duration-300 hover:rotate-0">
        <div className="flex justify-end">
          <div className="h-4 w-4 rounded-full bg-customGray"></div>
        </div>

        <header className="text-center text-xl font-extrabold text-gray-600">{header}</header>

        <div>
          <p className="text-center text-5xl font-extrabold text-gray-900">BlogDown</p>
       
        </div>

        <footer className="mb-10 flex justify-center">
          <button className="flex items-baseline gap-2 rounded-lg bg-customGreen hover:bg-gray-800 px-4 py-2.5 text-xl font-bold text-white " onClick={()=>navigate("/add-blogS")}>
            <span>Create Blog!</span>
            <i className="fas fa-hand-peace text-xl"></i>
          </button>
        </footer>
      </div>
    </main></>
  );
};

export default About;
