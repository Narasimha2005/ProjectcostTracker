import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import itemsReducer from '../features/itemsSlice';
import otherCostsReducer from '../features/otherCostsSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    otherCosts: otherCostsReducer,
  },
});

export default store;
