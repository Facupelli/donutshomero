import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  single_donuts: [],
  promos: [],
};

export const donutsSlice = createSlice({
  name: "donuts",
  initialState,
  reducers: {
    setSingleDonuts: (state, action) => {
      // "Mutate" the existing state, no return value needed
      state.single_donuts = action.payload;
    },
    setPromos: (state, action) => {
      // "Mutate" the existing state, no return value needed
      state.promos = action.payload;
    },
    decrementStock: (state, action) => {
      const { id, qty } = action.payload;
      const newState = state.single_donuts.map((donut) => {
        if (id === donut.id) {
          return {
            ...donut,
            stock: donut.stock - qty,
          };
        } else {
          return donut;
        }
      });
      state.single_donuts = newState;
    },
    incrementStock: (state, action) => {
      const { id, qty } = action.payload;
      const newState = state.single_donuts.map((donut) => {
        if (id === donut.id) {
          return {
            ...donut,
            stock: donut.stock + qty,
          };
        } else {
          return donut;
        }
      });
      state.single_donuts = newState;
    },
  },
});

export const { setSingleDonuts, setPromos, decrementStock ,incrementStock} =
  donutsSlice.actions;

export default donutsSlice.reducer;
