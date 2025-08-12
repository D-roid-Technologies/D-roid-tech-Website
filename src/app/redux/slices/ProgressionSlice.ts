import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: ProgressionState = {
  milestones: initialMilestones,
  currentPosition: "Junior Developer", // Based on achieved milestones
};

const progressionSlice = createSlice({
  name: "progression",
  initialState,
  reducers: {
    // Toggle achievement status of a milestone
    toggleMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.achieved = !milestone.achieved;
        // Update current position based on highest achieved milestone
        state.currentPosition = getCurrentPosition(state.milestones);
      }
    },

    // Achieve a milestone (set to true)
    achieveMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.achieved = true;
        state.currentPosition = getCurrentPosition(state.milestones);
      }
    },

    // Reset a milestone (set to false)
    resetMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.achieved = false;
        state.currentPosition = getCurrentPosition(state.milestones);
      }
    },

    // Add a new milestone
    addMilestone: (state, action: PayloadAction<Omit<Milestone, "id">>) => {
      const newMilestone: Milestone = {
        ...action.payload,
        id: Date.now().toString(), // Simple ID generation
      };
      state.milestones.push(newMilestone);
    },

    // Remove a milestone
    removeMilestone: (state, action: PayloadAction<string>) => {
      state.milestones = state.milestones.filter(
        (m) => m.id !== action.payload
      );
      state.currentPosition = getCurrentPosition(state.milestones);
    },

    // Update milestone details
    updateMilestone: (state, action: PayloadAction<Milestone>) => {
      const index = state.milestones.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index !== -1) {
        state.milestones[index] = action.payload;
        state.currentPosition = getCurrentPosition(state.milestones);
      }
    },

    // Reset all milestones to initial state
    resetProgression: (state) => {
      state.milestones = initialMilestones;
      state.currentPosition = getCurrentPosition(initialMilestones);
    },
  },
});

// Helper function to determine current position based on achieved milestones
function getCurrentPosition(milestones: Milestone[]): string {
  let currentPosition = "Unemployed";

  for (const milestone of milestones) {
    if (milestone.achieved) {
      currentPosition = milestone.toPosition;
    } else {
      break; // Stop at the first unachieved milestone
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
} = progressionSlice.actions;

// Selectors
export const selectMilestones = (state: { progression: ProgressionState }) =>
  state.progression.milestones;
export const selectCurrentPosition = (state: {
  progression: ProgressionState;
}) => state.progression.currentPosition;
export const selectAchievedMilestones = (state: {
  progression: ProgressionState;
}) => state.progression.milestones.filter((m) => m.achieved);
export const selectPendingMilestones = (state: {
  progression: ProgressionState;
}) => state.progression.milestones.filter((m) => !m.achieved);
export const selectProgressPercentage = (state: {
  progression: ProgressionState;
}) => {
  const total = state.progression.milestones.length;
  const achieved = state.progression.milestones.filter(
    (m) => m.achieved
  ).length;
  return total > 0 ? Math.round((achieved / total) * 100) : 0;
};

// Export reducer
export default progressionSlice.reducer;
