import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/features/cart/cartSlice'
import customerDataReducer from '../redux/features/customerData/customerDataSlice'

export const store = configureStore({
  reducer: {
      cart: cartReducer,
      customerData: customerDataReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});
