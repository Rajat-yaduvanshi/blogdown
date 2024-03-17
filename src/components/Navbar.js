import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faList, faInfo } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-customGray">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-4xl font-bold text-customBlue hover:text-gray-300 hover:filter drop-shadow-lg transition duration-300"
          >
            BlogDown
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`lg:hidden ${menuOpen ? "" : "hidden"}`}>
            <Link
              to="/add-blogs"
              className="block py-2 text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Blogs
            </Link>
            <Link
              to="/list"
              className="block py-2 text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              View Blogs
            </Link>
            <Link
              to="/about"
              className="block py-2 text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faInfo} className="mr-2" />
              About
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center gap-6 text-lg text-white">
            <Link
              to="/add-blogs"
              className="hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Blogs
            </Link>
            <Link
              to="/list"
              className="hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              View Blogs
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faInfo} className="mr-2" />
              About
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
