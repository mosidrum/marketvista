import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
  cart: [],
  userInfo: null,
};

export const marketVistaSlice = createSlice({
  name: "marketVista",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart } = marketVistaSlice.actions;
export default marketVistaSlice.reducer;
