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
  thumbnail?: string;
  duration?: string;
};

const LOCAL_KEY = "trainings";

// Default training list
const defaultTrainings: Training[] = [
  // {
  //   id: 1,
  //   title: "Workplace Safety Fundamentals",
  //   description: "Learn the key safety rules and emergency protocols to stay safe and ensure workplace compliance.",
  //   thumbnail: "https://cdn.pixabay.com/photo/2021/07/01/16/15/safety-first-6379751_1280.jpg",
  //   duration: "2h 15m",
  //   scheduledDate: "2025-05-22",
  //   completed: true,
  //   completedDate: "2025-05-22",
  // },
  // {
  //   id: 2,
  //   title: "Time Management Mastery",
  //   description: "Discover proven productivity frameworks and tools to manage your time effectively.",
  //   thumbnail: "https://cdn.pixabay.com/photo/2024/10/02/18/24/ai-generated-9091889_1280.jpg",
  //   duration: "1h 30m",
  //   scheduledDate: "2025-06-01",
  //   completed: false,
  // },
  // {
  //   id: 3,
  //   title: "Communication in the Workplace",
  //   description: "Improve your ability to communicate clearly and collaborate efficiently within any team.",
  //   thumbnail: "https://cdn.pixabay.com/photo/2024/08/21/15/33/ai-generated-8986487_1280.jpg",
  //   duration: "2h 45m",
  //   scheduledDate: "2025-06-10",
  //   completed: false,
  // },
  // {
  //   id: 4,
  //   title: "Professional Speaking",
  //   description: "Improve your public speaking and presentation skills.",
  //   scheduledDate: "2025-06-10",
  //   completed: false,
  //   duration: "1h 45m",
  //   thumbnail: "https://cdn.pixabay.com/photo/2015/07/02/10/40/writing-828911_1280.jpg"
  // },
  // {
  //   id: 5,
  //   title: "Conflict Resolution",
  //   description: "Learn techniques to manage and resolve workplace conflicts.",
  //   scheduledDate: "2025-06-15",
  //   completed: false,
  //   duration: "3h 00m",
  //   thumbnail: "https://cdn.pixabay.com/photo/2017/01/19/10/09/meeting-1992160_1280.jpg"
  // },
];

// Load from localStorage (fallback to defaultTrainings if empty)
const loadedTrainings = loadFromLocalStorage<Training[]>(LOCAL_KEY, defaultTrainings);
const initialState: Training[] = loadedTrainings.length > 0 ? loadedTrainings : defaultTrainings;

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