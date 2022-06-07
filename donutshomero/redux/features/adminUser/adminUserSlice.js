import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const adminUserSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAdminUser: (state, action) => {
      // "Mutate" the existing state, no return value needed
      state.data = action.payload;
    },
  },
});

export const { setAdminUser } = adminUserSlice.actions;

export default adminUserSlice.reducer;
