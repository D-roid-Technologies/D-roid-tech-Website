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
    staffGrossPay: string,
    staffTax: string,
    staffPosition: string
};

const initialState: SignInAndOutState = {
    entries: [],
    staffGrossPay: "",
    staffTax: "",
    staffPosition: "",
};

export const signInAndOutSlice = createSlice({
    name: 'signInAndOut',
    initialState,
    reducers: {
        setSignInAndOutData(state, action: PayloadAction<Entry[]>) {
            state.entries = action.payload;
        },
        setGpay(state, action) {
            state.staffGrossPay = action.payload
        },
        setTpay(state, action) {
            state.staffTax = action.payload
        },
        setPosition(state, action) {
            state.staffPosition = action.payload
        }
    },
});

export const { setSignInAndOutData, setGpay, setTpay, setPosition } = signInAndOutSlice.actions;
export default signInAndOutSlice.reducer;