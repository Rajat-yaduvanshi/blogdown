import { ADD_POST, DELETE_POST, EDIT_POST } from "../action-creators/index";

const initialState = {
  posts: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((_, index) => index !== action.payload),
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (index === action.payload.index) {
            return {
              ...post,
              ...action.payload.post,
            };
          }
          return post;
        }),
      };

    default:
      return state;
  }
};

export default blogReducer;
