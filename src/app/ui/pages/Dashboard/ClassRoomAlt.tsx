import React, { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaArrowLeft,
  FaPlus,
  FaUsers,
  FaLayerGroup,
  FaChevronRight,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { authService } from "../../../redux/configuration/auth.service";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./ClassRoomAlt.module.css";
import toast from "react-hot-toast";

// --- Types ---
interface Student {
  id: string;
  name: string;
  age?: string;
  gender?: string;
}

interface ClassItem {
  id: string;
  name: string;
  students: Student[];
}

interface Classroom {
  id: string;
  name: string;
  description: string;
  classes: ClassItem[];
}

const ClassRoomAlt: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.user);

  // State for Navigation & Data
  const [view, setView] = useState<
    | "MAIN"
    | "ALL_STUDENTS"
    | "CLASSROOMS_LIST"
    | "SINGLE_CLASSROOM"
    | "SINGLE_CLASS"
  >("MAIN");
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);

  // Creation State
  const [newItemName, setNewItemName] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Edit/Delete State
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

  // --- Fetch Data ---
  const fetchData = async () => {
    setLoading(true);
    const data = await authService.getOrganizationClassrooms();
    setClassrooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- CRUD Handlers ---

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
      toast.success("Classroom created!");
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
      toast.success("Class created!");
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
        studentData
      );
      setNewItemName("");
      setShowInput(false);
      refreshSelection();
      toast.success("Student added!");
    } catch (e) {
      toast.error("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  // Helper to refresh selected items after updates
  const refreshSelection = async () => {
    const data = await authService.getOrganizationClassrooms();
    setClassrooms(data);
    if (selectedClassroom) {
      const updatedCR = data.find(
        (c: Classroom) => c.id === selectedClassroom.id
      );
      setSelectedClassroom(updatedCR || null);
      if (selectedClass && updatedCR) {
        const updatedCL = updatedCR.classes.find(
          (c: ClassItem) => c.id === selectedClass.id
        );
        setSelectedClass(updatedCL || null);
      }
    }
  };

  // --- Edit Handlers ---
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
          editMode.name
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
          { name: editMode.name }
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

  // --- Delete Handlers ---
  const handleDelete = async () => {
    if (!deleteMode) return;
    try {
      setLoading(true);
      if (deleteMode.type === "classroom") {
        await authService.deleteClassroom(deleteMode.id);
        setView("CLASSROOMS_LIST"); // Go back to list if viewing single
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
          deleteMode.id
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

  // --- Views ---

  // 1. Main Menu
  if (view === "MAIN") {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.pageTitle}>Classroom Management</h2>
        </div>
        <div className="cards-grid cards-grid-3">
          <div
            style={{ cursor: "pointer" }}
            onClick={handleCreateClassroomCheck}
          >
            <DashboardCard
              icon={<FaChalkboardTeacher />}
              title="Classrooms"
              description="Create and manage your educational hierarchy."
            />
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setView("ALL_STUDENTS")}
          >
            <DashboardCard
              icon={<FaUsers />}
              title="All Students"
              description="View a complete list of all students."
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. All Students View
  if (view === "ALL_STUDENTS") {
    const allStudents = classrooms.flatMap((cr) =>
      (cr.classes || []).flatMap((cl) =>
        (cl.students || []).map((s) => ({
          ...s,
          className: cl.name,
          classroomName: cr.name,
        }))
      )
    );
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => setView("MAIN")}>
          <FaArrowLeft /> Back to Menu
        </button>
        <div className={styles.header}>
          <h2 className={styles.pageTitle}>All Students Directory</h2>
          <p style={{ color: "#666" }}>Total Students: {allStudents.length}</p>
        </div>
        {allStudents.length === 0 ? (
          <div className={styles.emptyState}>No students found.</div>
        ) : (
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Hierarchy</th>
                </tr>
              </thead>
              <tbody>
                {allStudents.map((s, idx) => (
                  <tr key={idx} className={styles.studentRow}>
                    <td>
                      <div className={styles.studentName}>
                        <div className={styles.avatarCircle}>
                          <FaUserGraduate />
                        </div>
                        {s.name}
                      </div>
                    </td>
                    <td>
                      {s.classroomName} &gt; {s.className}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // 3. Classrooms List
  if (view === "CLASSROOMS_LIST") {
    return (
      <div className={styles.container}>
        <div className={styles.actionBar}>
          <button className={styles.backButton} onClick={() => setView("MAIN")}>
            <FaArrowLeft /> Back
          </button>
          <button
            onClick={() => setShowInput(true)}
            className={styles.createButton}
          >
            <FaPlus /> Create Classroom
          </button>
        </div>

        {showInput && (
          <div className={styles.inputForm}>
            <h4>Add New Classroom</h4>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="e.g. Primary Section"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className={styles.textInput}
              />
              <button onClick={createClassroom} className={styles.saveBtn}>
                Save
              </button>
              <button
                onClick={() => setShowInput(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="cards-grid cards-grid-3">
          {classrooms.map((cr) => (
            <div key={cr.id} style={{ position: "relative" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedClassroom(cr);
                  setView("SINGLE_CLASSROOM");
                }}
              >
                <DashboardCard
                  icon={<FaLayerGroup />}
                  title={cr.name}
                  description={`${(cr.classes || []).length} Classes`}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  display: "flex",
                  gap: 8,
                }}
              >
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
                  <FaPen size={12} />
                </button>
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
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        {renderEditModal()}
        {renderDeleteModal()}
      </div>
    );
  }

  // 4. Single Classroom
  if (view === "SINGLE_CLASSROOM" && selectedClassroom) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <span onClick={() => setView("CLASSROOMS_LIST")}>Classrooms</span>
          <FaChevronRight size={10} />
          <span className={styles.active}>{selectedClassroom.name}</span>
        </div>
        <div className={styles.actionBar}>
          <button
            className={styles.backButton}
            onClick={() => setView("CLASSROOMS_LIST")}
          >
            <FaArrowLeft /> Back
          </button>
          <button
            onClick={() => setShowInput(true)}
            className={styles.createButton}
          >
            <FaPlus /> Add Class
          </button>
        </div>

        {showInput && (
          <div className={styles.inputForm}>
            <h4>Add Class to {selectedClassroom.name}</h4>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="e.g. Primary 1"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className={styles.textInput}
              />
              <button onClick={createClass} className={styles.saveBtn}>
                Save
              </button>
              <button
                onClick={() => setShowInput(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="cards-grid cards-grid-3">
          {(selectedClassroom.classes || []).map((cl) => (
            <div key={cl.id} style={{ position: "relative" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedClass(cl);
                  setView("SINGLE_CLASS");
                }}
              >
                <DashboardCard
                  icon={<FaChalkboardTeacher />}
                  title={cl.name}
                  description={`${(cl.students || []).length} Students`}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  display: "flex",
                  gap: 8,
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditMode({ type: "class", id: cl.id, name: cl.name });
                  }}
                  className={styles.iconBtn}
                >
                  <FaPen size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteMode({ type: "class", id: cl.id, name: cl.name });
                  }}
                  className={`${styles.iconBtn} ${styles.deleteIcon}`}
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {renderEditModal()}
        {renderDeleteModal()}
      </div>
    );
  }

  // 5. Single Class
  if (view === "SINGLE_CLASS" && selectedClass && selectedClassroom) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <span onClick={() => setView("CLASSROOMS_LIST")}>Classrooms</span>
          <FaChevronRight size={10} />
          <span onClick={() => setView("SINGLE_CLASSROOM")}>
            {selectedClassroom.name}
          </span>
          <FaChevronRight size={10} />
          <span className={styles.active}>{selectedClass.name}</span>
        </div>
        <div className={styles.actionBar}>
          <button
            className={styles.backButton}
            onClick={() => setView("SINGLE_CLASSROOM")}
          >
            <FaArrowLeft /> Back
          </button>
          <button
            onClick={() => setShowInput(true)}
            className={styles.createButton}
          >
            <FaPlus /> Add Student
          </button>
        </div>

        {showInput && (
          <div className={styles.inputForm}>
            <h4>Add Student</h4>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Student Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className={styles.textInput}
              />
              <button onClick={addStudent} className={styles.saveBtn}>
                Add
              </button>
              <button
                onClick={() => setShowInput(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Added</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(selectedClass.students || []).map((s, i) => (
                <tr key={s.id} className={styles.studentRow}>
                  <td>
                    <div className={styles.studentName}>
                      <div className={styles.avatarCircle}>
                        {s.name.charAt(0)}
                      </div>
                      {s.name}
                    </div>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() =>
                        setEditMode({ type: "student", id: s.id, name: s.name })
                      }
                      className={styles.iconBtn}
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteMode({
                          type: "student",
                          id: s.id,
                          name: s.name,
                        })
                      }
                      className={`${styles.iconBtn} ${styles.deleteIcon}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderEditModal()}
        {renderDeleteModal()}
      </div>
    );
  }

  // Helper Renderers
  function renderEditModal() {
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
            className={styles.textInput}
          />
          <div className={styles.modalActions}>
            <button
              onClick={() => setEditMode(null)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button onClick={handleEdit} className={styles.saveBtn}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderDeleteModal() {
    if (!deleteMode) return null;
    const isClassroom = deleteMode.type === "classroom";
    const isMatch = deleteConfirmationInput === deleteMode.name;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Delete {deleteMode.type}?</h3>
          <p style={{ marginBottom: 15, color: "#666" }}>
            Are you sure you want to delete <b>{deleteMode.name}</b>?
            {isClassroom &&
              " This will permanently delete all classes and students within it."}
          </p>

          {isClassroom && (
            <div style={{ marginBottom: 15 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Type "{deleteMode.name}" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                className={styles.textInput}
                placeholder={deleteMode.name}
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
              disabled={isClassroom && !isMatch}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default ClassRoomAlt;
