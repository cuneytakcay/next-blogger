import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postsReducer from './postsSlice';
import postDetailReducer from './postDetailSlice';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    error: errorReducer,
    postDetail: postDetailReducer,
  },
});

export default store;
