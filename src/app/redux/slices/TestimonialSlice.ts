import { createSlice } from "@reduxjs/toolkit";
import { ContactType, TestimonialType, UserType } from "../../utils/Types";

const initialState: TestimonialType = {
  name: "",
  comapanyName: "",
  position: "",
  serviceType: "",
  message: "",
};

export const TestimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    addName: (state, action) => {
      const name = action.payload;
      state.name = action.payload;
      console.log("getting  name from testimonial slice", name);
    },
    addComapanyName: (state, action) => {
      const comapanyName = action.payload;
      state.comapanyName = action.payload;
      console.log("getting comapany name from testimonial slice", comapanyName);
    },
    addPosition: (state, action) => {
      const position = action.payload;
      state.position = action.payload;
      console.log("getting user position from testimonial slice", position);
    },
    addServiceType: (state, action) => {
      const serviceType = action.payload;
      state.serviceType = action.payload;
      console.log("getting service Type from testimonial slice", serviceType);
    },
    addMessage: (state, action) => {
      const message = action.payload;
      state.message = action.payload;
      console.log("getting user message from testimonial slice", message);
    },
  },
});
export default TestimonialSlice.reducer;
export const {
  addName,
  addMessage,
  addComapanyName,
  addPosition,
  addServiceType,
} = TestimonialSlice.actions;
