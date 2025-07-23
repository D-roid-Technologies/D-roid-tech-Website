"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BookOpen } from "lucide-react"
import type { Student } from "./student"
import { classLevels, getStudentsByClass } from "./examData"
import StudentDetailModal from "./StudentDetailModal"
import "./ExamDashboard.css"

const ExamDashboard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Get available classes based on selected level
  const availableClasses = selectedLevel
    ? classLevels.find((level) => level.level === selectedLevel)?.classes || []
    : []

  // Filter students based on selected class
  useEffect(() => {
    if (selectedClass) {
      const students = getStudentsByClass(selectedClass)
      setFilteredStudents(students)
    } else {
      setFilteredStudents([])
    }
  }, [selectedClass])

  // Reset class selection when level changes
  useEffect(() => {
    setSelectedClass("")
  }, [selectedLevel])

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedStudent(null)
  }

  const getPositionClass = (position: number) => {
    if (position === 1) return "position-1"
    if (position === 2) return "position-2"
    if (position === 3) return "position-3"
    return "position-other"
  }

  return (
    <div className="exam-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Exam Records Dashboard</h1>
        <p className="dashboard-subtitle">Comprehensive academic performance tracking across all educational levels</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Educational Level</label>
            <select className="filter-select" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="">Select Level</option>
              {classLevels.map((level) => (
                <option key={level.level} value={level.level}>
                  {level.level}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Class</label>
            <select
              className="filter-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={!selectedLevel}
            >
              <option value="">Select Class</option>
              {availableClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Term</label>
            <select className="filter-select">
              <option value="first">First Term</option>
              <option value="second">Second Term</option>
              <option value="third">Third Term</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Session</label>
            <select className="filter-select">
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
              <option value="2021/2022">2021/2022</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="students-table-container">
        <div className="table-header">
          <h2 className="table-title">{selectedClass ? `${selectedClass} Students` : "Students"}</h2>
          <span className="students-count">
            {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-wrapper">
          {filteredStudents.length > 0 ? (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Admission No.</th>
                  <th>Student Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Total Score</th>
                  <th>Average</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} onClick={() => handleStudentClick(student)}>
                    <td>
                      <span className={`position-badge ${getPositionClass(student.position)}`}>{student.position}</span>
                    </td>
                    <td>
                      <span className="admission-number">{student.admissionNumber}</span>
                    </td>
                    <td>
                      <span className="student-name">{student.fullName}</span>
                    </td>
                    <td>{student.gender}</td>
                    <td>{student.age}</td>
                    <td>
                      <strong>{student.totalScore}</strong>
                    </td>
                    <td>{student.average}%</td>
                    <td>
                      <span className={`grade-badge grade-${student.grade}`}>{student.grade}</span>
                    </td>
                    <td>{student.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">
              <div className="no-data-icon">
                <BookOpen size={48} />
              </div>
              <h3>No Students Found</h3>
              <p>
                {!selectedLevel
                  ? "Please select an educational level to view students"
                  : !selectedClass
                    ? "Please select a class to view students"
                    : "No students found for the selected class"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Student Detail Modal */}
      {showModal && selectedStudent && <StudentDetailModal student={selectedStudent} onClose={closeModal} />}
    </div>
  )
}

export default ExamDashboard
