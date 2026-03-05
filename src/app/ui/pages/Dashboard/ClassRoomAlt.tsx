import React, { useState, useEffect } from "react";
import {
  School,
  Users,
  Layers,
  // GraduationCap,
  ArrowLeft,
  Plus,
  ChevronRight,
  Pencil,
  Trash2,
  FolderOpen,
  Presentation,
  Settings,
  UserCog,
  Coins,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { authService } from "../../../redux/configuration/auth.service";
// import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import ManageStudent from "./ManageStudent";
import styles from "./ClassRoomAlt.module.css";
import toast from "react-hot-toast";

// ... (Interfaces) ...
interface Student {
  id: string;
  name: string;
  email?: string;
  customFields?: { label: string; value: string }[];
  dateAdded?: string;
}
interface ClassItem {
  id: string;
  name: string;
  students: Student[];
  teacherId?: string;
  teacherName?: string;
  schoolFees?: string;
}
interface Classroom {
  id: string;
  name: string;
  description: string;
  classes: ClassItem[];
  headTeacherId?: string;
  headTeacherName?: string;
}

// ... (Helper Components: InputPanel, EmptyState, EditModal, DeleteModal) ...
const InputPanel = ({
  title,
  placeholder,
  value,
  setValue,
  onSave,
  onCancel,
  loading,
}: any) => {
  return (
    <div className={styles.inputPanel}>
      <h4>{title}</h4>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.inputField}
          autoFocus
        />
        <button onClick={onSave} disabled={loading} className={styles.saveBtn}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const EmptyState = ({ message }: { message: string }) => (
  <div className={styles.emptyState}>
    <FolderOpen size={48} className={styles.emptyIcon} />
    <p className={styles.emptyText}>{message}</p>
  </div>
);
const EditModal = ({ editMode, setEditMode, handleEdit }: any) => {
  if (!editMode) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>
          Edit{" "}
          {editMode.type === "classroom"
            ? "Classroom"
            : editMode.type === "class"
              ? "Class"
              : "Student"}
        </h3>
        <input
          type="text"
          value={editMode.name}
          onChange={(e) => setEditMode({ ...editMode, name: e.target.value })}
          className={styles.inputField}
          style={{ width: "100%", marginBottom: 15 }}
          autoFocus
        />
        <div className={styles.modalActions}>
          <button
            onClick={() => setEditMode(null)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button onClick={handleEdit} className={styles.saveBtn}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
const DeleteModal = ({
  deleteMode,
  setDeleteMode,
  handleDelete,
  deleteConfirmationInput,
  setDeleteConfirmationInput,
}: any) => {
  if (!deleteMode) return null;
  const isClassroom = deleteMode.type === "classroom";
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle} style={{ color: "#ef4444" }}>
          Delete {deleteMode.type}?
        </h3>
        <p className={styles.warningText}>
          Are you sure you want to delete <b>{deleteMode.name}</b>?{" "}
          {isClassroom &&
            " This will permanently delete all associated classes and student data. This action cannot be undone."}
        </p>
        {isClassroom && (
          <div style={{ marginBottom: 20 }}>
            <label className={styles.confirmLabel}>
              Type "{deleteMode.name}" to confirm:
            </label>
            <input
              type="text"
              value={deleteConfirmationInput}
              onChange={(e) => setDeleteConfirmationInput(e.target.value)}
              className={styles.inputField}
              style={{ width: "100%" }}
              placeholder={deleteMode.name}
              autoFocus
            />
          </div>
        )}
        <div className={styles.modalActions}>
          <button
            onClick={() => {
              setDeleteMode(null);
              setDeleteConfirmationInput("");
            }}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={styles.deleteConfirmBtn}
            disabled={
              isClassroom && deleteConfirmationInput !== deleteMode.name
            }
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

// Teacher Assignment Modal (Reusable for Head Teacher)
const AssignStaffModal = ({
  isOpen,
  onClose,
  staffList,
  onAssign,
  title,
  label,
}: any) => {
  const [selectedStaffId, setSelectedStaffId] = useState("");
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 15 }}>{label}</p>
        {staffList.length === 0 ? (
          <div
            style={{
              padding: "20px",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: "8px",
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: "5px", fontWeight: 600 }}>
              No staff data found.
            </p>
            <p style={{ fontSize: "13px" }}>
              Please add staff via the <strong>Staffs</strong> option on the
              sidebar.
            </p>
          </div>
        ) : (
          <select
            className={styles.inputField}
            style={{ width: "100%", marginBottom: 20 }}
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
          >
            <option value="">Select Staff Member...</option>
            {staffList.map((s: any) => (
              <option key={s.uid} value={s.uid}>
                {s.firstName} {s.lastName} ({s.jobTitle})
              </option>
            ))}
          </select>
        )}
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelBtn}>
            {staffList.length === 0 ? "Close" : "Cancel"}
          </button>
          {staffList.length > 0 && (
            <button
              onClick={() => onAssign(selectedStaffId)}
              className={styles.saveBtn}
              disabled={!selectedStaffId}
            >
              Assign
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// School Fees Modal
const SetFeesModal = ({ isOpen, onClose, currentFees, onSave }: any) => {
  const [amount, setAmount] = useState(currentFees || "");
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Set School Fees</h3>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 15 }}>
          Set the tuition fee for this class.
        </p>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              marginBottom: 5,
              fontWeight: 600,
            }}
          >
            Amount (NGN)
          </label>
          <input
            type="number"
            className={styles.inputField}
            style={{ width: "100%" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 50000"
          />
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={() => onSave(amount)} className={styles.saveBtn}>
            Save Fee
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassRoomAlt: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.user);

  const [view, setView] = useState<
    | "MAIN"
    | "ALL_STUDENTS"
    | "CLASSROOMS_LIST"
    | "SINGLE_CLASSROOM"
    | "SINGLE_CLASS"
    | "MANAGE_STUDENT"
  >("MAIN");
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null,
  );
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState<{
    type: "classroom" | "class" | "student";
    id: string;
    name: string;
  } | null>(null);
  const [deleteMode, setDeleteMode] = useState<{
    type: "classroom" | "class" | "student";
    id: string;
    name: string;
  } | null>(null);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");

  // Modals State
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showHeadTeacherModal, setShowHeadTeacherModal] = useState(false);
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [staffList, setStaffList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const data = await authService.getOrganizationClassrooms();
    setClassrooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... (CRUD handlers) ...
  const handleCreateClassroomCheck = () => {
    const { phone, streetName, city, country } = userDetails;
    if (!phone || !streetName || !city || !country) {
      toast.error("Please complete your Organization Details first.", {
        style: { background: "#333", color: "#fff" },
      });
      return;
    }
    setView("CLASSROOMS_LIST");
  };
  const createClassroom = async () => {
    if (!newItemName.trim()) return;
    try {
      setLoading(true);
      await authService.addClassroom(newItemName, "General Classroom");
      setNewItemName("");
      setShowInput(false);
      fetchData();
      toast.success("Classroom created successfully!");
    } catch (e) {
      toast.error("Failed to create classroom");
    } finally {
      setLoading(false);
    }
  };
  const createClass = async () => {
    if (!newItemName.trim() || !selectedClassroom) return;
    try {
      setLoading(true);
      await authService.addClassToClassroom(selectedClassroom.id, newItemName);
      setNewItemName("");
      setShowInput(false);
      refreshSelection();
      toast.success("Class created successfully!");
    } catch (e) {
      toast.error("Failed to create class");
    } finally {
      setLoading(false);
    }
  };
  const addStudent = async () => {
    if (!newItemName.trim() || !selectedClassroom || !selectedClass) return;
    try {
      setLoading(true);
      const studentData = { name: newItemName };
      await authService.addStudentToClass(
        selectedClassroom.id,
        selectedClass.id,
        studentData,
      );
      setNewItemName("");
      setShowInput(false);
      refreshSelection();
      toast.success("Student added successfully!");
    } catch (e) {
      toast.error("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const refreshSelection = async () => {
    const data = await authService.getOrganizationClassrooms();
    setClassrooms(data);
    if (selectedClassroom) {
      const updatedCR = data.find(
        (c: Classroom) => c.id === selectedClassroom.id,
      );
      setSelectedClassroom(updatedCR || null);
      if (selectedClass && updatedCR) {
        const updatedCL = updatedCR.classes.find(
          (c: ClassItem) => c.id === selectedClass.id,
        );
        setSelectedClass(updatedCL || null);
      }
    }
  };

  const handleEdit = async () => {
    if (!editMode || !editMode.name.trim()) return;
    try {
      setLoading(true);
      if (editMode.type === "classroom") {
        await authService.updateClassroom(editMode.id, editMode.name);
      } else if (editMode.type === "class" && selectedClassroom) {
        await authService.updateClass(
          selectedClassroom.id,
          editMode.id,
          editMode.name,
        );
      } else if (
        editMode.type === "student" &&
        selectedClassroom &&
        selectedClass
      ) {
        await authService.updateStudent(
          selectedClassroom.id,
          selectedClass.id,
          editMode.id,
          { name: editMode.name },
        );
      }
      setEditMode(null);
      refreshSelection();
      toast.success("Updated successfully");
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!deleteMode) return;
    try {
      setLoading(true);
      if (deleteMode.type === "classroom") {
        await authService.deleteClassroom(deleteMode.id);
        setView("CLASSROOMS_LIST");
      } else if (deleteMode.type === "class" && selectedClassroom) {
        await authService.deleteClass(selectedClassroom.id, deleteMode.id);
      } else if (
        deleteMode.type === "student" &&
        selectedClassroom &&
        selectedClass
      ) {
        await authService.deleteStudent(
          selectedClassroom.id,
          selectedClass.id,
          deleteMode.id,
        );
      }
      setDeleteMode(null);
      setDeleteConfirmationInput("");
      refreshSelection();
      toast.success("Deleted successfully");
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Staff & Fees
  const fetchStaff = async () => {
    const staff = await authService.getOrganizationEmployees();
    setStaffList(staff);
  };

  const openAssignTeacher = async () => {
    await fetchStaff();
    setShowTeacherModal(true);
  };
  const openAssignHeadTeacher = async () => {
    await fetchStaff();
    setShowHeadTeacherModal(true);
  };
  const openSetFees = () => {
    setShowFeesModal(true);
  };

  const handleAssignTeacher = async (staffId: string) => {
    if (!selectedClassroom || !selectedClass) return;
    setLoading(true);
    try {
      const staff = staffList.find((s) => s.uid === staffId);
      await authService.assignStaffToClass(
        selectedClassroom.id,
        selectedClass.id,
        staffId,
        `${staff.firstName} ${staff.lastName}`,
      );
      setShowTeacherModal(false);
      toast.success("Teacher assigned successfully!");
      refreshSelection();
    } catch (e) {
      toast.error("Failed to assign teacher");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignHeadTeacher = async (staffId: string) => {
    if (!selectedClassroom) return;
    setLoading(true);
    try {
      const staff = staffList.find((s) => s.uid === staffId);
      await authService.assignHeadTeacherToClassroom(
        selectedClassroom.id,
        staffId,
        `${staff.firstName} ${staff.lastName}`,
      );
      setShowHeadTeacherModal(false);
      toast.success("Head Teacher assigned!");
      refreshSelection();
    } catch (e) {
      toast.error("Failed to assign Head Teacher");
    } finally {
      setLoading(false);
    }
  };

  const handleSetFees = async (amount: string) => {
    if (!selectedClassroom || !selectedClass) return;
    setLoading(true);
    try {
      await authService.updateClassFees(
        selectedClassroom.id,
        selectedClass.id,
        amount,
      );
      setShowFeesModal(false);
      toast.success("School fees updated!");
      refreshSelection();
    } catch (e) {
      toast.error("Failed to update fees");
    } finally {
      setLoading(false);
    }
  };

  // --- Views ---

  if (view === "MAIN") {
    return (
      <div className={styles.container}>
        {" "}
        <div className={styles.headerWrapper}>
          {" "}
          <div>
            {" "}
            <h1 className={styles.headerTitle}>Classroom Management</h1>{" "}
            <p className={styles.headerSubtitle}>
              {" "}
              Manage your organization's structure and students.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className={styles.grid}>
          {" "}
          <div className={styles.cardItem} onClick={handleCreateClassroomCheck}>
            {" "}
            <div>
              {" "}
              <div className={styles.cardIconWrapper}>
                {" "}
                <School size={24} />{" "}
              </div>{" "}
              <div className={styles.cardContent}>
                {" "}
                <h3>Classrooms</h3>{" "}
                <p>Manage hierarchy (Nursery, Primary, etc.)</p>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                marginTop: 15,
                fontSize: 13,
                color: "#071d69",
                fontWeight: 600,
              }}
            >
              {" "}
              {classrooms.length} Active Levels &rarr;{" "}
            </div>{" "}
          </div>{" "}
          <div
            className={styles.cardItem}
            onClick={() => setView("ALL_STUDENTS")}
          >
            {" "}
            <div>
              {" "}
              <div className={styles.cardIconWrapper}>
                {" "}
                <Users size={24} />{" "}
              </div>{" "}
              <div className={styles.cardContent}>
                {" "}
                <h3>All Students</h3>{" "}
                <p>View directory of all registered students.</p>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                marginTop: 15,
                fontSize: 13,
                color: "#071d69",
                fontWeight: 600,
              }}
            >
              {" "}
              View Directory &rarr;{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  if (view === "ALL_STUDENTS") {
    const allStudents = classrooms.flatMap((cr) =>
      (cr.classes || []).flatMap((cl) =>
        (cl.students || []).map((s) => ({
          ...s,
          className: cl.name,
          classroomName: cr.name,
        })),
      ),
    );
    return (
      <div className={styles.container}>
        {" "}
        <div className={styles.actionsBar}>
          {" "}
          <button className={styles.backButton} onClick={() => setView("MAIN")}>
            {" "}
            <ArrowLeft size={16} /> Dashboard{" "}
          </button>{" "}
        </div>{" "}
        <div className={styles.headerWrapper}>
          {" "}
          <div>
            {" "}
            <h2 className={styles.headerTitle}>Student Directory</h2>{" "}
            <p className={styles.headerSubtitle}>
              {" "}
              {allStudents.length} total registered students{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {allStudents.length === 0 ? (
          <EmptyState message="No students found across any classrooms." />
        ) : (
          <div className={styles.tableContainer}>
            {" "}
            <table className={styles.table}>
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th>Student Name</th> <th>ID</th>{" "}
                  <th>Classroom / Class</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {allStudents.map((s, idx) => (
                  <tr key={idx} className={styles.tableRow}>
                    {" "}
                    <td>
                      {" "}
                      <div className={styles.studentInfo}>
                        {" "}
                        <div className={styles.avatar}>
                          {s.name.charAt(0)}
                        </div>{" "}
                        <span className={styles.studentName}>
                          {s.name}
                        </span>{" "}
                      </div>{" "}
                    </td>{" "}
                    <td className={styles.studentId}>
                      {" "}
                      {s.id.substring(0, 8).toUpperCase()}{" "}
                    </td>{" "}
                    <td>
                      {" "}
                      <span className={styles.crumbActive}>
                        {" "}
                        {s.classroomName}{" "}
                      </span>{" "}
                      &nbsp;/&nbsp; {s.className}{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        )}{" "}
      </div>
    );
  }
  if (view === "CLASSROOMS_LIST") {
    return (
      <div className={styles.container}>
        {" "}
        <div className={styles.actionsBar}>
          {" "}
          <button className={styles.backButton} onClick={() => setView("MAIN")}>
            <ArrowLeft size={16} /> Dashboard
          </button>{" "}
          <button
            onClick={() => setShowInput(!showInput)}
            className={styles.createButton}
          >
            {" "}
            {showInput ? (
              "Close"
            ) : (
              <>
                <Plus size={16} /> New Classroom
              </>
            )}{" "}
          </button>{" "}
        </div>{" "}
        {showInput && (
          <InputPanel
            title="Create New Classroom"
            placeholder="e.g. Primary Section"
            value={newItemName}
            setValue={setNewItemName}
            onSave={createClassroom}
            onCancel={() => setShowInput(false)}
            loading={loading}
          />
        )}{" "}
        {classrooms.length === 0 && !showInput ? (
          <EmptyState message="No classrooms created." />
        ) : (
          <div className={styles.grid}>
            {classrooms.map((cr) => (
              <div
                key={cr.id}
                className={styles.cardItem}
                onClick={() => {
                  setSelectedClassroom(cr);
                  setView("SINGLE_CLASSROOM");
                }}
              >
                {" "}
                <div className={styles.cardActionsOverlay}>
                  {" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditMode({
                        type: "classroom",
                        id: cr.id,
                        name: cr.name,
                      });
                    }}
                    className={styles.iconBtn}
                  >
                    <Pencil size={14} />
                  </button>{" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteMode({
                        type: "classroom",
                        id: cr.id,
                        name: cr.name,
                      });
                    }}
                    className={`${styles.iconBtn} ${styles.deleteIcon}`}
                  >
                    <Trash2 size={14} />
                  </button>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <div className={styles.cardIconWrapper}>
                    <Layers size={24} />
                  </div>{" "}
                  <div className={styles.cardContent}>
                    {" "}
                    <h3>{cr.name}</h3>{" "}
                    <p>{(cr.classes || []).length} Classes</p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            ))}
          </div>
        )}{" "}
        <EditModal
          editMode={editMode}
          setEditMode={setEditMode}
          handleEdit={handleEdit}
        />{" "}
        <DeleteModal
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          handleDelete={handleDelete}
          deleteConfirmationInput={deleteConfirmationInput}
          setDeleteConfirmationInput={setDeleteConfirmationInput}
        />{" "}
      </div>
    );
  }

  // 4. Single Classroom -> Classes (Updated with Head Teacher)
  if (view === "SINGLE_CLASSROOM" && selectedClassroom) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <span
            onClick={() => setView("CLASSROOMS_LIST")}
            className={styles.crumbLink}
          >
            Classrooms
          </span>{" "}
          <ChevronRight size={14} />{" "}
          <span className={styles.crumbActive}>{selectedClassroom.name}</span>
        </div>
        <div className={styles.actionsBar}>
          <button
            className={styles.backButton}
            onClick={() => setView("CLASSROOMS_LIST")}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={openAssignHeadTeacher}
              className={styles.createButton}
              style={{
                background: "white",
                color: "#071d69",
                border: "1px solid #071d69",
              }}
            >
              <UserCog size={16} />{" "}
              {selectedClassroom.headTeacherName
                ? "Change Head Teacher"
                : "Assign Head Teacher"}
            </button>
            <button
              onClick={() => setShowInput(!showInput)}
              className={styles.createButton}
            >
              {" "}
              {showInput ? (
                "Close"
              ) : (
                <>
                  <Plus size={16} /> Add Class
                </>
              )}{" "}
            </button>
          </div>
        </div>
        {/* Head Teacher Banner */}
        <div
          style={{
            background: "#f0fdf4",
            padding: "12px 16px",
            borderRadius: 10,
            marginBottom: 20,
            border: "1px solid #bbf7d0",
            color: "#166534",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <UserCog size={18} />
          <strong>Head Teacher:</strong>
          {selectedClassroom.headTeacherName ? (
            selectedClassroom.headTeacherName
          ) : (
            <span style={{ fontStyle: "italic", color: "#666" }}>
              Not assigned
            </span>
          )}
        </div>
        {showInput && (
          <InputPanel
            title={`Add Class to ${selectedClassroom.name}`}
            placeholder="e.g. Primary 1"
            value={newItemName}
            setValue={setNewItemName}
            onSave={createClass}
            onCancel={() => setShowInput(false)}
            loading={loading}
          />
        )}
        {(selectedClassroom.classes || []).length === 0 && !showInput ? (
          <EmptyState message="No classes yet." />
        ) : (
          <div className={styles.grid}>
            {" "}
            {(selectedClassroom.classes || []).map((cl) => (
              <div
                key={cl.id}
                className={styles.cardItem}
                onClick={() => {
                  setSelectedClass(cl);
                  setView("SINGLE_CLASS");
                }}
              >
                {" "}
                <div className={styles.cardActionsOverlay}>
                  {" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditMode({ type: "class", id: cl.id, name: cl.name });
                    }}
                    className={styles.iconBtn}
                  >
                    <Pencil size={14} />
                  </button>{" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteMode({
                        type: "class",
                        id: cl.id,
                        name: cl.name,
                      });
                    }}
                    className={`${styles.iconBtn} ${styles.deleteIcon}`}
                  >
                    <Trash2 size={14} />
                  </button>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <div className={styles.cardIconWrapper}>
                    <Presentation size={24} />
                  </div>{" "}
                  <div className={styles.cardContent}>
                    {" "}
                    <h3>{cl.name}</h3>{" "}
                    <p>{(cl.students || []).length} Students</p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        )}{" "}
        <EditModal
          editMode={editMode}
          setEditMode={setEditMode}
          handleEdit={handleEdit}
        />{" "}
        <DeleteModal
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          handleDelete={handleDelete}
          deleteConfirmationInput={deleteConfirmationInput}
          setDeleteConfirmationInput={setDeleteConfirmationInput}
        />
        <AssignStaffModal
          isOpen={showHeadTeacherModal}
          onClose={() => setShowHeadTeacherModal(false)}
          staffList={staffList}
          onAssign={handleAssignHeadTeacher}
          title="Assign Head Teacher"
          label="Select a staff member to be the Head Teacher."
        />
      </div>
    );
  }

  // 5. Single Class -> Students (Updated with Fees)
  if (view === "SINGLE_CLASS" && selectedClass && selectedClassroom) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <span
            onClick={() => setView("CLASSROOMS_LIST")}
            className={styles.crumbLink}
          >
            Classrooms
          </span>{" "}
          <ChevronRight size={14} />{" "}
          <span
            onClick={() => setView("SINGLE_CLASSROOM")}
            className={styles.crumbLink}
          >
            {selectedClassroom.name}
          </span>{" "}
          <ChevronRight size={14} />{" "}
          <span className={styles.crumbActive}>{selectedClass.name}</span>
        </div>

        <div className={styles.actionsBar}>
          <button
            className={styles.backButton}
            onClick={() => setView("SINGLE_CLASSROOM")}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={openSetFees}
              className={styles.createButton}
              style={{
                background: "white",
                color: "#071d69",
                border: "1px solid #071d69",
              }}
            >
              <Coins size={16} /> Set Fees
            </button>
            <button
              onClick={openAssignTeacher}
              className={styles.createButton}
              style={{
                background: "white",
                color: "#071d69",
                border: "1px solid #071d69",
              }}
            >
              <UserCog size={16} />{" "}
              {selectedClass.teacherName ? "Change Teacher" : "Assign Teacher"}
            </button>
            <button
              onClick={() => setShowInput(!showInput)}
              className={styles.createButton}
            >
              {showInput ? (
                "Close"
              ) : (
                <>
                  <Plus size={16} /> Add Student
                </>
              )}
            </button>
          </div>
        </div>

        {/* Class Info Banners */}
        <div
          style={{
            display: "flex",
            gap: 15,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#eef2ff",
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid #c7d2fe",
              color: "#3730a3",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <UserCog size={18} />
            <strong>Class Teacher:</strong>
            {selectedClass.teacherName ? (
              selectedClass.teacherName
            ) : (
              <span style={{ fontStyle: "italic", color: "#666" }}>
                Not assigned
              </span>
            )}
          </div>
          <div
            style={{
              flex: 1,
              background: "#fff7ed",
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid #fed7aa",
              color: "#9a3412",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Coins size={18} />
            <strong>School Fees:</strong>
            {selectedClass.schoolFees ? (
              `₦${Number(selectedClass.schoolFees).toLocaleString()}`
            ) : (
              <span style={{ fontStyle: "italic", color: "#666" }}>
                Not set
              </span>
            )}
          </div>
        </div>

        {showInput && (
          <InputPanel
            title={`Add Student to ${selectedClass.name}`}
            placeholder="Student Full Name"
            value={newItemName}
            setValue={setNewItemName}
            onSave={addStudent}
            onCancel={() => setShowInput(false)}
            loading={loading}
          />
        )}

        {(selectedClass.students || []).length === 0 ? (
          <EmptyState message="No students in this class yet." />
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>ID / Date Added</th>
                  <th style={{ textAlign: "right" }}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.students.map((s, i) => (
                  <tr key={s.id} className={styles.tableRow}>
                    <td>
                      <div className={styles.studentInfo}>
                        <div className={styles.avatar}>{s.name.charAt(0)}</div>
                        <span className={styles.studentName}>{s.name}</span>
                      </div>
                    </td>
                    <td className={styles.studentId}>
                      {s.id.substring(0, 8).toUpperCase()} <br />
                      {new Date(s.dateAdded || Date.now()).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div className={styles.actionIcons}>
                        <button
                          onClick={() => {
                            setSelectedStudent(s);
                            setView("MANAGE_STUDENT");
                          }}
                          className={styles.iconBtn}
                          title="Manage Student"
                          style={{
                            width: "auto",
                            padding: "0 8px",
                            gap: "4px",
                          }}
                        >
                          <Settings size={14} /> Manage
                        </button>
                        <button
                          onClick={() =>
                            setDeleteMode({
                              type: "student",
                              id: s.id,
                              name: s.name,
                            })
                          }
                          style={{
                            width: "auto",
                            padding: "0 15px",
                            gap: "4px",
                          }}
                          className={`${styles.iconBtn} ${styles.deleteIcon}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <AssignStaffModal
          isOpen={showTeacherModal}
          onClose={() => setShowTeacherModal(false)}
          staffList={staffList}
          onAssign={handleAssignTeacher}
          title="Assign Class Teacher"
          label="Select a staff member to manage this class."
        />
        <SetFeesModal
          isOpen={showFeesModal}
          onClose={() => setShowFeesModal(false)}
          currentFees={selectedClass.schoolFees}
          onSave={handleSetFees}
        />
        <DeleteModal
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          handleDelete={handleDelete}
          deleteConfirmationInput={deleteConfirmationInput}
          setDeleteConfirmationInput={setDeleteConfirmationInput}
        />
      </div>
    );
  }

  if (
    view === "MANAGE_STUDENT" &&
    selectedStudent &&
    selectedClass &&
    selectedClassroom
  ) {
    return (
      <ManageStudent
        student={selectedStudent}
        classId={selectedClass.id}
        classroomId={selectedClassroom.id}
        onBack={() => {
          refreshSelection();
          setView("SINGLE_CLASS");
        }}
      />
    );
  }

  return <div>Loading...</div>;
};

export default ClassRoomAlt;
