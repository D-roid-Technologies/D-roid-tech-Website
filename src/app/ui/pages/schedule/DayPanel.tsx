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
      status: "pending",
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

  return (
    <div style={styles.sidePanel} className="dayPanel-container">
      <h4 className="dayPanel-header">Tasks & Events for {dateKey}</h4>

      {!isLoggedIn ? (
        <div style={styles.eventBox} className="dayPanel-eventBox">
          <p>
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
            <p>No tasks or events scheduled for this day.</p>
          ) : (
            <>
              <ul className="dayPanel-taskList">
                {tasks.map((task) => (
                  <li key={task.id} className="dayPanel-taskItem">
                    <div>
                      <div className="dayPanel-taskTitle">{task.title}</div>
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
                        onClick={() => onDeleteTask(dateKey, task.id)}
                        style={styles.navButton}
                        className="dayPanel-deleteBtn"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="dayPanel-clearAllContainer">
                <button
                  onClick={() => onClearTasks(dateKey)}
                  style={styles.navButton}
                  className="dayPanel-clearAllBtn"
                >
                  Clear all
                </button>
              </div>
            </>
          )}

          {/* Create form */}
          <div className="dayPanel-createSection">
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

// "use client";
// import React, { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { Task, EventsMap, makeId } from "./types";
// import styles from "./styles";
// import { Modal } from "../Dashboard/micro-ui/modal";
// import "../schedule/DayPanel.css";
// import CalendarCreateTask from "./CalendarCreateTask";
// import { TaskMain } from "../../../redux/slices/scheduleTask";

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
//   };
//   formSetters: {
//     setFormTitle: (v: string) => void;
//     setFormDescription: (v: string) => void;
//     setFormType: (v: string) => void;
//     setFormStartDate: (v: string) => void;
//     setFormEndDate: (v: string) => void;
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
//       status: "pending",
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

//     const taskForCalendar: Task = {
//       id: newTask.id,
//       title: newTask.title,
//       description: newTask.description,
//       type: newTask.category || "General",
//       startDate: newTask.startDate,
//       endDate: newTask.dueDate || undefined,
//       createdAt: newTask.dateCreated,
//     };

//     // Add task to the calendar
//     setUserEvents((prev) => {
//       const dateKey = newTask.startDate;
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

//     const taskForCalendar: Task = {
//       id: updatedTask.id,
//       title: updatedTask.title,
//       description: updatedTask.description,
//       type: updatedTask.category || "General",
//       startDate: updatedTask.startDate,
//       endDate: updatedTask.dueDate || undefined,
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
//       const dateKey = updatedTask.startDate;
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

//   return (
//     <div style={styles.sidePanel} className="dayPanel-container">
//       <h4 className="dayPanel-header">Tasks & Events for {dateKey}</h4>

//       {!isLoggedIn ? (
//         <div style={styles.eventBox} className="dayPanel-eventBox">
//           <p>
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
//             <p>No tasks or events scheduled for this day.</p>
//           ) : (
//             <>
//               <ul className="dayPanel-taskList">
//                 {tasks.map((task) => (
//                   <li key={task.id} className="dayPanel-taskItem">
//                     <div>
//                       <div className="dayPanel-taskTitle">{task.title}</div>
//                       <div className="dayPanel-taskMeta">
//                         {task.type ?? "General"} • {task.startDate}{" "}
//                         {task.endDate ? ` — ${task.endDate}` : ""}
//                       </div>
//                     </div>
//                     <div className="dayPanel-taskActions">
//                       <button
//                         onClick={() => setViewingTask(task)}
//                         style={styles.navButton}
//                         className="dayPanel-viewBtn"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => handleEditClick(task)}
//                         style={styles.navButton}
//                         className="dayPanel-editBtn"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => onDeleteTask(dateKey, task.id)}
//                         style={styles.navButton}
//                         className="dayPanel-deleteBtn"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div className="dayPanel-clearAllContainer">
//                 <button
//                   onClick={() => onClearTasks(dateKey)}
//                   style={styles.navButton}
//                   className="dayPanel-clearAllBtn"
//                 >
//                   Clear all
//                 </button>
//               </div>
//             </>
//           )}

//           {/* Create form */}
//           <div className="dayPanel-createSection">
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

//           {/* Viewing panel */}
//           {viewingTask && (
//             <div className="dayPanel-viewingPanel">
//               <h5 className="dayPanel-viewingTitle">{viewingTask.title}</h5>
//               <div className="dayPanel-viewingMeta">
//                 {viewingTask.type ?? "General"} • Created{" "}
//                 {dayjs(viewingTask.createdAt).format("YYYY-MM-DD")}
//               </div>
//               <p className="dayPanel-viewingDescription">
//                 {viewingTask.description}
//               </p>
//               <div className="dayPanel-viewingDate">
//                 {viewingTask.startDate}
//                 {viewingTask.endDate ? ` — ${viewingTask.endDate}` : ""}
//               </div>
//               <div className="dayPanel-viewingActions">
//                 <button
//                   onClick={() => setViewingTask(null)}
//                   style={styles.navButton}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DayPanel;

// // DayPanel.tsx
// import React, { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { Task, EventsMap, makeId } from "./types";
// import styles from "./styles";
// import { Modal } from "../Dashboard/micro-ui/modal";
// import "../schedule/DayPanel.css";
// import CalendarCreateTask from "./CalendarCreateTask";
// import { TaskMain } from "../../../redux/slices/scheduleTask";

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
//   };
//   formSetters: {
//     setFormTitle: (v: string) => void;
//     setFormDescription: (v: string) => void;
//     setFormType: (v: string) => void;
//     setFormStartDate: (v: string) => void;
//     setFormEndDate: (v: string) => void;
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
//       description: task.description,
//       status: "pending",
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
//     const taskForCalendar: Task = {
//       id: newTask.id,
//       title: newTask.title,
//       description: newTask.description,
//       type: newTask.category || "General",
//       startDate: newTask.startDate,
//       endDate: newTask.dueDate || undefined,
//       createdAt: newTask.dateCreated,
//     };

//     // Add task to the calendar
//     setUserEvents((prev) => {
//       const dateKey = newTask.startDate;
//       return {
//         ...prev,
//         [dateKey]: [...(prev[dateKey] || []), taskForCalendar],
//       };
//     });

//     setCreateModalOpen(false);
//   };

//   // Handle task update
//   const handleTaskUpdated = (updatedTask: TaskMain) => {
//     const taskForCalendar: Task = {
//       id: updatedTask.id,
//       title: updatedTask.title,
//       description: updatedTask.description,
//       type: updatedTask.category || "General",
//       startDate: updatedTask.startDate,
//       endDate: updatedTask.dueDate || undefined,
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
//       const dateKey = updatedTask.startDate;
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

//   return (
//     <div style={styles.sidePanel} className="dayPanel-container">
//       <h4 className="dayPanel-header">Tasks & Events for {dateKey}</h4>

//       {!isLoggedIn ? (
//         <div style={styles.eventBox} className="dayPanel-eventBox">
//           <p>
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
//             <p>No tasks or events scheduled for this day.</p>
//           ) : (
//             <>
//               <ul className="dayPanel-taskList">
//                 {tasks.map((task) => (
//                   <li key={task.id} className="dayPanel-taskItem">
//                     <div>
//                       <div className="dayPanel-taskTitle">{task.title}</div>
//                       <div className="dayPanel-taskMeta">
//                         {task.type ?? "General"} • {task.startDate}{" "}
//                         {task.endDate ? ` — ${task.endDate}` : ""}
//                       </div>
//                     </div>
//                     <div className="dayPanel-taskActions">
//                       <button
//                         onClick={() => setViewingTask(task)}
//                         style={styles.navButton}
//                         className="dayPanel-viewBtn"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => handleEditClick(task)}
//                         style={styles.navButton}
//                         className="dayPanel-editBtn"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => onDeleteTask(dateKey, task.id)}
//                         style={styles.navButton}
//                         className="dayPanel-deleteBtn"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div className="dayPanel-clearAllContainer">
//                 <button
//                   onClick={() => onClearTasks(dateKey)}
//                   style={styles.navButton}
//                   className="dayPanel-clearAllBtn"
//                 >
//                   Clear all
//                 </button>
//               </div>
//             </>
//           )}

//           {/* Create form */}
//           <div className="dayPanel-createSection">
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

//           {/* Viewing panel */}
//           {viewingTask && (
//             <div className="dayPanel-viewingPanel">
//               <h5 className="dayPanel-viewingTitle">{viewingTask.title}</h5>
//               <div className="dayPanel-viewingMeta">
//                 {viewingTask.type ?? "General"} • Created{" "}
//                 {dayjs(viewingTask.createdAt).format("YYYY-MM-DD")}
//               </div>
//               <p className="dayPanel-viewingDescription">
//                 {viewingTask.description}
//               </p>
//               <div className="dayPanel-viewingDate">
//                 {viewingTask.startDate}
//                 {viewingTask.endDate ? ` — ${viewingTask.endDate}` : ""}
//               </div>
//               <div className="dayPanel-viewingActions">
//                 <button
//                   onClick={() => setViewingTask(null)}
//                   style={styles.navButton}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DayPanel;

// // DayPanel.tsx
// import React, { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { Task, EventsMap, makeId } from "./types";
// import styles from "./styles";
// import { Modal } from "../Dashboard/micro-ui/modal";
// import "../schedule/DayPanel.css";
// import CreateTasks from "./CreateTasks";
// import CalendarCreateTask from "./CalendarCreateTask";

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
//   };
//   formSetters: {
//     setFormTitle: (v: string) => void;
//     setFormDescription: (v: string) => void;
//     setFormType: (v: string) => void;
//     setFormStartDate: (v: string) => void;
//     setFormEndDate: (v: string) => void;
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
//   const [notificationModalOpen, setNotificationModalOpen] = useState(false);
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

//   return (
//     <div style={styles.sidePanel} className="dayPanel-container">
//       <h4 className="dayPanel-header">Tasks & Events for {dateKey}</h4>

//       {!isLoggedIn ? (
//         <div style={styles.eventBox} className="dayPanel-eventBox">
//           <p>
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
//             <p>No tasks or events scheduled for this day.</p>
//           ) : (
//             <>
//               <ul className="dayPanel-taskList">
//                 {tasks.map((task) => (
//                   <li key={task.id} className="dayPanel-taskItem">
//                     <div>
//                       <div className="dayPanel-taskTitle">{task.title}</div>
//                       <div className="dayPanel-taskMeta">
//                         {task.type ?? "General"} • {task.startDate}{" "}
//                         {task.endDate ? ` — ${task.endDate}` : ""}
//                       </div>
//                     </div>
//                     <div className="dayPanel-taskActions">
//                       <button
//                         onClick={() => setViewingTask(task)}
//                         style={styles.navButton}
//                         className="dayPanel-viewBtn"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => setEditingTask(task)}
//                         style={styles.navButton}
//                         className="dayPanel-editBtn"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => onDeleteTask(dateKey, task.id)}
//                         style={styles.navButton}
//                         className="dayPanel-deleteBtn"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div className="dayPanel-clearAllContainer">
//                 <button
//                   onClick={() => onClearTasks(dateKey)}
//                   style={styles.navButton}
//                   className="dayPanel-clearAllBtn"
//                 >
//                   Clear all
//                 </button>
//               </div>
//             </>
//           )}

//           {/* Create form */}
//           <div className="dayPanel-createSection">
//             <button
//               className="dayPanel-createBtn"
//               onClick={() => setNotificationModalOpen(true)}
//             >
//               Create a new task / event
//             </button>

//             <Modal
//               isOpen={notificationModalOpen}
//               onClose={() => setNotificationModalOpen(false)}
//               title=""
//               description=""
//             >
//               <CalendarCreateTask
//                 onBack={function (): void {
//                   throw new Error("Function not implemented.");
//                 }}
//               />
//             </Modal>
//           </div>

//           {/* Viewing panel */}
//           {viewingTask && (
//             <div className="dayPanel-viewingPanel">
//               <h5 className="dayPanel-viewingTitle">{viewingTask.title}</h5>
//               <div className="dayPanel-viewingMeta">
//                 {viewingTask.type ?? "General"} • Created{" "}
//                 {dayjs(viewingTask.createdAt).format("YYYY-MM-DD")}
//               </div>
//               <p className="dayPanel-viewingDescription">
//                 {viewingTask.description}
//               </p>
//               <div className="dayPanel-viewingDate">
//                 {viewingTask.startDate}
//                 {viewingTask.endDate ? ` — ${viewingTask.endDate}` : ""}
//               </div>
//               <div className="dayPanel-viewingActions">
//                 <button
//                   onClick={() => setViewingTask(null)}
//                   style={styles.navButton}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Editing panel */}
//           {editingTask && (
//             <div className="dayPanel-editingPanel">
//               <h5 className="dayPanel-editingTitle">Edit task</h5>
//               <div className="dayPanel-editingForm">
//                 <input
//                   value={editingTask.title}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, title: e.target.value })
//                   }
//                   className="dayPanel-input"
//                 />
//                 <textarea
//                   value={editingTask.description}
//                   onChange={(e) =>
//                     setEditingTask({
//                       ...editingTask,
//                       description: e.target.value,
//                     })
//                   }
//                   rows={2}
//                   className="dayPanel-textarea"
//                 />
//                 <input
//                   value={editingTask.type ?? ""}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, type: e.target.value })
//                   }
//                   className="dayPanel-input"
//                 />
//                 <div className="dayPanel-dateRow">
//                   <div className="dayPanel-dateField">
//                     <label className="dayPanel-dateLabel">Start date</label>
//                     <input
//                       type="date"
//                       value={editingTask.startDate}
//                       onChange={(e) =>
//                         setEditingTask({
//                           ...editingTask,
//                           startDate: e.target.value,
//                         })
//                       }
//                       className="dayPanel-dateInput"
//                     />
//                   </div>
//                   <div className="dayPanel-dateField">
//                     <label className="dayPanel-dateLabel">
//                       End date (optional)
//                     </label>
//                     <input
//                       type="date"
//                       value={editingTask.endDate ?? ""}
//                       onChange={(e) =>
//                         setEditingTask({
//                           ...editingTask,
//                           endDate: e.target.value || undefined,
//                         })
//                       }
//                       className="dayPanel-dateInput"
//                     />
//                   </div>
//                 </div>

//                 <div className="dayPanel-editingActions">
//                   <button
//                     onClick={() => setEditingTask(null)}
//                     style={styles.navButton}
//                     className="dayPanel-cancelBtn"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={onEditSave}
//                     style={styles.navButton}
//                     className="dayPanel-saveBtn"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DayPanel;

// // DayPanel.tsx
// import React, { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { Task, EventsMap, makeId } from "./types";
// import styles from "./styles";
// import { Modal } from "../Dashboard/micro-ui/modal";

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
//   };
//   formSetters: {
//     setFormTitle: (v: string) => void;
//     setFormDescription: (v: string) => void;
//     setFormType: (v: string) => void;
//     setFormStartDate: (v: string) => void;
//     setFormEndDate: (v: string) => void;
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
//   const [notificationModalOpen, setNotificationModalOpen] = useState(false);
//   if (!selectedDate)
//     return (
//       <div style={{ ...styles.sidePanel, gridColumn: "2/3" }}>
//         <p style={styles.noSelection}>No day selected.</p>
//       </div>
//     );

//   const dateKey = selectedDate.format("YYYY-MM-DD");
//   const tasks = userEvents[dateKey] ?? [];

//   return (
//     <div style={styles.sidePanel}>
//       <h4 style={{ marginTop: 0 }}>Tasks & Events for {dateKey}</h4>

//       {!isLoggedIn ? (
//         <div style={styles.eventBox}>
//           <p>
//             Please
//             <button style={styles.loginBtn} onClick={navigateToLogin}>
//               log in
//             </button>
//             to see your tasks for {dateKey}.
//           </p>
//         </div>
//       ) : (
//         <>
//           {tasks.length === 0 ? (
//             <p>No tasks or events scheduled for this day.</p>
//           ) : (
//             <>
//               <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//                 {tasks.map((task) => (
//                   <li
//                     key={task.id}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       padding: "0.45rem 0",
//                       borderBottom: "1px solid #eef2f7",
//                     }}
//                   >
//                     <div>
//                       <div style={{ fontWeight: 600 }}>{task.title}</div>
//                       <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
//                         {task.type ?? "General"} • {task.startDate}{" "}
//                         {task.endDate ? ` — ${task.endDate}` : ""}
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", gap: 8 }}>
//                       <button
//                         onClick={() => setViewingTask(task)}
//                         style={{
//                           ...styles.navButton,
//                           backgroundColor: "#e2e8f0",
//                         }}
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => setEditingTask(task)}
//                         style={{
//                           ...styles.navButton,
//                           backgroundColor: "#3b82f6",
//                           color: "#fff",
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => onDeleteTask(dateKey, task.id)}
//                         style={{
//                           ...styles.navButton,
//                           backgroundColor: "#ef4444",
//                           color: "#fff",
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div style={{ marginTop: 8, textAlign: "right" }}>
//                 <button
//                   onClick={() => onClearTasks(dateKey)}
//                   style={{
//                     ...styles.navButton,
//                     backgroundColor: "#ef4444",
//                     color: "#fff",
//                   }}
//                 >
//                   Clear all
//                 </button>
//               </div>
//             </>
//           )}

//           {/* Create form */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: 12,
//               borderTop: "1px dashed #e6eef6",
//               paddingTop: 12,
//             }}
//           >
//             <button style={{ margin: 0, padding: "12px" }}>
//               Create a new task / event
//             </button>
//             {/* <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
//                             <input placeholder="Title" value={formState.formTitle} onChange={(e) => formSetters.setFormTitle(e.target.value)} style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #e2e8f0" }} />
//                             <textarea placeholder="Description (optional)" value={formState.formDescription} onChange={(e) => formSetters.setFormDescription(e.target.value)} rows={2} style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #e2e8f0", resize: "vertical" }} />
//                             <input placeholder="Type (e.g., Work, Health, Personal)" value={formState.formType} onChange={(e) => formSetters.setFormType(e.target.value)} style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #e2e8f0" }} />
//                             <div style={{ display: "flex", gap: 8 }}>
//                                 <div style={{ flex: 1 }}>
//                                     <label style={{ display: "block", fontSize: 12, color: "#64748b" }}>Start date</label>
//                                     <input type="date" value={formState.formStartDate} onChange={(e) => formSetters.setFormStartDate(e.target.value)} style={{ width: "100%", padding: "0.45rem", borderRadius: 6, border: "1px solid #e2e8f0" }} />
//                                 </div>
//                                 <div style={{ flex: 1 }}>
//                                     <label style={{ display: "block", fontSize: 12, color: "#64748b" }}>End date (optional)</label>
//                                     <input type="date" value={formState.formEndDate} onChange={(e) => formSetters.setFormEndDate(e.target.value)} style={{ width: "100%", padding: "0.45rem", borderRadius: 6, border: "1px solid #e2e8f0" }} />
//                                 </div>
//                             </div>
//                             <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
//                                 <button onClick={() => formSetters.resetFormDefaults()} style={{ ...styles.navButton }}>Reset</button>
//                                 <button onClick={onCreateTask} style={{ ...styles.navButton, backgroundColor: "#10b981", color: "#fff" }}>Create</button>
//                             </div>
//                         </div> */}

//             <Modal
//               isOpen={notificationModalOpen}
//               onClose={() => setNotificationModalOpen(false)}
//               title=""
//               description=""
//             >
//               <button
//                 className="shp-view-all-notifications"
//                 // onClick={() => handleViewAllNotification()}
//               >
//                 View All Notifications
//               </button>
//             </Modal>
//           </div>

//           {/* Viewing panel */}
//           {viewingTask && (
//             <div
//               style={{
//                 marginTop: 12,
//                 padding: 12,
//                 borderRadius: 8,
//                 background: "#fffaf0",
//                 border: "1px solid #f5e1a8",
//               }}
//             >
//               <h5 style={{ margin: 0 }}>{viewingTask.title}</h5>
//               <div style={{ color: "#64748b", fontSize: 13 }}>
//                 {viewingTask.type ?? "General"} • Created{" "}
//                 {dayjs(viewingTask.createdAt).format("YYYY-MM-DD")}
//               </div>
//               <p style={{ marginTop: 8 }}>{viewingTask.description}</p>
//               <div style={{ fontSize: 13, color: "#374151" }}>
//                 {viewingTask.startDate}
//                 {viewingTask.endDate ? ` — ${viewingTask.endDate}` : ""}
//               </div>
//               <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
//                 <button
//                   onClick={() => setViewingTask(null)}
//                   style={{ ...styles.navButton }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Editing panel */}
//           {editingTask && (
//             <div
//               style={{
//                 marginTop: 12,
//                 padding: 12,
//                 borderRadius: 8,
//                 background: "#f7faff",
//                 border: "1px solid #dcecff",
//               }}
//             >
//               <h5 style={{ margin: 0 }}>Edit task</h5>
//               <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
//                 <input
//                   value={editingTask.title}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, title: e.target.value })
//                   }
//                   style={{
//                     padding: "0.5rem",
//                     borderRadius: 6,
//                     border: "1px solid #e2e8f0",
//                   }}
//                 />
//                 <textarea
//                   value={editingTask.description}
//                   onChange={(e) =>
//                     setEditingTask({
//                       ...editingTask,
//                       description: e.target.value,
//                     })
//                   }
//                   rows={2}
//                   style={{
//                     padding: "0.5rem",
//                     borderRadius: 6,
//                     border: "1px solid #e2e8f0",
//                     resize: "vertical",
//                   }}
//                 />
//                 <input
//                   value={editingTask.type ?? ""}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, type: e.target.value })
//                   }
//                   style={{
//                     padding: "0.5rem",
//                     borderRadius: 6,
//                     border: "1px solid #e2e8f0",
//                   }}
//                 />
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <div style={{ flex: 1 }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontSize: 12,
//                         color: "#64748b",
//                       }}
//                     >
//                       Start date
//                     </label>
//                     <input
//                       type="date"
//                       value={editingTask.startDate}
//                       onChange={(e) =>
//                         setEditingTask({
//                           ...editingTask,
//                           startDate: e.target.value,
//                         })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "0.45rem",
//                         borderRadius: 6,
//                         border: "1px solid #e2e8f0",
//                       }}
//                     />
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <label
//                       style={{
//                         display: "block",
//                         fontSize: 12,
//                         color: "#64748b",
//                       }}
//                     >
//                       End date (optional)
//                     </label>
//                     <input
//                       type="date"
//                       value={editingTask.endDate ?? ""}
//                       onChange={(e) =>
//                         setEditingTask({
//                           ...editingTask,
//                           endDate: e.target.value || undefined,
//                         })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "0.45rem",
//                         borderRadius: 6,
//                         border: "1px solid #e2e8f0",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     gap: 8,
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <button
//                     onClick={() => setEditingTask(null)}
//                     style={{ ...styles.navButton }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={onEditSave}
//                     style={{
//                       ...styles.navButton,
//                       backgroundColor: "#3b82f6",
//                       color: "#fff",
//                     }}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DayPanel;
