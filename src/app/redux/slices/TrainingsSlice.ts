// src/redux/slices/trainingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Training = {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  completed: boolean;
  completedDate?: string;
};

const initialState: Training[] = [
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

export const trainingSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    markTrainingAsCompleted: (state, action: PayloadAction<Training>) => {
      const index = state.findIndex(
        (training) => training.id === action.payload.id
      );
      if (index !== -1) {
        state[index].completed = true;
        state[index].completedDate = new Date().toISOString().split("T")[0];
      }
    },
  },
});


export const Alltraining = (state: { trainings: Training[] }) =>
  state.trainings;


export const { markTrainingAsCompleted } = trainingSlice.actions;


