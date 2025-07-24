"use client"

import type React from "react"
import { X } from "lucide-react"
import type { Student } from "./student"
import "./StudentModal.css"

interface StudentDetailModalProps {
  student: Student
  onClose: () => void
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Student Details</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Student Information */}
          <div className="student-info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{student.fullName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Admission Number</span>
              <span className="info-value">{student.admissionNumber}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{student.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{student.age} years</span>
            </div>
            <div className="info-item">
              <span className="info-label">Class</span>
              <span className="info-value">{student.classLevel}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Term</span>
              <span className="info-value">{student.term}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Session</span>
              <span className="info-value">{student.session}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Class Position</span>
              <span className="info-value">{student.position}</span>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="performance-summary">
            <div className="summary-card total">
              <div className="summary-label">Total Score</div>
              <div className="summary-value">{student.totalScore}</div>
            </div>
            <div className="summary-card average">
              <div className="summary-label">Average</div>
              <div className="summary-value">{student.average}%</div>
            </div>
            <div className="summary-card position">
              <div className="summary-label">Position</div>
              <div className="summary-value">{student.position}</div>
            </div>
            <div className="summary-card grade">
              <div className="summary-label">Grade</div>
              <div className="summary-value">{student.grade}</div>
            </div>
          </div>

          {/* Subjects and Scores */}
          <div className="subjects-section">
            <h3 className="section-title">Subject Performance</h3>
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Test (10)</th>
                  <th>Mid-Term (20)</th>
                  <th>Exam (70)</th>
                  <th>Total (100)</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {student.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="subject-name">{subject.subject}</td>
                    <td>{subject.test}</td>
                    <td>{subject.midTerm}</td>
                    <td>{subject.exam}</td>
                    <td>
                      <strong>{subject.total}</strong>
                    </td>
                    <td>
                      <span className={`grade-badge grade-${subject.grade}`}>{subject.grade}</span>
                    </td>
                    <td>{subject.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailModal
