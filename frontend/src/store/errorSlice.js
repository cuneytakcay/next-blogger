import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    message: null,
    status: null,
  },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearError: (state) => {
      state.message = null;
      state.status = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
