import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.data = action.payload.posts;
    },
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
