import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    focus: 0,
    length: 0,
    data: {},
    loc: {},
  },
  reducers: {
    dataSetter: (state, action) => {
      state.data = action.payload.data;
      state.length = action.payload.data.length; //TODO: This may be changed according to the data type.
    },
    focusSetter: (state, action) => {
      state.focus = action.payload.focus;
    },
    focusMover: (state, action) => {
      state.focus += action.payload.direction;
    },
    focusGetter: (state) => {
      return state.data[state.focus];
    },
    locSetter: (state, action) => {
      state.loc = action.payload.loc;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  dataSetter,
  focusSetter,
  focusGetter,
  locSetter,
  focusMover,
} = dataSlice.actions;

export default dataSlice.reducer;
