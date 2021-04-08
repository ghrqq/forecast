import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    focus: 0, // Index of the selected day
    length: 0, // Length of days - API returns 5-6 days according to the request time. Useful for iteration and arrow notation.
    data: {}, // Main data.
    loc: {}, // Location where the data belongs.
  },
  reducers: {
    // Setting the data.
    dataSetter: (state, action) => {
      state.data = action.payload.data;
      state.length = action.payload.data.length;
    },
    // To change the focus when another card is clicked.
    focusSetter: (state, action) => {
      state.focus = action.payload.focus;
    },
    // To change the focus by clicks on arrows.
    focusMover: (state, action) => {
      state.focus += action.payload.direction;
    },
    // To store the location data.
    locSetter: (state, action) => {
      state.loc = action.payload.loc;
    },
  },
});

export const {
  dataSetter,
  focusSetter,
  locSetter,
  focusMover,
} = dataSlice.actions;

export default dataSlice.reducer;
