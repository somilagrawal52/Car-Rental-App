import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./feature/CarSlice";

const Store = configureStore({
  reducer: {
    car: carReducer,
  },
});

export default Store;
