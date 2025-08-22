import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface FormData {
  service: string;
  businessName: string;
  phoneNumber: string;
  email: string;
  startDate: string;
}

export interface FormErrors {
  service?: string;
  businessName?: string;
  phoneNumber?: string;
  email?: string;
  startDate?: string;
}

export interface LeadFormState {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

// Initial state
const initialFormData: FormData = {
  service: "",
  businessName: "",
  phoneNumber: "",
  email: "",
  startDate: "",
};

const initialState: LeadFormState = {
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  submitError: null,
};

// Validation function
const validateFormData = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.service) {
    errors.service = "Please select a service";
  }

  if (!formData.businessName.trim()) {
    errors.businessName = "Business name is required";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
    errors.phoneNumber = "Please enter a valid phone number";
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.startDate) {
    errors.startDate = "Please select when you want to get started";
  }

  return errors;
};

// Async thunk for form submission
export const submitLeadForm = createAsyncThunk(
  "leadForm/submit",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Validate form before submission
      const errors = validateFormData(formData);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({ validationErrors: errors });
      }

      // Simulate API call - replace with actual API endpoint
      const response = await fetch("/api/lead-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // For demo purposes, simulate successful submission after delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      return { success: true, message: "Form submitted successfully" };
    }
  }
);

// Create the slice
const leadFormSlice = createSlice({
  name: "leadForm",
  initialState,
  reducers: {
    // Update form field
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;

      // Clear error for the field being updated
      if (state.errors[field]) {
        delete state.errors[field];
      }

      // Clear submit error when user makes changes
      if (state.submitError) {
        state.submitError = null;
      }
    },

    // Update multiple fields at once
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };

      // Clear errors for updated fields
      Object.keys(action.payload).forEach((field) => {
        if (state.errors[field as keyof FormErrors]) {
          delete state.errors[field as keyof FormErrors];
        }
      });

      if (state.submitError) {
        state.submitError = null;
      }
    },

    // Set validation errors
    setErrors: (state, action: PayloadAction<FormErrors>) => {
      state.errors = action.payload;
    },

    // Clear specific error
    clearError: (state, action: PayloadAction<keyof FormErrors>) => {
      delete state.errors[action.payload];
    },

    // Clear all errors
    clearErrors: (state) => {
      state.errors = {};
    },

    // Validate form
    validateForm: (state) => {
      const errors = validateFormData(state.formData);
      state.errors = errors;
    },

    // Reset form to initial state
    resetForm: (state) => {
      state.formData = initialFormData;
      state.errors = {};
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.submitError = null;
    },

    // Reset submission state (for "Submit Another Request" functionality)
    resetSubmissionState: (state) => {
      state.isSubmitted = false;
      state.submitError = null;
    },

    // Clear submit error
    clearSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle form submission
      .addCase(submitLeadForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.errors = {};
      })
      .addCase(submitLeadForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSubmitted = true;
        state.formData = initialFormData; // Reset form data after successful submission
      })
      .addCase(submitLeadForm.rejected, (state, action) => {
        state.isSubmitting = false;

        if (
          action.payload &&
          typeof action.payload === "object" &&
          "validationErrors" in action.payload
        ) {
          // Handle validation errors
          state.errors = (
            action.payload as { validationErrors: FormErrors }
          ).validationErrors;
        } else {
          // Handle submission errors
          state.submitError =
            action.error.message ||
            "An error occurred while submitting the form";
        }
      });
  },
});

// Export actions
export const {
  updateField,
  updateFormData,
  setErrors,
  clearError,
  clearErrors,
  validateForm,
  resetForm,
  resetSubmissionState,
  clearSubmitError,
} = leadFormSlice.actions;

// Selectors
export const selectFormData = (state: { leadForm: LeadFormState }) =>
  state.leadForm.formData;
export const selectErrors = (state: { leadForm: LeadFormState }) =>
  state.leadForm.errors;
export const selectIsSubmitting = (state: { leadForm: LeadFormState }) =>
  state.leadForm.isSubmitting;
export const selectIsSubmitted = (state: { leadForm: LeadFormState }) =>
  state.leadForm.isSubmitted;
export const selectSubmitError = (state: { leadForm: LeadFormState }) =>
  state.leadForm.submitError;
export const selectIsFormValid = (state: { leadForm: LeadFormState }) => {
  const errors = validateFormData(state.leadForm.formData);
  return Object.keys(errors).length === 0;
};

// Export the reducer
export default leadFormSlice.reducer;

// Service options and start date options
export const serviceOptions = [
  { value: "website-development", label: "Website Development" },
  { value: "mobile-app-development", label: "Mobile App Development" },
  { value: "company-management-portal", label: "Company Management Portal" },
  { value: "custom-software", label: "Custom Software" },
  { value: "ecommerce-website", label: "E-commerce Website" },
];

export const startDateOptions = [
  { value: "immediately", label: "Immediately" },
  { value: "within-week", label: "Within a week" },
  { value: "this-month", label: "This month" },
];
