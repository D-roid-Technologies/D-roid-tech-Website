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
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    type: "warning",
    isRead: false,
  },
  {
    id: 2,
    title: "New Policy Update",
    message: "Please review the updated attendance policy.",
    date: "2025-05-12",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    type: "info",
    isRead: false,
  },
];

// Migration function to fix old notification format
function migrateNotifications(notifications: Notification[]): Notification[] {
  if (!Array.isArray(notifications)) {
    console.error("Invalid notifications data, using defaults");
    return defaultNotifications;
  }
  
  return notifications.map(notification => {
    // Ensure notification has required fields
    if (!notification || typeof notification !== 'object') {
      console.warn("Invalid notification object, skipping");
      return null;
    }
    
    // Check if time exists and is valid
    let validTime = notification.time;
    
    if (!notification.time) {
      console.warn(`Missing time for notification: ${notification.title}, using current time`);
      validTime = new Date().toISOString();
    } else {
      const timeDate = new Date(notification.time);
      
      // If invalid, convert to ISO string or use current time
      if (isNaN(timeDate.getTime())) {
        console.warn(`Migrating invalid notification time for: ${notification.title}`, notification.time);
        validTime = new Date().toISOString();
      }
    }
    
    return {
      ...notification,
      time: validTime
    };
  }).filter(n => n !== null); // Remove any null entries
}

const loadedNotifications = loadFromLocalStorage<Notification[]>(LOCAL_KEY, defaultNotifications);
const initialState: Notification[] = migrateNotifications(loadedNotifications);

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