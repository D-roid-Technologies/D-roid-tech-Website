import { createSlice } from "@reduxjs/toolkit";
import { ContactType, UserType } from "../../utils/Types";

const initialState: ContactType = {
  userFullName: "",
  userEmail: "",
  userPhoneNumber: "",
  userSubject: "",
  userMessage: "",
};

export const ContactSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserFullName: (state, action) => {
      const userFullName = action.payload;
      state.userFullName = action.payload;
      console.log("getting user full name from contact slice", userFullName);
    },
    addUserContactEmail: (state, action) => {
      const userEmail = action.payload;
      state.userEmail = action.payload;
      console.log("getting user email from contact slice", userEmail);
    },
    addUserPhoneNumber: (state, action) => {
      const userPhoneNumber = action.payload;
      state.userPhoneNumber = action.payload;
      console.log(
        "getting user phone number from Contact slice",
        userPhoneNumber
      );
    },
    addUserSubject: (state, action) => {
      const userSubject = action.payload;
      state.userSubject = action.payload;
      console.log("getting user subject from Contact slice", userSubject);
    },
    addUserMessage: (state, action) => {
      const userMessage = action.payload;
      state.userMessage = action.payload;
      console.log("getting user message from Contact slice", userMessage);
    },
  },
});
export default ContactSlice.reducer;
export const {
  addUserFullName,
  addUserMessage,
  addUserPhoneNumber,
  addUserSubject,
  addUserContactEmail,
} = ContactSlice.actions;
