// store/slices/notificationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

const LOCAL_KEY = "notifications";

const initialState: any[] = loadFromLocalStorage<any[]>(LOCAL_KEY, []);

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (_, action: PayloadAction<any[]>) => {
            saveToLocalStorage(LOCAL_KEY, action.payload);
            return action.payload;
        },
        clearNotifications: () => {
            saveToLocalStorage(LOCAL_KEY, []);
            return [];
        },
    },
});

export const { setNotifications, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;