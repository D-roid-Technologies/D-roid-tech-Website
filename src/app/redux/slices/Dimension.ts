import { createSlice } from "@reduxjs/toolkit";
import { DimensionType } from "../../utils/Types";

const initialState: DimensionType = {
  width: 0,
  height: 0,
};
export const DimensionSlice = createSlice({
  name: "dimensions",
  initialState,
  reducers: {
    addWidth: (state, action) => {
      const width = action.payload;
      state.width = width;
      console.log("getting width from dimension slice", width);
    },
    addHeight: (state, action) => {
      const height = action.payload;
      state.height = height;
      console.log("getting Height from dimension slice", height);
    },
  },
});

export default DimensionSlice.reducer;
export const { addWidth, addHeight } = DimensionSlice.actions;
