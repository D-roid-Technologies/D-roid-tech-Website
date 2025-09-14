import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

// Types
interface ToolBox {
    toolBoxInfo: any[];
}

interface Calculate {
    calculators: any[];
}

interface Schedules {
    mySchedles: any[];
}

interface DataState {
    toolBox: ToolBox;
    calculate: Calculate;
    schedules: Schedules;
    loading: boolean;
    error: string | null;
}

// Helper functions to persist/load local storage
const LOCAL_STORAGE_KEY = "droidData";

const saveToLocalStorage = (state: DataState) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
        console.error("Error saving to localStorage:", err);
    }
};

const loadFromLocalStorage = (): DataState | undefined => {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!data) return undefined;
        return JSON.parse(data);
    } catch (err) {
        console.error("Error loading from localStorage:", err);
        return undefined;
    }
};

// Initial state
const initialState: DataState = loadFromLocalStorage() || {
    toolBox: { toolBoxInfo: [] },
    calculate: { calculators: [] },
    schedules: { mySchedles: [] },
    loading: false,
    error: null,
};

// Async thunk to fetch data from Firestore
export const fetchUserData = createAsyncThunk(
    "data/fetchUserData",
    async (_, { rejectWithValue }) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("No authenticated user found.");

            const userDocRef = doc(db, "droidaccount", currentUser.uid);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) throw new Error("User document not found.");

            const data = userSnapshot.data();

            const payload = {
                toolBox: data?.toolBox || { toolBoxInfo: [] },
                calculate: data?.calculate || { calculators: [] },
                schedules: data?.schedules || { mySchedles: [] },
            };

            saveToLocalStorage({ ...payload, loading: false, error: null });

            return payload;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// Slice
export const TSCSlice = createSlice({
    name: "tsc",
    initialState,
    reducers: {
        setToolBox: (state, action: PayloadAction<ToolBox>) => {
            state.toolBox = action.payload;
            saveToLocalStorage(state);
        },
        setCalculate: (state, action: PayloadAction<Calculate>) => {
            state.calculate = action.payload;
            saveToLocalStorage(state);
        },
        setSchedules: (state, action: PayloadAction<Schedules>) => {
            state.schedules = action.payload;
            saveToLocalStorage(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchUserData.fulfilled,
                (state, action: PayloadAction<{ toolBox: ToolBox; calculate: Calculate; schedules: Schedules }>) => {
                    state.loading = false;
                    state.toolBox = action.payload.toolBox;
                    state.calculate = action.payload.calculate;
                    state.schedules = action.payload.schedules;
                    saveToLocalStorage(state);
                }
            )
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Export actions
export const { setToolBox, setCalculate, setSchedules } = TSCSlice.actions;

// Export selectors
export const selectToolBox = (state: { data: DataState }) => state.data.toolBox;
export const selectCalculate = (state: { data: DataState }) => state.data.calculate;
export const selectSchedules = (state: { data: DataState }) => state.data.schedules;
export const selectDataLoading = (state: { data: DataState }) => state.data.loading;
export const selectDataError = (state: { data: DataState }) => state.data.error;

// Export reducer
export default TSCSlice.reducer;