import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    unit: "Fahrenheit",
    short: "F",
  },
  reducers: {
    typeSetter: (state) => {
      if (state.unit === "Fahrenheit") {
        state.unit = "Celsius";
        state.short = "C";
      } else {
        state.unit = "Fahrenheit";
        state.short = "F";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { typeSetter } = configSlice.actions;

export default configSlice.reducer;
