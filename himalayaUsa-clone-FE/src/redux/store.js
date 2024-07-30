// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlices from './slices/userSlices';

const store = configureStore({
  reducer: {
    user:userSlices
  },
});

export default store;
