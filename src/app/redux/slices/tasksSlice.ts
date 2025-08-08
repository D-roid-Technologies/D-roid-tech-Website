import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "not_started" | "ongoing" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskCategory =
  | "development"
  | "meeting"
  | "training"
  | "documentation"
  | "review"
  | "maintenance"
  | "planning"
  | "testing";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignedDate: string;
  dueDate: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
  assignedBy: string;
  tags: string[];
  progress: number; // 0-100
};

interface TasksState {
  tasks: Task[];
  page: Record<TaskStatus, number>;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete User Authentication Module",
    description:
      "Implement JWT-based authentication system with role-based access control",
    status: "ongoing",
    priority: "high",
    category: "development",
    assignedDate: "2025-08-01",
    dueDate: "2025-08-10",
    estimatedHours: 16,
    actualHours: 12,
    assignedBy: "John Smith",
    tags: ["authentication", "security", "backend"],
    progress: 75,
  },
  {
    id: 2,
    title: "Database Migration Script",
    description: "Create migration scripts for updating user table schema",
    status: "completed",
    priority: "medium",
    category: "maintenance",
    assignedDate: "2025-07-28",
    dueDate: "2025-08-05",
    completedDate: "2025-08-04",
    estimatedHours: 8,
    actualHours: 6,
    assignedBy: "Sarah Johnson",
    tags: ["database", "migration", "sql"],
    progress: 100,
  },
  {
    id: 3,
    title: "Weekly Team Standup",
    description:
      "Participate in weekly team standup meeting to discuss progress and blockers",
    status: "not_started",
    priority: "medium",
    category: "meeting",
    assignedDate: "2025-08-07",
    dueDate: "2025-08-07",
    estimatedHours: 1,
    assignedBy: "Mike Davis",
    tags: ["meeting", "team", "standup"],
    progress: 0,
  },
  {
    id: 4,
    title: "API Documentation Update",
    description:
      "Update REST API documentation with new endpoints and examples",
    status: "ongoing",
    priority: "medium",
    category: "documentation",
    assignedDate: "2025-08-03",
    dueDate: "2025-08-12",
    estimatedHours: 12,
    actualHours: 8,
    assignedBy: "Lisa Chen",
    tags: ["documentation", "api", "technical-writing"],
    progress: 60,
  },
  {
    id: 5,
    title: "Code Review - Payment Gateway",
    description:
      "Review implementation of payment gateway integration for security vulnerabilities",
    status: "not_started",
    priority: "high",
    category: "review",
    assignedDate: "2025-08-06",
    dueDate: "2025-08-08",
    estimatedHours: 4,
    assignedBy: "Robert Wilson",
    tags: ["code-review", "payment", "security"],
    progress: 0,
  },
  {
    id: 6,
    title: "React Training Course",
    description:
      "Complete advanced React hooks and context API training module",
    status: "ongoing",
    priority: "low",
    category: "training",
    assignedDate: "2025-07-30",
    dueDate: "2025-08-15",
    estimatedHours: 20,
    actualHours: 12,
    assignedBy: "Training Department",
    tags: ["training", "react", "frontend", "professional-development"],
    progress: 45,
  },
  {
    id: 7,
    title: "Bug Fix - Login Timeout Issue",
    description: "Fix session timeout bug that logs users out prematurely",
    status: "completed",
    priority: "urgent",
    category: "maintenance",
    assignedDate: "2025-08-05",
    dueDate: "2025-08-06",
    completedDate: "2025-08-06",
    estimatedHours: 4,
    actualHours: 3,
    assignedBy: "Support Team",
    tags: ["bug-fix", "login", "session", "urgent"],
    progress: 100,
  },
  {
    id: 8,
    title: "Sprint Planning Meeting",
    description: "Plan tasks and estimate effort for upcoming sprint",
    status: "completed",
    priority: "medium",
    category: "planning",
    assignedDate: "2025-08-04",
    dueDate: "2025-08-04",
    completedDate: "2025-08-04",
    estimatedHours: 2,
    actualHours: 2,
    assignedBy: "Scrum Master",
    tags: ["planning", "sprint", "estimation"],
    progress: 100,
  },
  {
    id: 9,
    title: "Unit Tests for Order Service",
    description: "Write comprehensive unit tests for order processing service",
    status: "not_started",
    priority: "medium",
    category: "testing",
    assignedDate: "2025-08-07",
    dueDate: "2025-08-14",
    estimatedHours: 10,
    assignedBy: "QA Lead",
    tags: ["testing", "unit-tests", "order-service"],
    progress: 0,
  },
  {
    id: 10,
    title: "Performance Optimization Review",
    description:
      "Analyze and optimize database queries for improved application performance",
    status: "ongoing",
    priority: "high",
    category: "maintenance",
    assignedDate: "2025-08-02",
    dueDate: "2025-08-11",
    estimatedHours: 14,
    actualHours: 8,
    assignedBy: "Tech Lead",
    tags: ["performance", "database", "optimization"],
    progress: 30,
  },
  {
    id: 11,
    title: "Client Demo Preparation",
    description:
      "Prepare demonstration materials and environment for client presentation",
    status: "not_started",
    priority: "high",
    category: "planning",
    assignedDate: "2025-08-07",
    dueDate: "2025-08-09",
    estimatedHours: 6,
    assignedBy: "Project Manager",
    tags: ["demo", "client", "presentation"],
    progress: 0,
  },
  {
    id: 12,
    title: "Security Audit Documentation",
    description:
      "Document security measures and compliance requirements for audit",
    status: "ongoing",
    priority: "medium",
    category: "documentation",
    assignedDate: "2025-08-01",
    dueDate: "2025-08-13",
    estimatedHours: 16,
    actualHours: 10,
    assignedBy: "Security Officer",
    tags: ["security", "audit", "compliance", "documentation"],
    progress: 55,
  },
  {
    id: 13,
    title: "Mobile App UI Mockups",
    description:
      "Create wireframes and mockups for mobile application interface",
    status: "completed",
    priority: "medium",
    category: "development",
    assignedDate: "2025-07-25",
    dueDate: "2025-08-03",
    completedDate: "2025-08-02",
    estimatedHours: 12,
    actualHours: 11,
    assignedBy: "Design Lead",
    tags: ["mobile", "ui", "mockups", "design"],
    progress: 100,
  },
  {
    id: 14,
    title: "Integration Testing",
    description: "Perform end-to-end integration testing for new features",
    status: "not_started",
    priority: "high",
    category: "testing",
    assignedDate: "2025-08-08",
    dueDate: "2025-08-16",
    estimatedHours: 18,
    assignedBy: "QA Manager",
    tags: ["integration-testing", "end-to-end", "features"],
    progress: 0,
  },
  {
    id: 15,
    title: "Docker Containerization",
    description:
      "Containerize application services using Docker for deployment",
    status: "ongoing",
    priority: "medium",
    category: "development",
    assignedDate: "2025-08-03",
    dueDate: "2025-08-12",
    estimatedHours: 14,
    actualHours: 6,
    assignedBy: "DevOps Engineer",
    tags: ["docker", "containerization", "deployment"],
    progress: 25,
  },
  {
    id: 16,
    title: "Quarterly Performance Review",
    description:
      "Complete self-assessment and prepare for quarterly performance review meeting",
    status: "not_started",
    priority: "medium",
    category: "meeting",
    assignedDate: "2025-08-05",
    dueDate: "2025-08-10",
    estimatedHours: 3,
    assignedBy: "HR Department",
    tags: ["performance-review", "self-assessment", "quarterly"],
    progress: 0,
  },
  {
    id: 17,
    title: "Backup System Maintenance",
    description:
      "Verify and update automated backup systems for data protection",
    status: "completed",
    priority: "high",
    category: "maintenance",
    assignedDate: "2025-08-01",
    dueDate: "2025-08-03",
    completedDate: "2025-08-03",
    estimatedHours: 6,
    actualHours: 5,
    assignedBy: "System Administrator",
    tags: ["backup", "maintenance", "data-protection"],
    progress: 100,
  },
  {
    id: 18,
    title: "New Employee Onboarding",
    description: "Mentor and guide new team member through onboarding process",
    status: "ongoing",
    priority: "medium",
    category: "training",
    assignedDate: "2025-08-04",
    dueDate: "2025-08-18",
    estimatedHours: 8,
    actualHours: 4,
    assignedBy: "Team Lead",
    tags: ["onboarding", "mentoring", "new-employee"],
    progress: 40,
  },
  {
    id: 19,
    title: "Load Testing Analysis",
    description:
      "Conduct load testing and analyze system performance under stress",
    status: "not_started",
    priority: "medium",
    category: "testing",
    assignedDate: "2025-08-08",
    dueDate: "2025-08-15",
    estimatedHours: 12,
    assignedBy: "Performance Engineer",
    tags: ["load-testing", "performance", "analysis"],
    progress: 0,
  },
  {
    id: 20,
    title: "Technical Debt Cleanup",
    description: "Refactor legacy code and resolve technical debt issues",
    status: "ongoing",
    priority: "low",
    category: "maintenance",
    assignedDate: "2025-07-28",
    dueDate: "2025-08-20",
    estimatedHours: 24,
    actualHours: 16,
    assignedBy: "Technical Lead",
    tags: ["technical-debt", "refactoring", "legacy-code"],
    progress: 65,
  },
];

const initialState: TasksState = {
  tasks: initialTasks,
  page: {
    not_started: 1,
    ongoing: 1,
    completed: 1,
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: number; status: TaskStatus }>
    ) {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
        if (status === "completed") {
          task.completedDate = new Date().toISOString().split("T")[0];
          task.progress = 100;
        }
      }
    },
    updateTaskProgress(
      state,
      action: PayloadAction<{ id: number; progress: number }>
    ) {
      const { id, progress } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.progress = Math.min(100, Math.max(0, progress));
        if (progress === 100) {
          task.status = "completed";
          task.completedDate = new Date().toISOString().split("T")[0];
        } else if (progress > 0 && task.status === "not_started") {
          task.status = "ongoing";
        }
      }
    },
    setPage(
      state,
      action: PayloadAction<{ status: TaskStatus; page: number }>
    ) {
      const { status, page } = action.payload;
      state.page[status] = page;
    },
    addTask(state, action: PayloadAction<Omit<Task, "id">>) {
      const newId = Math.max(...state.tasks.map((task) => task.id), 0) + 1;
      state.tasks.push({
        ...action.payload,
        id: newId,
      });
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateActualHours(
      state,
      action: PayloadAction<{ id: number; hours: number }>
    ) {
      const { id, hours } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.actualHours = hours;
      }
    },
  },
});

export const {
  setTasks,
  updateTaskStatus,
  updateTaskProgress,
  setPage,
  addTask,
  updateTask,
  deleteTask,
  updateActualHours,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type TaskStatus = "not_started" | "ongoing" | "completed";

// export type Task = {
//   id: number;
//   title: string;
//   description: string;
//   status: TaskStatus;
// };

// interface TasksState {
//   tasks: Task[];
//   page: Record<TaskStatus, number>;
// }

// const initialTasks: Task[] = Array.from({ length: 25 }, (_, i) => ({
//   id: i + 1,
//   title: `Task ${i + 1}`,
//   description: `Description for task ${i + 1}`,
//   status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "ongoing" : "not_started",
// }));

// const initialState: TasksState = {
//   tasks: initialTasks,
//   page: {
//     not_started: 1,
//     ongoing: 1,
//     completed: 1,
//   },
// };

// export const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     setTasks(state, action: PayloadAction<Task[]>) {
//       state.tasks = action.payload;
//     },
//     updateTaskStatus(
//       state,
//       action: PayloadAction<{ id: number; status: TaskStatus }>
//     ) {
//       const { id, status } = action.payload;
//       const task = state.tasks.find((task) => task.id === id);
//       if (task) {
//         task.status = status;
//       }
//     },
//     setPage(
//       state,
//       action: PayloadAction<{ status: TaskStatus; page: number }>
//     ) {
//       const { status, page } = action.payload;
//       state.page[status] = page;
//     },
//     addTask(state, action: PayloadAction<Omit<Task, "id">>) {
//       const newId = Math.max(...state.tasks.map((task) => task.id), 0) + 1;
//       state.tasks.push({
//         ...action.payload,
//         id: newId,
//       });
//     },
//     updateTask(state, action: PayloadAction<Task>) {
//       const index = state.tasks.findIndex(
//         (task) => task.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.tasks[index] = action.payload;
//       }
//     },
//     deleteTask(state, action: PayloadAction<number>) {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     },
//   },
// });

// export const {
//   setTasks,
//   updateTaskStatus,
//   setPage,
//   addTask,
//   updateTask,
//   deleteTask,
// } = tasksSlice.actions;

// export default tasksSlice.reducer;
