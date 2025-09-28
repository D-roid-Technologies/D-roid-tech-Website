// src/redux/slices/trainingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

export type Training = {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  completed: boolean;
  completedDate?: string;
};

const LOCAL_KEY = "trainings";

// Default training list
const defaultTrainings: Training[] = [
  {
    id: 1,
    title: "Workplace Safety",
    description: "Learn about safety protocols.",
    scheduledDate: "2025-05-22",
    completed: true,
    completedDate: "2025-05-22",
  },
  {
    id: 2,
    title: "Time Management",
    description: "Strategies to improve productivity.",
    scheduledDate: "2025-06-01",
    completed: false,
  },
  {
    id: 3,
    title: "Remote Work",
    description:
      "Best practices for working effectively from home or any remote location.",
    scheduledDate: "2025-06-05",
    completed: false,
  },
  {
    id: 4,
    title: "Professional Speaking",
    description: "Improve your public speaking and presentation skills.",
    scheduledDate: "2025-06-10",
    completed: false,
  },
  {
    id: 5,
    title: "Conflict Resolution",
    description: "Learn techniques to manage and resolve workplace conflicts.",
    scheduledDate: "2025-06-15",
    completed: false,
  },
  {
    id: 6,
    title: "Time Management",
    description:
      "Strategies to prioritize tasks and manage your time efficiently.",
    scheduledDate: "2025-06-20",
    completed: false,
  },
  {
    id: 7,
    title: "Team Collaboration",
    description:
      "Effective ways to collaborate and communicate within a team.",
    scheduledDate: "2025-06-25",
    completed: false,
  },
];

// Load from localStorage (fallback to defaultTrainings if empty)
const initialState: Training[] = loadFromLocalStorage<Training[]>(LOCAL_KEY, defaultTrainings);

export const trainingSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    markTrainingAsCompleted: (state, action: PayloadAction<Training>) => {
      const index = state.findIndex((training) => training.id === action.payload.id);
      if (index !== -1) {
        state[index].completed = true;
        state[index].completedDate = new Date().toISOString().split("T")[0];
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },
    setTrainings: (_, action: PayloadAction<Training[]>) => {
      saveToLocalStorage(LOCAL_KEY, action.payload);
      return action.payload;
    },
    clearTrainings: () => {
      saveToLocalStorage(LOCAL_KEY, []);
      return [];
    },
  },
});

// Selector
export const Alltraining = (state: { trainings: Training[] }) => state.trainings;

// Actions
export const { markTrainingAsCompleted, setTrainings, clearTrainings } = trainingSlice.actions;

// Reducer
export default trainingSlice.reducer;