import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    process: 0,
    msg: "Trying to get your approximate location.",
    isLoading: true,
  },
  reducers: {
    update: (state, action) => {
      state.process = state.process + action.payload.val;
      state.msg = action.payload.msg;
    },
    finish: (state) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, finish } = loaderSlice.actions;

export default loaderSlice.reducer;