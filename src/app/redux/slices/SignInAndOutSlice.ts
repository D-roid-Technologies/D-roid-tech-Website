import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Entry = {
    email: string;
    employeeId?: string;
    timestamp: string;
    type: 'Sign In' | 'Sign Out';
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
    staffLeave: any[]; // Define a specific type if available
    staffSignInAndOut: Entry[];
};

const initialState: SignInAndOutState = {
    staffDetails: {
        staffGrossPay: "",
        staffTax: "",
        staffPosition: "",
        staffBank: "",
        staffAccountNmber: "",
        staffAccountName: ""
    },
    staffDoc: {
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
        utilityBill: ""
    },
    staffLeave: [],
    staffSignInAndOut: []
};

export const signInAndOutSlice = createSlice({
    name: 'signInAndOut',
    initialState,
    reducers: {
        setSignInAndOutData(state, action: PayloadAction<Entry[]>) {
            state.staffSignInAndOut = action.payload;
        },
        setStaffDetails(state, action: PayloadAction<Partial<StaffDetails>>) {
            state.staffDetails = { ...state.staffDetails, ...action.payload };
        },
        setStaffDocuments(state, action: PayloadAction<Partial<StaffDocuments>>) {
            state.staffDoc = { ...state.staffDoc, ...action.payload };
        },
        setStaffLeave(state, action: PayloadAction<any[]>) {
            state.staffLeave = action.payload;
        }
    }
});

export const {
    setSignInAndOutData,
    setStaffDetails,
    setStaffDocuments,
    setStaffLeave
} = signInAndOutSlice.actions;

export default signInAndOutSlice.reducer;
