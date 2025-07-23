// @ts-ignore
import React, { useState, useMemo } from "react";
import {
  User,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Search,
  Save,
  RotateCcw,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import "./Attendance.css";
import { Modal } from "./micro-ui/modal";
import { StatCard } from "./micro-ui/stat-card";
import { EmptyState } from "./micro-ui/empty-state";
import { SearchFilter } from "./micro-ui/search-filter";
import toast from "react-hot-toast";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  status: "Active" | "Inactive" | "Suspended";
}

interface AttendanceRecord {
  studentId: number;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  markedAt?: string;
  notes?: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    firstName: "Adebayo",
    lastName: "Okonkwo",
    email: "adebayo.okonkwo@email.com",
    phone: "+234-803-123-4567",
    rollNumber: "ST001",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Fatima",
    lastName: "Abdullahi",
    email: "fatima.abdullahi@email.com",
    phone: "+234-806-987-6543",
    rollNumber: "ST002",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Chinedu",
    lastName: "Okoro",
    email: "chinedu.okoro@email.com",
    phone: "+234-813-555-7890",
    rollNumber: "ST003",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Aisha",
    lastName: "Mohammed",
    email: "aisha.mohammed@email.com",
    phone: "+234-807-222-3333",
    rollNumber: "ST004",
    status: "Active",
  },
  {
    id: 5,
    firstName: "Tunde",
    lastName: "Adeyemi",
    email: "tunde.adeyemi@email.com",
    phone: "+234-802-666-7777",
    rollNumber: "ST005",
    status: "Active",
  },
  {
    id: 6,
    firstName: "Grace",
    lastName: "Eze",
    email: "grace.eze@email.com",
    phone: "+234-812-101-1212",
    rollNumber: "ST006",
    status: "Active",
  },
];

const attendanceOptions = [
  { label: "Present", value: "present", icon: CheckCircle, color: "#10b981" },
  { label: "Absent", value: "absent", icon: XCircle, color: "#ef4444" },
  { label: "Late", value: "late", icon: Clock, color: "#f59e0b" },
  { label: "Excused", value: "excused", icon: AlertCircle, color: "#6366f1" },
];

const statusFilterOptions = [
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Late", value: "late" },
  { label: "Excused", value: "excused" },
];

interface AttendanceProps {
  selectedClass: {
    title: string;
    description: string;
    schedule: string;
    teacher: string;
    students: number;
  };
  onBack: () => void;
}

const Attendance: React.FC<AttendanceProps> = ({ selectedClass, onBack }) => {
  const [students] = useState<Student[]>(initialStudents);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isMarkingMode, setIsMarkingMode] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(
    new Set()
  );
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [currentStudentNotes, setCurrentStudentNotes] = useState({
    studentId: 0,
    notes: "",
  });

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.email.toLowerCase().includes(searchValue.toLowerCase());

      const studentAttendance = attendanceRecords.find(
        (record) =>
          record.studentId === student.id && record.date === selectedDate
      );

      const matchesFilter =
        !filterValue || studentAttendance?.status === filterValue;

      return matchesSearch && matchesFilter && student.status === "Active";
    });
  }, [students, searchValue, filterValue, attendanceRecords, selectedDate]);

  const stats = useMemo(() => {
    const todayRecords = attendanceRecords.filter(
      (record) => record.date === selectedDate
    );
    const totalStudents = students.filter((s) => s.status === "Active").length;
    const presentCount = todayRecords.filter(
      (r) => r.status === "present"
    ).length;
    const absentCount = todayRecords.filter(
      (r) => r.status === "absent"
    ).length;
    const lateCount = todayRecords.filter((r) => r.status === "late").length;
    const attendanceRate =
      totalStudents > 0
        ? ((presentCount + lateCount) / totalStudents) * 100
        : 0;

    return {
      totalStudents: totalStudents.toString(),
      presentStudents: presentCount.toString(),
      absentStudents: absentCount.toString(),
      attendanceRate: `${Math.round(attendanceRate)}%`,
    };
  }, [attendanceRecords, selectedDate, students]);

  const getAttendanceStatus = (studentId: number, date: string) => {
    return attendanceRecords.find(
      (record) => record.studentId === studentId && record.date === date
    );
  };

  const markAttendance = (
    studentId: number,
    status: "present" | "absent" | "late" | "excused"
  ) => {
    const existingRecord = attendanceRecords.find(
      (record) => record.studentId === studentId && record.date === selectedDate
    );

    const newRecord: AttendanceRecord = {
      studentId,
      date: selectedDate,
      status,
      markedAt: new Date().toISOString(),
      notes: existingRecord?.notes || "",
    };

    if (existingRecord) {
      setAttendanceRecords((prev) =>
        prev.map((record) =>
          record.studentId === studentId && record.date === selectedDate
            ? newRecord
            : record
        )
      );
    } else {
      setAttendanceRecords((prev) => [...prev, newRecord]);
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedStudents.size === 0) {
      toast.error("Please select students and an action.");
      return;
    }

    selectedStudents.forEach((studentId) => {
      markAttendance(
        studentId,
        bulkAction as "present" | "absent" | "late" | "excused"
      );
    });

    toast.success(
      `Marked ${selectedStudents.size} students as ${bulkAction}.`,
      {
        style: { background: "#4BB543", color: "#fff" },
      }
    );

    setSelectedStudents(new Set());
    setBulkAction("");
  };

  const toggleStudentSelection = (studentId: number) => {
    const newSelection = new Set(selectedStudents);
    if (newSelection.has(studentId)) {
      newSelection.delete(studentId);
    } else {
      newSelection.add(studentId);
    }
    setSelectedStudents(newSelection);
  };

  const selectAllStudents = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map((s) => s.id)));
    }
  };

  const resetAttendance = () => {
    setAttendanceRecords((prev) =>
      prev.filter((record) => record.date !== selectedDate)
    );
    toast.success("Attendance for today has been reset.", {
      style: { background: "#4BB543", color: "#fff" },
    });
  };

  const saveAttendance = () => {
    // Here you would typically save to a backend
    toast.success("Attendance has been saved successfully.", {
      style: { background: "#4BB543", color: "#fff" },
    });
  };

  const exportAttendance = () => {
    const csvContent = [
      [
        "Date",
        "Roll Number",
        "First Name",
        "Last Name",
        "Status",
        "Marked At",
        "Notes",
      ],
      ...attendanceRecords
        .filter((record) => record.date === selectedDate)
        .map((record) => {
          const student = students.find((s) => s.id === record.studentId);
          return [
            record.date,
            student?.rollNumber || "",
            student?.firstName || "",
            student?.lastName || "",
            record.status,
            record.markedAt || "",
            record.notes || "",
          ];
        }),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedClass.title}_attendance_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Attendance data has been exported successfully.", {
      style: { background: "#4BB543", color: "#fff" },
    });
  };

  const openNotesModal = (studentId: number) => {
    const existingRecord = getAttendanceStatus(studentId, selectedDate);
    setCurrentStudentNotes({
      studentId,
      notes: existingRecord?.notes || "",
    });
    setNotesModalOpen(true);
  };

  const saveStudentNotes = () => {
    const existingRecord = attendanceRecords.find(
      (record) =>
        record.studentId === currentStudentNotes.studentId &&
        record.date === selectedDate
    );

    if (existingRecord) {
      setAttendanceRecords((prev) =>
        prev.map((record) =>
          record.studentId === currentStudentNotes.studentId &&
          record.date === selectedDate
            ? { ...record, notes: currentStudentNotes.notes }
            : record
        )
      );
    } else {
      // Create a new record with default present status if no record exists
      const newRecord: AttendanceRecord = {
        studentId: currentStudentNotes.studentId,
        date: selectedDate,
        status: "present",
        markedAt: new Date().toISOString(),
        notes: currentStudentNotes.notes,
      };
      setAttendanceRecords((prev) => [...prev, newRecord]);
    }

    toast.success("Notes saved successfully.", {
      style: { background: "#4BB543", color: "#fff" },
    });
    setNotesModalOpen(false);
  };

  return (
    <div className="att-attendance-container">
      <div className="att-attendance-wrapper">
        <div className="att-page-header-top">
          <button className="att-back-button" onClick={onBack}>
            Back to Class Details
          </button>
        </div>

        <div className="att-page-header">
          <div>
            <h1 className="att-page-title">
              {selectedClass.title} - Attendance
            </h1>
            <p className="att-page-description">
              Mark and manage student attendance for {selectedClass.title}.
              Track daily attendance patterns and generate reports.
            </p>
          </div>
          <div className="att-header-actions">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="att-date-input"
            />
            <button
              className="att-button att-button-primary"
              onClick={() => setIsMarkingMode(!isMarkingMode)}
            >
              {isMarkingMode ? "Exit Marking Mode" : "Start Marking"}
            </button>
          </div>
        </div>

        <div className="att-stats-grid">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            change="Active students"
            icon={Users}
          />
          <StatCard
            title="Present Today"
            value={stats.presentStudents}
            change="Currently present"
            icon={UserCheck}
          />
          <StatCard
            title="Attendance Rate"
            value={stats.attendanceRate}
            change="For selected date"
            icon={CheckCircle}
          />
          <StatCard
            title="Absent Today"
            value={stats.absentStudents}
            change="Need follow-up"
            icon={XCircle}
          />
        </div>

        {isMarkingMode && (
          <div className="att-bulk-actions-bar">
            <div className="att-bulk-selection">
              <label className="att-checkbox-container">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.size === filteredStudents.length &&
                    filteredStudents.length > 0
                  }
                  onChange={selectAllStudents}
                />
                <span className="att-checkmark"></span>
                Select All ({selectedStudents.size} selected)
              </label>
            </div>
            <div className="att-bulk-controls">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="att-bulk-select"
              >
                <option value="">Bulk Action</option>
                {attendanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Mark as {option.label}
                  </option>
                ))}
              </select>
              <button
                className="att-button att-button-secondary att-button-small"
                onClick={handleBulkAction}
                disabled={!bulkAction || selectedStudents.size === 0}
              >
                Apply to Selected
              </button>
            </div>
          </div>
        )}

        <div className="att-card">
          <div className="att-card-header">
            <h2 className="att-card-title">
              Attendance for {new Date(selectedDate).toLocaleDateString()} (
              {filteredStudents.length} students)
            </h2>
            <div className="att-header-actions">
              <SearchFilter
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                filterValue={filterValue}
                onFilterChange={setFilterValue}
                filterOptions={statusFilterOptions}
                placeholder="Search students..."
                filterLabel="Filter by status"
              />
              <div className="att-action-buttons">
                <button
                  className="att-button att-button-secondary att-button-small"
                  onClick={resetAttendance}
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
                <button
                  className="att-button att-button-secondary att-button-small"
                  onClick={exportAttendance}
                >
                  <Download size={14} />
                  Export
                </button>
                <button
                  className="att-button att-button-primary att-button-small"
                  onClick={saveAttendance}
                >
                  <Save size={14} />
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="att-card-content">
            {filteredStudents.length === 0 ? (
              <EmptyState
                title="No students found"
                description={
                  searchValue || filterValue
                    ? "Try adjusting your search or filter criteria."
                    : "No active students found for this class."
                }
              />
            ) : (
              <div className="att-table-container">
                <table className="att-table">
                  <thead className="att-table-header">
                    <tr>
                      {isMarkingMode && (
                        <th className="att-table-header-cell att-checkbox-column">
                          <label className="att-checkbox-container att-header-checkbox">
                            <input
                              type="checkbox"
                              checked={
                                selectedStudents.size ===
                                  filteredStudents.length &&
                                filteredStudents.length > 0
                              }
                              onChange={selectAllStudents}
                            />
                            <span className="att-checkmark"></span>
                          </label>
                        </th>
                      )}
                      <th className="att-table-header-cell">Student</th>
                      <th className="att-table-header-cell">Roll Number</th>
                      <th className="att-table-header-cell">Contact</th>
                      <th className="att-table-header-cell">
                        Attendance Status
                      </th>
                      <th className="att-table-header-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => {
                      const attendanceStatus = getAttendanceStatus(
                        student.id,
                        selectedDate
                      );
                      return (
                        <tr key={student.id} className="att-table-row">
                          {isMarkingMode && (
                            <td className="att-table-cell att-checkbox-column">
                              <label className="att-checkbox-container">
                                <input
                                  type="checkbox"
                                  checked={selectedStudents.has(student.id)}
                                  onChange={() =>
                                    toggleStudentSelection(student.id)
                                  }
                                />
                                <span className="att-checkmark"></span>
                              </label>
                            </td>
                          )}
                          <td className="att-table-cell">
                            <div className="att-student-info">
                              <div className="att-student-avatar">
                                <User size={20} />
                              </div>
                              <div>
                                <div className="att-student-name">
                                  {student.firstName} {student.lastName}
                                </div>
                                <div className="att-student-email">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="att-table-cell">
                            <span className="att-roll-number">
                              {student.rollNumber}
                            </span>
                          </td>
                          <td className="att-table-cell">
                            <div className="att-contact-info">
                              {student.phone}
                            </div>
                          </td>
                          <td className="att-table-cell">
                            <div className="att-radio-group">
                              {attendanceOptions.map((option) => {
                                const Icon = option.icon;
                                const isSelected =
                                  attendanceStatus?.status === option.value;
                                return (
                                  <label
                                    key={option.value}
                                    className={`att-radio-option ${
                                      isSelected ? "att-radio-selected" : ""
                                    }`}
                                    style={{
                                      borderColor: isSelected
                                        ? option.color
                                        : "#e5e7eb",
                                      backgroundColor: isSelected
                                        ? `${option.color}15`
                                        : "transparent",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      name={`attendance-${student.id}`}
                                      value={option.value}
                                      checked={isSelected}
                                      onChange={() =>
                                        markAttendance(
                                          student.id,
                                          option.value as any
                                        )
                                      }
                                      className="att-radio-input"
                                    />
                                    <Icon
                                      size={16}
                                      color={
                                        isSelected ? option.color : "#6b7280"
                                      }
                                    />
                                    <span
                                      className="att-radio-label"
                                      style={{
                                        color: isSelected
                                          ? option.color
                                          : "#6b7280",
                                      }}
                                    >
                                      {option.label}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                            {attendanceStatus?.markedAt && (
                              <div className="att-marked-time">
                                Marked at{" "}
                                {new Date(
                                  attendanceStatus.markedAt
                                ).toLocaleTimeString()}
                              </div>
                            )}
                          </td>
                          <td className="att-table-cell">
                            <button
                              className="att-action-button"
                              onClick={() => openNotesModal(student.id)}
                              title="Add notes"
                            >
                              <AlertCircle size={16} />
                              {attendanceStatus?.notes
                                ? "Edit Notes"
                                : "Add Notes"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Notes Modal */}
        <Modal
          isOpen={notesModalOpen}
          onClose={() => setNotesModalOpen(false)}
          title="Student Notes"
          description="Add notes or comments for this student's attendance"
        >
          <div className="att-notes-form">
            <div className="att-form-group">
              <label className="att-label">Notes</label>
              <textarea
                className="att-textarea"
                rows={4}
                placeholder="Enter any notes or comments about this student's attendance..."
                value={currentStudentNotes.notes}
                onChange={(e) =>
                  setCurrentStudentNotes((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
              />
            </div>
            <div className="att-form-actions">
              <button
                className="att-button att-button-secondary"
                onClick={() => setNotesModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="att-button att-button-primary"
                onClick={saveStudentNotes}
              >
                Save Notes
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Attendance;
