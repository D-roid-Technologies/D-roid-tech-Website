import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConnectedAppsState {
    knowledgeCity: boolean;
    nerves: boolean;
    muzik: boolean;
}

const initialState: ConnectedAppsState = {
    knowledgeCity: false,
    nerves: false,
    muzik: false,
};

export const affiliatedAppsSlice = createSlice({
    name: 'affiliatedApps',
    initialState,
    reducers: {
        setConnectedApps: (state, action: PayloadAction<ConnectedAppsState>) => {
            return action.payload; // ✅ Returns new state object
        },
        toggleApp: (state, action: PayloadAction<keyof ConnectedAppsState>) => {
            state[action.payload] = !state[action.payload]; // ✅ MUTATION (immer handles this)
        },
    },
});

export const { setConnectedApps, toggleApp } = affiliatedAppsSlice.actions;
export default affiliatedAppsSlice.reducer;