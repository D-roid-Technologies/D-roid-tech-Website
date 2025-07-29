"use client"

import type React from "react"
import { useState } from "react"
import { X, Plus } from "lucide-react"
import { classLevels } from "./examData"
import "./AddRecordModal.css"

interface AddRecordModalProps {
  onClose: () => void
  onSubmit: (recordData: any) => void
}

const AddRecordModal: React.FC<AddRecordModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male" as "Male" | "Female",
    age: "",
    classLevel: "",
    term: "First Term",
    session: "2023/2024",
    subjects: [] as Array<{
      subject: string
      test: number
      midTerm: number
      exam: number
    }>,
  })

  const [selectedClass, setSelectedClass] = useState("")
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([])

  const handleClassChange = (className: string) => {
    setSelectedClass(className)
    setFormData((prev) => ({ ...prev, classLevel: className }))

    // Find subjects for the selected class
    const classLevel = classLevels.find((level) => level.classes.includes(className))

    if (classLevel) {
      setAvailableSubjects(classLevel.subjects)
      // Initialize subjects with empty scores
      const initialSubjects = classLevel.subjects.map((subject) => ({
        subject,
        test: 0,
        midTerm: 0,
        exam: 0,
      }))
      setFormData((prev) => ({ ...prev, subjects: initialSubjects }))
    }
  }

  const handleSubjectScoreChange = (subjectIndex: number, field: string, value: number) => {
    const updatedSubjects = [...formData.subjects]
    updatedSubjects[subjectIndex] = {
      ...updatedSubjects[subjectIndex],
      [field]: value,
    }
    setFormData((prev) => ({ ...prev, subjects: updatedSubjects }))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.classLevel || !formData.age) {
      alert("Please fill in all required fields")
      return
    }

    // Calculate totals and grades for each subject
    const processedSubjects = formData.subjects.map((subject) => {
      const total = subject.test + subject.midTerm + subject.exam
      const grade = calculateGrade(total)
      return {
        ...subject,
        total,
        grade,
        remarks: getRemarks(grade),
      }
    })

    // Calculate overall performance
    const totalScore = processedSubjects.reduce((sum, subject) => sum + subject.total, 0)
    const average = totalScore / processedSubjects.length
    const percentage = (totalScore / (processedSubjects.length * 100)) * 100

    const newRecord = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
      age: Number.parseInt(formData.age),
      subjects: processedSubjects,
      totalScore,
      percentage: Math.round(percentage * 100) / 100,
      average: Math.round(average * 100) / 100,
      grade: calculateGrade(average),
      remarks: getRemarks(calculateGrade(average)),
    }

    onSubmit(newRecord)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="add-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h2 className="add-modal-title">Add New Exam Record</h2>
          <button className="add-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-modal-body">
          {/* Student Information */}
          <div className="form-section">
            <h3 className="section-title">Student Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={formData.gender}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value as "Male" | "Female" }))}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  min="2"
                  max="25"
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="form-section">
            <h3 className="section-title">Academic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Class *</label>
                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {classLevels.map((level) =>
                    level.classes.map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    )),
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Term</label>
                <select
                  className="form-select"
                  value={formData.term}
                  onChange={(e) => setFormData((prev) => ({ ...prev, term: e.target.value }))}
                >
                  <option value="First Term">First Term</option>
                  <option value="Second Term">Second Term</option>
                  <option value="Third Term">Third Term</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Session</label>
                <select
                  className="form-select"
                  value={formData.session}
                  onChange={(e) => setFormData((prev) => ({ ...prev, session: e.target.value }))}
                >
                  <option value="2023/2024">2023/2024</option>
                  <option value="2022/2023">2022/2023</option>
                  <option value="2021/2022">2021/2022</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subject Scores */}
          {availableSubjects.length > 0 && (
            <div className="form-section">
              <h3 className="section-title">Subject Scores</h3>
              <div className="subjects-grid">
                {formData.subjects.map((subject, index) => (
                  <div key={subject.subject} className="subject-card">
                    <h4 className="subject-name">{subject.subject}</h4>
                    <div className="score-inputs">
                      <div className="score-group">
                        <label className="score-label">Test (0-10)</label>
                        <input
                          type="number"
                          className="score-input"
                          min="0"
                          max="10"
                          value={subject.test}
                          onChange={(e) =>
                            handleSubjectScoreChange(index, "test", Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div className="score-group">
                        <label className="score-label">Mid-Term (0-20)</label>
                        <input
                          type="number"
                          className="score-input"
                          min="0"
                          max="20"
                          value={subject.midTerm}
                          onChange={(e) =>
                            handleSubjectScoreChange(index, "midTerm", Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div className="score-group">
                        <label className="score-label">Exam (0-70)</label>
                        <input
                          type="number"
                          className="score-input"
                          min="0"
                          max="70"
                          value={subject.exam}
                          onChange={(e) =>
                            handleSubjectScoreChange(index, "exam", Number.parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                    </div>
                    <div className="subject-total">Total: {subject.test + subject.midTerm + subject.exam}/100</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              <Plus size={16} />
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecordModal
