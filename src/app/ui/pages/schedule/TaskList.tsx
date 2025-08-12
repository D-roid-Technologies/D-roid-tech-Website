import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

// Icons (simple SVG inline for edit/delete)
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="20"
    height="20"
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
    width="20"
    height="20"
  >
    <path d="M3 6h18" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
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

const statusColors: Record<string, React.CSSProperties> = {
  pending: { backgroundColor: "#FEF3C7", color: "#92400E" },
  in_progress: { backgroundColor: "#DBEAFE", color: "#1E40AF" },
  completed: { backgroundColor: "#DCFCE7", color: "#166534" },
  cancelled: { backgroundColor: "#FECACA", color: "#991B1B" },
  archived: { backgroundColor: "#E5E7EB", color: "#374151" },
  on_hold: { backgroundColor: "#E9D5FF", color: "#6B21A8" },
  reopened: { backgroundColor: "#E0E7FF", color: "#4338CA" },
};

const priorityColors: Record<string, React.CSSProperties> = {
  low: { backgroundColor: "#DCFCE7", color: "#166534" },
  medium: { backgroundColor: "#FEF3C7", color: "#92400E" },
  high: { backgroundColor: "#FFEDD5", color: "#C2410C" },
  urgent: { backgroundColor: "#FCA5A5", color: "#7F1D1D" },
  critical: { backgroundColor: "#B91C1C", color: "#fff" },
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "10px 14px",
  borderRadius: 6,
  border: "1.5px solid #CBD5E1",
  outline: "none",
  fontSize: 16,
  transition: "box-shadow 0.2s ease",
};

const selectStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 6,
  border: "1.5px solid #CBD5E1",
  fontSize: 16,
  outline: "none",
  cursor: "pointer",
  minWidth: 140,
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 18px",
  backgroundColor: "#EF4444",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 16,
  transition: "background-color 0.3s ease",
};

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: "#DC2626",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: 12,
  boxShadow:
    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "default",
  userSelect: "none",
  position: "relative",
};

const cardHoverStyle: React.CSSProperties = {
  transform: "scale(1.04)",
  boxShadow:
    "0 8px 16px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)",
  cursor: "pointer",
};

const iconButtonStyle: React.CSSProperties = {
  cursor: "pointer",
  padding: 6,
  borderRadius: 6,
  transition: "background-color 0.2s ease",
  color: "#6B7280",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconButtonHoverStyle: React.CSSProperties = {
  backgroundColor: "#E5E7EB",
  color: "#111827",
};

const TasksList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "">("");
  const [priorityFilter, setPriorityFilter] = useState<string | "">("");
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);
  const [hoveredEdit, setHoveredEdit] = useState<number | null>(null);
  const [hoveredDelete, setHoveredDelete] = useState<number | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: any) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return (
    <div
      style={{
        padding: 24,
        maxHeight: "80vh",
        overflowY: "auto",
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: "800", marginBottom: 24, color: "#111827" }}>
        All Tasks
      </h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #60A5FA")}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #60A5FA")}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <option value="">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={selectStyle}
          onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #60A5FA")}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <option value="">All Priorities</option>
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("");
            setPriorityFilter("");
          }}
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
        >
          Reset Filters
        </button>
      </div>

      {/* Tasks grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {filteredTasks.length ? (
          filteredTasks.map((task: any) => (
            <div
              key={task.id}
              style={{
                ...cardStyle,
                ...(hoveredTask === task.id ? cardHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
              title={task.title}
            >
              {/* Edit/Delete icons container */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "flex",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    ...iconButtonStyle,
                    ...(hoveredEdit === task.id ? iconButtonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setHoveredEdit(task.id)}
                  onMouseLeave={() => setHoveredEdit(null)}
                  onClick={() => alert(`Edit task ${task.id}`)}
                  title="Edit Task"
                >
                  <EditIcon />
                </div>
                <div
                  style={{
                    ...iconButtonStyle,
                    ...(hoveredDelete === task.id ? iconButtonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setHoveredDelete(task.id)}
                  onMouseLeave={() => setHoveredDelete(null)}
                  onClick={() => alert(`Delete task ${task.id}`)}
                  title="Delete Task"
                >
                  <DeleteIcon />
                </div>
              </div>

              <h3
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  marginBottom: 12,
                  color: "#111827",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {task.title}
              </h3>

              <p
                style={{
                  color: "#4B5563",
                  fontSize: 14,
                  marginBottom: 16,
                  flexGrow: 1,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
                title={task.description || "No description provided."}
              >
                {task.description || "No description provided."}
              </p>

              <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: "600",
                    ...statusColors[task.status],
                    userSelect: "none",
                  }}
                >
                  {task.status.replace("_", " ")}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: "600",
                    ...priorityColors[task.priority],
                    userSelect: "none",
                  }}
                >
                  Priority: {task.priority}
                </span>
                {task.category && (
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: "600",
                      backgroundColor: "#DBEAFE",
                      color: "#1E40AF",
                      userSelect: "none",
                    }}
                  >
                    Category: {task.category}
                  </span>
                )}
              </div>

              <div style={{ color: "#111827", fontSize: 14, lineHeight: 1.4 }}>
                <p>
                  <strong>Assignee:</strong> {task.assignee?.name || "Unassigned"}
                </p>
                <p>
                  <strong>Start Date:</strong> {formatDate(task.startDate)}
                </p>
                <p>
                  <strong>End Date:</strong> {formatDate(task.endDate)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#6B7280", gridColumn: "1 / -1" }}>
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TasksList;