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
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const newCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      state.cart = newCart;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const newCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
      state.cart = newCart;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
