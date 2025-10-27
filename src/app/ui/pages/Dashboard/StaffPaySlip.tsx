import React, { useEffect, useRef, useState, createRef } from "react";
import { useSelector } from "react-redux";
import {
  authService,
  calculateNetSalary,
  calculateTaxPercentage,
} from "../../../redux/configuration/auth.service";
import { PaySlip } from "../../../redux/slices/paySlipSlice";
import { RootState } from "../../../redux/Store";
import emailjs from "emailjs-com";
import { Entry } from "../../../redux/slices/SignInAndOutSlice";
import html2pdf from "html2pdf.js";

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
  totalDeductions: number;
  netSalary: number;
  GSalary: number;
  taxesPercent: number;
  todayMonth: number;
}

interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
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
  date.toLocaleString("en-US", { month: "long" });

const formatDateLong = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Validation function to check if required fields are present
const validatePayslipData = (
  employeeName: string,
  employeeId: string,
  sNumber: string,
  sName: string,
  city: string,
  state: string,
  country: string,
  staffGrossPay: string | number,
  staffTax: string | number,
  staffPosition: string
): ValidationResult => {
  const missingFields: string[] = [];

  // Check employee details
  if (!employeeName || employeeName.trim() === "") {
    missingFields.push("Employee Name");
  }
  if (!employeeId || employeeId.trim() === "") {
    missingFields.push("Employee ID");
  }
  if (!sNumber || sNumber.trim() === "") {
    missingFields.push("Street Number");
  }
  if (!sName || sName.trim() === "") {
    missingFields.push("Street Name");
  }
  if (!city || city.trim() === "") {
    missingFields.push("City");
  }
  if (!state || state.trim() === "") {
    missingFields.push("State");
  }
  if (!country || country.trim() === "") {
    missingFields.push("Country");
  }

  // Check financial details
  if (!staffGrossPay || Number(staffGrossPay) <= 0) {
    missingFields.push("Gross Pay");
  }
  if (!staffTax || Number(staffTax) < 0) {
    missingFields.push("Tax Amount");
  }
  if (!staffPosition || staffPosition.trim() === "") {
    missingFields.push("Staff Position");
  }

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

export const StaffPaySlip: React.FC<PaySlipProps> = ({
  employeeName,
  employeeId,
  sNumber,
  sName,
  city,
  state,
  totalDeductions,
  netSalary,
  GSalary,
  country,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { currentMonthDate, previousMonth, payPeriodStart, payPeriodEnd } =
    getCurrentDateInfo();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const staffGrossPay = useSelector(
    (state: RootState) => state.SignInO.staffDetails.staffGrossPay
  );
  const staffPosition = useSelector(
    (state: RootState) => state.SignInO.staffDetails.staffPosition
  );
  const staffTax = useSelector(
    (state: RootState) => state.SignInO.staffDetails.staffTax
  );

  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPayslip, setShowPayslip] = useState(false);

  const payslips = useSelector((state: RootState) => state.payslip.payslips);
  const user = useSelector((state: RootState) => state.user);

  // Validation effect
  useEffect(() => {
    const validation = validatePayslipData(
      employeeName,
      employeeId,
      sNumber,
      sName,
      city,
      state,
      country,
      staffGrossPay,
      staffTax,
      staffPosition
    );

    if (!validation.isValid) {
      setValidationError(
        `Please fill in the following required fields:\n• ${validation.missingFields.join('\n• ')}`
      );
      setShowPayslip(false);

      // // Show alert to user
      // alert(`Payslip cannot be displayed. Missing required information:\n\n• ${validation.missingFields.join('\n• ')}\n\nPlease complete your profile information to view the payslip.`);
    } else {
      setValidationError(null);
      setShowPayslip(true);
    }
  }, [employeeName, employeeId, sNumber, sName, city, state, country, staffGrossPay, staffTax, staffPosition]);

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
      payPeriodStart: payPeriodStart.toLocaleString(),
      payPeriodEnd: payPeriodEnd.toLocaleString(),
      monthPaid: formatMonth(payPeriodStart),
      monthOfPay: formatMonth(payPeriodEnd),
      todayMonth: formatMonth(currentMonthDate),
    },
    grossPay: Number(staffGrossPay),
    taxes: {
      amount: Number(staffTax),
      percentage: calculateTaxPercentage(
        Number(staffGrossPay),
        Number(staffTax)
      ),
    },
    netPay: Number(staffGrossPay) - Number(staffTax) - totalDeductions,
    deductions: {
      totalDeductions: totalDeductions,
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
    // Re-validate before generating
    const validation = validatePayslipData(
      employeeName,
      employeeId,
      sNumber,
      sName,
      city,
      state,
      country,
      staffGrossPay,
      staffTax,
      staffPosition
    );

    if (!validation.isValid) {
      alert(`Cannot generate payslip. Missing required information:\n\n• ${validation.missingFields.join('\n• ')}\n\nPlease complete your profile information first.`);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await authService.updateStaffPayslip(payslip);
      setMessage("Payslip generated and updated successfully.");
      // const templateParams = {
      //   name: `${user.firstName} ${user.lastName}`,
      //   title: `You will be paid ${
      //     payslip.netPay
      //   } for the month of ${formatMonth(
      //     payPeriodStart
      //   )} ${currentMonthDate.getFullYear()} on the 9th of ${formatMonth(
      //     payPeriodEnd
      //   )} ${currentMonthDate.getFullYear()}`,
      //   email: user.email,
      // };

      // emailjs.send(
      //   "service_o1jbklr",
      //   "template_p8h58ur",
      //   templateParams,
      //   "hcj3DsJ8MfNfUrE8J"
      // );
    } catch (error) {
      console.error(error);
      setMessage("Error generating payslip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [filteredPayslips, setFilteredPayslips] = useState<PaySlip[]>([]);
  // Add refs for each payslip card
  const payslipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const filtered = payslips.filter(
      (p) =>
        p.payPeriod.monthOfPay.toLowerCase() === selectedMonth.toLowerCase()
    );
    setFilteredPayslips(filtered);
    // Update refs array length
    payslipRefs.current = filtered.map((_, i) => payslipRefs.current[i] || null);
  }, [selectedMonth, payslips]);

  const allMonths = Array.from(
    new Set(payslips.map((p) => p.payPeriod.monthOfPay))
  );

  // Download handler for filtered payslips
  const handleDownloadFiltered = (index: number) => {
    const ref = payslipRefs.current[index];
    if (ref) {
      const opt = {
        margin: 0.5,
        filename: `payslip_${filteredPayslips[index].employeeDetails.employeeName}_${filteredPayslips[index].payPeriod.monthOfPay}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { 
          unit: "in", 
          format: "a4", 
          orientation: "portrait",
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      html2pdf().set(opt).from(ref).save();
    }
  };

  // If validation fails, show error message instead of payslip
  if (!showPayslip) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>⚠️ Incomplete Profile Information</h2>
          <p style={styles.errorMessage}>
            Your payslip cannot be displayed because some required information is missing from your profile.
          </p>
          <div style={styles.errorDetails}>
            <h4>Missing Information:</h4>
            <pre style={styles.errorList}>{validationError}</pre>
          </div>
          <p style={styles.errorInstruction}>
            Please complete your profile information to view and generate your payslip.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={contentRef} style={styles.container}>
        <div style={styles.letterBlock}>
          <div>
            <p>
              <strong>{employeeName}</strong>
            </p>
            <p>
              {sNumber}, {sName}
            </p>
            <p>
              {city}, {state} State
            </p>
            <p>{country}</p>
          </div>
          <div>
            <p>
              <strong>D'roid Technologies Ltd</strong>
            </p>
            <p>17 John Street</p>
            <p>Warri, Delta State</p>
          </div>
        </div>

        <p style={{ marginTop: 20 }}>{formatDateLong(currentMonthDate)}</p>
        <p>
          <strong>Dear {employeeName.split(" ")[0]},</strong>
        </p>

        <h2 style={styles.header}>
          YOUR PAY SLIP FROM D'ROID TECHNOLOGIES LTD
        </h2>
        <p>
          You will be paid on the 9th of {formatMonth(currentMonthDate)}{" "}
          {currentMonthDate.getFullYear()} for the month of{" "}
          {formatMonth(previousMonth)} {previousMonth.getFullYear()}. Find below
          all the necessary information.
        </p>

        <section style={styles.section}>
          <h3 style={styles.subHeader}>Employee & Pay Info</h3>
          <p>
            <strong>Name:</strong> {employeeName}
          </p>
          <p>
            <strong>Employee ID:</strong> {employeeId}
          </p>
          <p>
            <strong>Position:</strong> {staffPosition}
          </p>
          <p>
            <strong>Date of Creation:</strong>{" "}
            {formatDateLong(currentMonthDate)}
          </p>
          <p>
            <strong>Period of Payment:</strong> 9th{" "}
            {formatMonth(payPeriodStart)} to 8th {formatMonth(payPeriodEnd)}
          </p>
          <p>
            <strong>Leave:</strong> {"6 Days"} for the month of{" "}
            {formatMonth(previousMonth)} {previousMonth.getFullYear()}
          </p>
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeader}>Deductions</h3>
          <ul>
            <li>
              Absent from meetings:{" "}
              {payslip.deductions.meetingAbsence.toFixed(2)}
            </li>
            <li>
              Completion of Tasks:{" "}
              {payslip.deductions.taskCompletion.toFixed(2)}
            </li>
            <li>
              Absent Signing in: {payslip.deductions.totalDeductions.toFixed(2)}
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h3 style={styles.subHeader}>
            Additional Payments ₦
            {payslip.additionalPayments.healthInsurance +
              payslip.additionalPayments.hotelAccommodation +
              payslip.additionalPayments.miscellaneous +
              payslip.additionalPayments.healthInsurance +
              payslip.additionalPayments.pension +
              payslip.additionalPayments.transportation}
          </h3>
          <ul>
            <li>
              Extra days worked: {payslip.additionalPayments.extraDaysWorked}
            </li>
            <li>Pension: {payslip.additionalPayments.pension.toFixed(2)}</li>
            <li>
              Health Insurance:{" "}
              {payslip.additionalPayments.healthInsurance.toFixed(2)}
            </li>
            <li>
              Miscellaneous:{" "}
              {payslip.additionalPayments.miscellaneous.toFixed(2)}
            </li>
            <li>
              Transportation:{" "}
              {payslip.additionalPayments.transportation.toFixed(2)}
            </li>
            <li>
              Hotel Accommodation:{" "}
              {payslip.additionalPayments.hotelAccommodation.toFixed(2)}
            </li>
          </ul>
        </section>

        <section style={styles.payBreakdownSection}>
          <h3 style={styles.subHeader}>Pay Breakdown</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>Gross Pay</td>
                <td style={styles.value}>₦{payslip.grossPay.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={styles.label}>Taxes({payslip.taxes.percentage}%)</td>
                <td style={styles.value}>
                  -₦{payslip.taxes.amount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Deductions</td>
                <td style={styles.value}>
                  -₦{payslip.deductions.totalDeductions.toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderTop: "3px solid #222" }}>
                <td
                  style={{ ...styles.label, fontWeight: "bold", fontSize: 18 }}
                >
                  Net Pay
                </td>
                <td
                  style={{ ...styles.value, fontWeight: "bold", fontSize: 18 }}
                >
                  ₦{payslip.netPay.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Button to generate payslips, shown only on the 8th */}
        {showGenerateButton && (
          <div style={{ marginTop: 30, textAlign: "center" }}>
            <button
              onClick={handleGenerateClick}
              disabled={loading}
              style={{
                padding: "12px 25px",
                backgroundColor: "#2980b9",
                color: "#fff",
                fontSize: 16,
                border: "none",
                borderRadius: 6,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Generating Payslips..." : "Generate Payslips"}
            </button>
            {message && <p style={{ marginTop: 15 }}>{message}</p>}
          </div>
        )}

        <p style={styles.footer}>
          This is a computer-generated pay slip and does not require a
          signature.
        </p>
      </div>

      <div style={{ marginBottom: 40, color: "#000000" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            <div
              key={index}
              ref={el => payslipRefs.current[index] = el}
              style={styles.container}
            >
              {/* Letter Block */}
              <div style={styles.letterBlock}>
                <div>
                  <p>
                    <strong>{payslip.employeeDetails.employeeName}</strong>
                  </p>
                  <p>
                    {payslip.employeeDetails.sNumber}, {payslip.employeeDetails.sName}
                  </p>
                  <p>
                    {payslip.employeeDetails.city}, {payslip.employeeDetails.state} State
                  </p>
                  <p>{payslip.employeeDetails.country}</p>
                </div>
                <div>
                  <p>
                    <strong>D'roid Technologies Ltd</strong>
                  </p>
                  <p>17 John Street</p>
                  <p>Warri, Delta State</p>
                </div>
              </div>

              <p style={{ marginTop: 20 }}>{formatDateLong(new Date(payslip.payPeriod.todayMonth + ' 1, ' + new Date().getFullYear()))}</p>
              <p>
                <strong>Dear {payslip.employeeDetails.employeeName.split(" ")[0]},</strong>
              </p>

              <h2 style={styles.header}>
                YOUR PAY SLIP FROM D'ROID TECHNOLOGIES LTD
              </h2>
              <p>
                You will be paid on the 9th of {payslip.payPeriod.todayMonth} {new Date().getFullYear()} for the month of {payslip.payPeriod.monthPaid} {new Date().getFullYear()}. Find below all the necessary information.
              </p>

              <section style={styles.section}>
                <h3 style={styles.subHeader}>Employee & Pay Info</h3>
                <p>
                  <strong>Name:</strong> {payslip.employeeDetails.employeeName}
                </p>
                <p>
                  <strong>Employee ID:</strong> {payslip.employeeDetails.employeeId}
                </p>
                <p>
                  <strong>Date of Creation:</strong> {formatDateLong(new Date(payslip.payPeriod.todayMonth + ' 1, ' + new Date().getFullYear()))}
                </p>
                <p>
                  <strong>Period of Payment:</strong> 9th {payslip.payPeriod.monthPaid} to 8th {payslip.payPeriod.monthOfPay}
                </p>
                <p>
                  <strong>Leave:</strong> 6 Days for the month of {payslip.payPeriod.monthPaid} {new Date().getFullYear()}
                </p>
              </section>

              <section style={styles.section}>
                <h3 style={styles.subHeader}>Deductions</h3>
                <ul>
                  <li>
                    Absent from meetings: {payslip.deductions.meetingAbsence.toFixed(2)}
                  </li>
                  <li>
                    Completion of Tasks: {payslip.deductions.taskCompletion.toFixed(2)}
                  </li>
                  <li>
                    Absent Signing in: {payslip.deductions.totalDeductions.toFixed(2)}
                  </li>
                </ul>
              </section>

              <section style={styles.section}>
                <h3 style={styles.subHeader}>Additional Payments ₦
                  {payslip.additionalPayments.healthInsurance +
                    payslip.additionalPayments.hotelAccommodation +
                    payslip.additionalPayments.miscellaneous +
                    payslip.additionalPayments.healthInsurance +
                    payslip.additionalPayments.pension +
                    payslip.additionalPayments.transportation}
                </h3>
                <ul>
                  <li>
                    Extra days worked: {payslip.additionalPayments.extraDaysWorked}
                  </li>
                  <li>Pension: {payslip.additionalPayments.pension.toFixed(2)}</li>
                  <li>
                    Health Insurance: {payslip.additionalPayments.healthInsurance.toFixed(2)}
                  </li>
                  <li>
                    Miscellaneous: {payslip.additionalPayments.miscellaneous.toFixed(2)}
                  </li>
                  <li>
                    Transportation: {payslip.additionalPayments.transportation.toFixed(2)}
                  </li>
                  <li>
                    Hotel Accommodation: {payslip.additionalPayments.hotelAccommodation.toFixed(2)}
                  </li>
                </ul>
              </section>

              <section style={styles.payBreakdownSection}>
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
                    <tr style={{ borderTop: "3px solid #222" }}>
                      <td style={{ ...styles.label, fontWeight: "bold", fontSize: 18 }}>
                        Net Pay
                      </td>
                      <td style={{ ...styles.value, fontWeight: "bold", fontSize: 18 }}>
                        ₦{payslip.netPay.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <div style={{ marginTop: 30, textAlign: "center" }}>
                <button
                  onClick={() => handleDownloadFiltered(index)}
                  style={{
                    padding: "10px 22px",
                    backgroundColor: "#27ae60",
                    color: "#fff",
                    fontSize: 15,
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Download Payslip
                </button>
              </div>

              <p style={styles.footer}>
                This is a computer-generated pay slip and does not require a signature.
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "10px" }}>
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
    margin: "3rem auto",
    padding: 30,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#222",
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  letterBlock: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "20px 0 10px",
    letterSpacing: "1px",
  },
  subHeader: {
    fontSize: "1.25rem",
    color: "#2980b9",
    marginBottom: 10,
    borderBottom: "2px solid #3498db",
    paddingBottom: 5,
  },
  section: {
    marginBottom: 25,
  },
  payBreakdownSection: {
    marginBottom: 25,
    pageBreakInside: "avoid",
    breakInside: "avoid",
    display: "block",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 16,
    pageBreakInside: "avoid",
    breakInside: "avoid",
  },
  label: {
    padding: "10px 15px",
    backgroundColor: "#ecf0f1",
    color: "#34495e",
    borderBottom: "1px solid #bdc3c7",
    width: "65%",
    fontWeight: 600,
    borderRadius: "8px 0 0 8px",
  },
  value: {
    padding: "10px 15px",
    backgroundColor: "#f9f9f9",
    color: "#2c3e50",
    borderBottom: "1px solid #bdc3c7",
    borderRadius: "0 8px 8px 0",
    textAlign: "right",
  },
  footer: {
    marginTop: 50,
    fontSize: 13,
    fontStyle: "italic",
    color: "#7f8c8d",
    textAlign: "center",
  },
  // Error styles
  errorContainer: {
    maxWidth: 600,
    margin: "3rem auto",
    padding: 20,
  },
  errorCard: {
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    borderRadius: 10,
    padding: 30,
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
  },
  errorTitle: {
    color: "#856404",
    fontSize: "1.5rem",
    marginBottom: 15,
    fontWeight: "600",
  },
  errorMessage: {
    color: "#856404",
    fontSize: "1.1rem",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  errorDetails: {
    backgroundColor: "#fff",
    border: "1px solid #ffeaa7",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    textAlign: "left",
  },
  errorList: {
    color: "#d32f2f",
    fontSize: "0.95rem",
    fontFamily: "monospace",
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  errorInstruction: {
    color: "#856404",
    fontSize: "1rem",
    fontWeight: "500",
    margin: 0,
  },
  errorNavButton: {
    color: "white",
    backgroundColor: "red",
    marginInline: "auto",
    fontSize: "14px",
    marginTop: "1rem"
  },
  payslipTableContainer: {},
  tableWrapper: {
    overflowX: "auto",
    marginTop: 10,
    color: "#000000"
  },
  "table th": {
    padding: "10px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
    borderBottom: "1px solid #ccc",
  },
  "table td": {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};