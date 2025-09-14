// store/slices/knowledgeCitySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

export interface KnowledgeCity {
    kCoin: {
        amount: number;
        storeCardDetails: boolean;
        mineCoins: { numberOfReferals: number; numberOfAdsWatched: number };
    };
    courses: any[];
    notifications: any[];
    schedules: any[];
    diaries: any[];
    lunchBox: {
        events: any[];
        jobs: any[];
    };
}

const LOCAL_KEY = "knowledgeCity";

const initialState: KnowledgeCity = loadFromLocalStorage<KnowledgeCity>(LOCAL_KEY, {
    kCoin: { amount: 0, storeCardDetails: false, mineCoins: { numberOfReferals: 0, numberOfAdsWatched: 0 } },
    courses: [],
    notifications: [],
    schedules: [],
    diaries: [],
    lunchBox: { events: [], jobs: [] },
});

export const knowledgeCitySlice = createSlice({
    name: "knowledgeCity",
    initialState,
    reducers: {
        setKnowledgeCity: (state, action: PayloadAction<KnowledgeCity>) => {
            saveToLocalStorage(LOCAL_KEY, action.payload);
            return action.payload;
        },
        clearKnowledgeCity: () => {
            saveToLocalStorage(LOCAL_KEY, initialState);
            return initialState;
        },
    },
});

export const { setKnowledgeCity, clearKnowledgeCity } = knowledgeCitySlice.actions;
export default knowledgeCitySlice.reducer;