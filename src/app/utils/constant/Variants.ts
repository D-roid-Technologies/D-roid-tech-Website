type Direction = "up" | "down" | "left" | "right";

export const fadeIn = (direction: Direction, delay: number) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 3.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// import cron from 'node-cron';
// import puppeteer from 'puppeteer';
// import nodemailer from 'nodemailer';
// import fs from 'fs';
// import path from 'path';

// const formatMonth = (date: Date) => 
//   date.toLocaleString('en-US', { month: 'long' });

// const getPayDates = () => {
//   const today = new Date();
//   const payPeriodStart = new Date(today.getFullYear(), today.getMonth() - 1, 9);
//   const payPeriodEnd = new Date(today.getFullYear(), today.getMonth(), 8);
//   return { 
//     payPeriodStart, 
//     payPeriodEnd, 
//     currentMonth: formatMonth(payPeriodEnd), 
//     previousMonth: formatMonth(payPeriodStart) 
//   };
// };

// const employees = [
//   {
//     name: 'John Doe',
//     email: 'john@example.com',
//     employeeId: 'EMP001',
//     sNumber: '17',
//     sName: 'John Street',
//     city: 'Warri',
//     state: 'Delta',
//     country: 'Nigeria',
//   },
// ];

// const generateHTML = (employee: any, salaryInfo: any) => `
//   <html>
//     <head>
//       <style>
//         body { font-family: Arial, sans-serif; padding: 20px; }
//         h2 { color: #2c3e50; }
//         table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//         td, th { border: 1px solid #ddd; padding: 8px; }
//         th { background-color: #f2f2f2; }
//         .summary { margin-top: 30px; font-style: italic; font-size: 12px; }
//       </style>
//     </head>
//     <body>
//       <h2>Pay Slip for ${employee.name}</h2>
//       <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
//       <p><strong>Pay Period:</strong> 9th ${salaryInfo.monthPaid} to 8th ${salaryInfo.monthOfPay}</p>
//       <p><strong>Date:</strong> 9th ${salaryInfo.monthOfPay} ${new Date().getFullYear()}</p>
//       <table>
//         <tr><th>Description</th><th>Amount (₦)</th></tr>
//         <tr><td>Gross Pay</td><td>${salaryInfo.grossPay.toFixed(2)}</td></tr>
//         <tr><td>Taxes</td><td>${salaryInfo.taxes.toFixed(2)}</td></tr>
//         <tr><td>Deductions</td><td>${salaryInfo.deductions.totalDeductions.toFixed(2)}</td></tr>
//         <tr><td><strong>Net Pay</strong></td><td><strong>${salaryInfo.netPay.toFixed(2)}</strong></td></tr>
//       </table>
//       <p class="summary">This is a computer-generated payslip and does not require a signature.</p>
//     </body>
//   </html>
// `;

// const generatePDF = async (htmlContent: string, outputPath: string) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
//   await page.pdf({ path: outputPath, format: 'A4' });
//   await browser.close();
// };

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-app-password',
//   },
// });

// const sendEmailWithPDF = async (employee: any, pdfPath: string) => {
//   await transporter.sendMail({
//     from: 'D’roid Technologies <your-email@gmail.com>',
//     to: employee.email,
//     subject: `Payslip for ${employee.name}`,
//     text: 'Please find attached your monthly payslip.',
//     attachments: [
//       {
//         filename: 'Payslip.pdf',
//         path: pdfPath,
//       },
//     ],
//   });
// };

// export async function generateAndSendPayslips() {
//   const { payPeriodStart, payPeriodEnd, currentMonth, previousMonth } = getPayDates();

//   for (const employee of employees) {
//     const deductions = 0.0;

//     const salaryInfo = {
//       monthPaid: previousMonth,
//       monthOfPay: currentMonth,
//       grossPay: 87016.0,
//       taxes: 1633.33,
//       netPay: 60366.67,
//       deductions: {
//         totalDeductions: deductions,
//         meetingAbsence: 0.0,
//         taskCompletion: 0.0,
//         signInAndOut: 0.0,
//         others: 0.0,
//       },
//       additionalPayments: {},
//     };

//     const html = generateHTML(employee, salaryInfo);
//     const pdfPath = path.join(__dirname, `${employee.employeeId}_Payslip.pdf`);
//     await generatePDF(html, pdfPath);
//     await sendEmailWithPDF(employee, pdfPath);
//     fs.unlinkSync(pdfPath); // delete after sending
//     console.log(`Payslip sent to ${employee.email}`);
//   }
// }

// // Optional: you can export a function to schedule the cron job if needed
// export function schedulePayslipEmails() {
//   cron.schedule('0 8 8 * *', () => {
//     generateAndSendPayslips().catch(console.error);
//   });
// }
