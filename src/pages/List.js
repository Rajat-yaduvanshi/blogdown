import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../state/action-creators/index";
import {
  BsSuitHeart,
  BsSuitHeartFill,
  BsPencil,
  BsTrash,
  BsCheckCircleFill,
  BsXSquare,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from '@uiw/react-md-editor';

const List = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    index: null,
    title: "",
    category: "",
    context: "",
    image: "",
  });
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    toast.error("Post deleted successfully!", {
      className: "toast-error",
    });
  };

  const handleEditPost = (index) => {
    setEditMode(true);
    const post = posts[index];
    setEditedPost({
      index,
      title: post.title,
      category: post.category,
      context: post.context,
      image: post.image,
    });
  };

  const handleSaveEdit = () => {
    const { index, title, category, context, image } = editedPost;
    dispatch(editPost(index, title, category, context, image));
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
      image: "",
    });
    toast.success("Post updated successfully!", {
      className: "toast-success",
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
      image: "",
    });
  };

  const handleToggleLike = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((likedIndex) => likedIndex !== index));
      toast.error("Post unliked!", {
        className: "toast-error",
      });
    } else {
      setLikedPosts([...likedPosts, index]);
      toast.success("Post liked!", {
        className: "toast-success",
      });
    }
  };

  const handleViewPost = (index) => {
    navigate(`/blogs/${index}`);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const allTags = posts.reduce((tags, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    return tags;
  }, []);

  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags && post.tags.includes(selectedTag));

  return (
    <>
      <div className="bg-gray-100">
        <h2 className="text-3xl font-bold m-2 flex justify-center font-karla ">
          Your recent posts:
        </h2>
        <div className="flex justify-center flex-wrap gap-2 m-2">
          <span
            className="text-sm p-2 rounded-lg bg-gray-400 text-white font-bold"
            onClick={() => handleTagClick("all")}
          >
            #All
          </span>
          {allTags.map((tag, index) => (
            <span
              key={index}
              className={`text-sm p-2 rounded-lg bg-gray-400 text-white font-bold ${
                selectedTag === tag ? "bg-gray-600" : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
        <button
          className="bg-purple-100 p-4 text-purple-800 font-bold rounded-lg block m-3  hover:bg-purple-400 transition-all duration-200"
          onClick={() => navigate("/add-blogs")}
        >
          Add new blog
        </button>
        {filteredPosts && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-4">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="m-4 p-8 rounded-md shadow-md bg-white card"
              >
                {editMode && editedPost.index === index ? (
                  <>
                    {Object.entries(editedPost).map(([key, value]) => {
                      if (key === "image") {
                        return (
                          <div key={key} className="mb-4">
                            <label
                              className="block mb-1 font-bold"
                              htmlFor="image-input"
                            >
                              Image:
                            </label>
                            <input
                              id="image-input"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditedPost({
                                    ...editedPost,
                                    image: reader.result,
                                  });
                                };
                                if (file) {
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        );
                      } else if (key !== "context") {
                        return (
                          <input
                            key={key}
                            type="text"
                            value={value}
                            onChange={(e) =>
                              setEditedPost({
                                ...editedPost,
                                [key]: e.target.value,
                              })
                            }
                            className="mb-2 px-2 py-1 rounded border input"
                          />
                        );
                      }
                      return (
                        <MDEditor
                          key={key}
                          data-color-mode="light"
                          id="context"
                          name="context"
                          value={value}
                          onChange={(e) =>
                            setEditedPost({
                              ...editedPost,
                              [key]: e,
                            })
                          }
                        />
                      );
                    })}
                    <button
                      className="m-2 p-3 roundedshadow-sm"
                      onClick={handleSaveEdit}
                    >
                      <BsCheckCircleFill size={20} /> Save
                    </button>
                    <button
                      className="m-2  p-3 rounded shadow-sm"
                      onClick={handleCancelEdit}
                    >
                      <BsXSquare size={20} /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold font-mono text-center text-purple-900 title underline">
                        {post.title}
                        <button
                          className="m-2 text-red-600 shadow-sm"
                          onClick={() => handleToggleLike(index)}
                        >
                          {likedPosts.includes(index) ? (
                            <BsSuitHeartFill size={20} />
                          ) : (
                            <BsSuitHeart size={20} />
                          )}
                        </button>
                      </span>
                      <div className="tag">
                        {post.tags &&
                          post.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-sm p-2 m-2 rounded-lg bg-gray-700 text-white font-thin "
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>
                      <div className="tag m-2">
                        <span className="text-sm p-2 rounded-lg bg-gray-400 text-white font-bold">
                          {post.category}
                        </span>
                      </div>
                      <div className="spacer h-5" />
                      <span className="text-lg text-gray-800">
                        {post.context.length > 100
                          ? `${post.context.slice(0, 100)}...`
                          : post.context}
                      </span>

                      {/* {post.image && <img src={post.image} alt="" className="max-w-full h-auto mb-4" />} */}
                      <span>
                        <button
                          className="m-2 shadow-sm  p-2 rounded-sm  edit-button"
                          onClick={() => handleEditPost(index)}
                        >
                          <BsPencil size={20} />
                        </button>
                        <button
                          className="m-2 shadow-sm  p-2 rounded-sm delete-button"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this post?"
                              )
                            ) {
                              handleDeletePost(index);
                            }
                          }}
                        >
                          <BsTrash size={20} />
                        </button>
                        <button
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200"
                          onClick={() => handleViewPost(index)}
                        >
                          Show More
                        </button>
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </>
  );
};

export default List;
