"use client"

import type React from "react"
import { useState } from "react"
import { X, Edit, Save, DeleteIcon as Cancel } from "lucide-react"
import type { Student } from "./student"
import "./StudentModal.css"

interface StudentDetailModalProps {
  student: Student
  onClose: () => void
  onUpdate?: (updatedStudent: Student) => void
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedStudent, setEditedStudent] = useState<Student>({ ...student })

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const calculateGrade = (total: number): string => {
    if (total >= 80) return "A"
    if (total >= 70) return "B"
    if (total >= 60) return "C"
    if (total >= 50) return "D"
    if (total >= 40) return "E"
    return "F"
  }

  const getRemarks = (grade: string): string => {
    switch (grade) {
      case "A":
        return "Excellent"
      case "B":
        return "Very Good"
      case "C":
        return "Good"
      case "D":
        return "Satisfactory"
      case "E":
        return "Needs Improvement"
      default:
        return "Fail"
    }
  }

  const handleSubjectScoreChange = (subjectIndex: number, field: string, value: number) => {
    const updatedSubjects = [...editedStudent.subjects]
    updatedSubjects[subjectIndex] = {
      ...updatedSubjects[subjectIndex],
      [field]: value,
    }

    // Recalculate totals and grades
    const updatedSubject = updatedSubjects[subjectIndex]
    const total = updatedSubject.test + updatedSubject.midTerm + updatedSubject.exam
    const grade = calculateGrade(total)

    updatedSubjects[subjectIndex] = {
      ...updatedSubject,
      total,
      grade,
      remarks: getRemarks(grade),
    }

    // Recalculate overall performance
    const totalScore = updatedSubjects.reduce((sum, subject) => sum + subject.total, 0)
    const average = totalScore / updatedSubjects.length
    const percentage = (totalScore / (updatedSubjects.length * 100)) * 100

    setEditedStudent({
      ...editedStudent,
      subjects: updatedSubjects,
      totalScore,
      percentage: Math.round(percentage * 100) / 100,
      average: Math.round(average * 100) / 100,
      grade: calculateGrade(average),
      remarks: getRemarks(calculateGrade(average)),
    })
  }

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedStudent)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedStudent({ ...student })
    setIsEditing(false)
  }

  const handleBasicInfoChange = (field: string, value: string | number) => {
    setEditedStudent({
      ...editedStudent,
      [field]: value,
      ...(field === "firstName" || field === "lastName"
        ? {
            fullName: `${field === "firstName" ? value : editedStudent.firstName} ${field === "lastName" ? value : editedStudent.lastName}`,
          }
        : {}),
    })
  }

  const currentStudent = isEditing ? editedStudent : student

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Student Details</h2>
          <div className="modal-actions">
            {!isEditing ? (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                <Edit size={20} />
                Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-button" onClick={handleSave}>
                  <Save size={16} />
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  <Cancel size={16} />
                  Cancel
                </button>
              </div>
            )}
            <button className="close-button" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Student Information */}
          <div className="student-info-grid">
            <div className="info-item">
              <span className="info-label">First Name</span>
              {isEditing ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedStudent.firstName}
                  onChange={(e) => handleBasicInfoChange("firstName", e.target.value)}
                />
              ) : (
                <span className="info-value">{currentStudent.firstName}</span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Last Name</span>
              {isEditing ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedStudent.lastName}
                  onChange={(e) => handleBasicInfoChange("lastName", e.target.value)}
                />
              ) : (
                <span className="info-value">{currentStudent.lastName}</span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Admission Number</span>
              <span className="info-value">{currentStudent.admissionNumber}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              {isEditing ? (
                <select
                  className="edit-select"
                  value={editedStudent.gender}
                  onChange={(e) => handleBasicInfoChange("gender", e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className="info-value">{currentStudent.gender}</span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              {isEditing ? (
                <input
                  type="number"
                  className="edit-input"
                  value={editedStudent.age}
                  min="2"
                  max="25"
                  onChange={(e) => handleBasicInfoChange("age", Number.parseInt(e.target.value) || 0)}
                />
              ) : (
                <span className="info-value">{currentStudent.age} years</span>
              )}
            </div>
            <div className="info-item">
              <span className="info-label">Class</span>
              <span className="info-value">{currentStudent.classLevel}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Term</span>
              <span className="info-value">{currentStudent.term}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Session</span>
              <span className="info-value">{currentStudent.session}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Class Position</span>
              <span className="info-value">{currentStudent.position}</span>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="performance-summary">
            <div className="summary-card total">
              <div className="summary-label">Total Score</div>
              <div className="summary-value">{currentStudent.totalScore}</div>
            </div>
            <div className="summary-card average">
              <div className="summary-label">Average</div>
              <div className="summary-value">{currentStudent.average}%</div>
            </div>
            <div className="summary-card position">
              <div className="summary-label">Position</div>
              <div className="summary-value">{currentStudent.position}</div>
            </div>
            <div className="summary-card grade">
              <div className="summary-label">Grade</div>
              <div className="summary-value">{currentStudent.grade}</div>
            </div>
          </div>

          {/* Subjects and Scores */}
          <div className="subjects-section">
            <h3 className="section-title">Subject Performance</h3>
            <div className="subjects-table-wrapper">
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
                  {currentStudent.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="subject-name">{subject.subject}</td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            className="score-edit-input"
                            min="0"
                            max="10"
                            value={editedStudent.subjects[index].test}
                            onChange={(e) =>
                              handleSubjectScoreChange(index, "test", Number.parseInt(e.target.value) || 0)
                            }
                          />
                        ) : (
                          subject.test
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            className="score-edit-input"
                            min="0"
                            max="20"
                            value={editedStudent.subjects[index].midTerm}
                            onChange={(e) =>
                              handleSubjectScoreChange(index, "midTerm", Number.parseInt(e.target.value) || 0)
                            }
                          />
                        ) : (
                          subject.midTerm
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            className="score-edit-input"
                            min="0"
                            max="70"
                            value={editedStudent.subjects[index].exam}
                            onChange={(e) =>
                              handleSubjectScoreChange(index, "exam", Number.parseInt(e.target.value) || 0)
                            }
                          />
                        ) : (
                          subject.exam
                        )}
                      </td>
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
    </div>
  )
}

export default StudentDetailModal
