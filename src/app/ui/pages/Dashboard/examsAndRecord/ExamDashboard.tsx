"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { BookOpen, Plus, Download, CheckSquare, Square } from "lucide-react"
import type { Student } from "./student"
import { classLevels, getStudentsByClass } from "./examData"
import StudentDetailModal from "./StudentDetailModal"
import { usePagination } from "../../../../utils/hooks/usePagination"
import Pagination from "../../../components/Pagination/Pagination"
import "./ExamDashboard.css"
import AddRecordModal from "./AddRecordModal"
import { exportToExcel } from "./exportUtils"

const ExamDashboard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(false)

  // Get available classes based on selected level
  const availableClasses = selectedLevel
    ? classLevels.find((level) => level.level === selectedLevel)?.classes || []
    : []

  // Filter students based on selected class
  useEffect(() => {
    if (selectedClass) {
      const students = getStudentsByClass(selectedClass)
      setFilteredStudents(students)
      // Clear selections when class changes
      setSelectedStudentIds(new Set())
      setSelectAll(false)
    } else {
      setFilteredStudents([])
      setSelectedStudentIds(new Set())
      setSelectAll(false)
    }
  }, [selectedClass])

  // Reset class selection when level changes
  useEffect(() => {
    setSelectedClass("")
  }, [selectedLevel])

  const handleStudentClick = (student: Student, event: React.MouseEvent) => {
    // Prevent modal opening when clicking on checkbox
    if ((event.target as HTMLElement).closest(".checkbox-cell")) {
      return
    }
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

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => a.position - b.position)
  }, [filteredStudents])

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    paginatedData: paginatedStudents,
  } = usePagination(sortedStudents, 5)

  const handleAddRecord = (recordData: any) => {
    // Generate ID and admission number
    const newId = `STU${String(Date.now()).slice(-4)}`
    const admissionNumber = `${recordData.classLevel.toUpperCase()}/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`

    const newStudent = {
      ...recordData,
      id: newId,
      admissionNumber,
      position: 0, // Will be recalculated
    }

    // Add to the students data (you would typically update your data source here)
    // For now, we'll add it to the filtered students if it matches the current class
    if (selectedClass === recordData.classLevel) {
      const updatedStudents = [...filteredStudents, newStudent]
      // Recalculate positions
      const sorted = updatedStudents.sort((a, b) => b.average - a.average)
      sorted.forEach((student, index) => {
        student.position = index + 1
      })
      setFilteredStudents(sorted)
    }
  }

  const handleStudentUpdate = (updatedStudent: Student) => {
    // Update the student in the filtered list
    const updatedStudents = filteredStudents.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student,
    )

    // Recalculate positions
    const sorted = updatedStudents.sort((a, b) => b.average - a.average)
    sorted.forEach((student, index) => {
      student.position = index + 1
    })

    setFilteredStudents(sorted)
  }

  const handleSelectStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudentIds)
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId)
    } else {
      newSelected.add(studentId)
    }
    setSelectedStudentIds(newSelected)

    // Update select all state
    setSelectAll(newSelected.size === sortedStudents.length && sortedStudents.length > 0)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudentIds(new Set())
      setSelectAll(false)
    } else {
      const allIds = new Set(sortedStudents.map((student) => student.id))
      setSelectedStudentIds(allIds)
      setSelectAll(true)
    }
  }

  const handleExportSelected = () => {
    const selectedStudents = sortedStudents.filter((student) => selectedStudentIds.has(student.id))

    if (selectedStudents.length === 0) {
      alert("Please select at least one student to export.")
      return
    }

    const className = selectedClass || "All Classes"
    exportToExcel(selectedStudents, className)
  }

  const selectedCount = selectedStudentIds.size

  return (
    <div className="exam-dashboard">
      <div className="exam_dashboard-header">
        {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}> */}
          <div className="exam_dashboard-header_description" >
            <h1 className="dashboard-title">Exam Records Dashboard</h1>
            <p className="dashboard-subtitle">
              Comprehensive academic performance tracking across all educational levels
            </p>
          </div>
          <div className="header-actions">
            {selectedCount > 0 && (
              <button className="export-button" onClick={handleExportSelected}>
                <Download size={20} />
                Export ({selectedCount})
              </button>
            )}
            <button className="add-record-button" onClick={() => setShowAddModal(true)}>
              <Plus size={20} />
              Add Record
            </button>
          </div>
        {/* </div> */}
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
      <div className="Exam_students-table-container">
        <div className="Exam_students-table-header">
          <h2 className="Exam_students-table-title">{selectedClass ? `${selectedClass} Students` : "Students"}</h2>
          <div className="Exam_students-table-header-actions">
            {selectedCount > 0 && <span className="Exam_students-selection-count">{selectedCount} selected</span>}
            <span className="Exam_students-students-count">
              {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="table-wrapper">
          {filteredStudents.length > 0 ? (
            <>
              <table className="students-table">
                <thead>
                  <tr>
                    <th className="checkbox-header">
                      <button
                        className="select-all-button"
                        onClick={handleSelectAll}
                        title={selectAll ? "Deselect All" : "Select All"}
                      >
                        {selectAll ? <CheckSquare size={18} /> : <Square size={18} />}
                      </button>
                    </th>
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
                  {paginatedStudents.map((student) => (
                    <tr
                      key={student.id}
                      onClick={(e) => handleStudentClick(student, e)}
                      className={selectedStudentIds.has(student.id) ? "selected-row" : ""}
                    >
                      <td className="checkbox-cell">
                        <button
                          className="student-checkbox"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectStudent(student.id)
                          }}
                        >
                          {selectedStudentIds.has(student.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                        </button>
                      </td>
                      <td>
                        <span className={`position-badge ${getPositionClass(student.position)}`}>
                          {student.position}
                        </span>
                      </td>
                      <td>
                        <span className="admission-number">{student.admissionNumber}</span>
                      </td>
                      <td>
                        <span className="student-name">{student.fullName}</span>
                      </td>
                      <td className="student-gender">{student.gender}</td>
                      <td className="student-age">{student.age}</td>
                      <td>
                        <strong className="student-totalScore"> {student.totalScore}</strong>
                      </td>
                      <td className="student-avaarage">{student.average}%</td>
                      <td>
                        <span className={`grade-badge grade-${student.grade}`}>{student.grade}</span>
                      </td>
                      <td className="student-remark">{student.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
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
      {showModal && selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={closeModal} onUpdate={handleStudentUpdate} />
      )}

      {/* Add Record Modal */}
      {showAddModal && <AddRecordModal onClose={() => setShowAddModal(false)} onSubmit={handleAddRecord} />}
    </div>
  )
}

export default ExamDashboard
