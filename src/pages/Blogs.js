import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../state/action-creators/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from '@uiw/react-md-editor';

const Blogs = () => {
  const [post, setPost] = useState({
    title: "",
    category: "",
    context: "",
    tags: [],
    image: null,
  });

  const [blogContext, setBlogContext] = useState('')
  const handleBlogContextChange = (e) => {
    setBlogContext(e)
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
    setBlogContext('')
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
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white lg:grid lg:grid-cols-2 gap-2 p-12 rounded "
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-gray-500 font-bold"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block mb-2 text-gray-500 font-bold"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block mb-2 text-gray-500 font-bold"
            >
              Tags:
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder=" tags seperated by commas"
              value={tags.join(", ")}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="context"
              className="block mb-2 text-gray-500 font-bold"
            >
              Context:
            </label>
            <MDEditor
              data-color-mode="light"
              id="context"
              name="context"
              value={blogContext}
              onChange={handleBlogContextChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
            {/* <textarea
              id="context"
              name="context"
              value={context}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            /> */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block mb-2 text-gray-500 font-bold"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          {image && (
            <img src={image} alt="Blog" className="max-w-full h-auto mb-4" />
          )}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200"
            >
              Add Blog
            </button>
            <button
              type="button"
              className="m-2 bg-purple-200 text-purple-800 font-bold py-2 px-4 rounded shadow hover:bg-purple-400 transition-all duration-200"
              onClick={() => navigate("/list")}
            >
              View Blogs
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
