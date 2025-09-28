import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for a single form
export interface UserForm {
    id: string;
    title: string;
    data: any; // adjust to match your form schema
}

// Slice state
interface UserFormsState {
    forms: UserForm[];
}

const LOCAL_STORAGE_KEY = "userForms";

const loadFromLocalStorage = (): UserForm[] => {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to load user forms from localStorage:", error);
        return [];
    }
};

const saveToLocalStorage = (forms: UserForm[]) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms));
    } catch (error) {
        console.error("Failed to save user forms to localStorage:", error);
    }
};

// Initial state
const initialState: UserFormsState = {
    forms: loadFromLocalStorage(),
};

export const userFormsSlice = createSlice({
    name: "userForms",
    initialState,
    reducers: {
        setUserForms: (state, action: PayloadAction<UserForm[]>) => {
            state.forms = action.payload;
            saveToLocalStorage(state.forms);
        },
        addUserForm: (state, action: PayloadAction<UserForm>) => {
            state.forms.push(action.payload);
            saveToLocalStorage(state.forms);
        },
        removeUserForm: (state, action: PayloadAction<string>) => {
            state.forms = state.forms.filter((form) => form.id !== action.payload);
            saveToLocalStorage(state.forms);
        },
        clearUserForms: (state) => {
            state.forms = [];
            saveToLocalStorage(state.forms);
        },
    },
});

export const { setUserForms, addUserForm, removeUserForm, clearUserForms } =
    userFormsSlice.actions;

export default userFormsSlice.reducer;