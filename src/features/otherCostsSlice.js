import { createSlice } from '@reduxjs/toolkit';

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: [],
  reducers: {
    setOtherCosts: (state, action) => action.payload,
  }
});

export const { setOtherCosts } = otherCostsSlice.actions;
export default otherCostsSlice.reducer;