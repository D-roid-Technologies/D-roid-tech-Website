// store/slices/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import { addTask, updateTaskStatus, deleteTask, updateTask } from "./tasksSlice";
import { setOnboardingComplete, markStepCompleted } from "./onboarding";
import { markTrainingAsCompleted } from "./TrainingsSlice";
import { addEntry } from "./SignInAndOutSlice";

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

// KEEP THE DEFAULT NOTIFICATIONS
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

  return notifications
    .map((notification) => {
      if (!notification || typeof notification !== "object") {
        console.warn("Invalid notification object, skipping");
        return null;
      }

      let validTime = notification.time;

      if (!notification.time) {
        console.warn(
          `Missing time for notification: ${notification.title}, using current time`
        );
        validTime = new Date().toISOString();
      } else {
        const timeDate = new Date(notification.time);

        if (isNaN(timeDate.getTime())) {
          console.warn(
            `Migrating invalid notification time for: ${notification.title}`,
            notification.time
          );
          validTime = new Date().toISOString();
        }
      }

      return {
        ...notification,
        time: validTime,
      };
    })
    .filter((n) => n !== null);
}

// Use empty array as initial state - defaults will be handled by the service
const loadedNotifications = loadFromLocalStorage<Notification[]>(LOCAL_KEY, []);
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
  extraReducers: (builder) => {
    builder
      .addCase(addTask, (state, action) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: "New Task Created",
          message: `A new task "${action.payload.title}" has been created.`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "task",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      })
      .addCase(updateTaskStatus, (state, action) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: "Task Status Updated",
          message: `Task status has been updated to "${action.payload.status}".`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "task",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      })
      .addCase(deleteTask, (state, action) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: "Task Deleted",
          message: `A task has been removed from the list.`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "task",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      })
      .addCase(updateTask, (state, action) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: "Task Updated",
          message: `Task "${action.payload.title}" details have been updated.`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "task",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      })
      .addCase(setOnboardingComplete, (state, action) => {
        if (action.payload) {
          const newNotification: Notification = {
            id: Date.now(),
            title: "Onboarding Completed",
            message: "Congratulations! You have successfully completed the onboarding process.",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toISOString(),
            type: "info",
            isRead: false,
          };
          state.unshift(newNotification);
          saveToLocalStorage(LOCAL_KEY, state);
        }
      })
      .addCase(markStepCompleted, (state, action) => {
        const stepIndex = action.payload;
        const stepNames = ["View Info", "Personal Info", "Documents", "Leave"]; // Mapping step index to names
        const stepName = stepNames[stepIndex] || `Step ${stepIndex + 1}`;
        
        const newNotification: Notification = {
          id: Date.now(),
          title: "Onboarding Step Completed",
          message: `You have completed the "${stepName}" step of onboarding.`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "info",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      })
      .addCase(markTrainingAsCompleted, (state, action) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: "Training Completed",
          message: `You have successfully completed the training: "${action.payload.title}".`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "info",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      })
      .addCase(addEntry, (state, action) => {
        const newNotification: Notification = {
          id: Date.now(),
          title: action.payload.type === "Sign In" ? "Signed In" : "Signed Out",
          message: `You have successfully ${action.payload.type.toLowerCase()} at ${action.payload.timestamp}.`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString(),
          type: "info",
          isRead: false,
        };
        state.unshift(newNotification);
        saveToLocalStorage(LOCAL_KEY, state);
      });
  },
});

export const {
  setNotifications,
  clearNotifications,
  addNotification,
  removeNotification,
  updateNotification,
  markAsRead,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
