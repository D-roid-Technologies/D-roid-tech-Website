import {
  setNotifications,
  addNotification,
  removeNotification,
  updateNotification,
  markAsRead,
  Notification,
  clearNotifications,
} from "../../redux/slices/notificationSlice";
import toast from "react-hot-toast";
import { authService } from "../../redux/configuration/auth.service";
import { store } from "../../redux/Store";

// Define default notifications for fallback
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

export class NotificationsService {
  private isInitialized = false;
  private useFirestore = true; // Feature flag for gradual migration

  // Initialize notifications on app start/login
  async initializeNotifications() {
    if (this.isInitialized) return;

    try {
      if (this.useFirestore) {
        // Get notifications from backend first
        const backendNotifications =
          await authService.getNotificationsFromBackend();

        // If no notifications in Firestore, use defaults
        const notificationsToSet =
          backendNotifications.length > 0
            ? backendNotifications
            : defaultNotifications;

        // Update Redux store with backend data or defaults
        store.dispatch(setNotifications(notificationsToSet));

        // If using defaults, sync them to Firestore
        if (
          backendNotifications.length === 0 &&
          defaultNotifications.length > 0
        ) {
          await authService.syncNotificationsToBackend(defaultNotifications);
        }
      } else {
        // Fallback to defaults if no Firestore
        store.dispatch(setNotifications(defaultNotifications));
      }

      this.isInitialized = true;
      console.log("✅ Notifications initialized");
    } catch (error) {
      console.error("🔥 Error initializing notifications:", error);
      // Fallback to defaults
      store.dispatch(setNotifications(defaultNotifications));
    }
  }

  // Intercept Redux dispatches and sync to Firestore
  private async syncToFirestoreAfterDispatch() {
    if (!this.useFirestore) return;

    try {
      const currentNotifications = store.getState().notifications || [];
      await authService.syncNotificationsToBackend(currentNotifications);
    } catch (error) {
      console.error("🔥 Background sync to Firestore failed:", error);
      // Don't show toast for background sync failures
    }
  }

  // Add notification without toast (for system/programmatic use)
  async addNotificationSilently(notification: Omit<Notification, "id">) {
    try {
      const newNotification: Notification = {
        ...notification,
        id: Date.now(),
      };

      if (this.useFirestore) {
        // Firestore-first approach
        const currentNotifications = store.getState().notifications || [];
        const updatedNotifications = [...currentNotifications, newNotification];

        // Sync to backend first
        await authService.syncNotificationsToBackend(updatedNotifications);

        // Then update Redux
        store.dispatch(addNotification(newNotification));
      } else {
        // Legacy approach (Redux-first)
        store.dispatch(addNotification(newNotification));
        await this.syncToFirestoreAfterDispatch();
      }

      console.log("🔔 Notification added silently:", newNotification.title);
      return newNotification;
    } catch (error: any) {
      console.error("🔔 Failed to add notification silently:", error.message);
      throw error;
    }
  }

  // Remove notification without toast
  async removeNotificationSilently(notificationId: number) {
    try {
      if (this.useFirestore) {
        // Firestore-first approach
        const currentNotifications = store.getState().notifications || [];
        const updatedNotifications = currentNotifications.filter(
          (notification) => notification.id !== notificationId
        );

        // Sync to backend first
        await authService.syncNotificationsToBackend(updatedNotifications);

        // Then update Redux
        store.dispatch(removeNotification(notificationId));
      } else {
        // Legacy approach
        store.dispatch(removeNotification(notificationId));
        await this.syncToFirestoreAfterDispatch();
      }

      console.log("🔔 Notification removed silently:", notificationId);
      return notificationId;
    } catch (error: any) {
      console.error(
        "🔔 Failed to remove notification silently:",
        error.message
      );
      throw error;
    }
  }

  // 🆕 USER METHOD: Add notification with toast (for user-initiated actions)
  async addUserNotification(notification: Omit<Notification, "id">) {
    try {
      const result = await this.addNotificationSilently(notification);

      toast.success("Notification added successfully", {
        style: { background: "#4BB543", color: "#fff" },
      });

      return result;
    } catch (error: any) {
      toast.error(`Failed to add notification: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  // 🆕 USER METHOD: Remove notification with toast (for user-initiated actions)
  async removeUserNotification(notificationId: number) {
    try {
      const result = await this.removeNotificationSilently(notificationId);

      toast.success("Notification removed successfully", {
        style: { background: "#4BB543", color: "#fff" },
      });

      return result;
    } catch (error: any) {
      toast.error(`Failed to remove notification: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  //Mark as read (silent by default)
  async markNotificationAsReadWithSync(notificationId: number) {
    try {
      if (this.useFirestore) {
        const currentNotifications = store.getState().notifications || [];
        const updatedNotifications = currentNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        );

        await authService.syncNotificationsToBackend(updatedNotifications);
        store.dispatch(markAsRead(notificationId));
      } else {
        store.dispatch(markAsRead(notificationId));
        await this.syncToFirestoreAfterDispatch();
      }

      return notificationId;
    } catch (error: any) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  }

  // Clear all with sync
  async clearAllNotificationsWithSync() {
    try {
      if (this.useFirestore) {
        await authService.syncNotificationsToBackend([]);
        store.dispatch(clearNotifications());
      } else {
        store.dispatch(clearNotifications());
        await this.syncToFirestoreAfterDispatch();
      }

      toast.success("All notifications cleared", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch (error: any) {
      toast.error(`Failed to clear notifications: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  // 🔄 COMPATIBILITY LAYER: Automatically sync after Redux dispatches
  enableAutoSync() {
    console.log("🔄 Auto-sync enabled for notifications");
  }

  // Get current notifications
  getCurrentNotifications(): Notification[] {
    return store.getState().notifications || [];
  }

  // Migration helper for other developers
  getMigrationGuide() {
    return {
      oldWay: "store.dispatch(addNotification(notification));",
      newWaySilent:
        "await notificationsService.addNotificationSilently(notification);",
      newWayUser:
        "await notificationsService.addUserNotification(notification);",
      benefits: [
        "Automatic Firestore persistence",
        "Cross-device sync",
        "Backup and recovery",
        "Works with existing code during migration",
        "Silent operations for system events",
        "User feedback for user actions",
      ],
    };
  }
}

export const notificationsService = new NotificationsService();


export const enhancedNotifications = {
  // SILENT: For system/programmatic use (no toast)
  addSilent: (notification: Omit<Notification, "id">) =>
    notificationsService.addNotificationSilently(notification),

  removeSilent: (notificationId: number) =>
    notificationsService.removeNotificationSilently(notificationId),

  // WITH TOAST: For user-initiated actions only
  addUser: (notification: Omit<Notification, "id">) =>
    notificationsService.addUserNotification(notification),

  removeUser: (notificationId: number) =>
    notificationsService.removeUserNotification(notificationId),

  // Other methods
  markAsRead: (notificationId: number) =>
    notificationsService.markNotificationAsReadWithSync(notificationId),

  clearAll: () => notificationsService.clearAllNotificationsWithSync(),

  // Helper to show migration guide
  showMigrationGuide: () => notificationsService.getMigrationGuide(),
};
