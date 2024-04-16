import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../utils/Types";

const initialState: UserType = {
  sixDigitCode: "584390",
  sixDigitCodeFromUser: "",
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
  },
});

export default UserSlice.reducer;
export const { addSixDigitCodeFromUser } = UserSlice.actions;
