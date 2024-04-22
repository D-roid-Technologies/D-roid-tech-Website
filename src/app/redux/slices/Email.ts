import { createSlice } from "@reduxjs/toolkit";
import { EmailType, UserType } from "../../utils/Types";

const initialState: EmailType = {
  emailFromUser: "",
};

export const EmailSlice = createSlice({
  name: "userEmail",
  initialState,
  reducers: {
    addEmailFromUser: (state, action) => {},
  },
});
