import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  initials: string;
  userType: string;
  staffId: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToPolicy: boolean;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  initials: '',
  userType: '',
  staffId: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToPolicy: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
