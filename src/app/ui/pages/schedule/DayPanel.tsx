import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Task, EventsMap, makeId } from "./types";
import styles from "./styles";
import { Modal } from "../Dashboard/micro-ui/modal";
import "../schedule/DayPanel.css";
import CalendarCreateTask from "./CalendarCreateTask";
import { TaskMain } from "../../../redux/slices/scheduleTask";

type Props = {
  selectedDate: Dayjs | null;
  isLoggedIn: boolean;
  userEvents: EventsMap;
  setUserEvents: (updater: (prev: EventsMap) => EventsMap) => void;
  formState: {
    formTitle: string;
    formDescription: string;
    formType: string;
    formStartDate: string;
    formEndDate: string | "";
  };
  formSetters: {
    setFormTitle: (v: string) => void;
    setFormDescription: (v: string) => void;
    setFormType: (v: string) => void;
    setFormStartDate: (v: string) => void;
    setFormEndDate: (v: string) => void;
    resetFormDefaults: (d?: Dayjs) => void;
  };
  onCreateTask: () => void;
  viewingTask: Task | null;
  setViewingTask: (t: Task | null) => void;
  editingTask: Task | null;
  setEditingTask: (t: Task | null) => void;
  onEditSave: () => void;
  onDeleteTask: (dateKey: string, id: string) => void;
  onClearTasks: (dateKey: string) => void;
  navigateToLogin: () => void;
};

const DayPanel: React.FC<Props> = ({
  selectedDate,
  isLoggedIn,
  userEvents,
  setUserEvents,
  formState,
  formSetters,
  onCreateTask,
  viewingTask,
  setViewingTask,
  editingTask,
  setEditingTask,
  onEditSave,
  onDeleteTask,
  onClearTasks,
  navigateToLogin,
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskMain | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{
    dateKey: string;
    id: string;
  } | null>(null);

  if (!selectedDate)
    return (
      <div
        style={{ ...styles.sidePanel, gridColumn: "2/3" }}
        className="dayPanel-container"
      >
        <p style={styles.noSelection} className="dayPanel-noSelection">
          No day selected.
        </p>
      </div>
    );

  const dateKey = selectedDate.format("YYYY-MM-DD");
  const tasks = userEvents[dateKey] ?? [];

  // Convert Task to TaskMain for editing
  const convertTaskToTaskMain = (task: Task): TaskMain => {
    return {
      id: task.id,
      title: task.title,
      description: task.description || "",
      status: "event",
      priority: "low",
      category: task.type || "",
      projectId: "",
      boardColumn: "",
      sprintId: "",
      parentTaskId: "",
      subtasks: [],
      dependencies: [],
      dependents: [],
      tags: [],
      checklist: [],
      assignee: {} as any,
      collaborators: [],
      reporter: {} as any,
      comments: [],
      attachments: [],
      estimatedHours: 0,
      actualHours: 0,
      startDate: task.startDate,
      dueDate: task.endDate || "",
      completedAt: "",
      reminderAt: "",
      recurring: false,
      recurrencePattern: "custom",
      customRecurrenceRule: "",
      isPrivate: false,
      isBlocked: false,
      blockReason: "",
      score: 0,
      feedback: "",
      linkedResources: [],
      auditTrail: [],
      createdBy: {
        id: "",
        name: "",
        email: "",
      },
      dateCreated: task.createdAt,
      dateModified: "",
      dateDeleted: "",
    };
  };

  // Handle task creation
  const handleTaskCreated = (newTask: TaskMain) => {
    // Validate that startDate exists
    if (!newTask.startDate) {
      console.error("Task must have a start date");
      return;
    }

    const dateKey: string = newTask.startDate; // Type assertion

    const taskForCalendar: Task = {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      type: newTask.category || "General",
      startDate: dateKey,
      endDate: newTask.dueDate || undefined,
      createdAt: newTask.dateCreated,
    };

    // Add task to the calendar
    setUserEvents((prev) => {
      return {
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), taskForCalendar],
      };
    });

    setCreateModalOpen(false);
  };

  // Handle task update
  const handleTaskUpdated = (updatedTask: TaskMain) => {
    // Validate that startDate exists
    if (!updatedTask.startDate) {
      console.error("Task must have a start date");
      return;
    }

    const dateKey: string = updatedTask.startDate; // Type assertion

    const taskForCalendar: Task = {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      type: updatedTask.category || "General",
      startDate: dateKey,
      endDate: updatedTask.dueDate || undefined,
      createdAt: updatedTask.dateCreated,
    };

    // Update task in the calendar
    setUserEvents((prev) => {
      const newEvents = { ...prev };

      // Remove from old date if it changed
      Object.keys(newEvents).forEach((key) => {
        newEvents[key] = newEvents[key].filter((t) => t.id !== updatedTask.id);
        if (newEvents[key].length === 0) {
          delete newEvents[key];
        }
      });

      // Add to new date
      newEvents[dateKey] = [...(newEvents[dateKey] || []), taskForCalendar];

      return newEvents;
    });

    setEditModalOpen(false);
    setTaskToEdit(null);
  };

  // Handle edit click
  const handleEditClick = (task: Task) => {
    const taskMain = convertTaskToTaskMain(task);
    setTaskToEdit(taskMain);
    setEditModalOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (dateKey: string, id: string) => {
    setTaskToDelete({ dateKey, id });
    setDeleteConfirmOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.dateKey, taskToDelete.id);
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div style={styles.sidePanel} className="dayPanel-container">
      <h4 style={{ color: "#000000" }} className="dayPanel-header">
        Tasks & Events for {dateKey}
      </h4>

      {!isLoggedIn ? (
        <div style={styles.eventBox} className="dayPanel-eventBox">
          <p style={{ color: "#000000" }}>
            Please
            <button
              style={styles.loginBtn}
              className="dayPanel-loginBtn"
              onClick={navigateToLogin}
            >
              log in
            </button>
            to see your tasks for {dateKey}.
          </p>
        </div>
      ) : (
        <>
          {tasks.length === 0 ? (
            <p style={{ color: "#000000" }}>
              No tasks or events scheduled for this day.
            </p>
          ) : (
            <>
              <ul className="dayPanel-taskList">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <div
                      style={{ color: "#000000" }}
                      className="dayPanel-taskTitle"
                    >
                      {task.title}
                    </div>
                    <div
                      style={{ color: "#000000" }}
                      className="dayPanel-taskItem"
                    >
                      <div className="dayPanel-taskMeta">
                        {task.type ?? "General"} • {task.startDate}{" "}
                        {task.endDate ? ` — ${task.endDate}` : ""}
                      </div>
                    </div>
                    <div className="dayPanel-taskActions">
                      <button
                        onClick={() => setViewingTask(task)}
                        style={styles.navButton}
                        className="dayPanel-viewBtn"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(task)}
                        style={styles.navButton}
                        className="dayPanel-editBtn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(dateKey, task.id)}
                        style={styles.navButton}
                        className="dayPanel-deleteBtn"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => onClearTasks(dateKey)}
                        style={styles.navButton}
                        className="dayPanel-clearAllBtn"
                      >
                        Clear all
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <div className="dayPanel-clearAllContainer">
                  <button
                    onClick={() => onClearTasks(dateKey)}
                    style={styles.navButton}
                    className="dayPanel-clearAllBtn"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Create form */}
          <div style={{ color: "#000000" }} className="dayPanel-createSection">
            <button
              className="dayPanel-createBtn"
              onClick={() => setCreateModalOpen(true)}
            >
              Create a new task / event
            </button>

            <Modal
              isOpen={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              title=""
              description=""
            >
              <CalendarCreateTask
                onBack={() => setCreateModalOpen(false)}
                onTaskCreated={handleTaskCreated}
                mode="add"
              />
            </Modal>

            {/* Edit Modal */}
            <Modal
              isOpen={editModalOpen}
              onClose={() => {
                setEditModalOpen(false);
                setTaskToEdit(null);
              }}
              title=""
              description=""
            >
              {taskToEdit && (
                <CalendarCreateTask
                  onBack={() => {
                    setEditModalOpen(false);
                    setTaskToEdit(null);
                  }}
                  onTaskUpdated={handleTaskUpdated}
                  initialData={taskToEdit}
                  mode="edit"
                />
              )}
            </Modal>
          </div>

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={deleteConfirmOpen}
            onClose={() => {
              setDeleteConfirmOpen(false);
              setTaskToDelete(null);
            }}
            title="Confirm Deletion"
            description="Are you sure you want to delete this task? This action cannot be undone."
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setTaskToDelete(null);
                }}
                style={{
                  ...styles.navButton,
                  backgroundColor: "#6b7280",
                }}
                className="dayPanel-cancelBtn"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  ...styles.navButton,
                  backgroundColor: "#ef4444",
                }}
                className="dayPanel-confirmDeleteBtn"
              >
                Delete
              </button>
            </div>
          </Modal>

          {/* Viewing panel */}
          {viewingTask && (
            <div className="dayPanel-viewingPanel">
              <h5 className="dayPanel-viewingTitle">{viewingTask.title}</h5>
              <div className="dayPanel-viewingMeta">
                {viewingTask.type ?? "General"} • Created{" "}
                {dayjs(viewingTask.createdAt).format("YYYY-MM-DD")}
              </div>
              <p className="dayPanel-viewingDescription">
                {viewingTask.description}
              </p>
              <div className="dayPanel-viewingDate">
                {viewingTask.startDate}
                {viewingTask.endDate ? ` — ${viewingTask.endDate}` : ""}
              </div>
              <div className="dayPanel-viewingActions">
                <button
                  onClick={() => setViewingTask(null)}
                  style={styles.navButton}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DayPanel;
