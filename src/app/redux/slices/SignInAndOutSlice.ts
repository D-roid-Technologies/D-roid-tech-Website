import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Entry = {
    email: string;
    employeeId?: string;
    timestamp: string;
    type: 'Sign In' | 'Sign Out';
    note?: string;
}
type SignInAndOutState = {
    entries: Entry[];
};

const initialState: SignInAndOutState = {
    entries: [],
};

export const signInAndOutSlice = createSlice({
    name: 'signInAndOut',
    initialState,
    reducers: {
        setSignInAndOutData(state, action: PayloadAction<Entry[]>) {
            state.entries = action.payload;
        },
    },
});

export const { setSignInAndOutData } = signInAndOutSlice.actions;
export default signInAndOutSlice.reducer;