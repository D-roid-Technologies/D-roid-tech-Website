import React, { useEffect, useState } from 'react';

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

    const [showGenerateButton, setShowGenerateButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const today = new Date();
        if (today.getDate() === 8) {
            setShowGenerateButton(true);
        }
    }, []);

    const handleGenerateClick = async () => {
        setLoading(true);
        setMessage('');
        try {
            // await generateAndSendPayslips();
            setMessage('Payslips generated and emails sent successfully.');
        } catch (error) {
            console.error(error);
            setMessage('Error generating payslips. Please try again.');
        }
        setLoading(false);
    };

    const salaryInfo = {
        monthPaid: formatMonth(payPeriodStart),
        monthOfPay: formatMonth(payPeriodEnd),
        grossPay: 87016.00,
        taxes: 1633.33,
        netPay: 60366.67,
        deductions: {
            totalDeductions: deductions,
            meetingAbsence: 0.00,
            taskCompletion: 0.00,
            signInAndOut: 0.00,
            others: 0.00
        },
        additionalPayments: {
            extraDaysWorked: 0,
            pension: 0.00,
            healthInsurance: 0.00,
            miscellaneous: 0.00,
            transportation: 0.00,
            hotelAccommodation: 0.00
        }
    }

    return (
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
                <h3 style={styles.subHeader}>Deductions ₦{salaryInfo.deductions.totalDeductions.toFixed(2)}</h3>
                <ul>
                    <li>Absent from meetings: {salaryInfo.deductions.meetingAbsence.toFixed(2)}</li>
                    <li>Completion of Tasks: {salaryInfo.deductions.taskCompletion.toFixed(2)}</li>
                    <li>Absent in Signing in and Out: {salaryInfo.deductions.signInAndOut.toFixed(2)}</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h3 style={styles.subHeader}>Additional Payments ₦{salaryInfo.additionalPayments.healthInsurance + salaryInfo.additionalPayments.hotelAccommodation + salaryInfo.additionalPayments.miscellaneous + salaryInfo.additionalPayments.healthInsurance + salaryInfo.additionalPayments.pension + salaryInfo.additionalPayments.transportation}</h3>
                <ul>
                    <li>Extra days worked: {salaryInfo.additionalPayments.extraDaysWorked}</li>
                    <li>Pension: {salaryInfo.additionalPayments.pension.toFixed(2)}</li>
                    <li>Health Insurance: {salaryInfo.additionalPayments.healthInsurance.toFixed(2)}</li>
                    <li>Miscellaneous: {salaryInfo.additionalPayments.miscellaneous.toFixed(2)}</li>
                    <li>Transportation: {salaryInfo.additionalPayments.transportation.toFixed(2)}</li>
                    <li>Hotel Accommodation: {salaryInfo.additionalPayments.hotelAccommodation.toFixed(2)}</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h3 style={styles.subHeader}>Pay Breakdown</h3>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td style={styles.label}>Gross Pay</td>
                            <td style={styles.value}>₦{salaryInfo.grossPay.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={styles.label}>Taxes</td>
                            <td style={styles.value}>-₦{salaryInfo.taxes.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={styles.label}>Deductions</td>
                            <td style={styles.value}>-₦{salaryInfo.deductions.totalDeductions.toFixed(2)}</td>
                        </tr>
                        <tr style={{ borderTop: '3px solid #222' }}>
                            <td style={{ ...styles.label, fontWeight: 'bold', fontSize: 18 }}>Net Pay</td>
                            <td style={{ ...styles.value, fontWeight: 'bold', fontSize: 18 }}>₦{salaryInfo.netPay.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Button to generate payslips, shown only on the 8th */}
            {showGenerateButton && (
                <div style={{ marginTop: 30, textAlign: 'center' }}>
                    <button
                        // onClick={handleGenerateClick}
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
};

export default StaffPaySlip;