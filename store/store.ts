import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './slices/cryptoSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    theme: themeReducer
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;