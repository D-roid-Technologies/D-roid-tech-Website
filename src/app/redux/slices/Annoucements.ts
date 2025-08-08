import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "System Maintenance",
    message: "Scheduled maintenance this Friday at 10 PM.",
    date: "2025-05-15",
    time: "1 day ago",
    type: "warning",
    isRead: false,
  },
  {
    id: 2,
    title: "New Policy Update",
    message: "Please review the updated attendance policy.",
    date: "2025-05-12",
    time: "2 hours ago",
    type: "info",
    isRead: false,
  },
];

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    addAnnouncement: (state, action) => {
      state.push(action.payload);
    },
    removeAnnouncement: (state, action) => {
      return state.filter(
        (announcement) => announcement.id !== action.payload.id
      );
    },
    updateAnnouncement: (state, action) => {
      const index = state.findIndex(
        (announcement) => announcement.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addAnnouncement, removeAnnouncement, updateAnnouncement } =
  announcementSlice.actions;
export default announcementSlice.reducer;
