// store/slices/notificationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

const LOCAL_KEY = "payslip";

const initialState: any[] = loadFromLocalStorage<any[]>(LOCAL_KEY, []);

const payslipSlice = createSlice({
    name: "payslip",
    initialState,
    reducers: {
        setPaysliplice: (_, action: PayloadAction<any[]>) => {
            saveToLocalStorage(LOCAL_KEY, action.payload);
            return action.payload;
        },
        clearPayslip: () => {
            saveToLocalStorage(LOCAL_KEY, []);
            return [];
        },
    },
});

export const { setPaysliplice, clearPayslip } = payslipSlice.actions;
export default payslipSlice.reducer;
