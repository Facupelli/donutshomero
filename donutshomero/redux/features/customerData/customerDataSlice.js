import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const customerDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCustomerData: (state, action) => {
      // "Mutate" the existing state, no return value needed
      state.data = action.payload;
    },
  },
});

export const { setCustomerData } = customerDataSlice.actions;

export default customerDataSlice.reducer;
