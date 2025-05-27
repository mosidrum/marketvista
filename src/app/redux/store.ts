import { configureStore } from "@reduxjs/toolkit";
import marketVistaReducer from "./marketVistaSlice";

export const store = configureStore({
  reducer: {
    marketVista: marketVistaReducer,
  },
});
