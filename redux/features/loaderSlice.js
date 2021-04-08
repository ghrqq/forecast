import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    progress: 0,
    msg: "Trying to get your approximate location.",
    isLoading: true,
  },
  reducers: {
    // Updating the message and progressbar between different API calls.
    update: (state, action) => {
      state.progress = state.progress + action.payload.val;
      state.msg = action.payload.msg;
    },

    // Finishing the loading and data preperation process.
    finish: (state) => {
      state.isLoading = false;
    },
  },
});

export const { update, finish } = loaderSlice.actions;

export default loaderSlice.reducer;
