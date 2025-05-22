import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaySlip = {
    employeeDetails: {
        employeeName: string;
        employeeId: string;
        sNumber: string;
        sName: string;
        city: string;
        state: string;
        country: string;
    };
    payPeriod: {
        payPeriodStart: string;
        payPeriodEnd: string;
        monthPaid: string;
        monthOfPay: string;
        todayMonth: string;
    };
    grossPay: number;
    taxes: {
        amount: number;
        percentage: number;
    };
    netPay: number;
    deductions: {
        totalDeductions: number;
        meetingAbsence: number;
        taskCompletion: number;
        signInAndOut: number;
        others: number;
    };
    additionalPayments: {
        extraDaysWorked: number;
        pension: number;
        healthInsurance: number;
        miscellaneous: number;
        transportation: number;
        hotelAccommodation: number;
    };
};

interface PayslipState {
    payslips: PaySlip[];
}

const initialState: PayslipState = {
    payslips: [],
};

export const payslipSlice = createSlice({
    name: 'payslip',
    initialState,
    reducers: {
        setPayslipData(state, action: PayloadAction<PaySlip[]>) {
            state.payslips = action.payload;
            // console.log(state.payslips)
        },
    },
});

export const { setPayslipData } = payslipSlice.actions;
export default payslipSlice.reducer;
