import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaShareAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";

const BlogPost = () => {
  const { index } = useParams();
  const posts = useSelector((state) => state.blogReducer.posts);
  const post = posts[index];
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!post) {
    return <div>Loading...</div>; // You can replace this with an appropriate loading state
  }

  const handleShare = () => {
    setIsHovered(!isHovered);
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(window.location.href);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterShareUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    window.open(whatsAppShareUrl, "_blank");
  };

  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center sm:flex-wrap">
        <div className="m-4 p-8 rounded-lg shadow-lg bg-white block w-3/4 ">
          <button
            onClick={() => navigate("/list")}
            className="bg-purple-100 p-2 rounded text-purple-700  hover:bg-purple-400 transition-all duration-200"
          >
            Back
          </button>
          <h2 className="text-2xl text-center font-bold text-purple-800 title">
            {post.title}
          </h2>
          <div className="tag">
            <span className="text-sm p-2 rounded-lg bg-gray-400 text-white font-bold">
              {post.category}
            </span>
          </div>
          {post.image && (
            <img src={post.image} alt="" className="max-w-full h-auto mb-4" />
          )}
          <div className="spacer h-5" />
          <div data-color-mode="light">
            <MDEditor.Markdown source={post.context} data-color-mode="dark" />
          </div>
          <div className="flex justify-center">
            <div
              className="m-2 cursor-pointer flex p-2"
              onClick={handleShare}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                <>
                  <FaTwitter
                    size={32}
                    color="#1DA1F2"
                    onClick={handleTwitterShare}
                  />
                  <FaWhatsapp
                    size={32}
                    color="#25D366"
                    onClick={handleWhatsAppShare}
                  />
                </>
              ) : (
                <FaShareAlt size={22} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
