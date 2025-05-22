import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authService, calculateTaxPercentage } from '../../../redux/configuration/auth.service';
import { PaySlip } from '../../../redux/slices/paySlipSlice';
import { RootState } from '../../../redux/Store';
import emailjs from 'emailjs-com';

interface PaySlipProps {
    employeeName: string;
    employeeId: string;
    payPeriodStart: Date;
    payPeriodEnd: Date;
    sNumber: string;
    sName: string;
    city: string;
    state: string;
    country: string;
    deductions: number;
    taxesPercent: number;
    todayMonth: number;
}

const getCurrentDateInfo = () => {
    const today = new Date();
    const currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 9); // 9th of current month
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const payPeriodStart = new Date(today.getFullYear(), today.getMonth() - 1, 9); // 9th of previous month
    const payPeriodEnd = new Date(today.getFullYear(), today.getMonth(), 8); // 8th of current month

    return { currentMonthDate, previousMonth, payPeriodStart, payPeriodEnd };
};

const formatMonth = (date: Date) =>
    date.toLocaleString('en-US', { month: 'long' });

const formatDateLong = (date: Date) =>
    date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

const StaffPaySlip: React.FC<PaySlipProps> = ({
    employeeName,
    employeeId,
    sNumber,
    sName,
    city,
    state,
    deductions,
    country,
}) => {

    const { currentMonthDate, previousMonth, payPeriodStart, payPeriodEnd } = getCurrentDateInfo();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const staffGrossPay = useSelector((state: RootState) => state.SignInO.staffGrossPay);
    const staffPosition = useSelector((state: RootState) => state.SignInO.staffPosition);
    const staffTax = useSelector((state: RootState) => state.SignInO.staffTax);

    const [showGenerateButton, setShowGenerateButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const payslips = useSelector((state: RootState) => state.payslip.payslips);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const today = new Date();
        // if (today.getDate() === 8) {
        setShowGenerateButton(true);
        // }
    }, []);

    const payslip: PaySlip = {
        employeeDetails: {
            employeeName,
            employeeId,
            sNumber,
            sName,
            city,
            state,
            country,
        },
        payPeriod: {
            payPeriodStart: payPeriodStart.toISOString(),
            payPeriodEnd: payPeriodEnd.toISOString(),
            monthPaid: formatMonth(payPeriodStart),
            monthOfPay: formatMonth(payPeriodEnd),
            todayMonth: formatMonth(currentMonthDate),
        },
        // grossPay: Number(staffGrossPay),
        grossPay: 90000.46,
        taxes: {
            // amount: Number(staffTax),
            amount: 1633.33,
            // percentage: calculateTaxPercentage(Number(staffGrossPay), Number(staffTax)),
            percentage: calculateTaxPercentage(90000.46, 1633.33),
        },
        netPay: 60366.67,
        deductions: {
            totalDeductions: deductions,
            meetingAbsence: 0.0,
            taskCompletion: 0.0,
            signInAndOut: 0.0,
            others: 0.0,
        },
        additionalPayments: {
            extraDaysWorked: 0,
            pension: 0.0,
            healthInsurance: 0.0,
            miscellaneous: 0.0,
            transportation: 0.0,
            hotelAccommodation: 0.0,
        },
    };

    const handleGenerateClick = async () => {
        setLoading(true);
        setMessage('');

        try {
            await authService.updateStaffPayslip(payslip);
            setMessage('Payslip generated and updated successfully.');
            const templateParams = {
                name: `${user.firstName} ${user.lastName}`,
                title: `You will be paid ${payslip.netPay} for the month of ${formatMonth(payPeriodStart)} ${currentMonthDate.getFullYear()} on the 9th of ${formatMonth(payPeriodEnd)} ${currentMonthDate.getFullYear()}`,
                email: user.email,
            };

            emailjs.send('service_o1jbklr', 'template_p8h58ur', templateParams, 'hcj3DsJ8MfNfUrE8J');
        } catch (error) {
            console.error(error);
            setMessage('Error generating payslip. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [filteredPayslips, setFilteredPayslips] = useState<PaySlip[]>([]);

    useEffect(() => {
        const filtered = payslips.filter(
            (p) => p.payPeriod.monthOfPay.toLowerCase() === selectedMonth.toLowerCase()
        );
        setFilteredPayslips(filtered);
    }, [selectedMonth, payslips]);

    const allMonths = Array.from(
        new Set(payslips.map((p) => p.payPeriod.monthOfPay))
    );

    return (
        <>
            <div style={styles.container}>
                <div style={styles.letterBlock}>
                    <div>
                        <p><strong>{employeeName}</strong></p>
                        <p>{sNumber}, {sName}</p>
                        <p>{city}, {state} State</p>
                        <p>{country}</p>
                    </div>
                    <div>
                        <p><strong>D’roid Technologies Ltd</strong></p>
                        <p>17 John Street</p>
                        <p>Warri, Delta State</p>
                    </div>
                </div>

                <p style={{ marginTop: 20 }}>{formatDateLong(currentMonthDate)}</p>
                <p><strong>Dear {employeeName.split(' ')[0]},</strong></p>

                <h2 style={styles.header}>YOUR PAY SLIP FROM D’ROID TECHNOLOGIES LTD</h2>
                <p>
                    You will be paid on the 9th of {formatMonth(currentMonthDate)} {currentMonthDate.getFullYear()} for the month of {formatMonth(previousMonth)} {previousMonth.getFullYear()}.
                    Find below all the necessary information.
                </p>

                <section style={styles.section}>
                    <h3 style={styles.subHeader}>Employee & Pay Info</h3>
                    <p><strong>Name:</strong> {employeeName}</p>
                    <p><strong>Employee ID:</strong> {employeeId}</p>
                    <p><strong>Date of Creation:</strong> {formatDateLong(currentMonthDate)}</p>
                    <p><strong>Period of Payment:</strong> 9th {formatMonth(payPeriodStart)} to 8th {formatMonth(payPeriodEnd)}</p>
                    <p><strong>Leave:</strong> 1 week for the month of {formatMonth(previousMonth)} {previousMonth.getFullYear()}</p>
                </section>

                <section style={styles.section}>
                    <h3 style={styles.subHeader}>Deductions ₦{payslip.deductions.totalDeductions.toFixed(2)}</h3>
                    <ul>
                        <li>Absent from meetings: {payslip.deductions.meetingAbsence.toFixed(2)}</li>
                        <li>Completion of Tasks: {payslip.deductions.taskCompletion.toFixed(2)}</li>
                        <li>Absent in Signing in and Out: {payslip.deductions.signInAndOut.toFixed(2)}</li>
                    </ul>
                </section>

                <section style={styles.section}>
                    <h3 style={styles.subHeader}>Additional Payments ₦{payslip.additionalPayments.healthInsurance + payslip.additionalPayments.hotelAccommodation + payslip.additionalPayments.miscellaneous + payslip.additionalPayments.healthInsurance + payslip.additionalPayments.pension + payslip.additionalPayments.transportation}</h3>
                    <ul>
                        <li>Extra days worked: {payslip.additionalPayments.extraDaysWorked}</li>
                        <li>Pension: {payslip.additionalPayments.pension.toFixed(2)}</li>
                        <li>Health Insurance: {payslip.additionalPayments.healthInsurance.toFixed(2)}</li>
                        <li>Miscellaneous: {payslip.additionalPayments.miscellaneous.toFixed(2)}</li>
                        <li>Transportation: {payslip.additionalPayments.transportation.toFixed(2)}</li>
                        <li>Hotel Accommodation: {payslip.additionalPayments.hotelAccommodation.toFixed(2)}</li>
                    </ul>
                </section>

                <section style={styles.section}>
                    <h3 style={styles.subHeader}>Pay Breakdown</h3>
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <td style={styles.label}>Gross Pay</td>
                                <td style={styles.value}>₦{payslip.grossPay.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={styles.label}>Taxes({payslip.taxes.percentage}%)</td>
                                <td style={styles.value}>-₦{payslip.taxes.amount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={styles.label}>Deductions</td>
                                <td style={styles.value}>-₦{payslip.deductions.totalDeductions.toFixed(2)}</td>
                            </tr>
                            <tr style={{ borderTop: '3px solid #222' }}>
                                <td style={{ ...styles.label, fontWeight: 'bold', fontSize: 18 }}>Net Pay</td>
                                <td style={{ ...styles.value, fontWeight: 'bold', fontSize: 18 }}>₦{payslip.netPay.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Button to generate payslips, shown only on the 8th */}
                {showGenerateButton && (
                    <div style={{ marginTop: 30, textAlign: 'center' }}>
                        <button
                            onClick={handleGenerateClick}
                            disabled={loading}
                            style={{
                                padding: '12px 25px',
                                backgroundColor: '#2980b9',
                                color: '#fff',
                                fontSize: 16,
                                border: 'none',
                                borderRadius: 6,
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? 'Generating Payslips...' : 'Generate Payslips'}
                        </button>
                        {message && <p style={{ marginTop: 15 }}>{message}</p>}
                    </div>
                )}

                <p style={styles.footer}>
                    This is a computer-generated pay slip and does not require a signature.
                </p>
            </div>

            <div style={{ marginBottom: 40, color: "#000000" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ color: "#000000", marginTop: 15 }}>Payslip Records</h3>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        {allMonths.map((month, i) => (
                            <option key={i} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredPayslips.length > 0 ? (
                    filteredPayslips.map((payslip, index) => (
                        <div key={index} style={styles.card}>
                            {/* Employee Info */}
                            <div style={styles.section}>
                                <h4>Employee Info</h4>
                                <p><strong>Name:</strong> {payslip.employeeDetails.employeeName}</p>
                                <p><strong>ID:</strong> {payslip.employeeDetails.employeeId}</p>
                                <p><strong>S Number:</strong> {payslip.employeeDetails.sNumber}</p>
                                <p><strong>S Name:</strong> {payslip.employeeDetails.sName}</p>
                                <p><strong>Location:</strong> {payslip.employeeDetails.city}, {payslip.employeeDetails.state}, {payslip.employeeDetails.country}</p>
                            </div>

                            {/* Pay Period */}
                            <div style={{ marginBottom: '10px' }}>
                                <h4>Pay Period</h4>
                                <p><strong>Start:</strong> {payslip.payPeriod.payPeriodStart}</p>
                                <p><strong>End:</strong> {payslip.payPeriod.payPeriodEnd}</p>
                                <p><strong>Month Paid:</strong> {payslip.payPeriod.monthPaid}</p>
                                <p><strong>Month of Pay:</strong> {payslip.payPeriod.monthOfPay}</p>
                                <p><strong>Today Month:</strong> {payslip.payPeriod.todayMonth}</p>
                            </div>

                            {/* Pay Summary */}
                            <div style={styles.section}>
                                <h4>Pay Summary</h4>
                                <p><strong>Gross Pay:</strong> ₦{payslip.grossPay.toFixed(2)}</p>
                                <p><strong>Tax:</strong> ₦{payslip.taxes.amount.toFixed(2)} ({payslip.taxes.percentage}%)</p>
                                <p><strong>Net Pay:</strong> ₦{payslip.netPay.toFixed(2)}</p>
                            </div>

                            {/* Deductions */}
                            <div style={styles.section}>
                                <h4>Deductions</h4>
                                <p><strong>Total:</strong> ₦{payslip.deductions.totalDeductions.toFixed(2)}</p>
                                <p><strong>Meeting Absence:</strong> ₦{payslip.deductions.meetingAbsence.toFixed(2)}</p>
                                <p><strong>Task Completion:</strong> ₦{payslip.deductions.taskCompletion.toFixed(2)}</p>
                                <p><strong>Sign In/Out:</strong> ₦{payslip.deductions.signInAndOut.toFixed(2)}</p>
                                <p><strong>Others:</strong> ₦{payslip.deductions.others.toFixed(2)}</p>
                            </div>

                            {/* Additional Payments */}
                            <div style={styles.section}>
                                <h4>Additional Payments</h4>
                                <p><strong>Extra Days Worked:</strong> ₦{payslip.additionalPayments.extraDaysWorked.toFixed(2)}</p>
                                <p><strong>Pension:</strong> ₦{payslip.additionalPayments.pension.toFixed(2)}</p>
                                <p><strong>Health Insurance:</strong> ₦{payslip.additionalPayments.healthInsurance.toFixed(2)}</p>
                                <p><strong>Miscellaneous:</strong> ₦{payslip.additionalPayments.miscellaneous.toFixed(2)}</p>
                                <p><strong>Transportation:</strong> ₦{payslip.additionalPayments.transportation.toFixed(2)}</p>
                                <p><strong>Hotel Accommodation:</strong> ₦{payslip.additionalPayments.hotelAccommodation.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', padding: '10px' }}>
                        No payslip data available for {selectedMonth}.
                    </p>
                )}
            </div>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: 700,
        margin: '3rem auto',
        padding: 30,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
    },
    letterBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    header: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#2c3e50',
        margin: '20px 0 10px',
        letterSpacing: '1px',
    },
    subHeader: {
        fontSize: '1.25rem',
        color: '#2980b9',
        marginBottom: 10,
        borderBottom: '2px solid #3498db',
        paddingBottom: 5,
    },
    section: {
        marginBottom: 25,
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 16,
    },
    label: {
        padding: '10px 15px',
        backgroundColor: '#ecf0f1',
        color: '#34495e',
        borderBottom: '1px solid #bdc3c7',
        width: '65%',
        fontWeight: 600,
        borderRadius: '8px 0 0 8px',
    },
    value: {
        padding: '10px 15px',
        backgroundColor: '#f9f9f9',
        color: '#2c3e50',
        borderBottom: '1px solid #bdc3c7',
        borderRadius: '0 8px 8px 0',
        textAlign: 'right',
    },
    footer: {
        marginTop: 50,
        fontSize: 13,
        fontStyle: 'italic',
        color: '#7f8c8d',
        textAlign: 'center',
    },

    payslipTableContainer: {

    },
    tableWrapper: {
        overflowX: 'auto',
        marginTop: 10,
        color: "#000000"
    },
    'table th': {
        padding: '10px',
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
        borderBottom: '1px solid #ccc',
    },
    'table td': {
        padding: '10px',
        borderBottom: '1px solid #eee',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },

};

export default StaffPaySlip;