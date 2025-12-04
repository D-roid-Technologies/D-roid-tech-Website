import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Spinner outcome type
export interface SpinResult {
  outcome: number; // 0-6, where 0 = no reward
  timestamp: number;
  giftAwarded: boolean;
}

// State interface
export interface SpinnerState {
  totalGifts: number; // Total gifts available (5)
  remainingGifts: number; // Gifts still available
  userSpins: Record<string, SpinResult>; // userId -> spin result
  isSpinning: boolean; // Animation state
}

// Initial state
const initialState: SpinnerState = {
  totalGifts: 5,
  remainingGifts: 5,
  userSpins: {},
  isSpinning: false,
};

/**
 * Generate weighted random outcome
 * 75-80% chance of outcome 0 (no reward)
 * 20-25% chance of outcomes 1-6 (potential reward)
 */
const generateWeightedOutcome = (): number => {
  const random = Math.random();
  
  // 77.5% chance (middle of 75-80% range) for outcome 0
  if (random < 0.775) {
    return 0;
  }
  
  // Remaining 22.5% distributed among outcomes 1-6
  return Math.floor(Math.random() * 6) + 1;
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    // Start spinning animation
    startSpinning: (state) => {
      state.isSpinning = true;
    },

    // Perform the spin for a user
    performSpin: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      // Check if user already spun
      if (state.userSpins[userId]) {
        state.isSpinning = false;
        return;
      }

      // Generate outcome
      const outcome = generateWeightedOutcome();
      
      // Determine if gift is awarded
      // Gift awarded only if: outcome is not 0 AND gifts are still available
      const giftAwarded = outcome !== 0 && state.remainingGifts > 0;

      // Record the spin
      state.userSpins[userId] = {
        outcome,
        timestamp: Date.now(),
        giftAwarded,
      };

      // Decrement remaining gifts if awarded
      if (giftAwarded) {
        state.remainingGifts = Math.max(0, state.remainingGifts - 1);
      }

      state.isSpinning = false;
    },

    // Stop spinning animation
    stopSpinning: (state) => {
      state.isSpinning = false;
    },

    // Reset spinner state (admin/testing purposes)
    resetSpinner: (state) => {
      state.remainingGifts = state.totalGifts;
      state.userSpins = {};
      state.isSpinning = false;
    },

    // Reset specific user's spin (admin/testing purposes)
    resetUserSpin: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userSpin = state.userSpins[userId];
      
      if (userSpin && userSpin.giftAwarded) {
        // Restore the gift if it was awarded
        state.remainingGifts = Math.min(
          state.totalGifts,
          state.remainingGifts + 1
        );
      }
      
      delete state.userSpins[userId];
    },

    // Set remaining gifts (admin purposes)
    setRemainingGifts: (state, action: PayloadAction<number>) => {
      state.remainingGifts = Math.max(
        0,
        Math.min(state.totalGifts, action.payload)
      );
    },
  },
});

// Export actions
export const {
  startSpinning,
  performSpin,
  stopSpinning,
  resetSpinner,
  resetUserSpin,
  setRemainingGifts,
} = spinnerSlice.actions;

// Selectors
export const selectSpinnerState = (state: any): SpinnerState =>
  state.spinner as SpinnerState;

export const selectRemainingGifts = (state: any): number =>
  state.spinner?.remainingGifts ?? 0;

export const selectIsSpinning = (state: any): boolean =>
  state.spinner?.isSpinning ?? false;

export const selectUserSpin = (state: any, userId: string): SpinResult | null =>
  state.spinner?.userSpins?.[userId] ?? null;

export const selectHasUserSpun = (state: any, userId: string): boolean =>
  !!state.spinner?.userSpins?.[userId];

export const selectCanUserSpin = (state: any, userId: string): boolean => {
  const hasSpun = selectHasUserSpun(state, userId);
  return !hasSpun;
};

export const selectAllSpins = (state: any): Record<string, SpinResult> =>
  state.spinner?.userSpins ?? {};

// Export reducer
export default spinnerSlice.reducer;
