import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // "Mutate" the existing state, no return value needed
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.id !== id);
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const newCart = state.items.map((cartItem) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            stock: cartItem.stock - 1,
          };
        }
        return cartItem;
      });
      state.items = newCart;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const newCart = state.items.map((cartItem) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            stock: cartItem.stock + 1,
          };
        }
        return cartItem;
      });
      state.items = newCart;
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
