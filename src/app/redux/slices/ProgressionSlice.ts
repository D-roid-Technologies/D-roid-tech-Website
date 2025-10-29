// src/redux/slices/progressionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

export type Milestone = {
  id: string;
  title: string;
  fromPosition: string | null;
  toPosition: string;
  achieved: boolean;
  completion: number; // percentage completion (e.g. 33, 56, 100)
};

interface ProgressionState {
  milestones: Milestone[];
  currentPosition: string;
}

const LOCAL_KEY = "progression";

const initialMilestones: Milestone[] = [
  {
    id: "1",
    title: "Start as Silver Member",
    fromPosition: null,
    toPosition: "Silver",
    achieved: true,
    completion: 33,
  },
  {
    id: "2",
    title: "Upgrade to Gold Member",
    fromPosition: "Silver",
    toPosition: "Gold",
    achieved: false,
    completion: 56,
  },
  {
    id: "3",
    title: "Upgrade to Platinum Member",
    fromPosition: "Gold",
    toPosition: "Platinum",
    achieved: false,
    completion: 100,
  },
];

// Default state — new accounts always start as Silver
const defaultState: ProgressionState = {
  milestones: initialMilestones,
  currentPosition: "Silver",
};

// Load saved progression from localStorage, fallback to default
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

// Helper: compute current position based on achieved milestones
function getCurrentPosition(milestones: Milestone[]): string {
  let currentPosition = "Silver"; // default start
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
  setAllMilestones,
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
