import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postsReducer from './postsSlice';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    error: errorReducer,
  },
});

export default store;
