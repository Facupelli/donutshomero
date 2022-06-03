import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // "Mutate" the existing state, no return value needed
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state) => {
      state.cart -= 1;
    },
    incrementByAmount: (state, action) => {
      state.cart += action.payload;
    },
  },
});

export const { addToCart, removeFromCart, incrementByAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
