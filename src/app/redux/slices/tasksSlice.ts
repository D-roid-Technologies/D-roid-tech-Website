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

// 🔹 LocalStorage helpers
const loadTasksFromStorage = (): Task[] => {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Error loading tasks from localStorage", err);
    return [];
  }
};

const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (err) {
    console.error("Error saving tasks to localStorage", err);
  }
};

const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
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
      saveTasksToStorage(state.tasks);
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
        saveTasksToStorage(state.tasks);
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
        saveTasksToStorage(state.tasks);
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
      const newTask: Task = { ...action.payload, id: newId };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    updateActualHours(
      state,
      action: PayloadAction<{ id: number; hours: number }>
    ) {
      const { id, hours } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.actualHours = hours;
        saveTasksToStorage(state.tasks);
      }
    },
    clearTasks(state) {
      state.tasks = [];
      saveTasksToStorage(state.tasks);
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
  clearTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;