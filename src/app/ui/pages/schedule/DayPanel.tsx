import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Task, EventsMap, makeId } from "./types";
import styles from "./styles";
import { Modal } from "../Dashboard/micro-ui/modal";
import "./DayPanelRedesign.css";
import CalendarCreateTask from "./CalendarCreateTask";
import { TaskMain } from "../../../redux/slices/CalenderTaskSlice";

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
    formStartTime: string;
    formEndTime: string;
  };
  formSetters: {
    setFormTitle: (v: string) => void;
    setFormDescription: (v: string) => void;
    setFormType: (v: string) => void;
    setFormStartDate: (v: string) => void;
    setFormEndDate: (v: string) => void;
    setFormStartTime: (v: string) => void;
    setFormEndTime: (v: string) => void;
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
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{
    dateKey: string;
    id: string;
  } | null>(null);

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
      startTime: task.startTime || "",
      endTime: task.endTime || "",
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

  const handleTaskCreated = (newTask: TaskMain) => {
    if (!newTask.startDate) {
      console.error("Task must have a start date");
      return;
    }

    const dateKey: string = newTask.startDate;

    const taskForCalendar: Task = {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      type: newTask.category || "General",
      startDate: dateKey,
      endDate: newTask.dueDate || undefined,
      startTime: newTask.startTime || undefined,
      endTime: newTask.endTime || undefined,
      createdAt: newTask.dateCreated,
    };

    setUserEvents((prev) => {
      return {
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), taskForCalendar],
      };
    });

    setCreateModalOpen(false);
  };

  const handleTaskUpdated = (updatedTask: TaskMain) => {
    if (!updatedTask.startDate) {
      console.error("Task must have a start date");
      return;
    }

    const dateKey: string = updatedTask.startDate;

    const taskForCalendar: Task = {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      type: updatedTask.category || "General",
      startDate: dateKey,
      endDate: updatedTask.dueDate || undefined,
      startTime: updatedTask.startTime || undefined,
      endTime: updatedTask.endTime || undefined,
      createdAt: updatedTask.dateCreated,
    };

    setUserEvents((prev) => {
      const newEvents = { ...prev };

      Object.keys(newEvents).forEach((key) => {
        newEvents[key] = newEvents[key].filter((t) => t.id !== updatedTask.id);
        if (newEvents[key].length === 0) {
          delete newEvents[key];
        }
      });

      newEvents[dateKey] = [...(newEvents[dateKey] || []), taskForCalendar];

      return newEvents;
    });

    setEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleEditClick = (task: Task) => {
    const taskMain = convertTaskToTaskMain(task);
    setTaskToEdit(taskMain);
    setEditModalOpen(true);
  };

  const handleViewClick = (task: Task) => {
    setViewingTask(task);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (dateKey: string, id: string) => {
    setTaskToDelete({ dateKey, id });
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.dateKey, taskToDelete.id);
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleCloseViewModal = () => {
    setViewingTask(null);
    setViewModalOpen(false);
  };

  if (!selectedDate)
    return (
      <div className="dpv2__container dpv2__empty">
        <div className="dpv2__empty-state">
          <svg
            className="dpv2__empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
              strokeWidth="2"
            />
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
          </svg>
          <p className="dpv2__empty-text">Select a date to view tasks</p>
        </div>
      </div>
    );

  const dateKey = selectedDate.format("YYYY-MM-DD");
  const tasks = userEvents[dateKey] ?? [];

  const getTaskTypeColor = (type?: string) => {
    const colors: Record<string, string> = {
      Meeting: "#8b5cf6",
      Work: "#3b82f6",
      Personal: "#ec4899",
      General: "#6366f1",
    };
    return colors[type || "General"] || "#6366f1";
  };

  return (
    <div className="dpv2__container">
      <div className="dpv2__header">
        <div className="dpv2__header-content">
          <h2 className="dpv2__title">{selectedDate.format("dddd")}</h2>
          <p className="dpv2__date">{selectedDate.format("MMMM D, YYYY")}</p>
        </div>
        <div className="dpv2__task-count">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </div>
      </div>

      {!isLoggedIn ? (
        <div className="dpv2__auth-prompt">
          <svg
            className="dpv2__auth-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="dpv2__auth-text">Sign in to manage your tasks</p>
          <button className="dpv2__auth-btn" onClick={navigateToLogin}>
            Sign In
          </button>
        </div>
      ) : (
        <>
          <div className="dpv2__content">
            {tasks.length === 0 ? (
              <div className="dpv2__no-tasks">
                <svg
                  className="dpv2__no-tasks-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    strokeWidth="2"
                  />
                </svg>
                <p className="dpv2__no-tasks-text">No tasks scheduled</p>
                <p className="dpv2__no-tasks-subtext">
                  Create your first task to get started
                </p>
              </div>
            ) : (
              <div className="dpv2__task-list">
                {tasks.map((task) => (
                  <div key={task.id} className="dpv2__task-card">
                    <div
                      className="dpv2__task-indicator"
                      style={{ backgroundColor: getTaskTypeColor(task.type) }}
                    />
                    <div className="dpv2__task-content">
                      <div className="dpv2__task-header">
                        <h3 className="dpv2__task-title">{task.title}</h3>
                        <span
                          className="dpv2__task-badge"
                          style={{
                            backgroundColor: `${getTaskTypeColor(task.type)}15`,
                            color: getTaskTypeColor(task.type),
                          }}
                        >
                          {task.type || "General"}
                        </span>
                      </div>

                      {task.description && (
                        <p className="dpv2__task-description">
                          {task.description}
                        </p>
                      )}

                      <div className="dpv2__task-meta">
                        {task.startTime && (
                          <div className="dpv2__task-time">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <circle cx="12" cy="12" r="10" strokeWidth="2" />
                              <path
                                d="M12 6v6l4 2"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            {task.startTime}
                            {task.endTime && ` - ${task.endTime}`}
                          </div>
                        )}
                        {task.endDate && task.endDate !== task.startDate && (
                          <div className="dpv2__task-duration">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                strokeWidth="2"
                              />
                              <line
                                x1="16"
                                y1="2"
                                x2="16"
                                y2="6"
                                strokeWidth="2"
                              />
                              <line
                                x1="8"
                                y1="2"
                                x2="8"
                                y2="6"
                                strokeWidth="2"
                              />
                              <line
                                x1="3"
                                y1="10"
                                x2="21"
                                y2="10"
                                strokeWidth="2"
                              />
                            </svg>
                            Until {task.endDate}
                          </div>
                        )}
                      </div>

                      <div className="dpv2__task-actions">
                        <button
                          className="dpv2__action-btn dpv2__action-btn--view"
                          onClick={() => handleViewClick(task)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              strokeWidth="2"
                            />
                            <path
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              strokeWidth="2"
                            />
                          </svg>
                          View
                        </button>
                        <button
                          className="dpv2__action-btn dpv2__action-btn--edit"
                          onClick={() => handleEditClick(task)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              strokeWidth="2"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="dpv2__action-btn dpv2__action-btn--delete"
                          onClick={() => handleDeleteClick(dateKey, task.id)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {tasks.length > 0 && (
            <button
              className="dpv2__clear-all"
              onClick={() => onClearTasks(dateKey)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  strokeWidth="2"
                />
              </svg>
              Clear All Tasks
            </button>
          )}

          <button
            className="dpv2__create-btn"
            onClick={() => setCreateModalOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M12 4v16m8-8H4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Create New Task
          </button>

          {/* Modals */}
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

          <Modal
            isOpen={deleteConfirmOpen}
            onClose={() => {
              setDeleteConfirmOpen(false);
              setTaskToDelete(null);
            }}
            title="Delete Task"
            description="Are you sure you want to delete this task? This action cannot be undone."
          >
            <div className="dpv2__modal-actions">
              <button
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setTaskToDelete(null);
                }}
                className="dpv2__modal-btn dpv2__modal-btn--cancel"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="dpv2__modal-btn dpv2__modal-btn--delete"
              >
                Delete Task
              </button>
            </div>
          </Modal>

          {viewingTask && (
            <Modal
              isOpen={viewModalOpen}
              onClose={handleCloseViewModal}
              title=""
              description=""
            >
              <div className="dpv2__view-panel">
                <div className="dpv2__view-header">
                  <span
                    className="dpv2__view-badge"
                    style={{
                      backgroundColor: `${getTaskTypeColor(
                        viewingTask.type
                      )}15`,
                      color: getTaskTypeColor(viewingTask.type),
                    }}
                  >
                    {viewingTask.type || "General"}
                  </span>
                  <h3 className="dpv2__view-title">{viewingTask.title}</h3>
                </div>

                {viewingTask.description && (
                  <div className="dpv2__view-section">
                    <label className="dpv2__view-label">Description</label>
                    <p className="dpv2__view-text">{viewingTask.description}</p>
                  </div>
                )}

                <div className="dpv2__view-grid">
                  <div className="dpv2__view-section">
                    <label className="dpv2__view-label">Start Date</label>
                    <p className="dpv2__view-text">{viewingTask.startDate}</p>
                  </div>

                  {viewingTask.endDate && (
                    <div className="dpv2__view-section">
                      <label className="dpv2__view-label">End Date</label>
                      <p className="dpv2__view-text">{viewingTask.endDate}</p>
                    </div>
                  )}
                </div>

                <div className="dpv2__view-grid">
                  <div className="dpv2__view-section">
                    <label className="dpv2__view-label">Start Time</label>
                    <p className="dpv2__view-text">
                      {viewingTask.startTime || "Not set"}
                    </p>
                  </div>

                  {viewingTask.endTime && (
                    <div className="dpv2__view-section">
                      <label className="dpv2__view-label">End Time</label>
                      <p className="dpv2__view-text">{viewingTask.endTime}</p>
                    </div>
                  )}
                </div>

                <div className="dpv2__view-footer">
                  <p className="dpv2__view-created">
                    Created {dayjs(viewingTask.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default DayPanel;

// import React, { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { Task, EventsMap, makeId } from "./types";
// import styles from "./styles";
// import { Modal } from "../Dashboard/micro-ui/modal";
// import "../schedule/DayPanel.css";
// import CalendarCreateTask from "./CalendarCreateTask";
// // import { TaskMain } from "../../../redux/slices/scheduleTask";
// import { TaskMain } from "../../../redux/slices/CalenderTaskSlice";

// type Props = {
//   selectedDate: Dayjs | null;
//   isLoggedIn: boolean;
//   userEvents: EventsMap;
//   setUserEvents: (updater: (prev: EventsMap) => EventsMap) => void;
//   formState: {
//     formTitle: string;
//     formDescription: string;
//     formType: string;
//     formStartDate: string;
//     formEndDate: string | "";
//     formStartTime: string;
//     formEndTime: string;
//     // resetFormDefaults: (d?: Dayjs) => void;
//   };
//   formSetters: {
//     setFormTitle: (v: string) => void;
//     setFormDescription: (v: string) => void;
//     setFormType: (v: string) => void;
//     setFormStartDate: (v: string) => void;
//     setFormEndDate: (v: string) => void;
//     setFormStartTime: (v: string) => void;
//     setFormEndTime: (v: string) => void;
//     resetFormDefaults: (d?: Dayjs) => void;
//   };
//   onCreateTask: () => void;
//   viewingTask: Task | null;
//   setViewingTask: (t: Task | null) => void;
//   editingTask: Task | null;
//   setEditingTask: (t: Task | null) => void;
//   onEditSave: () => void;
//   onDeleteTask: (dateKey: string, id: string) => void;
//   onClearTasks: (dateKey: string) => void;
//   navigateToLogin: () => void;
// };

// const DayPanel: React.FC<Props> = ({
//   selectedDate,
//   isLoggedIn,
//   userEvents,
//   setUserEvents,
//   formState,
//   formSetters,
//   onCreateTask,
//   viewingTask,
//   setViewingTask,
//   editingTask,
//   setEditingTask,
//   onEditSave,
//   onDeleteTask,
//   onClearTasks,
//   navigateToLogin,
// }) => {
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState<TaskMain | null>(null);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState<{
//     dateKey: string;
//     id: string;
//   } | null>(null);

//   if (!selectedDate)
//     return (
//       <div
//         style={{ ...styles.sidePanel, gridColumn: "2/3" }}
//         className="dayPanel-container"
//       >
//         <p style={styles.noSelection} className="dayPanel-noSelection">
//           No day selected.
//         </p>
//       </div>
//     );

//   const dateKey = selectedDate.format("YYYY-MM-DD");
//   const tasks = userEvents[dateKey] ?? [];

//   // Convert Task to TaskMain for editing
//   const convertTaskToTaskMain = (task: Task): TaskMain => {
//     return {
//       id: task.id,
//       title: task.title,
//       description: task.description || "",
//       status: "event",
//       priority: "low",
//       category: task.type || "",
//       projectId: "",
//       boardColumn: "",
//       sprintId: "",
//       parentTaskId: "",
//       subtasks: [],
//       dependencies: [],
//       dependents: [],
//       tags: [],
//       checklist: [],
//       assignee: {} as any,
//       collaborators: [],
//       reporter: {} as any,
//       comments: [],
//       attachments: [],
//       estimatedHours: 0,
//       actualHours: 0,
//       startDate: task.startDate,
//       dueDate: task.endDate || "",
//       startTime: task.startTime || "",
//       endTime: task.endTime || "",
//       completedAt: "",
//       reminderAt: "",
//       recurring: false,
//       recurrencePattern: "custom",
//       customRecurrenceRule: "",
//       isPrivate: false,
//       isBlocked: false,
//       blockReason: "",
//       score: 0,
//       feedback: "",
//       linkedResources: [],
//       auditTrail: [],
//       createdBy: {
//         id: "",
//         name: "",
//         email: "",
//       },
//       dateCreated: task.createdAt,
//       dateModified: "",
//       dateDeleted: "",
//     };
//   };

//   // Handle task creation
//   const handleTaskCreated = (newTask: TaskMain) => {
//     // Validate that startDate exists
//     if (!newTask.startDate) {
//       console.error("Task must have a start date");
//       return;
//     }

//     const dateKey: string = newTask.startDate; // Type assertion

//     const taskForCalendar: Task = {
//       id: newTask.id,
//       title: newTask.title,
//       description: newTask.description,
//       type: newTask.category || "General",
//       startDate: dateKey,
//       endDate: newTask.dueDate || undefined,
//       startTime: newTask.startTime || undefined,
//       endTime: newTask.endTime || undefined,
//       createdAt: newTask.dateCreated,
//     };

//     // Add task to the calendar
//     setUserEvents((prev) => {
//       return {
//         ...prev,
//         [dateKey]: [...(prev[dateKey] || []), taskForCalendar],
//       };
//     });

//     setCreateModalOpen(false);
//   };

//   // Handle task update
//   const handleTaskUpdated = (updatedTask: TaskMain) => {
//     // Validate that startDate exists
//     if (!updatedTask.startDate) {
//       console.error("Task must have a start date");
//       return;
//     }

//     const dateKey: string = updatedTask.startDate; // Type assertion

//     const taskForCalendar: Task = {
//       id: updatedTask.id,
//       title: updatedTask.title,
//       description: updatedTask.description,
//       type: updatedTask.category || "General",
//       startDate: dateKey,
//       endDate: updatedTask.dueDate || undefined,
//       startTime: updatedTask.startTime || undefined,
//       endTime: updatedTask.endTime || undefined,
//       createdAt: updatedTask.dateCreated,
//     };

//     // Update task in the calendar
//     setUserEvents((prev) => {
//       const newEvents = { ...prev };

//       // Remove from old date if it changed
//       Object.keys(newEvents).forEach((key) => {
//         newEvents[key] = newEvents[key].filter((t) => t.id !== updatedTask.id);
//         if (newEvents[key].length === 0) {
//           delete newEvents[key];
//         }
//       });

//       // Add to new date
//       newEvents[dateKey] = [...(newEvents[dateKey] || []), taskForCalendar];

//       return newEvents;
//     });

//     setEditModalOpen(false);
//     setTaskToEdit(null);
//   };

//   // Handle edit click
//   const handleEditClick = (task: Task) => {
//     const taskMain = convertTaskToTaskMain(task);
//     setTaskToEdit(taskMain);
//     setEditModalOpen(true);
//   };

//   // Handle view click
//   const handleViewClick = (task: Task) => {
//     setViewingTask(task);
//     setViewModalOpen(true);
//   };

//   // Handle delete click
//   const handleDeleteClick = (dateKey: string, id: string) => {
//     setTaskToDelete({ dateKey, id });
//     setDeleteConfirmOpen(true);
//   };

//   // Confirm deletion
//   const confirmDelete = () => {
//     if (taskToDelete) {
//       onDeleteTask(taskToDelete.dateKey, taskToDelete.id);
//       setDeleteConfirmOpen(false);
//       setTaskToDelete(null);
//     }
//   };

//   // Handle close view modal
//   const handleCloseViewModal = () => {
//     setViewingTask(null);
//     setViewModalOpen(false);
//   };

//   return (
//     <div
//       style={styles.sidePanel}
//       className="dayPanel-container style={{ backgroundColor: '#fee2e1' }}"
//     >
//       <h4 style={{ color: "red" }} className="dayPanel-header">
//         My Tasks & Events for {dateKey}
//       </h4>

//       {!isLoggedIn ? (
//         <div style={styles.eventBox} className="dayPanel-eventBox">
//           <p style={{ color: "#000000" }}>
//             Please
//             <button
//               style={styles.loginBtn}
//               className="dayPanel-loginBtn"
//               onClick={navigateToLogin}
//             >
//               log in
//             </button>
//             to see your tasks for {dateKey}.
//           </p>
//         </div>
//       ) : (
//         <>
//           {tasks.length === 0 ? (
//             <p style={{ color: "#000000" }}>
//               No tasks or events scheduled for this day.
//             </p>
//           ) : (
//             <>
//               <ul className="dayPanel-taskList">
//                 {tasks.map((task) => (
//                   <li key={task.id}>
//                     <div
//                       style={{ color: "#000000" }}
//                       className="dayPanel-taskTitle"
//                     >
//                       {task.title}
//                     </div>
//                     <div
//                       style={{ color: "#000000" }}
//                       className="dayPanel-taskItem"
//                     >
//                       <div className="dayPanel-taskMeta">
//                         {task.type ?? "General"} • {task.startDate}{" "}
//                         {task.endDate ? ` — ${task.endDate}` : ""}
//                       </div>
//                     </div>
//                     <div className="dayPanel-taskActions">
//                       <button
//                         onClick={() => handleViewClick(task)}
//                         style={styles.navButton}
//                         className="dayPanel-viewBtn"
//                       >
//                         View Task
//                       </button>
//                       <button
//                         onClick={() => handleEditClick(task)}
//                         style={styles.navButton}
//                         className="dayPanel-editBtn daypanel-editBtn "
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(dateKey, task.id)}
//                         style={styles.navButton}
//                         className="dayPanel-deleteBtn dayPanel-deleteBtn"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => onClearTasks(dateKey)}
//                         style={styles.navButton}
//                         className="dayPanel-clearAllBtn dayPanel-clearAllBtn"
//                       >
//                         Clear all
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div>
//                 {/* <div className="dayPanel-clearAllContainer">
//                   <button
//                     onClick={() => onClearTasks(dateKey)}
//                     style={styles.navButton}
//                     className="dayPanel-clearAllBtn"
//                   >
//                     Clear all
//                   </button>
//                 </div> */}
//               </div>
//             </>
//           )}

//           {/* Create form */}
//           <div style={{ color: "#000000" }} className="dayPanel-createSection">
//             <button
//               className="dayPanel-createBtn"
//               onClick={() => setCreateModalOpen(true)}
//             >
//               Create a new task / event
//             </button>

//             <Modal
//               isOpen={createModalOpen}
//               onClose={() => setCreateModalOpen(false)}
//               title=""
//               description=""
//             >
//               <CalendarCreateTask
//                 onBack={() => setCreateModalOpen(false)}
//                 onTaskCreated={handleTaskCreated}
//                 mode="add"
//               />
//             </Modal>

//             {/* Edit Modal */}
//             <Modal
//               isOpen={editModalOpen}
//               onClose={() => {
//                 setEditModalOpen(false);
//                 setTaskToEdit(null);
//               }}
//               title=""
//               description=""
//             >
//               {taskToEdit && (
//                 <CalendarCreateTask
//                   onBack={() => {
//                     setEditModalOpen(false);
//                     setTaskToEdit(null);
//                   }}
//                   onTaskUpdated={handleTaskUpdated}
//                   initialData={taskToEdit}
//                   mode="edit"
//                 />
//               )}
//             </Modal>
//           </div>

//           {/* Delete Confirmation Modal */}
//           <Modal
//             isOpen={deleteConfirmOpen}
//             onClose={() => {
//               setDeleteConfirmOpen(false);
//               setTaskToDelete(null);
//             }}
//             title="Confirm Deletion"
//             description="Are you sure you want to delete this task? This action cannot be undone."
//           >
//             <div
//               style={{
//                 display: "flex",
//                 gap: "12px",
//                 justifyContent: "flex-end",
//                 marginTop: "20px",
//                 color: "#000000",
//               }}
//             >
//               <button
//                 onClick={() => {
//                   setDeleteConfirmOpen(false);
//                   setTaskToDelete(null);
//                 }}
//                 style={{
//                   ...styles.navButton,
//                   backgroundColor: "#6b7280",
//                 }}
//                 className="dayPanel-cancelBtn"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 style={{
//                   ...styles.navButton,
//                   backgroundColor: "#ef4444",
//                 }}
//                 className="dayPanel-confirmDeleteBtn"
//               >
//                 Delete
//               </button>
//             </div>
//           </Modal>

//           {/* Viewing panel */}
//           {viewingTask && (
//             <Modal
//               isOpen={viewModalOpen}
//               onClose={handleCloseViewModal}
//               title=""
//               description=""
//             >
//               <div className="dayPanel-viewingPanel">
//                 <h5
//                   className="dayPanel-viewingTitle"
//                   style={{ color: "#000000" }}
//                 >
//                   Title: {viewingTask.title}
//                 </h5>
//                 <div className="dayPanel-viewingMeta">
//                   {viewingTask.type ?? "General"} • Created{" "}
//                   {dayjs(viewingTask.createdAt).format("YYYY-MM-DD")}
//                 </div>
//                 <p
//                   className="dayPanel-viewingDescription"
//                   style={{ color: "#000000" }}
//                 >
//                   Description: {viewingTask.description}
//                 </p>
//                 <div className="dayPanel-viewingDate">
//                   Start date: {viewingTask.startDate}
//                   {viewingTask.endDate ? ` — ${viewingTask.endDate}` : ""}
//                 </div>
//                 <div className="dayPanel-viewingDate">
//                   Start time: {viewingTask.startTime || "Not set"}
//                   {viewingTask.endTime
//                     ? ` — End time: ${viewingTask.endTime}`
//                     : ""}
//                 </div>
//                 {/* <div className="dayPanel-viewingActions">
//                   <button
//                     onClick={handleCloseViewModal}
//                     style={styles.navButton}
//                   >
//                     Close
//                   </button>
//                 </div> */}
//               </div>
//             </Modal>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DayPanel;
