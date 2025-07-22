import React, { useState } from "react";
import "./StudentScoreTable.css"; // Optional: You can define styles here

interface Student {
  name: string;
  subject: string;
  className: string;
  test: number;
  midTerm: number;
  exam: number;
}

const initialStudents: Student[] = [
  {
    name: "Emeka Okoro",
    subject: "Mathematics",
    className: "JSS 2",
    test: 8,
    midTerm: 15,
    exam: 55,
  },
  {
    name: "Ada Nwachukwu",
    subject: "English",
    className: "JSS 2",
    test: 7,
    midTerm: 12,
    exam: 50,
  },
  {
    name: "Ibrahim Bello",
    subject: "Basic Science",
    className: "JSS 2",
    test: 9,
    midTerm: 18,
    exam: 65,
  },
];

const calculateTotal = (test: number, midTerm: number, exam: number): number =>
  test + midTerm + exam;

const getGrade = (total: number): string => {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 40) return "D";
  return "F";
};

const getRemarks = (grade: string): string => {
  switch (grade) {
    case "A":
      return "Excellent";
    case "B":
      return "Very Good";
    case "C":
      return "Good";
    case "D":
      return "Needs Improvement";
    default:
      return "Fail";
  }
};

const StudentScoreTable = () => {
  const [students] = useState<Student[]>(initialStudents);

  return (
    <div className="score-table-container">
      <h2 className="table-title">Academic Performance – JSS 2</h2>
      <div className="table-responsive">
        <table className="score-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Test (/10)</th>
              <th>Mid-Term (/20)</th>
              <th>Exam (/70)</th>
              <th>Total (/100)</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const total = calculateTotal(
                student.test,
                student.midTerm,
                student.exam
              );
              const grade = getGrade(total);
              const remarks = getRemarks(grade);

              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.subject}</td>
                  <td>{student.className}</td>
                  <td>{student.test}</td>
                  <td>{student.midTerm}</td>
                  <td>{student.exam}</td>
                  <td>{total}</td>
                  <td>{grade}</td>
                  <td>{remarks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentScoreTable;
