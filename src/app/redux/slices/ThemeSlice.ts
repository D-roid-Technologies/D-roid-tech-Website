import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  isDarkMode: boolean;
  theme: 'light' | 'dark';
};

const initialState: ThemeState = {
  isDarkMode: false,
  theme: 'light',
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      state.isDarkMode = action.payload === 'dark';
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;