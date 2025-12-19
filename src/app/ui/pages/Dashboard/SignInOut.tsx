import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { authService } from "../../../redux/configuration/auth.service";
import { format, parseISO, parse } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Entry, addEntry } from "../../../redux/slices/SignInAndOutSlice";
import { useDispatch } from "react-redux";
import "./SignInOut.css";
import { enhancedNotifications } from "../../notificationService/notifications.service";

const SignInOut: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [logs, setLogs] = useState<Entry[]>([]);
  const [isSigningIn, setIsSigningIn] = useState(true);

  const user = useSelector((state: RootState) => state.user);
  const userLogs = useSelector(
    (state: RootState) => state.SignInO.staffSignInAndOut as Entry[]
  );

  useEffect(() => {
    setEmail(user.email);
    setEmployeeId(user.uniqueId);
    setIsSigningIn(!getLastStatus());
    setLogs(userLogs);
  }, [user.email, user.uniqueId, userLogs]);

  useEffect(() => {
    if (!navigator.onLine) {
      toast.error("You're offline. Automatically signing out.");
      setIsSigningIn(false);
    }
  }, []);

  const getLastStatus = () => {
    if (logs.length === 0) return false;
    const lastEntry = logs[logs.length - 1];
    return lastEntry.type === "Sign In";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error("You must be online to sign in or out.");
      return;
    }

    if (email !== user?.email || employeeId !== user?.uniqueId) {
      toast.error("Email or ID does not match your account.");
      return;
    }

    if (isSigningIn && getLastStatus()) {
      toast.error("You're already signed in. Please sign out first.");
      return;
    }

    if (!isSigningIn && !getLastStatus()) {
      toast.error("You're already signed out. Please sign in first.");
      return;
    }

    const entry: Entry = {
      email,
      employeeId,
      timestamp: new Date().toLocaleString(),
      type: isSigningIn ? "Sign In" : "Sign Out",
    };

    try {
      await authService.logStaffSignInOut(entry);
      dispatch(addEntry(entry));

      // Create notification data
      const userName = user.firstName
        ? `${user.firstName} ${user.lastName}`
        : user.email;
      const notificationTitle = isSigningIn ? "👤 Signed In" : "🚪 Signed Out";
      const notificationMessage = `${userName} ${
        isSigningIn ? "signed in" : "signed out"
      } at ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;

      // Send notification using enhancedNotifications
      const now = new Date();
      await enhancedNotifications.addSilent({
        title: notificationTitle,
        message: notificationMessage,
        isRead: false,
        type: "info" as const,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        // category: "attendance" as const,
        // priority: "medium" as const,
        // icon: isSigningIn ? "👤" : "🚪",
      });

      toast.success(`${entry.type} recorded!`);
    } catch (error) {
      toast.error("Failed to record sign-in/out.");
    }
  };

  const getWorkedHoursData = () => {
    const dailyData: { [key: string]: number } = {};
    const formatString = "dd/MM/yyyy, HH:mm:ss";

    for (let i = 0; i < logs.length - 1; i += 2) {
      const inTimestamp = logs[i].timestamp;
      const outTimestamp = logs[i + 1]?.timestamp;

      const inTime = inTimestamp.includes("T")
        ? parseISO(inTimestamp)
        : parse(inTimestamp, formatString, new Date());

      const outTime = outTimestamp.includes("T")
        ? parseISO(outTimestamp)
        : parse(outTimestamp, formatString, new Date());

      if (isNaN(inTime.getTime()) || isNaN(outTime.getTime())) {
        continue;
      }

      const hours = (outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60);
      const date = format(inTime, "yyyy-MM-dd");
      dailyData[date] = (dailyData[date] || 0) + hours;
    }

    return Object.entries(dailyData).map(([date, hours]) => ({
      date,
      hours: parseFloat(hours.toFixed(2)),
    }));
  };

  return (
    <div className="sio-wrapper">
      <div className="sio-container">
        {/* Status Card */}
        <div
          className={`sio-status-card ${
            getLastStatus() ? "sio-status-active" : "sio-status-inactive"
          }`}
        >
          <div className="sio-status-indicator">
            <span
              className={`sio-status-dot ${
                getLastStatus() ? "sio-dot-active" : "sio-dot-inactive"
              }`}
            ></span>
            <span className="sio-status-text">
              {getLastStatus() ? "Currently Signed In" : "Currently Signed Out"}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="sio-grid">
          {/* Form Section */}
          <div className="sio-form-card">
            <h2 className="sio-form-title">Attendance Management</h2>
            <form onSubmit={handleSubmit} className="sio-form">
              <div className="sio-input-group">
                <label className="sio-label">Email Address</label>
                <input
                  className="sio-input"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="sio-input-group">
                <label className="sio-label">Employee ID</label>
                <input
                  className="sio-input"
                  type="text"
                  placeholder="Enter your employee ID"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>

              <div className="sio-toggle-group">
                <label className="sio-toggle-label">
                  <input
                    type="radio"
                    className="sio-radio"
                    checked={isSigningIn}
                    onChange={() => setIsSigningIn(true)}
                  />
                  <span className="sio-radio-text">Sign In</span>
                </label>
                <label className="sio-toggle-label">
                  <input
                    type="radio"
                    className="sio-radio"
                    checked={!isSigningIn}
                    onChange={() => setIsSigningIn(false)}
                  />
                  <span className="sio-radio-text">Sign Out</span>
                </label>
              </div>

              <button type="submit" className="sio-submit-btn">
                {isSigningIn ? "Sign In" : "Sign Out"}
              </button>
            </form>
          </div>

          {/* Chart Section */}
          <div className="sio-chart-card">
            <h3 className="sio-chart-title">Hours Worked Overview</h3>
            <div className="sio-chart-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={getWorkedHoursData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    stroke="#d1d5db"
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    stroke="#d1d5db"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="sio-logs-card">
          <h3 className="sio-logs-title">Sign In/Out History</h3>
          <div className="sio-table-wrapper">
            <table className="sio-table">
              <thead className="sio-table-head">
                <tr>
                  <th className="sio-table-header">Email</th>
                  <th className="sio-table-header">Employee ID</th>
                  <th className="sio-table-header">Action</th>
                  <th className="sio-table-header">Timestamp</th>
                </tr>
              </thead>
              <tbody className="sio-table-body">
                {userLogs.length > 0 ? (
                  userLogs.map((log, index) => (
                    <tr key={index} className="sio-table-row">
                      <td className="sio-table-cell">{log.email}</td>
                      <td className="sio-table-cell">{log.employeeId}</td>
                      <td className="sio-table-cell">
                        <span
                          className={`sio-badge ${
                            log.type === "Sign In"
                              ? "sio-badge-in"
                              : "sio-badge-out"
                          }`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="sio-table-cell">{log.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="sio-table-empty">
                      No logs available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInOut;
