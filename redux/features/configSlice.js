import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    unit: "Fahrenheit",
    short: "F",
  },
  reducers: {
    typeSetter: (state) => {
      // Setting the state either F or C
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

export const { typeSetter } = configSlice.actions;

export default configSlice.reducer;
