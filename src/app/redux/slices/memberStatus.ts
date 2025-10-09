// src/redux/slices/memberStatsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FaIdCard, FaGift, FaCalendarAlt, FaAward } from "react-icons/fa";

export type MemberStat = {
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType; // react-icons type
    color: string;
};

const initialState: MemberStat[] = [
    {
        title: "Membership Status",
        value: "Active",
        change: "Silver member since 2023",
        icon: FaIdCard,
        color: "green",
    },
    // {
    //     title: "Points Balance",
    //     value: "2,450",
    //     change: "150 points earned this month",
    //     icon: FaGift,
    //     color: "blue",
    // },
    // {
    //     title: "Events Attended",
    //     value: "18",
    //     change: "5 events this quarter",
    //     icon: FaCalendarAlt,
    //     color: "purple",
    // },
    {
        title: "Member Level",
        value: "Gold",
        change: "Next level: Platinum",
        icon: FaAward,
        color: "orange",
    },
];

export const memberStatsSlice = createSlice({
    name: "memberStats",
    initialState,
    reducers: {
        updateStat: (state, action: PayloadAction<{ index: number; value: string; change?: string }>) => {
            const { index, value, change } = action.payload;
            if (state[index]) {
                state[index].value = value;
                if (change) state[index].change = change;
            }
        },
        resetStats: () => initialState,
    },
});

export const { updateStat, resetStats } = memberStatsSlice.actions;
export default memberStatsSlice.reducer;