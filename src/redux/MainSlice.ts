// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainState {
    cars : [],
    purchases: [];
}

const initialState: MainState = {
    cars : [],
    purchases: []
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateCars: (state,action) => {
        state.cars = action.payload
    },
    updatePurchases: (state,action) => {
        state.purchases = action.payload
    },
  },
});

export const { updateCars, updatePurchases } = mainSlice.actions;
export default mainSlice.reducer;
