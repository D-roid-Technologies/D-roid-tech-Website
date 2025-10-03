import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { authService } from "../../../redux/configuration/auth.service";
import {
  addTask,
  deleteAllTasks,
  deleteThisTask,
  TaskMain,
} from "../../../redux/slices/scheduleTask";
import { RootState, store } from "../../../redux/Store";
import "./TasksList.css";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="18"
    height="18"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="18"
    height="18"
  >
    <path d="M3 6h18" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const statusOptions = [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
  "archived",
  "on_hold",
  "reopened",
];

const priorityOptions = ["low", "medium", "high", "urgent", "critical"];

const TasksList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.scheduleTask.tasks);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "">("");
  const [priorityFilter, setPriorityFilter] = useState<string | "">("");
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const [filteredTasks, setFilteredTasks] = useState<TaskMain[]>([]);
  const [editingTask, setEditingTask] = useState<TaskMain | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const result: TaskMain[] = tasks
      .map((t) => ({ ...t, id: String(t.id) }))
      .filter((task) => {
        const title = task.title || "";
        const description = task.description || "";

        const matchesSearch =
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter
          ? task.status === statusFilter
          : true;
        const matchesPriority = priorityFilter
          ? task.priority === priorityFilter
          : true;

        return matchesSearch && matchesStatus && matchesPriority;
      });

    setFilteredTasks(result);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const handleItemDelete = async (task: TaskMain) => {
    try {
      await authService.handleDeleteTask(task.id);
      toast.success("Task deleted successfully", {
        style: { background: "#10B981", color: "#fff" },
      });
    } catch (error: any) {
      toast.error(`Failed to delete task: ${error.message}`, {
        style: { background: "#EF4444", color: "#fff" },
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;

    try {
      const updatedTask = {
        ...editingTask,
        title: editTitle,
        description: editDescription,
      };
      await authService.handleUpdateTask(updatedTask);
      store.dispatch(deleteThisTask(editingTask.id));
      store.dispatch(addTask(updatedTask));

      setEditingTask(null);
      toast.success("Task updated successfully", {
        style: { background: "#10B981", color: "#fff" },
      });
    } catch (error: any) {
      toast.error(`Failed to update task: ${error.message}`, {
        style: { background: "#EF4444", color: "#fff" },
      });
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      store.dispatch(deleteAllTasks());
      toast.success("All tasks have been deleted", {
        style: { background: "#10B981", color: "#fff" },
      });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setPriorityFilter("");
  };

  return (
    <div className="tskls__container">
      <div className="tskls__header">
        <div className="tskls__header-content">
          <div className="tskls__title-section">
            <h1 className="tskls__title">Task Management</h1>
            <p className="tskls__subtitle">
              Manage and organize your tasks efficiently
            </p>
          </div>
          <div className="tskls__header-stats">
            <div className="tskls__stat-card">
              <span className="tskls__stat-label">Total Tasks</span>
              <span className="tskls__stat-value">{tasks.length}</span>
            </div>
            <div className="tskls__stat-card">
              <span className="tskls__stat-label">Filtered</span>
              <span className="tskls__stat-value">{filteredTasks.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tskls__filters-section">
        <div className="tskls__search-wrapper">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tskls__search-input"
          />
        </div>

        <div className="tskls__filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="tskls__select"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="tskls__select"
          >
            <option value="">All Priorities</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>

          <button onClick={handleResetFilters} className="tskls__btn-secondary">
            Reset Filters
          </button>

          <button onClick={handleDeleteAll} className="tskls__btn-danger">
            Delete All
          </button>
        </div>
      </div>

      <div className="tskls__grid">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`tskls__card ${
                hoveredTask === task.id ? "tskls__card--hovered" : ""
              }`}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              {editingTask?.id === task.id ? (
                <div className="tskls__edit-form">
                  <div className="tskls__form-group">
                    <label className="tskls__label">Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="tskls__input"
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="tskls__form-group">
                    <label className="tskls__label">Description</label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="tskls__textarea"
                      placeholder="Enter task description"
                      rows={4}
                    />
                  </div>
                  <div className="tskls__form-actions">
                    <button
                      onClick={handleSaveEdit}
                      className="tskls__btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="tskls__btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="tskls__card-header">
                    <h3 className="tskls__card-title">{task.title}</h3>
                    <div className="tskls__card-actions">
                      <button
                        onClick={() => {
                          setEditingTask(task);
                          setEditTitle(task.title);
                          setEditDescription(task.description);
                        }}
                        className="tskls__icon-btn tskls__icon-btn--edit"
                        title="Edit Task"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleItemDelete(task)}
                        className="tskls__icon-btn tskls__icon-btn--delete"
                        title="Delete Task"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>

                  <p className="tskls__card-description">
                    {task.description || "No description provided."}
                  </p>

                  <div className="tskls__card-meta">
                    <div className="tskls__meta-item">
                      <span className="tskls__meta-label">Created By:</span>
                      <span className="tskls__meta-value">
                        {task.createdBy?.name || "Unassigned"}
                      </span>
                    </div>
                    <div className="tskls__meta-item">
                      <span className="tskls__meta-label">Date:</span>
                      <span className="tskls__meta-value">
                        {task.dateCreated || "N/A"}
                      </span>
                    </div>
                  </div>

                  {(task.status || task.priority) && (
                    <div className="tskls__card-badges">
                      {task.status && (
                        <span
                          className={`tskls__badge tskls__badge--status-${task.status}`}
                        >
                          {task.status.replace("_", " ")}
                        </span>
                      )}
                      {task.priority && (
                        <span
                          className={`tskls__badge tskls__badge--priority-${task.priority}`}
                        >
                          {task.priority}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="tskls__empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              width="64"
              height="64"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3>No Tasks Found</h3>
            <p>Try adjusting your filters or create a new task</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;

// import { s } from "framer-motion/dist/types.d-DSjX-LJB";
// import React, { useState, useMemo, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { authService } from "../../../redux/configuration/auth.service";
// import {
//   addTask,
//   deleteAllTasks,
//   deleteThisTask,
//   TaskMain,
// } from "../../../redux/slices/scheduleTask";
// import { RootState, store } from "../../../redux/Store";

// // Icons (simple SVG inline for edit/delete)
// const EditIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={2}
//     viewBox="0 0 24 24"
//     width="20"
//     height="20"
//   >
//     <path d="M12 20h9" />
//     <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
//   </svg>
// );

// const DeleteIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={2}
//     viewBox="0 0 24 24"
//     width="20"
//     height="20"
//   >
//     <path d="M3 6h18" />
//     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//     <path d="M10 11v6" />
//     <path d="M14 11v6" />
//     <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
//   </svg>
// );

// const statusOptions = [
//   "pending",
//   "in_progress",
//   "completed",
//   "cancelled",
//   "archived",
//   "on_hold",
//   "reopened",
// ];

// const priorityOptions = ["low", "medium", "high", "urgent", "critical"];

// const statusColors: Record<string, React.CSSProperties> = {
//   pending: { backgroundColor: "#FEF3C7", color: "#92400E" },
//   in_progress: { backgroundColor: "#DBEAFE", color: "#1E40AF" },
//   completed: { backgroundColor: "#DCFCE7", color: "#166534" },
//   cancelled: { backgroundColor: "#FECACA", color: "#991B1B" },
//   archived: { backgroundColor: "#E5E7EB", color: "#374151" },
//   on_hold: { backgroundColor: "#E9D5FF", color: "#6B21A8" },
//   reopened: { backgroundColor: "#E0E7FF", color: "#4338CA" },
// };

// const priorityColors: Record<string, React.CSSProperties> = {
//   low: { backgroundColor: "#DCFCE7", color: "#166534" },
//   medium: { backgroundColor: "#FEF3C7", color: "#92400E" },
//   high: { backgroundColor: "#FFEDD5", color: "#C2410C" },
//   urgent: { backgroundColor: "#FCA5A5", color: "#7F1D1D" },
//   critical: { backgroundColor: "#B91C1C", color: "#fff" },
// };

// const formatDate = (dateStr?: string) => {
//   if (!dateStr) return "—";
//   try {
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }).format(new Date(dateStr));
//   } catch {
//     return dateStr;
//   }
// };

// const inputStyle: React.CSSProperties = {
//   flex: 1,
//   padding: "10px 14px",
//   borderRadius: 6,
//   border: "1.5px solid #CBD5E1",
//   outline: "none",
//   fontSize: 16,
//   transition: "box-shadow 0.2s ease",
// };

// const selectStyle: React.CSSProperties = {
//   padding: "10px 14px",
//   borderRadius: 6,
//   border: "1.5px solid #CBD5E1",
//   fontSize: 16,
//   outline: "none",
//   cursor: "pointer",
//   minWidth: 140,
// };

// const buttonStyle: React.CSSProperties = {
//   padding: "10px 18px",
//   backgroundColor: "#EF4444",
//   color: "white",
//   borderRadius: 6,
//   border: "none",
//   cursor: "pointer",
//   fontWeight: 600,
//   fontSize: 16,
//   transition: "background-color 0.3s ease",
// };

// const buttonHoverStyle: React.CSSProperties = {
//   backgroundColor: "#DC2626",
// };

// const cardStyle: React.CSSProperties = {
//   backgroundColor: "white",
//   borderRadius: 12,
//   boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
//   padding: 24,
//   display: "flex",
//   flexDirection: "column",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   cursor: "default",
//   userSelect: "none",
//   position: "relative",
// };

// const cardHoverStyle: React.CSSProperties = {
//   transform: "scale(1.04)",
//   boxShadow: "0 8px 16px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)",
//   cursor: "pointer",
// };

// const iconButtonStyle: React.CSSProperties = {
//   cursor: "pointer",
//   padding: 6,
//   borderRadius: 6,
//   transition: "background-color 0.2s ease",
//   color: "#6B7280",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const iconButtonHoverStyle: React.CSSProperties = {
//   backgroundColor: "blue",
//   color: "#ffffff ",
// };

// const iconDeleteButtonHoverStyle: React.CSSProperties = {
//   backgroundColor: "#DC2626",
//   color: "#ffffff",
// };

// // Before the long comment

// const TasksList: React.FC = () => {
//   const tasks = useSelector((state: RootState) => state.scheduleTask.tasks);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string | "">("");
//   const [priorityFilter, setPriorityFilter] = useState<string | "">("");
//   const [hoveredTask, setHoveredTask] = useState<string | null>(null);
//   const [hoveredEdit, setHoveredEdit] = useState<string | null>(null);
//   const [hoveredDelete, setHoveredDelete] = useState<string | null>(null);

//   const [filteredTasks, setFilteredTasks] = useState<TaskMain[]>([]);
//   const [editingTask, setEditingTask] = useState<TaskMain | null>(null); // 🔹 track task being edited
//   const [editTitle, setEditTitle] = useState("");
//   const [editDescription, setEditDescription] = useState("");

//   useEffect(() => {
//     const result: TaskMain[] = tasks
//       .map((t) => ({ ...t, id: String(t.id) }))
//       .filter((task) => {
//         const title = task.title || "";
//         const description = task.description || "";

//         const matchesSearch =
//           title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           description.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesStatus = statusFilter
//           ? task.status === statusFilter
//           : true;
//         const matchesPriority = priorityFilter
//           ? task.priority === priorityFilter
//           : true;

//         return matchesSearch && matchesStatus && matchesPriority;
//       });

//     setFilteredTasks(result);
//   }, [tasks, searchTerm, statusFilter, priorityFilter]);

//   const handleItemDelete = async (task: TaskMain) => {
//     try {
//       await authService.handleDeleteTask(task.id);
//       toast.success("Task deleted successfully 🗑️", {
//         style: { background: "green", color: "#fff" },
//       });
//     } catch (error: any) {
//       toast.error(`Failed to delete task: ${error.message}`, {
//         style: { background: "#ff4d4f", color: "#fff" },
//       });
//     }
//   };

//   // 🔹 Save edited task
//   const handleSaveEdit = async () => {
//     if (!editingTask) return;

//     try {
//       const updatedTask = {
//         ...editingTask,
//         title: editTitle,
//         description: editDescription,
//       };
//       await authService.handleUpdateTask(updatedTask); // implement handleUpdateTask similar to handleCreateTask
//       store.dispatch(deleteThisTask(editingTask.id)); // remove old
//       store.dispatch(addTask(updatedTask)); // add updated

//       setEditingTask(null);
//       toast.success("Task updated successfully ✏️", {
//         style: { background: "#4BB543", color: "#fff" },
//       });
//     } catch (error: any) {
//       toast.error(`Failed to update task: ${error.message}`, {
//         style: { background: "#ff4d4f", color: "#fff" },
//       });
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: 24,
//         maxHeight: "80vh",
//         overflowY: "auto",
//         backgroundColor: "#F9FAFB",
//         borderRadius: 12,
//       }}
//     >
//       {/* ...filters here... */}
//       <div
//         style={{
//           padding: 24,
//           maxHeight: "80vh",
//           overflowY: "auto",
//           backgroundColor: "#F9FAFB",
//           borderRadius: 12,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 24,
//           }}
//         >
//           <h2 style={{ fontSize: 28, fontWeight: "800", color: "#111827" }}>
//             All Tasks
//           </h2>
//           <button
//             onClick={() => {
//               store.dispatch(deleteAllTasks());
//               toast.success(`All Tasks have been deleted`, {
//                 style: { background: "#4BB543", color: "#fff" },
//               });
//             }}
//             style={{
//               backgroundColor: "transparent",
//               color: "#DC2626",
//               fontWeight: "600",
//               padding: "8px 16px",
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Delete All Tasks
//           </button>
//         </div>

//         {/* Filters */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 16,
//             marginBottom: 32,
//             alignItems: "center",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Search by title or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={inputStyle}
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             style={selectStyle}
//           >
//             <option value="">All Statuses</option>
//             {statusOptions.map((status) => (
//               <option key={status} value={status}>
//                 {status.replace("_", " ")}
//               </option>
//             ))}
//           </select>

//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             style={selectStyle}
//           >
//             <option value="">All Priorities</option>
//             {priorityOptions.map((priority) => (
//               <option key={priority} value={priority}>
//                 {priority.charAt(0).toUpperCase() + priority.slice(1)}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setStatusFilter("");
//               setPriorityFilter("");
//             }}
//             style={buttonStyle}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: 24,
//         }}
//       >
//         {filteredTasks.length ? (
//           filteredTasks.map((task) => (
//             <div
//               key={task.id}
//               style={{
//                 ...cardStyle,
//                 ...(hoveredTask === task.id ? cardHoverStyle : {}),
//               }}
//               onMouseEnter={() => setHoveredTask(task.id)}
//               onMouseLeave={() => setHoveredTask(null)}
//             >
//               {/* Edit/Delete icons */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 8,
//                   right: 12,
//                   display: "flex",
//                   gap: 8,
//                 }}
//               >
//                 <div
//                   style={{
//                     ...iconButtonStyle,
//                     ...(hoveredEdit === task.id ? iconButtonHoverStyle : {}),
//                   }}
//                   onMouseEnter={() => setHoveredEdit(task.id)}
//                   onMouseLeave={() => setHoveredEdit(null)}
//                   onClick={() => {
//                     setEditingTask(task); // 🔹 enable editing mode
//                     setEditTitle(task.title);
//                     setEditDescription(task.description);
//                   }}
//                   title="Edit Task"
//                 >
//                   <EditIcon />
//                 </div>

//                 <div
//                   style={{
//                     ...iconButtonStyle,
//                     ...(hoveredDelete === task.id
//                       ? iconDeleteButtonHoverStyle
//                       : {}),
//                   }}
//                   onMouseEnter={() => setHoveredDelete(task.id)}
//                   onMouseLeave={() => setHoveredDelete(null)}
//                   onClick={() => handleItemDelete(task)}
//                   title="Delete Task"
//                 >
//                   <DeleteIcon />
//                 </div>
//               </div>

//               {/* 🔹 Edit form */}
//               {editingTask?.id === task.id ? (
//                 <div>
//                   <input
//                     type="text"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                     style={{ ...inputStyle, marginBottom: 8 }}
//                   />
//                   <textarea
//                     value={editDescription}
//                     onChange={(e) => setEditDescription(e.target.value)}
//                     style={{ ...inputStyle, minHeight: 60 }}
//                   />
//                   <button
//                     onClick={handleSaveEdit}
//                     style={{ ...buttonStyle, marginTop: 8 }}
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingTask(null)}
//                     style={{
//                       ...buttonStyle,
//                       backgroundColor: "#6B7280",
//                       marginTop: 8,
//                       marginLeft: 8,
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <h3
//                     style={{
//                       fontSize: 20,
//                       fontWeight: 600,
//                       marginBottom: 12,
//                       color: "#DC2626",
//                     }}
//                   >
//                     {task.title}
//                   </h3>
//                   <p
//                     style={{
//                       color: "#4B5563",
//                       fontSize: 14,
//                       marginBottom: 16,
//                       flexGrow: 1,
//                     }}
//                   >
//                     {task.description}
//                   </p>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p
//             style={{
//               textAlign: "center",
//               color: "#6B7280",
//               gridColumn: "1 / -1",
//             }}
//           >
//             No tasks found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TasksList;

// // const TasksList: React.FC = () => {
// //   const tasks = useSelector((state: RootState) => state.scheduleTask.tasks);

// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState<string | "">("");
// //   const [priorityFilter, setPriorityFilter] = useState<string | "">("");
// //   const [hoveredTask, setHoveredTask] = useState<string | null>(null);
// //   const [hoveredEdit, setHoveredEdit] = useState<string | null>(null);
// //   const [hoveredDelete, setHoveredDelete] = useState<string | null>(null);

// //   const [filteredTasks, setFilteredTasks] = useState<TaskMain[]>([]);

// //   // 🔹 Keep filteredTasks updated whenever tasks or filters change
// //   useEffect(() => {
// //     const result: any = tasks
// //       .map((t) => ({
// //         ...t,
// //         id: String(t.id),
// //       }))
// //       .filter((task) => {
// //         const title = task.title || "";        // fallback to empty string
// //         const description = task.description || "";

// //         const matchesSearch =
// //           title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           description.toLowerCase().includes(searchTerm.toLowerCase());

// //         const matchesStatus = statusFilter ? task.status === statusFilter : true;
// //         const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;

// //         return matchesSearch && matchesStatus && matchesPriority;
// //       });

// //     setFilteredTasks(result);
// //   }, [tasks, searchTerm, statusFilter, priorityFilter]);

// //   const handleItemDelete = async (task: TaskMain) => {
// //     try {
// //       // Call the async Firestore delete function
// //       await authService.handleDeleteTask(task.id);

// //       // Redux already updated inside handleDeleteTask, just show toast
// //       toast.success("Task deleted successfully 🗑️", {
// //         style: { background: "green", color: "#fff" },
// //       });
// //     } catch (error: any) {
// //       toast.error(`Failed to delete task: ${error.message}`, {
// //         style: { background: "#ff4d4f", color: "#fff" },
// //       });
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: 24,
// //         maxHeight: "80vh",
// //         overflowY: "auto",
// //         backgroundColor: "#F9FAFB",
// //         borderRadius: 12,
// //       }}
// //     >
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           marginBottom: 24,
// //         }}
// //       >
// //         <h2 style={{ fontSize: 28, fontWeight: "800", color: "#111827" }}>
// //           All Tasks
// //         </h2>
// //         <button
// //           onClick={() => {
// //             store.dispatch(deleteAllTasks());
// //             toast.success(`All Tasks have been deleted`, {
// //               style: { background: "#4BB543", color: "#fff" },
// //             });
// //           }}
// //           style={{
// //             backgroundColor: "transparent",
// //             color: "#DC2626",
// //             fontWeight: "600",
// //             padding: "8px 16px",
// //             borderRadius: 8,
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Delete All Tasks
// //         </button>
// //       </div>

// //       {/* Filters */}
// //       <div
// //         style={{
// //           display: "flex",
// //           flexWrap: "wrap",
// //           gap: 16,
// //           marginBottom: 32,
// //           alignItems: "center",
// //         }}
// //       >
// //         <input
// //           type="text"
// //           placeholder="Search by title or description..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           style={inputStyle}
// //         />

// //         <select
// //           value={statusFilter}
// //           onChange={(e) => setStatusFilter(e.target.value)}
// //           style={selectStyle}
// //         >
// //           <option value="">All Statuses</option>
// //           {statusOptions.map((status) => (
// //             <option key={status} value={status}>
// //               {status.replace("_", " ")}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           value={priorityFilter}
// //           onChange={(e) => setPriorityFilter(e.target.value)}
// //           style={selectStyle}
// //         >
// //           <option value="">All Priorities</option>
// //           {priorityOptions.map((priority) => (
// //             <option key={priority} value={priority}>
// //               {priority.charAt(0).toUpperCase() + priority.slice(1)}
// //             </option>
// //           ))}
// //         </select>

// //         <button
// //           onClick={() => {
// //             setSearchTerm("");
// //             setStatusFilter("");
// //             setPriorityFilter("");
// //           }}
// //           style={buttonStyle}
// //         >
// //           Reset Filters
// //         </button>
// //       </div>

// //       {/* Tasks grid */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
// //           gap: 24,
// //         }}
// //       >
// //         {filteredTasks.length ? (
// //           filteredTasks.map((task) => (
// //             <div
// //               key={task.id}
// //               style={{
// //                 ...cardStyle,
// //                 ...(hoveredTask === task.id ? cardHoverStyle : {}),
// //               }}
// //               onMouseEnter={() => setHoveredTask(task.id)}
// //               onMouseLeave={() => setHoveredTask(null)}
// //               title={task.title}
// //             >
// //               {/* Edit/Delete icons container */}
// //               <div
// //                 style={{
// //                   position: "absolute",
// //                   top: 8,
// //                   right: 12,
// //                   display: "flex",
// //                   gap: 8,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     ...iconButtonStyle,
// //                     ...(hoveredEdit === task.id ? iconButtonHoverStyle : {}),
// //                   }}
// //                   onMouseEnter={() => setHoveredEdit(task.id)}
// //                   onMouseLeave={() => setHoveredEdit(null)}
// //                   onClick={() => alert(`Edit task ${task.id}`)}
// //                   title="Edit Task"
// //                 >
// //                   <EditIcon />
// //                 </div>
// //                 <div
// //                   style={{
// //                     ...iconButtonStyle,
// //                     ...(hoveredDelete === task.id ? iconDeleteButtonHoverStyle : {}),
// //                   }}
// //                   onMouseEnter={() => setHoveredDelete(task.id)}
// //                   onMouseLeave={() => setHoveredDelete(null)}
// //                   onClick={() => handleItemDelete(task)}
// //                   title="Delete Task"
// //                 >
// //                   <DeleteIcon />
// //                 </div>
// //               </div>

// //               <h3
// //                 style={{
// //                   fontSize: 20,
// //                   fontWeight: "600",
// //                   marginBottom: 12,
// //                   color: "#DC2626",
// //                   overflow: "hidden",
// //                   textOverflow: "ellipsis",
// //                   whiteSpace: "nowrap",
// //                 }}
// //               >
// //                 {task.title}
// //               </h3>

// //               <p
// //                 style={{
// //                   color: "#4B5563",
// //                   fontSize: 14,
// //                   marginBottom: 16,
// //                   flexGrow: 1,
// //                   overflow: "hidden",
// //                   display: "-webkit-box",
// //                   WebkitLineClamp: 3,
// //                   WebkitBoxOrient: "vertical",
// //                 }}
// //                 title={task.description || "No description provided."}
// //               >
// //                 {task.description || "No description provided."}
// //               </p>

// //               <div style={{ color: "#111827", fontSize: 14, lineHeight: 1.4 }}>
// //                 <p>
// //                   <strong>Created By:</strong>{" "}
// //                   {task.createdBy?.name || "Unassigned"}
// //                 </p>
// //                 <p>
// //                   <strong>Start Date:</strong> {task.dateCreated}
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p
// //             style={{
// //               textAlign: "center",
// //               color: "#6B7280",
// //               gridColumn: "1 / -1",
// //             }}
// //           >
// //             No tasks found.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };
