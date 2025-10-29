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
  achievedAt?: string; // ISO timestamp when milestone was achieved
  lastUpdated?: string; // ISO timestamp when milestone was last updated
};

export type ProgressionHistory = {
  id: string;
  timestamp: string; // ISO timestamp
  action: 'achieved' | 'reset' | 'updated';
  milestoneId: string;
  milestoneTitle: string;
  fromPosition: string | null;
  toPosition: string;
  completionPercentage: number;
};

interface ProgressionState {
  milestones: Milestone[];
  currentPosition: string;
  progressionHistory: ProgressionHistory[];
  lastCalculated?: string; // ISO timestamp of last progression calculation
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
  progressionHistory: [],
  lastCalculated: new Date().toISOString(),
};

// Load saved progression from localStorage with migration support
const loadProgressionState = (): ProgressionState => {
  const savedState = loadFromLocalStorage<any>(LOCAL_KEY, null);
  
  // If no saved state, return default
  if (!savedState) {
    return defaultState;
  }
  
  // Migration: Add missing properties for backward compatibility
  return {
    milestones: savedState.milestones || defaultState.milestones,
    currentPosition: savedState.currentPosition || defaultState.currentPosition,
    progressionHistory: savedState.progressionHistory || [],
    lastCalculated: savedState.lastCalculated || new Date().toISOString(),
  };
};

const initialState: ProgressionState = loadProgressionState();

const progressionSlice = createSlice({
  name: "progression",
  initialState,
  reducers: {
    toggleMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        const now = new Date().toISOString();
        milestone.achieved = !milestone.achieved;
        milestone.lastUpdated = now;
        
        if (milestone.achieved) {
          milestone.achievedAt = now;
        } else {
          milestone.achievedAt = undefined;
        }
        
        // Add to progression history
        state.progressionHistory.push({
          id: Date.now().toString(),
          timestamp: now,
          action: milestone.achieved ? 'achieved' : 'reset',
          milestoneId: milestone.id,
          milestoneTitle: milestone.title,
          fromPosition: milestone.fromPosition,
          toPosition: milestone.toPosition,
          completionPercentage: milestone.completion,
        });
        
        state.currentPosition = getCurrentPosition(state.milestones);
        state.lastCalculated = now;
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },

    achieveMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        const now = new Date().toISOString();
        milestone.achieved = true;
        milestone.achievedAt = now;
        milestone.lastUpdated = now;
        
        // Add to progression history
        state.progressionHistory.push({
          id: Date.now().toString(),
          timestamp: now,
          action: 'achieved',
          milestoneId: milestone.id,
          milestoneTitle: milestone.title,
          fromPosition: milestone.fromPosition,
          toPosition: milestone.toPosition,
          completionPercentage: milestone.completion,
        });
        
        state.currentPosition = getCurrentPosition(state.milestones);
        state.lastCalculated = now;
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },

    resetMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        const now = new Date().toISOString();
        milestone.achieved = false;
        milestone.achievedAt = undefined;
        milestone.lastUpdated = now;
        
        // Add to progression history
        state.progressionHistory.push({
          id: Date.now().toString(),
          timestamp: now,
          action: 'reset',
          milestoneId: milestone.id,
          milestoneTitle: milestone.title,
          fromPosition: milestone.fromPosition,
          toPosition: milestone.toPosition,
          completionPercentage: milestone.completion,
        });
        
        state.currentPosition = getCurrentPosition(state.milestones);
        state.lastCalculated = now;
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
        progressionHistory: [],
        lastCalculated: new Date().toISOString(),
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

export const selectProgressionHistory = (state: { progression: ProgressionState }) =>
  state.progression.progressionHistory;

export const selectLastCalculated = (state: { progression: ProgressionState }) =>
  state.progression.lastCalculated;

// Reducer
export default progressionSlice.reducer;
