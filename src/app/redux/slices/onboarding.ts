// store/slices/onboardingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

const LOCAL_KEY = "onboarding";

const initialState: any[] = loadFromLocalStorage<any[]>(LOCAL_KEY, []);

export const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        setOnboarding: (_, action: PayloadAction<any[]>) => {
            saveToLocalStorage(LOCAL_KEY, action.payload);
            return action.payload;
        },
        clearOnboarding: () => {
            saveToLocalStorage(LOCAL_KEY, []);
            return [];
        },
    },
});

export const { setOnboarding, clearOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;