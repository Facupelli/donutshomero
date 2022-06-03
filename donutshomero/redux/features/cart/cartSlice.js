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
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
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

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
