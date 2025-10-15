// store/slices/notificationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

const LOCAL_KEY = "notifications";

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: string;
  isRead: boolean;
}

const defaultNotifications: Notification[] = [
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

const initialState: Notification[] = loadFromLocalStorage<Notification[]>(LOCAL_KEY, defaultNotifications);

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (_, action: PayloadAction<Notification[]>) => {
            saveToLocalStorage(LOCAL_KEY, action.payload);
            return action.payload;
        },
        clearNotifications: () => {
            saveToLocalStorage(LOCAL_KEY, []);
            return [];
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.push(action.payload);
            saveToLocalStorage(LOCAL_KEY, state);
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            const filtered = state.filter(
                (notification) => notification.id !== action.payload
            );
            saveToLocalStorage(LOCAL_KEY, filtered);
            return filtered;
        },
        updateNotification: (state, action: PayloadAction<Notification>) => {
            const index = state.findIndex(
                (notification) => notification.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = action.payload;
                saveToLocalStorage(LOCAL_KEY, state);
            }
        },
        markAsRead: (state, action: PayloadAction<number>) => {
            const notification = state.find(
                (notification) => notification.id === action.payload
            );
            if (notification) {
                notification.isRead = true;
                saveToLocalStorage(LOCAL_KEY, state);
            }
        },
    },
});

export const { 
    setNotifications, 
    clearNotifications, 
    addNotification, 
    removeNotification, 
    updateNotification, 
    markAsRead 
} = notificationsSlice.actions;
export default notificationsSlice.reducer;