// redux/transactionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    deleteTransaction: (state, action) => {
      return state.filter(tx => tx.id !== action.payload);
    },
    editTransaction: (state, action) => {
      const index = state.findIndex(tx => tx.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
