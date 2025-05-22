import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  mode: 'light' | 'dark';
};

const initialState: ThemeState = {
  mode: 'light', // default
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
      }
    },
    loadTheme: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme') as 'light' | 'dark';
        if (stored) state.mode = stored;
      }
    }
  }
});

export const { setTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
