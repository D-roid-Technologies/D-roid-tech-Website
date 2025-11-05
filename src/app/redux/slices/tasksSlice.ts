import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type TaskStatus = "not_started" | "ongoing" | "completed"

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  dueDate?: string
  priority?: "low" | "medium" | "high"
  assignee?: string
}

export interface TasksState {
  tasks: Task[]
  page: Record<TaskStatus, number>
  filter: TaskStatus | "all"
}

const initialState: TasksState = {
  tasks: [
    {
      id: 1,
      title: "Design Dashboard UI",
      description: "Create mockups and wireframes for the staff dashboard",
      status: "ongoing",
      priority: "high",
      dueDate: "2025-01-15",
      assignee: "John Doe",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Connect frontend with backend API endpoints",
      status: "not_started",
      priority: "high",
      dueDate: "2025-01-20",
      assignee: "Jane Smith",
    },
    {
      id: 3,
      title: "User Testing",
      description: "Conduct user testing sessions with staff members",
      status: "not_started",
      priority: "medium",
      dueDate: "2025-01-25",
    },
    {
      id: 4,
      title: "Documentation",
      description: "Write comprehensive API documentation",
      status: "completed",
      priority: "low",
      dueDate: "2025-01-10",
      assignee: "Mike Johnson",
    },
    {
      id: 5,
      title: "Bug Fixes",
      description: "Fix reported issues from testing phase",
      status: "ongoing",
      priority: "medium",
      dueDate: "2025-01-18",
      assignee: "Sarah Williams",
    },
    {
      id: 6,
      title: "Performance Optimization",
      description: "Optimize database queries and improve load times",
      status: "completed",
      priority: "medium",
      dueDate: "2025-01-12",
    },
  ],
  page: {
    not_started: 1,
    ongoing: 1,
    completed: 1,
  },
  filter: "all",
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<{ id: number; status: TaskStatus }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
      }
    },
    setPage: (state, action: PayloadAction<{ status: TaskStatus; page: number }>) => {
      state.page[action.payload.status] = action.payload.page
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    setFilter: (state, action: PayloadAction<TaskStatus | "all">) => {
      state.filter = action.payload
    },
  },
})

export const { updateTaskStatus, setPage, addTask, deleteTask, updateTask, setFilter } = tasksSlice.actions

export default tasksSlice.reducer
