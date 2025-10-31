// src/redux/slices/progressionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

export type Milestone = {
  id: string;
  title: string;
  fromPosition: string | null;
  toPosition: string;
  achieved: boolean;
  completion: number;
  achievedAt?: string;
  lastUpdated?: string;
};

export type ProgressionHistory = {
  id: string;
  timestamp: string;
  action: 'achieved' | 'reset' | 'updated';
  milestoneId: string;
  milestoneTitle: string;
  fromPosition: string | null;
  toPosition: string;
  completionPercentage: number;
};

// 🕒 New type for time tracking
export type TimeTrackingEntry = {
  id: string;
  startTime: string;
  endTime: string | null;
  durationHours: number;
};

interface ProgressionState {
  milestones: Milestone[];
  currentPosition: string;
  progressionHistory: ProgressionHistory[];
  lastCalculated?: string;
  // ⏱️ New fields
  timeTracking: TimeTrackingEntry[];
  totalHours: number;
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

const defaultState: ProgressionState = {
  milestones: initialMilestones,
  currentPosition: "Silver",
  progressionHistory: [],
  lastCalculated: new Date().toISOString(),
  timeTracking: [],
  totalHours: 0,
};

// Load saved progression
const loadProgressionState = (): ProgressionState => {
  const savedState = loadFromLocalStorage<any>(LOCAL_KEY, null);
  if (!savedState) return defaultState;

  return {
    milestones: savedState.milestones || defaultState.milestones,
    currentPosition: savedState.currentPosition || defaultState.currentPosition,
    progressionHistory: savedState.progressionHistory || [],
    lastCalculated: savedState.lastCalculated || new Date().toISOString(),
    timeTracking: savedState.timeTracking || [],
    totalHours: savedState.totalHours || 0,
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
        milestone.achievedAt = milestone.achieved ? now : undefined;

        state.progressionHistory.push({
          id: Date.now().toString(),
          timestamp: now,
          action: milestone.achieved ? "achieved" : "reset",
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

        state.progressionHistory.push({
          id: Date.now().toString(),
          timestamp: now,
          action: "achieved",
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

        state.progressionHistory.push({
          id: Date.now().toString(),
          timestamp: now,
          action: "reset",
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
      const newMilestone: Milestone = { ...action.payload, id: Date.now().toString() };
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
        ...defaultState,
        lastCalculated: new Date().toISOString(),
      };
      saveToLocalStorage(LOCAL_KEY, resetState);
      return resetState;
    },

    // 🕓 Start a session
    startSession: (state) => {
      const now = new Date().toISOString();
      state.timeTracking.push({
        id: Date.now().toString(),
        startTime: now,
        endTime: null,
        durationHours: 0,
      });
      saveToLocalStorage(LOCAL_KEY, state);
    },

    // 🕔 End a session
    endSession: (state) => {
      const now = new Date().toISOString();
      const active = state.timeTracking.find((s) => !s.endTime);
      if (active) {
        const durationMs = new Date(now).getTime() - new Date(active.startTime).getTime();
        const hours = durationMs / (1000 * 60 * 60);
        active.endTime = now;
        active.durationHours = parseFloat(hours.toFixed(2));
        state.totalHours = state.timeTracking.reduce((sum, s) => sum + s.durationHours, 0);
        state.lastCalculated = now;
        saveToLocalStorage(LOCAL_KEY, state);
      }
    },
  },
});

// Helpers
function getCurrentPosition(milestones: Milestone[]): string {
  let currentPosition = "Silver";
  for (const milestone of milestones) {
    if (milestone.achieved) currentPosition = milestone.toPosition;
    else break;
  }
  return currentPosition;
}

// Actions
export const {
  toggleMilestone,
  achieveMilestone,
  resetMilestone,
  addMilestone,
  removeMilestone,
  updateMilestone,
  resetProgression,
  setAllMilestones,
  startSession,
  endSession,
} = progressionSlice.actions;

// Selectors
export const selectMilestones = (state: { progression: ProgressionState }) => state.progression.milestones;
export const selectCurrentPosition = (state: { progression: ProgressionState }) => state.progression.currentPosition;
export const selectProgressPercentage = (state: { progression: ProgressionState }) => {
  const total = state.progression.milestones.length;
  const achieved = state.progression.milestones.filter((m) => m.achieved).length;
  return total > 0 ? Math.round((achieved / total) * 100) : 0;
};
export const selectProgressionHistory = (state: { progression: ProgressionState }) => state.progression.progressionHistory;
export const selectLastCalculated = (state: { progression: ProgressionState }) => state.progression.lastCalculated;

// ⏱️ New selectors
export const selectTotalHours = (state: { progression: ProgressionState }) => state.progression.totalHours;
export const selectWeeklyProgressHours = (state: { progression: ProgressionState }) => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekHours = state.progression.timeTracking
    .filter((entry) => new Date(entry.startTime) >= oneWeekAgo)
    .reduce((sum, entry) => sum + entry.durationHours, 0);
  return parseFloat(thisWeekHours.toFixed(2));
};

export default progressionSlice.reducer;
