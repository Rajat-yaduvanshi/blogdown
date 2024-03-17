import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../state/action-creators/index";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "../components/Modal";
import { FcViewDetails, FcEditImage, FcCancel } from "react-icons/fc";
import MDEditor from "@uiw/react-md-editor";
import About from "./About";

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
  const [showEditModal, setShowEditModal] = useState(false);

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
    setShowEditModal(true); // Show the edit modal
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
    setShowEditModal(false); // Close the modal
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
      image: "",
      tags: [],
    });
    setShowEditModal(false); // Hide the edit modal
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

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleChange = (field, value) => {
    setEditedPost((prevEditedPost) => ({
      ...prevEditedPost,
      [field]: value,
    }));
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
      {filteredPosts && filteredPosts.length > 0 && (
        <div className="bg-customGray">
          <h2 className="text-3xl font-bold flex justify-center font-karla text-customBlue">
            Your recent posts:
          </h2>
          <div className="flex justify-center flex-wrap gap-2 m-2">
            {/* Tags code */}
            <span
              className={`cursor-pointer tag text-slate-200 ${
                selectedTag === "all" && "font-bold"
              }`}
              onClick={() => handleTagClick("all")}
            >
              all
            </span>
            {allTags.map((tag) => (
              <span
                key={tag}
                className={`cursor-pointer tag text-slate-200 ${
                  selectedTag === tag && "font-bold"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="p-4 font-bold rounded-lg block m-3 bg-customGreen hover:bg-gray-300 transition-all duration-200 text-white"
            onClick={() => navigate("/add-blogs")}
          >
            Add new blog
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-4">
            {filteredPosts.map((post, index) => (
              <div key={index} className="m-4 p-8 rounded-md shadow-md card">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-customBlue shadow-md border border-gray-200 rounded-lg max-w-sm">
                    <div
                      className="rounded-t-lg flex justify-center items-center"
                      style={{ height: "200px" }} // Set the desired height for the image container
                    >
                      <img
                        src={post.image}
                        alt=""
                        style={{ width: "40%", height: "auto" }} // Set width to 40% and height to auto
                      />
                    </div>
                    <div className="p-5">
                      <h5 className="text-customGreen font-bold text-4xl tracking-tight mb-3 text-center ">
                        {post.title}
                      </h5>
                      <MDEditor.Markdown
                        source={post.context.length>40 ? post.context.slice(0, 40) + " ..." : post.context} // Display first 40 characters
                        data-color-mode="dark"
                        style={{
                          background: "#cae7eb",
                          color: "black",
                          padding: "1rem",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <button
                        className="m-2 bg-customGreen hover:bg-gray-300 text-white font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center "
                        onClick={() => navigate(`/blogs/${index}`)}
                      >
                        <FcViewDetails className="mr-1" />View more
                      </button>
                      <button
                        className="m-2 bg-customGreen hover:bg-gray-300 text-white font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                        onClick={() => handleEditPost(index)}
                      >
                        <FcEditImage className="mr-1" /> Edit
                      </button>
                      <button
                        className="m-2 bg-customGreen hover:bg-gray-300 text-white font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center "
                        onClick={() => handleDeletePost(index)}
                      >
                        <FcCancel className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredPosts && filteredPosts.length === 0 && <About header={"No blog posts yet."} />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      {showEditModal && (
        // Conditionally render the modal
        <EditModal
          editedPost={editedPost}
          setEditedPost={setEditedPost}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </>
  );
};

export default List;
