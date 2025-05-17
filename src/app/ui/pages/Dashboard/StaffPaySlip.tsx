import React from 'react';

interface PaySlipProps {
    employeeName: string;
    employeeId: string;
    payPeriodStart: Date;  // start date of pay period
    payPeriodEnd: Date;    // end date of pay period
    hoursWorked: number;
    hourlyRate: number;
    deductions: number;
    taxesPercent: number;
    todayMonth: number;
}

const formatMonth = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'long' });
};

const formatPayPeriod = (start: Date, end: Date) => {
    return `9th of ${formatMonth(start)} to 9th of ${formatMonth(end)}`;
};

const StaffPaySlip: React.FC<PaySlipProps> = ({
    employeeName,
    employeeId,
    payPeriodStart,
    payPeriodEnd,
    hoursWorked,
    hourlyRate,
    deductions,
    taxesPercent,
    todayMonth
}) => {
    const grossPay = hoursWorked * hourlyRate;
    const taxes = grossPay * (taxesPercent / 100);
    const netPay = grossPay - taxes - deductions;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Staff Pay Slip</h1>

            <section style={styles.section}>
                <h2 style={styles.subHeader}>Employee Details</h2>
                <p><strong>Name:</strong> {employeeName}</p>
                <p><strong>Employee ID:</strong> {employeeId}</p>
                <p><strong>Pay Period:</strong> {formatPayPeriod(payPeriodStart, payPeriodEnd)}</p>
                <p><strong>Pay Month:</strong> {formatMonth(payPeriodStart)}</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subHeader}>Pay Details</h2>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td style={styles.label}>Hours Worked</td>
                            <td style={styles.value}>{hoursWorked.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={styles.label}>Hourly Rate</td>
                            <td style={styles.value}>₦{hourlyRate.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.label, fontWeight: 'bold' }}>Gross Pay</td>
                            <td style={{ ...styles.value, fontWeight: 'bold' }}>₦{grossPay.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={styles.label}>Taxes ({taxesPercent}%)</td>
                            <td style={styles.value}>-₦{taxes.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={styles.label}>Deductions</td>
                            <td style={styles.value}>-₦{deductions.toFixed(2)}</td>
                        </tr>
                        <tr style={{ borderTop: '3px solid #222' }}>
                            <td style={{ ...styles.label, fontWeight: 'bold', fontSize: 18 }}>Net Pay</td>
                            <td style={{ ...styles.value, fontWeight: 'bold', fontSize: 18 }}>₦{netPay.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

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
    header: {
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: 40,
        color: '#2c3e50',
        letterSpacing: '2px',
    },
    subHeader: {
        fontSize: '1.5rem',
        borderBottom: '2px solid #3498db',
        paddingBottom: 8,
        marginBottom: 20,
        color: '#2980b9',
    },
    section: {
        marginBottom: 35,
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 16,
    },
    label: {
        padding: '12px 15px',
        backgroundColor: '#ecf0f1',
        color: '#34495e',
        borderBottom: '1px solid #bdc3c7',
        width: '65%',
        fontWeight: 600,
        borderRadius: '8px 0 0 8px',
    },
    value: {
        padding: '12px 15px',
        backgroundColor: '#f9f9f9',
        color: '#2c3e50',
        borderBottom: '1px solid #bdc3c7',
        borderRadius: '0 8px 8px 0',
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
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