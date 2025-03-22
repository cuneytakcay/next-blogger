import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching post details
export const fetchPostDetail = createAsyncThunk(
  'postDetail/fetchPostDetail',
  async (postId) => {
    const response = await axios.get(
      `http://localhost:5000/api/posts/${postId}`
    );
    return response.data;
  }
);

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPostDetail: (state) => {
      state.post = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { clearPostDetail } = postDetailSlice.actions;
export default postDetailSlice.reducer;
