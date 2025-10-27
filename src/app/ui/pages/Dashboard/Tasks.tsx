import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store";
import {
  TaskStatus,
  updateTaskStatus,
  setPage,
} from "../../../redux/slices/tasksSlice";
import "./Tasks.css";

const statusLabels: Record<TaskStatus, string> = {
  not_started: "Not Started",
  ongoing: "Ongoing",
  completed: "Completed",
};

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, page } = useSelector((state: RootState) => state.tasks);

  const handleStatusChange = (id: number, newStatus: TaskStatus) => {
    dispatch(updateTaskStatus({ id, status: newStatus }));
  };

  const handlePageChange = (status: TaskStatus, newPage: number) => {
    dispatch(setPage({ status, page: newPage }));
  };

  const renderTasksByStatus = (status: TaskStatus) => {
    const filtered = tasks.filter((task) => task.status === status);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const currentPage = page[status];

    const paginated = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <section className="tm-status-section">
        <h2 className="tm-status-heading">{statusLabels[status]}</h2>
        <div className="tm-tasks-grid">
          {paginated.length === 0 ? (
            <p className="tm-empty-message">No tasks.</p>
          ) : (
            paginated.map((task) => (
              <article
                key={task.id}
                className={`tm-task-card tm-task-card--${status}`}
              >
                <h3 className="tm-task-title">{task.title}</h3>
                <p className="tm-task-description">{task.description}</p>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task.id, e.target.value as TaskStatus)
                  }
                  className="tm-status-select"
                >
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </article>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <nav className="tm-pagination">
            <button
              onClick={() =>
                handlePageChange(status, Math.max(1, currentPage - 1))
              }
              disabled={currentPage === 1}
              className="tm-pagination-btn"
            >
              Previous
            </button>
            <span className="tm-pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                handlePageChange(status, Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="tm-pagination-btn"
            >
              Next
            </button>
          </nav>
        )}
      </section>
    );
  };

  return (
    <main className="tm-container">
      {renderTasksByStatus("not_started")}
      {renderTasksByStatus("ongoing")}
      {renderTasksByStatus("completed")}
    </main>
  );
};

export default Tasks;

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../../redux/Store";
// import {
//   TaskStatus,
//   updateTaskStatus,
//   setPage,
// } from "../../../redux/slices/tasksSlice";

// const statusLabels: Record<TaskStatus, string> = {
//   not_started: "Not Started",
//   ongoing: "Ongoing",
//   completed: "Completed",
// };

// const statusColors: Record<TaskStatus, string> = {
//   not_started: "#F3F4F6", // Gray
//   ongoing: "#DBEAFE", // Blue
//   completed: "#D1FAE5", // Green
// };

// const Tasks: React.FC = () => {
//   const dispatch = useDispatch();
//   const { tasks, page } = useSelector((state: RootState) => state.tasks);

//   const handleStatusChange = (id: number, newStatus: TaskStatus) => {
//     dispatch(updateTaskStatus({ id, status: newStatus }));
//   };

//   const handlePageChange = (status: TaskStatus, newPage: number) => {
//     dispatch(setPage({ status, page: newPage }));
//   };

//   const renderTasksByStatus = (status: TaskStatus) => {
//     const filtered = tasks.filter((task) => task.status === status);
//     const itemsPerPage = 10;
//     const totalPages = Math.ceil(filtered.length / itemsPerPage);
//     const currentPage = page[status];

//     const paginated = filtered.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );

//     return (
//       <div style={{ marginBottom: "32px" }}>
//         <h2
//           style={{
//             fontSize: "20px",
//             fontWeight: "600",
//             marginBottom: "8px",
//             color: "#111827",
//           }}
//         >
//           {statusLabels[status]}
//         </h2>
//         <div style={{ display: "grid", gap: "16px" }}>
//           {paginated.length === 0 ? (
//             <p style={{ fontSize: "14px", color: "#4B5563" }}>No tasks.</p>
//           ) : (
//             paginated.map((task) => (
//               <div
//                 key={task.id}
//                 style={{
//                   padding: "16px",
//                   backgroundColor: statusColors[task.status],
//                   borderRadius: "8px",
//                   border: "1px solid #E5E7EB",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "16px",
//                     fontWeight: "500",
//                     marginBottom: "4px",
//                     color: "#000000",
//                   }}
//                 >
//                   {task.title}
//                 </h3>
//                 <p
//                   style={{
//                     fontSize: "14px",
//                     color: "#374151",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   {task.description}
//                 </p>
//                 <select
//                   value={task.status}
//                   onChange={(e) =>
//                     handleStatusChange(task.id, e.target.value as TaskStatus)
//                   }
//                   style={{
//                     padding: "6px 12px",
//                     border: "1px solid #D1D5DB",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {Object.entries(statusLabels).map(([key, label]) => (
//                     <option key={key} value={key}>
//                       {label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ))
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "16px",
//               gap: "8px",
//             }}
//           >
//             <button
//               onClick={() =>
//                 handlePageChange(status, Math.max(1, currentPage - 1))
//               }
//               disabled={currentPage === 1}
//               style={{
//                 padding: "6px 12px",
//                 fontSize: "14px",
//                 borderRadius: "4px",
//                 border: "1px solid #D1D5DB",
//                 backgroundColor: currentPage === 1 ? "#F3F4F6" : "#FFF",
//                 cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                 color: "#000000",
//               }}
//             >
//               Previous
//             </button>
//             <span
//               style={{
//                 fontSize: "14px",
//                 alignSelf: "center",
//                 color: "#000000",
//               }}
//             >
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 handlePageChange(status, Math.min(totalPages, currentPage + 1))
//               }
//               disabled={currentPage === totalPages}
//               style={{
//                 padding: "6px 12px",
//                 color: "#000000",
//                 fontSize: "14px",
//                 borderRadius: "4px",
//                 border: "1px solid #D1D5DB",
//                 backgroundColor:
//                   currentPage === totalPages ? "#F3F4F6" : "#FFF",
//                 cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//               }}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px" }}>
//       {renderTasksByStatus("not_started")}
//       {renderTasksByStatus("ongoing")}
//       {renderTasksByStatus("completed")}
//     </div>
//   );
// };

// export default Tasks;
