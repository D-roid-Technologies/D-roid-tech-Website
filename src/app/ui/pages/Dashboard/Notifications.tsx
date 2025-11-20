import React, { useState, useEffect } from "react";
import { Bell, Clock, Calendar, Tag, Trash2, CheckCheck } from "lucide-react";
import styles from "./Notifications.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setNotifications,
  type Notification,
} from "../../../redux/slices/notificationSlice";
import { RootState } from "../../../redux/Store";
import TimeLabel from "../../../utils/TimeLabel";
import {
  enhancedNotifications,
  notificationsService,
} from "../../../ui/notificationService/notifications.service";

type FilterType = "all" | "unread" | "read";

const Notifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(false);

  const notifications = useSelector(
    (state: RootState) => state.notifications || []
  );
  const dispatch = useDispatch();

  // Debug: Log notifications when they change
  useEffect(() => {
    console.log("🔔 Notifications in Notifications.tsx:", notifications);
    console.log("🔔 Total notifications count:", notifications.length);
  }, [notifications]);

  // Initialize notifications on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await notificationsService.initializeNotifications();
      } catch (error) {
        console.error("Failed to initialize notifications:", error);
      }
    };
    initialize();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      setIsLoading(true);
      await enhancedNotifications.markAsRead(id);
      console.log("✅ Notification marked as read and synced to Firestore");
    } catch (error) {
      console.error("❌ Failed to mark notification as read:", error);
      // Fallback: Use Redux directly if service fails
      dispatch(
        setNotifications(
          notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveNotification = async (id: number) => {
    try {
      setIsLoading(true);
      await enhancedNotifications.removeUser(id); // Use removeUser since this is user-initiated
      console.log("✅ Notification removed and synced to Firestore");
    } catch (error) {
      console.error("❌ Failed to remove notification:", error);
      // Fallback: Use Redux directly if service fails
      dispatch(setNotifications(notifications.filter((n) => n.id !== id)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    try {
      setIsLoading(true);
      await enhancedNotifications.clearAll();
      console.log("✅ All notifications cleared and synced to Firestore");
    } catch (error) {
      console.error("❌ Failed to clear all notifications:", error);
      // Fallback: Use Redux directly if service fails
      dispatch(setNotifications([]));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setIsLoading(true);
      const unreadNotifications = notifications.filter((n) => !n.isRead);

      // Mark each unread notification as read
      for (const notification of unreadNotifications) {
        await enhancedNotifications.markAsRead(notification.id);
      }

      console.log(
        "✅ All notifications marked as read and synced to Firestore"
      );
    } catch (error) {
      console.error("❌ Failed to mark all as read:", error);
      // Fallback: Use Redux directly if service fails
      dispatch(
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotifications = notifications.filter((n: Notification) => {
    if (activeFilter === "unread") return !n.isRead;
    if (activeFilter === "read") return n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.subtitle}>
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${
                unreadCount > 1 ? "s" : ""
              }`
            : "All caught up!"}
        </p>

        {/* Bulk Actions */}
        {notifications.length > 0 && (
          <div className={styles.bulkActions}>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={isLoading}
                className={`${styles.bulkButton} ${styles.markAllReadButton}`}
              >
                <CheckCheck size={16} />
                Mark All as Read
              </button>
            )}
            <button
              onClick={handleClearAll}
              disabled={isLoading}
              className={`${styles.bulkButton} ${styles.clearAllButton}`}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeFilter === "all" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("all")}
        >
          All ({notifications.length})
        </button>
        <button
          className={`${styles.tab} ${
            activeFilter === "unread" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("unread")}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`${styles.tab} ${
            activeFilter === "read" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("read")}
        >
          Read ({notifications.length - unreadCount})
        </button>
      </div>

      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <span>Syncing with server...</span>
        </div>
      )}

      {filteredNotifications.length === 0 ? (
        <div className={styles.emptyState}>
          <Bell className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No notifications</h3>
          <p className={styles.emptyMessage}>
            {activeFilter === "unread"
              ? "You have no unread notifications"
              : activeFilter === "read"
              ? "You have no read notifications"
              : "You have no notifications at this time"}
          </p>
        </div>
      ) : (
        <div className={styles.notificationsList}>
          {[...filteredNotifications]
            .reverse()
            .map((notification: Notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationCard} ${
                  !notification.isRead ? styles.unread : ""
                }`}
              >
                <div className={styles.notificationHeader}>
                  <h2 className={styles.notificationTitle}>
                    {notification.title}
                  </h2>
                  <div
                    className={`${styles.statusBadge} ${
                      notification.isRead ? styles.read : styles.unread
                    }`}
                  >
                    <span
                      className={`${styles.statusDot} ${
                        notification.isRead ? styles.read : styles.unread
                      }`}
                    ></span>
                    {notification.isRead ? "Read" : "Unread"}
                  </div>
                </div>

                <p className={styles.notificationMessage}>
                  {notification.message}
                </p>

                <div className={styles.notificationMeta}>
                  <div className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    <span>{notification.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock className={styles.metaIcon} />
                    <span>
                      <TimeLabel date={notification.time} />
                    </span>
                  </div>
                  <div className={styles.typeBadge}>
                    <Tag className={styles.metaIcon} />
                    <span>{notification.type}</span>
                  </div>
                </div>

                <div className={styles.actions}>
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      disabled={isLoading}
                      className={`${styles.actionButton} ${styles.markReadButton}`}
                    >
                      <CheckCheck size={16} />
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveNotification(notification.id)}
                    disabled={isLoading}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
