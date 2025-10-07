import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MembershipTierState = {
  tier: string;
  nextTier?: string;
};

const initialState: MembershipTierState = {
  tier: "Gold",
  nextTier: "Platinum",
};

export const membershipTierSlice = createSlice({
  name: "membershipTier",
  initialState,
  reducers: {
    setTier: (state, action: PayloadAction<string>) => {
      state.tier = action.payload;
    },
    setNextTier: (state, action: PayloadAction<string | undefined>) => {
      state.nextTier = action.payload;
    },
    resetTier: () => initialState,
  },
});

export const { setTier, setNextTier, resetTier } = membershipTierSlice.actions;

export const selectMembershipTier = (state: any): MembershipTierState => state.membershipTier as MembershipTierState;
