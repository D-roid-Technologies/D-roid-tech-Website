import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../utils/Types";

const initialState: UserType = {
  sixDigitCode: "584390",
  sixDigitCodeFromUser: "",
  userFName: "",
  userLName: "",
  message: "",
  userEmail: "",
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSixDigitCodeFromUser: (state, action) => {
      const sixDigitCodeFromUser = action.payload;
      state.sixDigitCodeFromUser = sixDigitCodeFromUser;
      console.log("getting 6 digit code from User slice", sixDigitCodeFromUser);
    },
    addContactInfo: (state, action) => {
      const { userFName, userLName, message } = action.payload;
      state.userFName = userFName;
      state.userLName = userLName;
      state.message = message;
      console.log(
        "getting User contact details from User slice",
        userFName,
        userLName,
        message
      );
    },
    addUserEmail: (state, action) => {
      const userEmail = action.payload;
      state.userEmail = userEmail;
      console.log("getting user email from User slice", userEmail);
    },
  },
});

export default UserSlice.reducer;
export const { addSixDigitCodeFromUser, addContactInfo, addUserEmail } =
  UserSlice.actions;
