import { configureStore } from "@reduxjs/toolkit";
import { DimensionSlice } from "./slices/Dimension";
import { UserSlice } from "./slices/User";
import { AppEntrySlice } from "./slices/AppEntrySlice";

export const store = configureStore({
  reducer: {
    dimension: DimensionSlice.reducer,
    user: UserSlice.reducer,
    appEntry: AppEntrySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
