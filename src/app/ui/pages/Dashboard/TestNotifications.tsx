import React from "react";
import {
  enhancedNotifications,
  notificationsService,
} from "../../notificationService/notifications.service";

export const TestNotifications: React.FC = () => {
  const testSilentNotification = async () => {
    try {
      const result = await enhancedNotifications.addSilent({
        title: "🧪 Test Silent Notification",
        message: "This should NOT show a toast to the user",
        type: "info",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });
      console.log("Silent notification result:", result);
    } catch (error) {
      console.error("Silent notification failed:", error);
    }
  };

  const testUserNotification = async () => {
    try {
      const result = await enhancedNotifications.addUser({
        title: "🎯 Test User Notification",
        message: "This SHOULD show a toast to the user",
        type: "success",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });
      console.log("User notification result:", result);
    } catch (error) {
      console.error("User notification failed:", error);
    }
  };

  const checkFirestore = async () => {
    try {
      const { authService } = await import(
        "../../../redux/configuration/auth.service"
      );
      const notifications = await authService.getNotificationsFromBackend();
      console.log("📊 Firestore notifications:", notifications);
      alert(`Firestore has ${notifications.length} notifications`);
    } catch (error) {
      console.error("Firestore check failed:", error);
    }
  };

  const clearAll = async () => {
    try {
      await enhancedNotifications.clearAll();
      console.log("All notifications cleared");
    } catch (error) {
      console.error("Clear failed:", error);
    }
  };

  const checkCurrentNotifications = () => {
    // Use notificationsService instead of enhancedNotifications
    const current = notificationsService.getCurrentNotifications();
    console.log("📱 Current Redux notifications:", current);
    alert(`Redux has ${current.length} notifications`);
  };

  const checkMigrationGuide = () => {
    const guide = enhancedNotifications.showMigrationGuide();
    console.log("📖 Migration Guide:", guide);
  };

  return (
    <div
      style={{ padding: "20px", border: "2px solid #007acc", margin: "10px" }}
    >
      <h3>🧪 Notifications Test Panel</h3>
      <button onClick={testSilentNotification} style={buttonStyle}>
        Test Silent Notification
      </button>
      <button onClick={testUserNotification} style={buttonStyle}>
        Test User Notification
      </button>
      <button onClick={checkFirestore} style={buttonStyle}>
        Check Firestore
      </button>
      <button onClick={checkCurrentNotifications} style={buttonStyle}>
        Check Redux
      </button>
      <button onClick={checkMigrationGuide} style={buttonStyle}>
        Show Migration Guide
      </button>
      <button onClick={clearAll} style={buttonStyle}>
        Clear All
      </button>
    </div>
  );
};

const buttonStyle = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  backgroundColor: "#007acc",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
