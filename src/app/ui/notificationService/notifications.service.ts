import {
  setNotifications,
  addNotification,
  removeNotification,
  updateNotification,
  markAsRead,
  type Notification,
  clearNotifications,
} from "../../redux/slices/notificationSlice";
import toast from "react-hot-toast";
import { authService } from "../../redux/configuration/auth.service";
import { store } from "../../redux/Store";
import { loadFromLocalStorage } from "../../utils/localStorage";

export class NotificationsService {
  private _isInitialized = false;
  private useFirestore = true;

  // Initialize notifications on app start/login - Firestore First
  async initializeNotifications() {
    if (this._isInitialized) return;

    try {
      // ALWAYS check Firestore first (Source of Truth)
      const backendNotifications =
        await authService.getNotificationsFromBackend();

      let notificationsToSet: Notification[];

      if (backendNotifications.length > 0) {
        // Use Firestore data
        notificationsToSet = backendNotifications;
        console.log(
          "✅ Loaded notifications from Firestore:",
          notificationsToSet
        );
      } else {
        // No Firestore data, use empty array
        notificationsToSet = [];
        console.log("✅ No notifications found in Firestore");
      }

      // Update Redux store with Firestore data
      store.dispatch(setNotifications(notificationsToSet));

      this._isInitialized = true;
      console.log("✅ Notifications initialized with Firestore-first approach");
    } catch (error) {
      console.error(
        "🔥 Error initializing notifications from Firestore:",
        error
      );

      // Fallback: Check LocalStorage as cache
      const localNotifications = loadFromLocalStorage<Notification[]>(
        "notifications",
        []
      );
      if (localNotifications.length > 0) {
        store.dispatch(setNotifications(localNotifications));
        console.log("🔄 Fell back to LocalStorage cache");
      } else {
        // Ultimate fallback to empty array
        store.dispatch(setNotifications([]));
        console.log("🔄 No notifications available");
      }

      this._isInitialized = true;
    }
  }

  // Add notification without toast (for system/programmatic use)
  async addNotificationSilently(notification: Omit<Notification, "id">) {
    try {
      const newNotification: Notification = {
        ...notification,
        id: Date.now(),
      };

      // ALWAYS Firestore-first approach
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      const updatedNotifications = [...currentNotifications, newNotification];

      // 1. Sync to Firestore FIRST (Source of Truth)
      await authService.syncNotificationsToBackend(updatedNotifications);

      // 2. Then update Redux
      store.dispatch(addNotification(newNotification));

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
      // ALWAYS Firestore-first approach
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      const updatedNotifications = currentNotifications.filter(
        (notification) => notification.id !== notificationId
      );

      // 1. Sync to Firestore FIRST
      await authService.syncNotificationsToBackend(updatedNotifications);

      // 2. Then update Redux
      store.dispatch(removeNotification(notificationId));

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

  // NEW: Remove onboarding notification specifically
  async removeOnboardingNotification() {
    try {
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      const onboardingNotification = currentNotifications.find(
        (n) => n.title === "Complete Your Onboarding" && n.type === "warning"
      );

      if (onboardingNotification) {
        await this.removeNotificationSilently(onboardingNotification.id);
        console.log("🔔 Onboarding notification removed");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error(
        "🔔 Failed to remove onboarding notification:",
        error.message
      );
      throw error;
    }
  }

  // NEW: Check if onboarding notification exists
  async hasOnboardingNotification(): Promise<boolean> {
    try {
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      return currentNotifications.some(
        (n) => n.title === "Complete Your Onboarding" && n.type === "warning"
      );
    } catch (error) {
      console.error("🔔 Failed to check onboarding notification:", error);
      return false;
    }
  }

  // Add notification with toast (for user-initiated actions)
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

  // Remove notification with toast (for user-initiated actions)
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

  // Mark as read (silent by default)
  async markNotificationAsReadWithSync(notificationId: number) {
    try {
      // ALWAYS Firestore-first approach
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      const updatedNotifications = currentNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );

      // 1. Sync to Firestore FIRST
      await authService.syncNotificationsToBackend(updatedNotifications);

      // 2. Then update Redux
      store.dispatch(markAsRead(notificationId));

      return notificationId;
    } catch (error: any) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  }

  // Clear all with sync - BUT PRESERVE ONBOARDING NOTIFICATION IF INCOMPLETE
  async clearAllNotificationsWithSync() {
    try {
      // ALWAYS Firestore-first approach
      const currentNotifications =
        await authService.getNotificationsFromBackend();

      // Keep onboarding notification if onboarding is not complete
      const notificationsToKeep = currentNotifications.filter(
        (n) => n.title === "Complete Your Onboarding" && n.type === "warning"
      );

      // 1. Sync to Firestore FIRST (empty array or keep onboarding)
      await authService.syncNotificationsToBackend(notificationsToKeep);

      // 2. Then update Redux
      store.dispatch(setNotifications(notificationsToKeep));

      const clearedCount =
        currentNotifications.length - notificationsToKeep.length;

      if (clearedCount > 0) {
        toast.success(
          `Cleared ${clearedCount} notification${clearedCount > 1 ? "s" : ""}`,
          {
            style: { background: "#4BB543", color: "#fff" },
          }
        );
      } else {
        toast("No notifications to clear", {
          icon: "ℹ️",
          style: { background: "#1890ff", color: "#fff" },
        });
      }
    } catch (error: any) {
      toast.error(`Failed to clear notifications: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  // Mark multiple notifications as read
  async markMultipleAsRead(notificationIds: number[]) {
    try {
      // ALWAYS Firestore-first approach
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      const updatedNotifications = currentNotifications.map((notification) =>
        notificationIds.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      );

      // 1. Sync to Firestore FIRST
      await authService.syncNotificationsToBackend(updatedNotifications);

      // 2. Then update Redux for each notification
      notificationIds.forEach((id) => {
        store.dispatch(markAsRead(id));
      });

      console.log(`✅ ${notificationIds.length} notifications marked as read`);
      return notificationIds;
    } catch (error: any) {
      console.error("Failed to mark multiple notifications as read:", error);
      throw error;
    }
  }

  // Update notification
  async updateNotificationWithSync(updatedNotification: Notification) {
    try {
      // ALWAYS Firestore-first approach
      const currentNotifications =
        await authService.getNotificationsFromBackend();
      const updatedNotifications = currentNotifications.map((notification) =>
        notification.id === updatedNotification.id
          ? updatedNotification
          : notification
      );

      // 1. Sync to Firestore FIRST
      await authService.syncNotificationsToBackend(updatedNotifications);

      // 2. Then update Redux
      store.dispatch(updateNotification(updatedNotification));

      console.log("🔔 Notification updated:", updatedNotification.title);
      return updatedNotification;
    } catch (error: any) {
      console.error("🔔 Failed to update notification:", error.message);
      throw error;
    }
  }

  // Get notifications by filter
  getNotificationsByFilter(filter: "all" | "unread" | "read"): Notification[] {
    const notifications = this.getCurrentNotifications();

    switch (filter) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "read":
        return notifications.filter((n) => n.isRead);
      default:
        return notifications;
    }
  }

  // Get unread notifications count
  getUnreadCount(): number {
    const notifications = this.getCurrentNotifications();
    return notifications.filter((n) => !n.isRead).length;
  }

  // Check if notifications are initialized
  isServiceInitialized(): boolean {
    return this._isInitialized;
  }

  // Get current notifications from Redux
  getCurrentNotifications(): Notification[] {
    return store.getState().notifications || [];
  }

  // Refresh notifications from Firestore (force sync)
  async refreshFromFirestore() {
    try {
      console.log("🔄 Refreshing notifications from Firestore...");
      const backendNotifications =
        await authService.getNotificationsFromBackend();
      store.dispatch(setNotifications(backendNotifications));
      console.log("✅ Notifications refreshed from Firestore");
      return backendNotifications;
    } catch (error) {
      console.error(
        "🔥 Failed to refresh notifications from Firestore:",
        error
      );
      throw error;
    }
  }
}

export const notificationsService = new NotificationsService();

export const enhancedNotifications = {
  // SILENT: For system/programmatic use (no toast)
  addSilent: (notification: Omit<Notification, "id">) =>
    notificationsService.addNotificationSilently(notification),

  removeSilent: (notificationId: number) =>
    notificationsService.removeNotificationSilently(notificationId),

  removeOnboardingNotification: () =>
    notificationsService.removeOnboardingNotification(),

  hasOnboardingNotification: () =>
    notificationsService.hasOnboardingNotification(),

  // WITH TOAST: For user-initiated actions only
  addUser: (notification: Omit<Notification, "id">) =>
    notificationsService.addUserNotification(notification),

  removeUser: (notificationId: number) =>
    notificationsService.removeUserNotification(notificationId),

  // Other methods
  markAsRead: (notificationId: number) =>
    notificationsService.markNotificationAsReadWithSync(notificationId),

  markMultipleAsRead: (notificationIds: number[]) =>
    notificationsService.markMultipleAsRead(notificationIds),

  clearAll: () => notificationsService.clearAllNotificationsWithSync(),

  update: (notification: Notification) =>
    notificationsService.updateNotificationWithSync(notification),

  refresh: () => notificationsService.refreshFromFirestore(),

  // Getters
  getCurrentNotifications: () => notificationsService.getCurrentNotifications(),
  getByFilter: (filter: "all" | "unread" | "read") =>
    notificationsService.getNotificationsByFilter(filter),
  getUnreadCount: () => notificationsService.getUnreadCount(),
  isInitialized: () => notificationsService.isServiceInitialized(),
};
