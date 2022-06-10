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
    cleanCart: (state) => {
      state.items = [];
    },
    addPromoChosenDonuts: (state, action) => {
      const { promoId, chosenDonut } = action.payload;
      const newCart = state.items.map((cartItem) => {
        if (cartItem.id === promoId) {
          return {
            ...cartItem,
            donutsPromo: [
              ...cartItem.donutsPromo,
              { donutId: chosenDonut.id, donutQuantity: chosenDonut.quantity },
            ],
          };
        }
        return cartItem;
      });
      state.items = newCart;
    },
    removePromoChosenDonuts: (state, action) => {
      const { promoId, chosenDonut } = action.payload;
      const newCart = state.items.map((cartItem) => {
        if (cartItem.id === promoId) {
          return {
            ...cartItem,
            donutsPromo: cartItem.donutsPromo.filter(
              (donut) => donut.donutId !== chosenDonut.id
            ),
          };
        }
        return cartItem;
      });
      state.items = newCart;
    },
    incrementPromoChosenQuantity: (state, action) => {
      const { promoId, donutId } = action.payload;
      const newCart = state.items.map((cartItem) => {
        if (cartItem.id === promoId) {
          return {
            ...cartItem,
            donutsPromo: cartItem.donutsPromo.map((donut) => {
              if (donut.donutId === donutId) {
                return { ...donut, donutQuantity: donut.donutQuantity + 1 };
              }
              return donut;
            }),
          };
        }
        return cartItem;
      });
      state.items = newCart;
    },
    decrementPromoChosenQuantity: (state, action) => {
      const { promoId, donutId } = action.payload;
      const newCart = state.items.map((cartItem) => {
        if (cartItem.id === promoId) {
          return {
            ...cartItem,
            donutsPromo: cartItem.donutsPromo.map((donut) => {
              if (donut.donutId === donutId) {
                return { ...donut, donutQuantity: donut.donutQuantity - 1 };
              }
              return donut;
            }),
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
  cleanCart,
  addPromoChosenDonuts,
  removePromoChosenDonuts,
  incrementPromoChosenQuantity,
  decrementPromoChosenQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
