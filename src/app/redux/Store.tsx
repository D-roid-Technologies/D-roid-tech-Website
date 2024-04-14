import { configureStore } from "@reduxjs/toolkit";
import { DimensionSlice } from "./slices/Dimension";
import { UserSlice } from "./slices/User";

export const store = configureStore({
  reducer: {
    dimension: DimensionSlice.reducer,
    user: UserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
