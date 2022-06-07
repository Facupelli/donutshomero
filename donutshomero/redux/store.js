import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import customerDataReducer from "../redux/features/customerData/customerDataSlice";
import donutsReducer from "../redux/features/donuts/donutsSlice";
import adminReducer from "../redux/features/adminUser/adminUserSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customerData: customerDataReducer,
    donuts: donutsReducer,
    admin: adminReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
