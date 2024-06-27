import { createSlice } from "@reduxjs/toolkit";
import { ContactType, UserType } from "../../utils/Types";

const initialState: ContactType = {
  userFullName: "",
  userEmail: "",
  userPhoneNumber: "",
  subject: "",
  message: "",
};

export const ContactSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserFullName: (state, action) => {
      state.userFullName = action.payload;
    },
    addUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    addUserPhoneNumber: (state, action) => {
      state.userPhoneNumber = action.payload;
    },
    addSubject: (state, action) => {
      state.subject = action.payload;
    },
    addMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});
