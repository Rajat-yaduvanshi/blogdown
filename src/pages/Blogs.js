import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../state/action-creators/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from '@uiw/react-md-editor';
import { FaPlus, FaEye } from "react-icons/fa";

const Blogs = () => {
  const [post, setPost] = useState({
    title: "",
    category: "",
    context: "",
    tags: [],
    image: null,
  });

  const [blogContext, setBlogContext] = useState('');

  const handleBlogContextChange = (e) => {
    setBlogContext(e);
    setPost((prevState) => ({
      ...prevState,
      context: blogContext,
    }));
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      post.title.trim() === "" ||
      post.category.trim() === "" ||
      post.context.trim() === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Dispatch action to add post
    dispatch(
      addPost(post.title, post.category, post.context, post.tags, post.image)
    );

    // Reset form and error state
    setPost({ title: "", category: "", context: "", tags: [], image: null });
    setBlogContext('');
    // Show success message
    toast.success("Blog successfully added!");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      } else {
        setPost((prevState) => ({
          ...prevState,
          image: null,
        }));
      }
    } else if (name === "tags") {
      const tagArray = value.split(",").map((tag) => tag.trim());
      setPost((prevState) => ({
        ...prevState,
        tags: tagArray,
      }));
    } else {
      setPost((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const { title, category, context, tags, image } = post;

  return (
    <>
      <div className="bg-customGray h-screen flex justify-center items-center text-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-customBlue p-5 rounded w-3/4 max-w-xl"
        >
      

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-1 text-black font-bold"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
               className="border-b border-gray-400 p-2 w-full focus:outline-none focus:border-blue-500 bg-customBlue"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block mb-1 text-black font-bold"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
               className="border-b border-gray-400 p-2 w-full focus:outline-none focus:border-blue-500 bg-customBlue"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block mb-1 text-black font-bold"
            >
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder=" tags separated by commas"
              value={tags.join(", ")}
              onChange={handleChange}
               className="border-b border-gray-400 p-2 w-full focus:outline-none focus:border-blue-500 bg-customBlue"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="context"
              className="block mb-1 text-black font-bold"
            >
              Context:
            </label>
            <MDEditor
              data-color-mode="light"
              id="context"
              name="context"
              value={blogContext}
              onChange={handleBlogContextChange}
               className="border-b border-gray-400 p-2 w-full focus:outline-none focus:border-blue-500 bg-customBlue"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block mb-1 text-black font-bold"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
               className="border-b border-gray-400 p-2 w-full focus:outline-none focus:border-blue-500 bg-customBlue"
            />
          </div>
          <div className="flex justify-end mb-4 ">
            <button
              type="submit"
              className="rounded p-2"
            >
              <FaPlus size={25} />
            </button>
            <button
              type="button"
              className="m-2"
              onClick={() => navigate("/list")}
            >
              <FaEye size={25} />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </>
  );
};

export default Blogs;
