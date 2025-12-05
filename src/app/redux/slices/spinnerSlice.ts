 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
// Spinner outcome type
export interface SpinResult {
  outcome: number; // The ID of the segment
  timestamp: number;
  giftAwarded: boolean;
  prizeType?: string;
}
 
// State interface
export interface SpinnerState {
  totalGifts: number;
  remainingGifts: number;
  userSpins: Record<string, SpinResult>;
  isSpinning: boolean;
}
 
const initialState: SpinnerState = {
  totalGifts: 5,
  remainingGifts: 5,
  userSpins: {},
  isSpinning: false,
};
 
export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    startSpinning: (state) => {
      state.isSpinning = true;
    },
 
    performSpin: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
 
      if (state.userSpins[userId]) {
        return; // Already spun
      }
 
      // Probability Logic
      const randomPercent = Math.random() * 100;
      let outcome = 0;
      let giftAwarded = false;
      let prizeType = "No prize";
 
      // 0-65% -> Try Again (Outcome 0)
      // 65-80% -> Sweets (Outcome 3) [15% chance]
      // 80-100% -> Biscuits (Outcome 5 or 6) [20% chance]
      
      if (randomPercent < 65) {
        outcome = 0; // Try Again
        giftAwarded = false;
        prizeType = "No prize";
      } else if (randomPercent < 80) {
        outcome = 3; // Sweets
        giftAwarded = true;
        prizeType = "Sweets";
      } else {
        // Biscuits (Split evenly between the two biscuit slots 5 & 6)
        outcome = Math.random() < 0.5 ? 5 : 6;
        giftAwarded = true;
        prizeType = "Biscuits";
      }
 
      // Check gift availability
      const canGiveGift = giftAwarded && state.remainingGifts > 0;
 
      // Final fallback: If gift won but none left, force "Try Again"
      if (giftAwarded && !canGiveGift) {
        outcome = 0;
        giftAwarded = false;
        prizeType = "No prize";
      }
 
      // Record the spin
      state.userSpins[userId] = {
        outcome: outcome,
        timestamp: Date.now(),
        giftAwarded: canGiveGift,
        prizeType: canGiveGift ? prizeType : "No prize",
      };
 
      if (canGiveGift) {
        state.remainingGifts = Math.max(0, state.remainingGifts - 1);
      }
      
      // IMPORTANT: We do NOT set isSpinning = false here.
      // We let the Component do that after the animation finishes.
    },
 
    stopSpinning: (state) => {
      state.isSpinning = false;
    },
 
    resetSpinner: (state) => {
      state.remainingGifts = state.totalGifts;
      state.userSpins = {};
      state.isSpinning = false;
    },
  },
});
 
export const { startSpinning, performSpin, stopSpinning, resetSpinner } = spinnerSlice.actions;
 
// Selectors
export const selectRemainingGifts = (state: any) => state.spinner.remainingGifts;
export const selectIsSpinning = (state: any) => state.spinner.isSpinning;
export const selectUserSpin = (state: any, userId: string) => state.spinner.userSpins[userId];
export const selectCanUserSpin = (state: any, userId: string) =>
  !state.spinner.userSpins[userId] && state.spinner.remainingGifts > 0;
 
export default spinnerSlice.reducer;