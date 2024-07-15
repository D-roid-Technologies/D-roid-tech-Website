import { configureStore } from "@reduxjs/toolkit";
import { DimensionSlice } from "./slices/Dimension";
import { UserSlice } from "./slices/User";
import { AppEntrySlice } from "./slices/AppEntrySlice";
import themeReducer from "./slices/ThemeSlice";
import { ContactSlice } from "./slices/ContactSlice";
import { TestimonialSlice } from "./slices/TestimonialSlice";

export const store = configureStore({
  reducer: {
    dimension: DimensionSlice.reducer,
    user: UserSlice.reducer,
    appEntry: AppEntrySlice.reducer,
    contact: ContactSlice.reducer,
    testimonial: TestimonialSlice.reducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
