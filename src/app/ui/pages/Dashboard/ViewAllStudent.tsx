// @ts-ignore
import React, { useState, useMemo } from "react";
import {
  User,
  Users,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Plus,
  Download,
  Filter,
  Search,
  Eye,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import "./ViewAllStudent.css";
import { Modal } from "./micro-ui/modal";
import { StatCard } from "./micro-ui/stat-card";
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog";
import { EmptyState } from "./micro-ui/empty-state";
import { SearchFilter } from "./micro-ui/search-filter";
import { ValidationRules, validateForm } from "./validation/validation";
import toast from "react-hot-toast";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  enrollmentDate: string;
  status: "Active" | "Inactive" | "Suspended";
  grade: string;
  averageScore: number;
}

const initialStudents: Student[] = [
  {
    id: 1,
    firstName: "Adebayo",
    lastName: "Okonkwo",
    email: "adebayo.okonkwo@email.com",
    phone: "+234-803-123-4567",
    dateOfBirth: "2010-05-15",
    address: "15 Victoria Street, Lagos State",
    guardianName: "Mrs. Chioma Okonkwo",
    guardianPhone: "+234-803-765-4321",
    enrollmentDate: "2023-09-01",
    status: "Active",
    grade: "A",
    averageScore: 85,
  },
  {
    id: 2,
    firstName: "Fatima",
    lastName: "Abdullahi",
    email: "fatima.abdullahi@email.com",
    phone: "+234-806-987-6543",
    dateOfBirth: "2011-03-22",
    address: "32 Ahmadu Bello Way, Kano State",
    guardianName: "Alhaji Ibrahim Abdullahi",
    guardianPhone: "+234-806-345-6789",
    enrollmentDate: "2023-09-01",
    status: "Active",
    grade: "B+",
    averageScore: 78,
  },
  {
    id: 3,
    firstName: "Chinedu",
    lastName: "Okoro",
    email: "chinedu.okoro@email.com",
    phone: "+234-813-555-7890",
    dateOfBirth: "2010-11-08",
    address: "8 Port Harcourt Road, Rivers State",
    guardianName: "Mr. Emeka Okoro",
    guardianPhone: "+234-813-111-2222",
    enrollmentDate: "2023-09-01",
    status: "Active",
    grade: "A-",
    averageScore: 82,
  },
  {
    id: 4,
    firstName: "Aisha",
    lastName: "Mohammed",
    email: "aisha.mohammed@email.com",
    phone: "+234-807-222-3333",
    dateOfBirth: "2011-01-14",
    address: "25 Independence Avenue, FCT Abuja",
    guardianName: "Dr. Amina Mohammed",
    guardianPhone: "+234-807-444-5555",
    enrollmentDate: "2023-09-01",
    status: "Inactive",
    grade: "B",
    averageScore: 75,
  },
  {
    id: 5,
    firstName: "Tunde",
    lastName: "Adeyemi",
    email: "tunde.adeyemi@email.com",
    phone: "+234-802-666-7777",
    dateOfBirth: "2010-07-30",
    address: "12 Cocoa House Road, Ibadan, Oyo State",
    guardianName: "Mrs. Folake Adeyemi",
    guardianPhone: "+234-802-888-9999",
    enrollmentDate: "2023-09-01",
    status: "Active",
    grade: "A",
    averageScore: 88,
  },
  {
    id: 6,
    firstName: "Grace",
    lastName: "Eze",
    email: "grace.eze@email.com",
    phone: "+234-812-101-1212",
    dateOfBirth: "2010-12-03",
    address: "7 New Market Road, Enugu State",
    guardianName: "Mr. Peter Eze",
    guardianPhone: "+234-812-131-1414",
    enrollmentDate: "2023-09-01",
    status: "Suspended",
    grade: "C+",
    averageScore: 68,
  },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Suspended", value: "Suspended" },
];

const gradeOptions = [
  { label: "A", value: "A" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B", value: "B" },
  { label: "B-", value: "B-" },
  { label: "C+", value: "C+" },
  { label: "C", value: "C" },
  { label: "C-", value: "C-" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
];

const validationRules: ValidationRules = {
  firstName: { required: true, minLength: 2, maxLength: 50 },
  lastName: { required: true, minLength: 2, maxLength: 50 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, minLength: 10 },
  dateOfBirth: { required: true },
  address: { required: true, minLength: 10 },
  guardianName: { required: true, minLength: 2 },
  guardianPhone: { required: true, minLength: 10 },
  enrollmentDate: { required: true },
  status: { required: true },
  grade: { required: true },
};

interface ViewAllStudentProps {
  selectedClass: {
    title: string;
    description: string;
    schedule: string;
    teacher: string;
    students: number;
  };
  onBack: () => void;
}

const ViewAllStudent: React.FC<ViewAllStudentProps> = ({
  selectedClass,
  onBack,
}) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentDetailOpen, setStudentDetailOpen] = useState(false);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    guardianName: string;
    guardianPhone: string;
    enrollmentDate: string;
    status: "Active" | "Inactive" | "Suspended";
    grade: string;
    averageScore: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    enrollmentDate: "",
    status: "Active",
    grade: "",
    averageScore: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.guardianName.toLowerCase().includes(searchValue.toLowerCase());

      const matchesFilter = !filterValue || student.status === filterValue;

      return matchesSearch && matchesFilter;
    });
  }, [students, searchValue, filterValue]);

  const stats = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.status === "Active").length;
    const inactiveStudents = students.filter(
      (s) => s.status === "Inactive"
    ).length;
    const suspendedStudents = students.filter(
      (s) => s.status === "Suspended"
    ).length;
    const avgScore =
      students.reduce((sum, s) => sum + s.averageScore, 0) / totalStudents || 0;

    return {
      totalStudents: totalStudents.toString(),
      activeStudents: activeStudents.toString(),
      avgScore: `${Math.round(avgScore)}%`,
      attendanceRate: "92%", // This would come from actual attendance data
    };
  }, [students]);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      guardianName: "",
      guardianPhone: "",
      enrollmentDate: "",
      status: "Active",
      grade: "",
      averageScore: "",
    });
    setFormErrors({});
    setEditingStudent(null);
  };

  const openModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        dateOfBirth: student.dateOfBirth,
        address: student.address,
        guardianName: student.guardianName,
        guardianPhone: student.guardianPhone,
        enrollmentDate: student.enrollmentDate,
        status: student.status,
        grade: student.grade,
        averageScore: student.averageScore.toString(),
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData, validationRules);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const studentData: Student = {
      id: editingStudent?.id || Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      enrollmentDate: formData.enrollmentDate,
      status: formData.status,
      grade: formData.grade,
      averageScore: Number.parseFloat(formData.averageScore),
    };

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? studentData : s))
      );
      toast.success("Student information has been successfully updated.", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } else {
      setStudents((prev) => [...prev, studentData]);
      toast.success("New student has been successfully enrolled.", {
        style: { background: "#4BB543", color: "#fff" },
      });
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setStudentToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete));
      toast.success("Student has been successfully removed.", {
        style: { background: "#4BB543", color: "#fff" },
      });
      setStudentToDelete(null);
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setStudentDetailOpen(true);
  };

  const exportData = () => {
    const csvContent = [
      [
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Date of Birth",
        "Address",
        "Guardian Name",
        "Guardian Phone",
        "Enrollment Date",
        "Status",
        "Grade",
        "Average Score",
      ],
      ...filteredStudents.map((s) => [
        s.firstName,
        s.lastName,
        s.email,
        s.phone,
        s.dateOfBirth,
        s.address,
        s.guardianName,
        s.guardianPhone,
        s.enrollmentDate,
        s.status,
        s.grade,
        s.averageScore,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedClass.title}_students.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Student data has been exported successfully.", {
      style: { background: "#4BB543", color: "#fff" },
    });
  };

  return (
    <div className="vas-students-container">
      <div className="vas-students-wrapper">
        <div className="vas-page-header-top">
          <button className="vas-back-button" onClick={onBack}>
            Back to Class Detailsssss
          </button>
        </div>
        <div className="vas-page-header">
          <div>
            <h1 className="vas-page-title">{selectedClass.title} - Students</h1>
            <p className="vas-page-description">
              Manage all students enrolled in {selectedClass.title}. View
              student profiles, track performance, and maintain enrollment
              records.
            </p>
          </div>
          <button
            className="vas-button vas-button-primary"
            onClick={() => openModal()}
          >
            <Plus size={16} />
            Add Student
          </button>
        </div>

        <div className="vas-stats-grid">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            change="+12% from last term"
            icon={Users}
          />
          <StatCard
            title="Active Students"
            value={stats.activeStudents}
            change="Currently enrolled"
            icon={UserCheck}
          />
          <StatCard
            title="Average Score"
            value={stats.avgScore}
            change="+5% improvement"
            icon={GraduationCap}
          />
          <StatCard
            title="Attendance Rate"
            value={stats.attendanceRate}
            change="Last 30 days"
            icon={Calendar}
          />
        </div>

        <div className="vas-card">
          <div className="vas-card-header">
            <h2 className="vas-card-title">
              Students ({filteredStudents.length})
            </h2>
            <div className="vas-header-actions">
              <SearchFilter
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                filterValue={filterValue}
                onFilterChange={setFilterValue}
                filterOptions={statusOptions}
                placeholder="Search students..."
                filterLabel="Filter by status"
              />
              <button
                className="vas-button vas-button-secondary vas-button-small"
                onClick={exportData}
              >
                <Download size={14} />
                Export CSV
              </button>
            </div>
          </div>
          <div className="vas-card-content">
            {filteredStudents.length === 0 ? (
              <EmptyState
                title="No students found"
                description={
                  searchValue || filterValue
                    ? "Try adjusting your search or filter criteria."
                    : "No students have been enrolled in this class yet."
                }
              />
            ) : (
              <div className="vas-table-container">
                <table className="vas-table">
                  <thead className="vas-table-header">
                    <tr>
                      <th className="vas-table-header-cell">Name</th>
                      <th className="vas-table-header-cell">Contact</th>
                      <th className="vas-table-header-cell">Guardian</th>
                      <th className="vas-table-header-cell">Grade</th>
                      <th className="vas-table-header-cell">Status</th>
                      <th className="vas-table-header-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="vas-table-row">
                        <td className="vas-table-cell">
                          <div className="vas-student-info">
                            <div className="vas-student-avatar">
                              <User size={20} />
                            </div>
                            <div>
                              <div className="vas-student-name">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="vas-student-email">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="vas-table-cell">
                          <div className="vas-contact-info">
                            <div className="vas-contact-item">
                              <Phone size={14} />
                              {student.phone}
                            </div>
                            <div className="vas-contact-item">
                              <MapPin size={14} />
                              {student.address.split(",")[0]}
                            </div>
                          </div>
                        </td>
                        <td className="vas-table-cell">
                          <div className="vas-guardian-info">
                            <div className="vas-guardian-name">
                              {student.guardianName}
                            </div>
                            <div className="vas-guardian-phone">
                              {student.guardianPhone}
                            </div>
                          </div>
                        </td>
                        <td className="vas-table-cell">
                          <div className="vas-grade-info">
                            <span
                              className={`vas-grade-badge vas-grade-${student.grade
                                .toLowerCase()
                                .replace(/[+-]/, "")}`}
                            >
                              {student.grade}
                            </span>
                            <div className="vas-score">
                              {student.averageScore}%
                            </div>
                          </div>
                        </td>
                        <td className="vas-table-cell">
                          <span
                            className={`vas-badge ${
                              student.status === "Active"
                                ? "vas-badge-success"
                                : student.status === "Inactive"
                                ? "vas-badge-secondary"
                                : "vas-badge-warning"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="vas-table-cell">
                          <div className="vas-table-actions">
                            <button
                              className="vas-action-button"
                              onClick={() => handleViewStudent(student)}
                              title="View student details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="vas-action-button"
                              onClick={() => openModal(student)}
                              title="Edit student"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="vas-action-button vas-action-button-danger"
                              onClick={() => handleDelete(student.id)}
                              title="Remove student"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Student Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={editingStudent ? "Edit Student" : "Add New Student"}
          description={
            editingStudent
              ? "Update student information"
              : "Enroll a new student in this class"
          }
        >
          <form onSubmit={handleSubmit} className="vas-form">
            <div className="vas-form-row">
              <div className="vas-form-group">
                <label className="vas-label">First Name *</label>
                <input
                  className={`vas-input ${
                    formErrors.firstName ? "vas-input-error" : ""
                  }`}
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                {formErrors.firstName && (
                  <div className="vas-error-text">{formErrors.firstName}</div>
                )}
              </div>

              <div className="vas-form-group">
                <label className="vas-label">Last Name *</label>
                <input
                  className={`vas-input ${
                    formErrors.lastName ? "vas-input-error" : ""
                  }`}
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
                {formErrors.lastName && (
                  <div className="vas-error-text">{formErrors.lastName}</div>
                )}
              </div>
            </div>

            <div className="vas-form-row">
              <div className="vas-form-group">
                <label className="vas-label">Email *</label>
                <input
                  type="email"
                  className={`vas-input ${
                    formErrors.email ? "vas-input-error" : ""
                  }`}
                  placeholder="student@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {formErrors.email && (
                  <div className="vas-error-text">{formErrors.email}</div>
                )}
              </div>

              <div className="vas-form-group">
                <label className="vas-label">Phone *</label>
                <input
                  type="tel"
                  className={`vas-input ${
                    formErrors.phone ? "vas-input-error" : ""
                  }`}
                  placeholder="+234-xxx-xxx-xxxx"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {formErrors.phone && (
                  <div className="vas-error-text">{formErrors.phone}</div>
                )}
              </div>
            </div>

            <div className="vas-form-row">
              <div className="vas-form-group">
                <label className="vas-label">Date of Birth *</label>
                <input
                  type="date"
                  className={`vas-input ${
                    formErrors.dateOfBirth ? "vas-input-error" : ""
                  }`}
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                />
                {formErrors.dateOfBirth && (
                  <div className="vas-error-text">{formErrors.dateOfBirth}</div>
                )}
              </div>

              <div className="vas-form-group">
                <label className="vas-label">Enrollment Date *</label>
                <input
                  type="date"
                  className={`vas-input ${
                    formErrors.enrollmentDate ? "vas-input-error" : ""
                  }`}
                  value={formData.enrollmentDate}
                  onChange={(e) =>
                    handleInputChange("enrollmentDate", e.target.value)
                  }
                />
                {formErrors.enrollmentDate && (
                  <div className="vas-error-text">
                    {formErrors.enrollmentDate}
                  </div>
                )}
              </div>
            </div>

            <div className="vas-form-group">
              <label className="vas-label">Address *</label>
              <textarea
                className={`vas-textarea ${
                  formErrors.address ? "vas-input-error" : ""
                }`}
                placeholder="Enter student's full address"
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
              {formErrors.address && (
                <div className="vas-error-text">{formErrors.address}</div>
              )}
            </div>

            <div className="vas-form-row">
              <div className="vas-form-group">
                <label className="vas-label">Guardian Name *</label>
                <input
                  className={`vas-input ${
                    formErrors.guardianName ? "vas-input-error" : ""
                  }`}
                  placeholder="Enter guardian's full name"
                  value={formData.guardianName}
                  onChange={(e) =>
                    handleInputChange("guardianName", e.target.value)
                  }
                />
                {formErrors.guardianName && (
                  <div className="vas-error-text">
                    {formErrors.guardianName}
                  </div>
                )}
              </div>

              <div className="vas-form-group">
                <label className="vas-label">Guardian Phone *</label>
                <input
                  type="tel"
                  className={`vas-input ${
                    formErrors.guardianPhone ? "vas-input-error" : ""
                  }`}
                  placeholder="+234-xxx-xxx-xxxx"
                  value={formData.guardianPhone}
                  onChange={(e) =>
                    handleInputChange("guardianPhone", e.target.value)
                  }
                />
                {formErrors.guardianPhone && (
                  <div className="vas-error-text">
                    {formErrors.guardianPhone}
                  </div>
                )}
              </div>
            </div>

            <div className="vas-form-row">
              <div className="vas-form-group">
                <label className="vas-label">Grade *</label>
                <select
                  className={`vas-select ${
                    formErrors.grade ? "vas-input-error" : ""
                  }`}
                  value={formData.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value)}
                >
                  <option value="">Select grade</option>
                  {gradeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formErrors.grade && (
                  <div className="vas-error-text">{formErrors.grade}</div>
                )}
              </div>

              <div className="vas-form-group">
                <label className="vas-label">Average Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="vas-input"
                  placeholder="0"
                  value={formData.averageScore}
                  onChange={(e) =>
                    handleInputChange("averageScore", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="vas-form-group">
              <label className="vas-label">Status</label>
              <select
                className="vas-select"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="vas-form-actions">
              <button
                type="button"
                className="vas-button vas-button-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="vas-button vas-button-primary">
                {editingStudent ? "Update Student" : "Add Student"}
              </button>
            </div>
          </form>
        </Modal>

        {/* Student Detail Modal */}
        <Modal
          isOpen={studentDetailOpen}
          onClose={() => setStudentDetailOpen(false)}
          title={
            selectedStudent
              ? `${selectedStudent.firstName} ${selectedStudent.lastName}`
              : ""
          }
          description="Complete student profile and academic information"
        >
          {selectedStudent && (
            <div className="vas-student-detail">
              <div className="vas-detail-section">
                <h4 className="vas-section-title">Personal Information</h4>
                <div className="vas-detail-grid">
                  <div className="vas-detail-item">
                    <label>Full Name:</label>
                    <span>
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Date of Birth:</label>
                    <span>
                      {new Date(
                        selectedStudent.dateOfBirth
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Email:</label>
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Phone:</label>
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <div className="vas-detail-item vas-detail-full">
                    <label>Address:</label>
                    <span>{selectedStudent.address}</span>
                  </div>
                </div>
              </div>

              <div className="vas-detail-section">
                <h4 className="vas-section-title">Guardian Information</h4>
                <div className="vas-detail-grid">
                  <div className="vas-detail-item">
                    <label>Guardian Name:</label>
                    <span>{selectedStudent.guardianName}</span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Guardian Phone:</label>
                    <span>{selectedStudent.guardianPhone}</span>
                  </div>
                </div>
              </div>
              {/* new */}

              <div className="vas-detail-section">
                <h4 className="vas-section-title">Academic Information</h4>
                <div className="vas-detail-grid">
                  <div className="vas-detail-item">
                    <label>Enrollment Date:</label>
                    <span>
                      {new Date(
                        selectedStudent.enrollmentDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Grade:</label>
                    <span
                      className={`vas-grade-badge vas-grade-${selectedStudent.grade
                        .toLowerCase()
                        .replace(/[+-]/, "")}`}
                    >
                      {selectedStudent.grade}
                    </span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Average Score:</label>
                    <span>{selectedStudent.averageScore}%</span>
                  </div>
                  <div className="vas-detail-item">
                    <label>Status:</label>
                    <span
                      className={`vas-badge ${
                        selectedStudent.status === "Active"
                          ? "vas-badge-success"
                          : selectedStudent.status === "Inactive"
                          ? "vas-badge-secondary"
                          : "vas-badge-warning"
                      }`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="vas-detail-actions">
                <button
                  className="vas-button vas-button-secondary"
                  onClick={() => setStudentDetailOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          title="Confirm Deletion"
          description="Are you sure you want to remove this student? This action cannot be undone."
          // actions={
          //   <>
          //     <button
          //       className="vas-button vas-button-secondary"
          //       onClick={() => setDeleteConfirmOpen(false)}
          //     >
          //       Cancel
          //     </button>
          //     <button
          //       className="vas-button vas-button-danger"
          //       onClick={confirmDelete}
          //     >
          //       Confirm Deletion
          //     </button>
          //   </>
          // }
        >
          <p className="vas-confirm-text">
            This will permanently remove the student from the class and all
            associated records.
          </p>
        </Modal>
      </div>
    </div>
  );
};
export default ViewAllStudent;
