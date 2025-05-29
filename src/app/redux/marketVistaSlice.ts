import { createSlice } from "@reduxjs/toolkit";
import { ProductionDataType, User } from "../types";

type initialStateProps = {
  wishList: ProductionDataType[];
  cart: ProductionDataType[];
  userInfo: User | null;
};

const initialState: initialStateProps = {
  wishList: [],
  cart: [],
  userInfo: null,
};

export const marketVistaSlice = createSlice({
  name: "marketVista",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      state.cart = existingItem
        ? state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...action.payload, quantity: 1 }];
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload
      );
      if (existingItem) existingItem.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload
      );
      if (existingItem) existingItem.quantity -= 1;
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    resetCart: (state) => {
      state.cart = [];
    },
    addToWishList: (state, action) => {
      const existingItem = state.wishList.find(
        (item) => item._id === action.payload._id
      );
      state.wishList = existingItem
        ? state.wishList.filter((item) => item._id === action.payload._id)
        : [...state.wishList, action.payload];
    },
    resetWhishList: (state) => {
      state.wishList = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  resetCart,
  addToWishList,
  resetWhishList,
  addUser,
  removeUser,
} = marketVistaSlice.actions;
export default marketVistaSlice.reducer;
