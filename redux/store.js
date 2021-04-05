import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./features/loaderSlice";
import dataReducer from "./features/dataSlice";
import configReducer from "./features/configSlice";

export default configureStore({
  reducer: {
    loader: loaderReducer,
    data: dataReducer,
    config: configReducer,
  },
});
