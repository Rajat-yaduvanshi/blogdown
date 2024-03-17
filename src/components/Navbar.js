import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-purple-200">
        <div className="max-w-3xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold text-purple-950 hover:font-bold font-cursive"
          >
            BlogAway
          </Link>
          <button
            onClick={toggleMenu}
            className="text-purple-950 hover:text-purple-900 focus:outline-none focus:text-purple-900 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="hidden lg:flex lg:items-center lg:justify-between text-lg gap-4 text-center py-4 px-8 md:flex">
          
            <Link to="/add-blogs" className="hover:font-bold" >
              Add Blogs
            </Link>
            <Link to="/list" className="hover:font-bold">
              View Blogs
            </Link>
            <Link to="/about" className="hover:font-bold">
              About
            </Link>
            <h1 className="text-sm ml-16">{currentTime}</h1> 
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-gray-100 py-4 px-8">
            <Link to="/add-blogs" className="block py-2">
              Add Blogs
            </Link>
            <Link to="/list" className="block py-2">
              View Blogs
            </Link>
            <Link to="/about" className="block py-2">
              About
            </Link>
           
          </div>
        )}
      </nav>
      <div className="h-3 bg-purple-300"></div>
      <div className="h-3 bg-blue-200"></div>
     
    </>
  );
};

export default Navbar;
