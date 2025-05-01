import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../utils/Types";

interface UsersState {
    allUsers: UserType[];
}

const initialState: UsersState = {
    allUsers: [],
};

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
        setAllUsers(state, action: PayloadAction<UserType[]>) {
            state.allUsers = action.payload;
        },
    },
});

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;