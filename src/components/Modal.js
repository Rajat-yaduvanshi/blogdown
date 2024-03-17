import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { FcOk, FcPrevious } from "react-icons/fc";

const EditModal = ({ editedPost, setEditedPost, handleSaveEdit, handleCancelEdit }) => {
  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setEditedPost(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedPost(prevState => ({
        ...prevState,
        image: imageUrl
      }));
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur">
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div className="bg-customBlue rounded-lg p-6 w-full sm:max-w-md">
          <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block mb-1">Title:</label>
            <input
              id="edit-title"
              type="text"
              value={editedPost.title}
              onChange={e => handleInputChange(e, "title")}
              className="w-full border-b-4 rounded-md p-2 bg-customBlue border-customGreen"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edit-category" className="block mb-1">Category:</label>
            <input
              id="edit-category"
              type="text"
              value={editedPost.category}
              onChange={e => handleInputChange(e, "category")}
              className="w-full border-b-4 rounded-md p-2 bg-customBlue border-customGreen"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="edit-tags" className="block mb-1">Tags (comma-separated):</label>
            <input
              id="edit-tags"
              type="text"
              value={editedPost.tags ? editedPost.tags.join(", ") : ""}

              onChange={e => handleInputChange(e, "tags")}
              className="w-full border-b-4 rounded-md p-2 bg-customBlue border-customGreen"
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="edit-image" className="block mb-1">Image:</label>
            <input
              id="edit-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border-b-4 rounded-md p-2 bg-customBlue border-customGreen"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="edit-context" className="block mb-1">Context:</label>
            <MDEditor
              id="edit-context"
              value={editedPost.context}
              onChange={value => handleInputChange({ target: { value } }, "context")}
            />
          </div>
          <div className="flex justify-end">
            <button onClick={handleSaveEdit}>
              <FcOk className="mr-2 text-3xl" />
            </button>
            <button onClick={handleCancelEdit}>
              <FcPrevious className="mr-2 text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
