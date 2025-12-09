import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Spinner outcome type
export interface SpinResult {
  outcome: number; 
  timestamp: number;
  giftAwarded: boolean;
  prizeType?: string;
}

// State interface
export interface SpinnerState {
  totalGifts: number;
  remainingGifts: number;
  userSpins: Record<string, SpinResult[]>;
  isSpinning: boolean;
  isTestingMode: boolean; // Flag to enable testing mode with unlimited spins
}

const initialState: SpinnerState = {
  totalGifts: 5,
  remainingGifts: 5,
  userSpins: {},
  isSpinning: false,
  isTestingMode: true, // testing mode ON by default
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    startSpinning: (state) => {
      state.isSpinning = true;
    },

    toggleTestingMode: (state) => {
      state.isTestingMode = !state.isTestingMode;
    },

    performSpin: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      if (!state.userSpins[userId]) {
        state.userSpins[userId] = [];
      }

      // ------------------------------
      // 🚀 TEST MODE: Unlimited spins
      // ------------------------------
      if (state.isTestingMode) {
        // Always allow a prize to be given if RNG says so,
        // and DO NOT decrease remaining gifts
        const randomPercent = Math.random() * 100;

        let outcome = 0;
        let giftAwarded = false;
        let prizeType = "No prize";

        if (randomPercent < 65) {
          outcome = 0;
          giftAwarded = false;
          prizeType = "No prize";
        } else if (randomPercent < 80) {
          outcome = 3;
          giftAwarded = true;
          prizeType = "Sweets";
        } else {
          outcome = Math.random() < 0.5 ? 5 : 6;
          giftAwarded = true;
          prizeType = "Biscuits";
        }

        const spinResult: SpinResult = {
          outcome,
          timestamp: Date.now(),
          giftAwarded,
          prizeType,
        };

        state.userSpins[userId].push(spinResult);
        return;
      }

      // --------------------------------------
      // 🛑 PRODUCTION MODE: 1 spin per day max
      // --------------------------------------
      const spins = state.userSpins[userId] || [];

      if (spins.length) {
        const lastSpin = spins[spins.length - 1];
        const lastSpinDate = new Date(lastSpin.timestamp).toDateString();
        const today = new Date().toDateString();

        if (lastSpinDate === today) {
          return; // only one per day
        }
      }

      // 🎯 Normal probability logic
      const randomPercent = Math.random() * 100;
      let outcome = 0;
      let giftAwarded = false;
      let prizeType = "No prize";

      if (randomPercent < 65) {
        outcome = 0;
        giftAwarded = false;
        prizeType = "No prize";
      } else if (randomPercent < 80) {
        outcome = 3; 
        giftAwarded = true;
        prizeType = "Sweets";
      } else {
        outcome = Math.random() < 0.5 ? 5 : 6;
        giftAwarded = true;
        prizeType = "Biscuits";
      }

      const canGiveGift = giftAwarded && state.remainingGifts > 0;

      if (giftAwarded && !canGiveGift) {
        outcome = 0;
        giftAwarded = false;
        prizeType = "No prize";
      }

      const spinResult: SpinResult = {
        outcome,
        timestamp: Date.now(),
        giftAwarded: canGiveGift,
        prizeType: canGiveGift ? prizeType : "No prize",
      };

      state.userSpins[userId].push(spinResult);

      if (canGiveGift) {
        state.remainingGifts = Math.max(0, state.remainingGifts - 1);
      }
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

// Export actions
export const {
  startSpinning,
  performSpin,
  stopSpinning,
  resetSpinner,
  toggleTestingMode,
} = spinnerSlice.actions;

// Selectors
export const selectRemainingGifts = (state: any) => state.spinner.remainingGifts;
export const selectIsSpinning = (state: any) => state.spinner.isSpinning;
export const selectUserSpins = (state: any, userId: string) => state.spinner.userSpins[userId] || [];
export const selectLatestUserSpin = (state: any, userId: string) => {
  const spins = state.spinner.userSpins[userId] || [];
  return spins.length > 0 ? spins[spins.length - 1] : null;
};

// Always allow spin in test mode
export const selectCanUserSpin = (state: any, userId: string): boolean => {
  if (state.spinner?.isTestingMode) return true;

  const spins = state.spinner?.userSpins?.[userId] || [];
  if (!spins.length) return true;

  const lastSpin = spins[spins.length - 1];
  const lastSpinDate = new Date(lastSpin.timestamp).toDateString();
  const today = new Date().toDateString();

  return lastSpinDate !== today && (state.spinner?.remainingGifts ?? 0) > 0;
};

export default spinnerSlice.reducer;
