"use client";
import type React from "react";
import { useState, useMemo } from "react";
import {
  FaUsers,
  FaGraduationCap,
  FaUserGraduate,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMedkit,
  FaBookOpen,
  FaChartBar,
  FaUserFriends,
} from "react-icons/fa";
import {
  sampleStudents,
  getClassSummary,
  getEnrollmentSummary,
  type Student,
} from "./schoolData";
import { usePagination } from "../../../../utils/hooks/usePagination";
import "./studentDashboard.css";
import componentStyles from "../components.module.css"
import Pagination from "../../../components/Pagination/Pagination";
import { StatCard } from "../micro-ui/stat-card";

const StudentDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Get unique values for filters
  const uniqueClasses = useMemo(
    () => [...new Set(sampleStudents.map((s) => s.className))].sort(),
    []
  );

  const uniqueStatuses = useMemo(
    () => [...new Set(sampleStudents.map((s) => s.enrollmentStatus))],
    []
  );

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return sampleStudents.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.guardianName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass = !classFilter || student.className === classFilter;
      const matchesGender = !genderFilter || student.gender === genderFilter;
      const matchesStatus =
        !statusFilter || student.enrollmentStatus === statusFilter;

      return matchesSearch && matchesClass && matchesGender && matchesStatus;
    });
  }, [searchTerm, classFilter, genderFilter, statusFilter]);

  // Pagination hook - MOVED AFTER filteredStudents
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    paginatedData: paginatedStudents,
  } = usePagination(filteredStudents, 15);

  // Calculate summaries
  const classSummary = getClassSummary(sampleStudents);
  const enrollmentSummary = getEnrollmentSummary(sampleStudents);
  const totalActiveStudents = enrollmentSummary.Active || 0;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "status-badge status-active";
      case "Transferred":
        return "status-badge status-transferred";
      case "Graduated":
        return "status-badge status-graduated";
      case "Suspended":
        return "status-badge status-suspended";
      default:
        return "status-badge";
    }
  };

  const getGenderBadgeClass = (gender: string) => {
    return `gender-badge ${
      gender === "Male" ? "gender-male" : "gender-female"
    }`;
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const StudentModal: React.FC<{ student: Student; onClose: () => void }> = ({
    student,
    onClose,
  }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <FaUser /> {student.fullName}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <div className="student-details">
            {/* Basic Information */}
            <div className="detail-section">
              <h3 className="section-title">
                <FaUser /> Basic Information
              </h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{student.fullName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Student ID</span>
                  <span className="detail-value">{student.studentId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Class</span>
                  <span className="detail-value">{student.className}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{student.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Age</span>
                  <span className="detail-value">
                    {calculateAge(student.dateOfBirth)} years
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Enrollment Status</span>
                  <span
                    className={getStatusBadgeClass(student.enrollmentStatus)}
                  >
                    {student.enrollmentStatus}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Enrollment Date</span>
                  <span className="detail-value">
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            {/* Guardian Information */}
            <div className="detail-section">
              <h3 className="section-title">
                <FaUserFriends /> Guardian Information
              </h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Guardian Name</span>
                  <span className="detail-value">{student.guardianName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">
                    <FaPhone style={{ marginRight: "0.5rem" }} />
                    {student.contactInfo.phone}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">
                    <FaEnvelope style={{ marginRight: "0.5rem" }} />
                    {student.contactInfo.email}
                  </span>
                </div>
                <div className="detail-item" style={{ gridColumn: "1 / -1" }}>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">
                    <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
                    {student.contactInfo.address}
                  </span>
                </div>
              </div>
            </div>
            {/* Academic Information */}
            <div className="detail-section">
              <h3 className="section-title">
                <FaBookOpen /> Academic Information
              </h3>
              <div className="detail-item">
                <span className="detail-label">Subjects</span>
                <span className="detail-value">
                  {student.subjects.join(", ")}
                </span>
              </div>
              {student.academicRecord && student.academicRecord.length > 0 && (
                <div className="academic-record">
                  <span className="detail-label">Academic Record</span>
                  <table className="record-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Test</th>
                        <th>Mid-Term</th>
                        <th>Exam</th>
                        <th>Total</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.academicRecord.map((record, index) => (
                        <tr key={index}>
                          <td>{record.subject}</td>
                          <td>{record.test}</td>
                          <td>{record.midTerm}</td>
                          <td>{record.exam}</td>
                          <td>{record.total}</td>
                          <td>
                            <strong>{record.grade}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* Medical Information */}
            {student.medicalInfo && (
              <div className="detail-section">
                <h3 className="section-title">
                  <FaMedkit /> Medical Information
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Allergies</span>
                    <span className="detail-value">
                      {student.medicalInfo.allergies.length > 0
                        ? student.medicalInfo.allergies.join(", ")
                        : "None"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Emergency Contact</span>
                    <span className="detail-value">
                      <FaPhone style={{ marginRight: "0.5rem" }} />
                      {student.medicalInfo.emergencyContact}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="all_students_dashboard-container">
      {/* Header */}
      <div className="all_students_dashboard-header">
        <div className="all_students_header-content">
          <h1 className="all_students_header-title ">
            <FaGraduationCap />
            Student Management Dashboard
          </h1>
          <p className="all_students_header-subtitle">
            Comprehensive student information and management system
          </p>
        </div>
      </div>

      <div className="all_students_dashboard-content">
        {/* Summary Cards */}
        <div className="all_students_summary-cards">
  <StatCard
    title="Total Active Students"
    value={String(totalActiveStudents)}
    change="Currently enrolled students"
    icon={FaUsers}
  />
  <StatCard
    title="Total Classes"
    value={String(Object.keys(classSummary).length)}
    change="Active class groups"
    icon={FaChartBar}
  />
  <StatCard
    title="Transferred Students"
    value={String(enrollmentSummary.Transferred || 0)}
    change="Students who transferred"
    icon={FaUserGraduate}
  />
  <StatCard
    title="Class Summary"
    value="-"
    change={
      <>
        {Object.entries(classSummary).map(([className, count]) => (
          <div key={className} style={{ marginBottom: "0.25rem" }}>
            <strong>{className}:</strong> {count} students
          </div>
        ))}
      </>
    }
    icon={FaGraduationCap}
  />
</div>


        {/* Controls Section */}
        <div className="all_students_controls-section">
          <div className="all_students_controls-header">
            <FaFilter />
            <h3 className="all_students_controls-title">
              Search & Filter Students
            </h3>
          </div>
          <div className="filters-container">
            <div className="filter-group">
              <label className="filter-label">Class</label>
              <select
                className="filter-select"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Gender</label>
              <select
                className="filter-select"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, student ID, or guardian name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className={componentStyles.card}>
  <div className={componentStyles.cardHeader}>
    <h3 className={componentStyles.cardTitle}>
      <FaUsers />
      &nbsp;Students List ({filteredStudents.length} students)
    </h3>
  </div>

  <div className={componentStyles.cardContent}>
    {paginatedStudents.length > 0 ? (
      <div className={componentStyles.responsiveTableContainer}>
        {/* Desktop Table View */}
        <div className={componentStyles.desktopTable}>
          <table className={componentStyles.table}>
            <thead className={componentStyles.tableHeader}>
              <tr>
                <th className={componentStyles.tableHeaderCell}>Student Info</th>
                <th className={componentStyles.tableHeaderCell}>Class</th>
                <th className={componentStyles.tableHeaderCell}>Gender</th>
                <th className={componentStyles.tableHeaderCell}>Age</th>
                <th className={componentStyles.tableHeaderCell}>Guardian</th>
                <th className={componentStyles.tableHeaderCell}>Contact</th>
                <th className={componentStyles.tableHeaderCell}>Status</th>
                <th className={componentStyles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody className={componentStyles.tableBody}>
              {paginatedStudents.map((student) => (
                <tr key={student.id} className={componentStyles.tableRow}>
                  <td className={componentStyles.tableCell}>
                    <div className={componentStyles.tableCellBold}>{student.fullName}</div>
                    <div className={componentStyles.fieldSubtext}>{student.studentId}</div>
                  </td>
                  <td className={componentStyles.tableCell}>{student.className}</td>
                  <td className={componentStyles.tableCell}>
                    <span className={getGenderBadgeClass(student.gender)}>{student.gender}</span>
                  </td>
                  <td className={componentStyles.tableCell}>{calculateAge(student.dateOfBirth)} years</td>
                  <td className={componentStyles.tableCell}>{student.guardianName}</td>
                  <td className={componentStyles.tableCell}>
                    <div>{student.contactInfo.phone}</div>
                    <div className={componentStyles.fieldSubtext}>{student.contactInfo.email}</div>
                  </td>
                  <td className={componentStyles.tableCell}>
                    <span className={getStatusBadgeClass(student.enrollmentStatus)}>
                      {student.enrollmentStatus}
                    </span>
                  </td>
                  <td className={componentStyles.tableCell}>
                    <div className={componentStyles.tableActions}>
                      <button
                        className={componentStyles.actionButton}
                        onClick={() => setSelectedStudent(student)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button className={componentStyles.actionButton} title="Edit Student">
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className={componentStyles.mobileCards}>
          {paginatedStudents.map((student) => (
            <div key={student.id} className={componentStyles.departmentCard}>
              <div className={componentStyles.cardHeader}>
                <div className={componentStyles.cardTitleSection}>
                  <h3 className={componentStyles.cardTitle}>{student.fullName}</h3>
                  <span className={getStatusBadgeClass(student.enrollmentStatus)}>
                    {student.enrollmentStatus}
                  </span>
                </div>
                <div className={componentStyles.cardActions}>
                  <button
                    className={componentStyles.actionButton}
                    onClick={() => setSelectedStudent(student)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button className={componentStyles.actionButton} title="Edit Student">
                    <FaEdit />
                  </button>
                </div>
              </div>

              <div className={componentStyles.cardBody}>
                <div className={componentStyles.cardRow}>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>ID</span>
                    <span className={componentStyles.fieldValue}>{student.studentId}</span>
                  </div>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>Class</span>
                    <span className={componentStyles.fieldValue}>{student.className}</span>
                  </div>
                </div>

                <div className={componentStyles.cardRow}>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>Gender</span>
                    <span className={componentStyles.fieldValue}>{student.gender}</span>
                  </div>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>Age</span>
                    <span className={componentStyles.fieldValue}>
                      {calculateAge(student.dateOfBirth)} years
                    </span>
                  </div>
                </div>

                <div className={componentStyles.cardRow}>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>Guardian</span>
                    <span className={componentStyles.fieldValue}>{student.guardianName}</span>
                  </div>
                </div>

                <div className={componentStyles.cardRow}>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>Phone</span>
                    <span className={componentStyles.fieldValue}>{student.contactInfo.phone}</span>
                  </div>
                  <div className={componentStyles.cardField}>
                    <span className={componentStyles.fieldLabel}>Email</span>
                    <span className={componentStyles.fieldSubtext}>{student.contactInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className={componentStyles.emptyState}>
        <FaUsers className={componentStyles.emptyStateIcon} />
        <h3 className={componentStyles.emptyStateTitle}>No students found</h3>
        <p className={componentStyles.emptyStateDescription}>
          Try adjusting your search criteria or filters
        </p>
      </div>
    )}
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
</div>

      
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;