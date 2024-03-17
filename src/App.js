import React from "react";
import { Link, Routes, BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import List from './pages/List';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add-blogs" element={<Blogs />} />
          <Route exact path="/about" element={<About header={"Write down your thoughts away!"} />} />
          <Route eaxct path="/list" element={<List />} />
          <Route path="/blogs/:index" element={<BlogPost/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
