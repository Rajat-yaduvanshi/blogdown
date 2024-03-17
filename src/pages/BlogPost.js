import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const BlogPost = () => {
  const { index } = useParams();
  const posts = useSelector((state) => state.blogReducer.posts);
  const post = posts[index];

  const navigate = useNavigate();

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-customGray h-screen flex justify-center items-center sm:flex-wrap">
      

      <div
        key={index}
        className="m-4 p-8 rounded-md shadow-md card w-3/4 bg-black flex"
      >
        <div className="max-w-2xl mx-auto flex-grow">
        <button
        onClick={() => navigate("/list")}
        className="p-2 rounded text-customBlue font-bold transition-all duration-200"
      >
        Back
      </button>
          <div className="p-5">
           

            <h5 className="text-customBlue font-bold text-4xl tracking-tight mb-3 text-center underline">
              {post.title}
            </h5>

            <div className="flex justify-center m-4 text-customGreen ">
              <strong>Category: {post.category}</strong>
              <strong className="mx-2">Tags: {post.tags &&
                post.tags.map((tag, index) => (
                  <span key={index} >
                    {tag}
                  </span>
                ))}</strong>
            </div>

            <MDEditor.Markdown
              source={post.context}
              data-color-mode="dark"
              style={{ background: "black", color: "#cae7eb", padding: "1rem", borderRadius: "0.5rem" }}
            />

          </div>
        </div>

        <div
          className="rounded-t-lg flex items-center"
          style={{ height: "200px", width: "40%" }}
        >
          <img
            src={post.image}
            alt=""
            style={{ width: "100%", height: "auto" }} // Set width to 100% and height to auto
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
