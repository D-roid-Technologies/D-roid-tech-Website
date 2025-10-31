import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../utils/Types";
import { StaffDetails } from "./SignInAndOutSlice";

export interface OnboardingState {
    currentStep: number;
    loading: boolean;
    formData: UserType | null;
    formDataNew: Partial<StaffDetails>;
    completedSteps: boolean[];
    isOnboardingComplete: boolean;
      staffInfo: Partial<StaffDetails> | null;
}

const initialState: OnboardingState = {
    currentStep: 0,
    loading: false,
    formData: null,
    formDataNew: {},
    completedSteps: [false, false, false, false], // 4 steps: View Info, Personal Info, Documents, Leave
    isOnboardingComplete: false,
     staffInfo: null,
};

export const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setFormData: (state, action: PayloadAction<UserType | null>) => {
            state.formData = action.payload;
        },
        setFormDataNew: (state, action: PayloadAction<Partial<StaffDetails>>) => {
            state.formDataNew = { ...state.formDataNew, ...action.payload };
        },
        updateFormField: (state, action: PayloadAction<{ field: keyof StaffDetails; value: string }>) => {
            const { field, value } = action.payload;
            state.formDataNew[field] = value;
        },
        markStepCompleted: (state, action: PayloadAction<number>) => {
            const stepIndex = action.payload;
            if (stepIndex >= 0 && stepIndex < state.completedSteps.length) {
                state.completedSteps[stepIndex] = true;
            }
        },
        markStepIncomplete: (state, action: PayloadAction<number>) => {
            const stepIndex = action.payload;
            if (stepIndex >= 0 && stepIndex < state.completedSteps.length) {
                state.completedSteps[stepIndex] = false;
            }
        },
        setOnboardingComplete: (state, action: PayloadAction<boolean>) => {
            state.isOnboardingComplete = action.payload;
        },
        nextStep: (state) => {
            if (state.currentStep < 3) {
                state.currentStep += 1;
            }
        },
        previousStep: (state) => {
            if (state.currentStep > 0) {
                state.currentStep -= 1;
            }
        },
        resetOnboarding: (state) => {
            state.currentStep = 0;
            state.loading = false;
            state.formData = null;
            state.formDataNew = {};
            state.completedSteps = [false, false, false, false];
            state.isOnboardingComplete = false;
        },

        setStaffInfo: (state, action: PayloadAction<Partial<StaffDetails>>) => {
  state.staffInfo = { ...state.staffInfo, ...action.payload };
},
resetStaffInfo: (state) => {
  state.staffInfo = null;
},

    },
});

export const {
    setCurrentStep,
    setLoading,
    setFormData,
    setFormDataNew,
    updateFormField,
    markStepCompleted,
    markStepIncomplete,
    setOnboardingComplete,
    nextStep,
    previousStep,
    resetOnboarding,
    setStaffInfo,
    resetStaffInfo
} = onboardingSlice.actions;

export default onboardingSlice.reducer;