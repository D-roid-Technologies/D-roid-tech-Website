import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface UserRef {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface Comment {
  id: string;
  author: UserRef;
  content: string;
  createdAt: string;
  updatedAt?: string;
  reactions?: {
    [emoji: string]: number;
  };
}

interface Attachment {
  id: string;
  filename: string;
  url: string;
  fileType: string;
  uploadedBy: UserRef;
  uploadedAt: string;
}

interface TaskHistoryEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: UserRef;
  metadata?: Record<string, any>;
}

interface ChecklistItem {
  id: string;
  title: string;
  checked: boolean;
}

export interface TaskMain {
  id: string;
  title: string;
  description: string;
  status:
    | "event"
    | "reminder"
    | "task"
    | "note"
    | "appointment"
    | "meeting"
    | "goal"
    | "routine";
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  category?: string;
  projectId?: string;
  boardColumn?: string;
  sprintId?: string;
  parentTaskId?: string;
  subtasks?: TaskMain[];
  dependencies?: string[];
  dependents?: string[];
  tags?: string[];
  checklist?: ChecklistItem[];
  assignee?: UserRef;
  collaborators?: UserRef[];
  reporter?: UserRef;
  comments?: Comment[];
  attachments?: Attachment[];
  estimatedHours?: number;
  actualHours?: number;
  startDate?: string;
  dueDate?: string;
  startTime?: string;
  endTime?: string;
  completedAt?: string;
  reminderAt?: string;
  recurring?: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly" | "custom";
  customRecurrenceRule?: string;
  isPrivate?: boolean;
  isBlocked?: boolean;
  blockReason?: string;
  score?: number;
  feedback?: string;
  linkedResources?: {
    title: string;
    url: string;
  }[];
  auditTrail?: TaskHistoryEntry[];
  createdBy: UserRef;
  dateCreated: string;
  dateModified?: string;
  dateDeleted?: string;
}

type TasksState = {
  tasks: TaskMain[];
  loading: boolean;
  error: string | null;
};

// 🔹 Helpers for localStorage
const loadTasksFromStorage = (): TaskMain[] => {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Error loading tasks from localStorage", err);
    return [];
  }
};

const saveTasksToStorage = (tasks: TaskMain[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (err) {
    console.error("Error saving tasks to localStorage", err);
  }
};

const clearTasksFromStorage = () => {
  try {
    localStorage.removeItem("tasks");
  } catch (err) {
    console.error("Error clearing tasks from localStorage", err);
  }
};

const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
};

// Async Thunk (example for loading tasks from API)
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("/api/tasks"); // replace with actual API endpoint
  return (await response.json()) as TaskMain[];
});

// Slice
export const scheduleTask = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskMain>) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action: PayloadAction<TaskMain>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          dateModified: new Date().toISOString(),
        };
        saveTasksToStorage(state.tasks);
      }
    },
    deleteThisTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskMain["status"] }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.dateModified = new Date().toISOString();
        saveTasksToStorage(state.tasks);
      }
    },
    // 🔹 New Reducer: Delete all tasks
    deleteAllTasks: (state) => {
      state.tasks = [];
      clearTasksFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<TaskMain[]>) => {
          state.tasks = action.payload;
          state.loading = false;
          saveTasksToStorage(state.tasks);
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      });
  },
});

export const {
  addTask,
  updateTask,
  deleteThisTask,
  toggleTaskStatus,
  deleteAllTasks,
} = scheduleTask.actions;

export default scheduleTask.reducer;
