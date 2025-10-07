// src/redux/slices/progressionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

export type Milestone = {
  id: string;
  title: string;
  fromPosition: string | null;
  toPosition: string;
  achieved: boolean;
};

interface ProgressionState {
  milestones: Milestone[];
  currentPosition: string;
}

const LOCAL_KEY = "progression";

const initialMilestones: Milestone[] = [
  {
    id: "1",
    title: "Employed as Intern",
    fromPosition: null,
    toPosition: "Intern",
    achieved: true,
  },
  {
    id: "2",
    title: "Promoted to Junior Developer",
    fromPosition: "Intern",
    toPosition: "Junior Developer",
    achieved: true,
  },
  {
    id: "3",
    title: "Promoted to Mid-Level Developer",
    fromPosition: "Junior Developer",
    toPosition: "Mid-Level Developer",
    achieved: false,
  },
  {
    id: "4",
    title: "Promoted to Senior Developer",
    fromPosition: "Mid-Level Developer",
    toPosition: "Senior Developer",
    achieved: false,
  },
  {
    id: "5",
    title: "Promoted to Team Lead",
    fromPosition: "Senior Developer",
    toPosition: "Team Lead",
    achieved: false,
  },
];

// Default state (if nothing is in localStorage)
const defaultState: ProgressionState = {
  milestones: initialMilestones,
  currentPosition: "Junior Developer", // Based on achieved milestones
};

// Load from localStorage (fallback to default)
const initialState: ProgressionState = loadFromLocalStorage<ProgressionState>(
  LOCAL_KEY,
  defaultState
);

const progressionSlice = createSlice({
  name: "progression",
  initialState,
  reducers: {
    toggleMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.achieved = !milestone.achieved;
        state.currentPosition = getCurrentPosition(state.milestones);
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },

    achieveMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.achieved = true;
        state.currentPosition = getCurrentPosition(state.milestones);
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },

    resetMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.achieved = false;
        state.currentPosition = getCurrentPosition(state.milestones);
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },

    addMilestone: (state, action: PayloadAction<Omit<Milestone, "id">>) => {
      const newMilestone: Milestone = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.milestones.push(newMilestone);
      saveToLocalStorage(LOCAL_KEY, state);
    },

    removeMilestone: (state, action: PayloadAction<string>) => {
      state.milestones = state.milestones.filter((m) => m.id !== action.payload);
      state.currentPosition = getCurrentPosition(state.milestones);
      saveToLocalStorage(LOCAL_KEY, state);
    },

    updateMilestone: (state, action: PayloadAction<Milestone>) => {
      const index = state.milestones.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.milestones[index] = action.payload;
        state.currentPosition = getCurrentPosition(state.milestones);
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },

    setAllMilestones: (state, action: PayloadAction<Milestone[]>) => {
      state.milestones = action.payload;
      state.currentPosition = getCurrentPosition(action.payload);
      saveToLocalStorage(LOCAL_KEY, state);
    },

    resetProgression: () => {
      const resetState: ProgressionState = {
        milestones: initialMilestones,
        currentPosition: getCurrentPosition(initialMilestones),
      };
      saveToLocalStorage(LOCAL_KEY, resetState);
      return resetState;
    },
  },
});

// Helper to compute current position
function getCurrentPosition(milestones: Milestone[]): string {
  let currentPosition = "Gold";
  for (const milestone of milestones) {
    if (milestone.achieved) {
      currentPosition = milestone.toPosition;
    } else {
      break;
    }
  }
  return currentPosition;
}

// Export actions
export const {
  toggleMilestone,
  achieveMilestone,
  resetMilestone,
  addMilestone,
  removeMilestone,
  updateMilestone,
  resetProgression,
  setAllMilestones
} = progressionSlice.actions;

// Selectors
export const selectMilestones = (state: { progression: ProgressionState }) =>
  state.progression.milestones;
export const selectCurrentPosition = (state: { progression: ProgressionState }) =>
  state.progression.currentPosition;
export const selectAchievedMilestones = (state: { progression: ProgressionState }) =>
  state.progression.milestones.filter((m) => m.achieved);
export const selectPendingMilestones = (state: { progression: ProgressionState }) =>
  state.progression.milestones.filter((m) => !m.achieved);
export const selectProgressPercentage = (state: { progression: ProgressionState }) => {
  const total = state.progression.milestones.length;
  const achieved = state.progression.milestones.filter((m) => m.achieved).length;
  return total > 0 ? Math.round((achieved / total) * 100) : 0;
};

// Reducer
export default progressionSlice.reducer;