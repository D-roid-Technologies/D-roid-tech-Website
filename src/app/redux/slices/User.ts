import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../utils/Types";

const initialState: UserType = {
  firstName: "",
  lastName: "",
  middleName: "",
  initials: "",
  userType: "",
  uniqueId: "",
  email: "",
  phone: "",
  agreeToPolicy: false,
  isLoggedIn: false,
  gender: "",
  dateOfBirth: "",
  disability: false,
  disabilityType: "",
  photoUrl: "",
  educationalLevel: "",
  referralName: "",
  secondaryEmail: "",
  securityQuestion: "",
  securityAnswer: "",
  verifiedEmail: false,
  verifyPhoneNumber: false,
  agreedToTerms: false,
  twoFactorSettings: false,
  password: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      return { ...state, ...action.payload };
    },
    logoutUser() {
      return { ...initialState };
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
