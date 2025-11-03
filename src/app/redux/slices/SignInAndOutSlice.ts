// src/app/redux/slices/SignInAndOutSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Entry = {
  email: string;
  employeeId?: string;
  timestamp: string;
  type: "Sign In" | "Sign Out";
  note?: string;
};

export type StaffDetails = {
  staffGrossPay: string;
  staffTax: string;
  staffPosition: string;
  staffBank: string;
  staffAccountNmber: string;
  staffAccountName: string;
  staffStartDate?: string;
};

type StaffDocuments = {
  nationalId: string;
  proofOfAddress: string;
  secSchCertificate: string;
  uniCertificate: string;
  birthCertificate: string;
  medicalDoc: string;
  signatre: string;
  pasport: string;
  marriageCert: string;
  nyscCert: string;
  utilityBill: string;
};

type SignInAndOutState = {
  staffDetails: StaffDetails;
  staffDoc: StaffDocuments;
  staffLeave: any[];
  staffSignInAndOut: Entry[];
};

// Load initial state from localStorage if available
const loadInitialState = (): SignInAndOutState => {
  const savedStaffDetails = localStorage.getItem("staffDetails");
  const savedStaffDocuments = localStorage.getItem("staffDocuments");
  const savedStaffLeave = localStorage.getItem("staffLeave");
  const savedSignInOut = localStorage.getItem("staffSignInAndOut");

  return {
    staffDetails: savedStaffDetails
      ? JSON.parse(savedStaffDetails)
      : {
          staffGrossPay: "",
          staffTax: "",
          staffPosition: "",
          staffBank: "",
          staffAccountNmber: "",
          staffAccountName: "",
          staffStartDate: "",
        },
    staffDoc: savedStaffDocuments
      ? JSON.parse(savedStaffDocuments)
      : {
          nationalId: "",
          proofOfAddress: "",
          secSchCertificate: "",
          uniCertificate: "",
          birthCertificate: "",
          medicalDoc: "",
          signatre: "",
          pasport: "",
          marriageCert: "",
          nyscCert: "",
          utilityBill: "",
        },
    staffLeave: savedStaffLeave ? JSON.parse(savedStaffLeave) : [],
    staffSignInAndOut: savedSignInOut ? JSON.parse(savedSignInOut) : [],
  };
};

const initialState: SignInAndOutState = loadInitialState();

export const signInAndOutSlice = createSlice({
  name: "signInAndOut",
  initialState,
  reducers: {
    setSignInAndOutData(state, action: PayloadAction<Entry[]>) {
      state.staffSignInAndOut = action.payload;
      // Save to localStorage
      localStorage.setItem(
        "staffSignInAndOut",
        JSON.stringify(state.staffSignInAndOut)
      );
    },
    setStaffDetails(state, action: PayloadAction<Partial<StaffDetails>>) {
      state.staffDetails = { ...state.staffDetails, ...action.payload };
      // Save to localStorage
      localStorage.setItem("staffDetails", JSON.stringify(state.staffDetails));
    },
    setStaffDocuments(state, action: PayloadAction<Partial<StaffDocuments>>) {
      state.staffDoc = { ...state.staffDoc, ...action.payload };
      // Save to localStorage
      localStorage.setItem("staffDocuments", JSON.stringify(state.staffDoc));
    },
    setStaffLeave(state, action: PayloadAction<any[]>) {
      state.staffLeave = action.payload;
      // Save to localStorage
      localStorage.setItem("staffLeave", JSON.stringify(state.staffLeave));
    },
    // Add a new action to clear localStorage if needed
    clearStaffLocalStorage() {
      localStorage.removeItem("staffDetails");
      localStorage.removeItem("staffDocuments");
      localStorage.removeItem("staffLeave");
      localStorage.removeItem("staffSignInAndOut");
    },
  },
});

export const {
  setSignInAndOutData,
  setStaffDetails,
  setStaffDocuments,
  setStaffLeave,
  clearStaffLocalStorage,
} = signInAndOutSlice.actions;

export default signInAndOutSlice.reducer;
