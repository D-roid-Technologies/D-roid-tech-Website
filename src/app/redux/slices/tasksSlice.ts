import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "not_started" | "ongoing" | "completed";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};

interface TasksState {
  tasks: Task[];
  page: Record<TaskStatus, number>;
}

const initialTasks: Task[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  description: `Description for task ${i + 1}`,
  status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "ongoing" : "not_started",
}));

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
  },
});

export const {
  setTasks,
  updateTaskStatus,
  setPage,
  addTask,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
