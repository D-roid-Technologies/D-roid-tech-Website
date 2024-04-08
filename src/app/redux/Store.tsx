import { configureStore } from "@reduxjs/toolkit";
import { DimensionSlice } from "./slices/Dimension";

export const store = configureStore({
  reducer: {
    dimension: DimensionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
