// Calendar.tsx
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

import { Task, EventsMap, LOCAL_STORAGE_KEY, makeId } from "./types";
import styles from "./styles";
import CalendarHeader from "./CalendarHeader";
import MonthGrid from "./MonthGrid";
import DayPanel from "./DayPanel";
import UserSearch from "./UserSearch";

const views = ["Day", "Week", "Month", "Year"];

const MOBILE_BREAKPOINT = 768; // px

const Calendar: React.FC = () => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [view, setView] = useState("Month");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const navigate = useNavigate();

  // responsive
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined"
      ? window.innerWidth <= MOBILE_BREAKPOINT
      : false
  );
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setPanelOpen(false); // ensure panel not left open for desktop
    };
    window.addEventListener("resize", onResize);
    // init
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // events
  const [userEvents, setUserEvents] = useState<EventsMap>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as EventsMap;
    } catch {}
    // demo defaults
    const defaults: EventsMap = {
      [today.format("YYYY-MM-DD")]: [
        {
          id: makeId(),
          title: "Doctor appointment",
          description: "Annual checkup at clinic, bring forms",
          type: "Health",
          createdAt: dayjs().toISOString(),
          startDate: today.format("YYYY-MM-DD"),
          endDate: today.format("YYYY-MM-DD"),
        },
      ],
    };
    return defaults;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userEvents));
    } catch {}
  }, [userEvents]);

  // form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formType, setFormType] = useState("");
  const [formStartDate, setFormStartDate] = useState<string>(() =>
    dayjs().format("YYYY-MM-DD")
  );
  const [formEndDate, setFormEndDate] = useState<string | "">("");

  // viewing/editing state
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; title?: string }[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // reset form defaults helper
  const resetFormDefaults = (forDate?: Dayjs) => {
    const base = forDate ?? selectedDate ?? currentMonth.startOf("month");
    setFormTitle("");
    setFormDescription("");
    setFormType("");
    setFormStartDate(base.format("YYYY-MM-DD"));
    setFormEndDate("");
    setViewingTask(null);
    setEditingTask(null);
  };

  useEffect(() => {
    if (selectedDate) setFormStartDate(selectedDate.format("YYYY-MM-DD"));
  }, [selectedDate]);

  // Prev / Next behavior depends on current `view`
  const goPrev = () => {
    switch (view) {
      case "Day": {
        const base = selectedDate ?? today;
        const newDate = base.subtract(1, "day");
        setSelectedDate(newDate);
        if (!newDate.isSame(currentMonth, "month")) setCurrentMonth(newDate);
        setView("Day");
        break;
      }
      case "Week": {
        const base = selectedDate ?? today;
        const newDate = base.subtract(7, "day");
        setSelectedDate(newDate);
        if (!newDate.isSame(currentMonth, "month")) setCurrentMonth(newDate);
        setView("Week");
        break;
      }
      case "Month": {
        setCurrentMonth((m) => m.subtract(1, "month"));
        setView("Month");
        break;
      }
      case "Year": {
        setCurrentMonth((m) => m.subtract(1, "year"));
        setView("Year");
        break;
      }
      default:
        setCurrentMonth((m) => m.subtract(1, "month"));
        break;
    }
  };

  const goNext = () => {
    switch (view) {
      case "Day": {
        const base = selectedDate ?? today;
        const newDate = base.add(1, "day");
        setSelectedDate(newDate);
        if (!newDate.isSame(currentMonth, "month")) setCurrentMonth(newDate);
        setView("Day");
        break;
      }
      case "Week": {
        const base = selectedDate ?? today;
        const newDate = base.add(7, "day");
        setSelectedDate(newDate);
        if (!newDate.isSame(currentMonth, "month")) setCurrentMonth(newDate);
        setView("Week");
        break;
      }
      case "Month": {
        setCurrentMonth((m) => m.add(1, "month"));
        setView("Month");
        break;
      }
      case "Year": {
        setCurrentMonth((m) => m.add(1, "year"));
        setView("Year");
        break;
      }
      default:
        setCurrentMonth((m) => m.add(1, "month"));
        break;
    }
  };

  // create
  const handleCreateTask = () => {
    if (!isLoggedIn) {
      navigate("/auth/join-our-community");
      return;
    }
    const title = formTitle.trim();
    if (!title) {
      alert("Please enter a title");
      return;
    }
    const start = formStartDate;
    const end = formEndDate || start;
    const task: Task = {
      id: makeId(),
      title,
      description: formDescription.trim() || undefined,
      type: formType.trim() || undefined,
      createdAt: dayjs().toISOString(),
      startDate: start,
      endDate: end || undefined,
    };
    const dateKey = dayjs(start).format("YYYY-MM-DD");
    setUserEvents((prev) => {
      const existing = prev[dateKey] ?? [];
      return {
        ...prev,
        [dateKey]: [...existing, task],
      };
    });
    resetFormDefaults(dayjs(start));
    setSelectedDate(dayjs(start));
    setView("Day");
    if (isMobile) setPanelOpen(true); // open drawer on mobile so user sees the created event
  };

  // delete
  const handleDeleteTask = (dateKey: string, id: string) => {
    setUserEvents((prev) => {
      const arr = prev[dateKey] ?? [];
      const newArr = arr.filter((t) => t.id !== id);
      const copy = { ...prev };
      if (newArr.length > 0) copy[dateKey] = newArr;
      else delete copy[dateKey];
      return copy;
    });
    if (viewingTask?.id === id) setViewingTask(null);
    if (editingTask?.id === id) setEditingTask(null);
  };

  const handleClearTasks = (dateKey: string) => {
    setUserEvents((prev) => {
      const copy = { ...prev };
      delete copy[dateKey];
      return copy;
    });
    setViewingTask(null);
    setEditingTask(null);
  };

  // editing
  const startEditTask = (task: Task) => setEditingTask({ ...task });
  const saveEditedTask = () => {
    if (!editingTask) return;
    if (!editingTask.title.trim()) return alert("Title required");
    const task = editingTask;
    const dateKey = dayjs(task.startDate).format("YYYY-MM-DD");
    setUserEvents((prev) => {
      const newMap: EventsMap = {};
      Object.keys(prev).forEach((k) => {
        newMap[k] = prev[k].filter((t) => t.id !== task.id);
        if (newMap[k].length === 0) delete newMap[k];
      });
      const existing = newMap[dateKey] ?? [];
      newMap[dateKey] = [...existing, task];
      return newMap;
    });
    setEditingTask(null);
    setSelectedDate(dayjs(task.startDate));
    setView("Day");
    if (isMobile) setPanelOpen(true);
  };

  // user search (API then fallback)
  const searchUsers = async (q: string) => {
    setSearchError(null);
    setSearchResults([]);
    setSearchLoading(true);
    try {
      const res = await fetch(`/api/users?query=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
        setSearchLoading(false);
        return;
      }
    } catch {}
    const mock = [
      { id: "u1", name: "DroidOne_Ava", title: "AI Biologist" },
      { id: "u2", name: "DroidOne_Max", title: "Front-End Dev" },
      { id: "u3", name: "DroidOne_Rex", title: "Systems Engineer" },
    ].filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
    setTimeout(() => {
      setSearchResults(mock);
      setSearchLoading(false);
      if (mock.length === 0) setSearchError("No D'roid One users found.");
    }, 250);
  };

  // Week view rendering helper: produce startOfWeek and seven days
  const renderWeekGrid = () => {
    const base = selectedDate ?? today;
    const startOfWeek = base.startOf("week");
    const weekDays = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day")
    );
    return (
      <>
        <div style={styles.daysGrid}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} style={styles.dayLabel}>
              {d}
            </div>
          ))}
        </div>
        <div
          style={{ ...styles.daysGrid, gridTemplateColumns: "repeat(7, 1fr)" }}
        >
          {weekDays.map((date) => {
            const isToday = date.isSame(today, "day");
            return (
              <div
                key={date.format("YYYY-MM-DD")}
                onClick={() => {
                  setSelectedDate(date);
                  setView("Day");
                  if (isMobile) setPanelOpen(true);
                }}
                style={{
                  ...styles.dayCell,
                  ...(isToday ? styles.todayCell : {}),
                }}
              >
                <div style={{ fontWeight: 600 }}>{date.format("D")}</div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                  {date.format("ddd")}
                </div>
                {userEvents[date.format("YYYY-MM-DD")]?.length ? (
                  <div
                    style={{
                      marginTop: "6px",
                      height: 6,
                      width: 6,
                      borderRadius: 3,
                      background: "#10b981",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  // Inline responsive layout styles
  const desktopGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: 16,
    alignItems: "start",
  };

  const mobileMainStyle: React.CSSProperties = {
    display: "block",
  };

  const fabStyle: React.CSSProperties = {
    position: "fixed",
    right: 18,
    bottom: 18,
    zIndex: 1200,
    width: 56,
    height: 56,
    borderRadius: 28,
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    border: "none",
  };

  const drawerStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    top: "20%",
    zIndex: 1250,
    background: "#fff",
    boxShadow: "0 -8px 30px rgba(2,6,23,0.18)",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflowY: "auto",
    padding: 16,
  };

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 1240,
  };

  return (
    <div style={{ padding: 12 }}>
      <CalendarHeader
        currentMonthLabel={currentMonth.format("MMMM YYYY")}
        view={view}
        onPrev={goPrev}
        onNext={goNext}
        onChangeView={(v) => setView(v)}
        views={views}
      />

      {/* DESKTOP / TABLET layout */}
      {!isMobile && (
        <div style={{ marginTop: 12, ...desktopGridStyle }}>
          <div>
            <div style={{ marginTop: 12 }}>
              {/* Month view */}
              {view === "Month" && (
                <MonthGrid
                  currentMonth={currentMonth}
                  today={today}
                  userEvents={userEvents}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setView("Day");
                    if (isMobile) setPanelOpen(true);
                  }}
                  resetFormDefaults={resetFormDefaults}
                />
              )}

              {/* Week view */}
              {view === "Week" && <div>{renderWeekGrid()}</div>}

              {/* Day selected box (when in Day view) */}
              {view === "Day" && selectedDate && (
                <div style={{ marginTop: 12 }}>
                  <div style={styles.singleDayBox}>
                    <h3 style={styles.dayHeader}>
                      {selectedDate.format("dddd, MMMM D, YYYY")}
                    </h3>
                    <p style={{ color: "#000" }}>
                      All tasks & events for this day are shown below
                    </p>
                  </div>
                </div>
              )}

              {/* Year view */}
              {view === "Year" && (
                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthDate = currentMonth.month(i).startOf("month");
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setCurrentMonth(monthDate);
                          setView("Month");
                        }}
                        style={{
                          ...styles.dayCell,
                          padding: "1rem",
                          textAlign: "center",
                        }}
                      >
                        {monthDate.format("MMMM")}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right side panel (day panel + user search) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <DayPanel
              selectedDate={selectedDate}
              isLoggedIn={isLoggedIn}
              userEvents={userEvents}
              setUserEvents={setUserEvents}
              formState={{
                formTitle,
                formDescription,
                formType,
                formStartDate,
                formEndDate,
              }}
              formSetters={{
                setFormTitle,
                setFormDescription,
                setFormType,
                setFormStartDate,
                setFormEndDate,
                resetFormDefaults,
              }}
              onCreateTask={handleCreateTask}
              viewingTask={viewingTask}
              setViewingTask={setViewingTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              onEditSave={saveEditedTask}
              onDeleteTask={handleDeleteTask}
              onClearTasks={handleClearTasks}
              navigateToLogin={() => navigate("/auth/join-our-community")}
            />

            <UserSearch
              query={searchQuery}
              setQuery={setSearchQuery}
              results={searchResults}
              loading={searchLoading}
              error={searchError}
              onSearch={searchUsers}
              navigate={(p) => navigate(p)}
            />
          </div>
        </div>
      )}

      {/* MOBILE layout */}
      {isMobile && (
        <div style={{ marginTop: 12, ...mobileMainStyle }}>
          {/* Calendar content stacked vertically */}
          {/* Month */}
          {view === "Month" && (
            <MonthGrid
              currentMonth={currentMonth}
              today={today}
              userEvents={userEvents}
              onSelectDate={(d) => {
                setSelectedDate(d);
                setView("Day");
                setPanelOpen(true);
              }}
              resetFormDefaults={resetFormDefaults}
            />
          )}

          {/* Week */}
          {view === "Week" && <div>{renderWeekGrid()}</div>}

          {/* Day header */}
          {view === "Day" && selectedDate && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.singleDayBox}>
                <h3 style={styles.dayHeader}>
                  {selectedDate.format("dddd, MMMM D, YYYY")}
                </h3>
                <p style={{ color: "#000" }}>
                  All tasks & events for this day are shown below
                </p>
              </div>
            </div>
          )}

          {/* Year */}
          {view === "Year" && (
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const monthDate = currentMonth.month(i).startOf("month");
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrentMonth(monthDate);
                      setView("Month");
                    }}
                    style={{
                      ...styles.dayCell,
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {monthDate.format("MMMM")}
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating Action Button to open DayPanel / search */}
          <button
            aria-label="Open panel"
            title="Open panel"
            style={fabStyle}
            onClick={() => setPanelOpen(true)}
          >
            +
          </button>

          {/* Drawer for DayPanel + UserSearch */}
          {panelOpen && (
            <>
              <div style={backdropStyle} onClick={() => setPanelOpen(false)} />
              <div style={drawerStyle}>
                <div
                  style={{
                    color: "#000000",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <strong>Panel</strong>
                  <button
                    onClick={() => setPanelOpen(false)}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: 20,
                      color: "red",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <DayPanel
                  selectedDate={selectedDate}
                  isLoggedIn={isLoggedIn}
                  userEvents={userEvents}
                  setUserEvents={setUserEvents}
                  formState={{
                    formTitle,
                    formDescription,
                    formType,
                    formStartDate,
                    formEndDate,
                  }}
                  formSetters={{
                    setFormTitle,
                    setFormDescription,
                    setFormType,
                    setFormStartDate,
                    setFormEndDate,
                    resetFormDefaults,
                  }}
                  onCreateTask={(...args) => {
                    handleCreateTask();
                    // note: handleCreateTask already opens panel on mobile.
                  }}
                  viewingTask={viewingTask}
                  setViewingTask={setViewingTask}
                  editingTask={editingTask}
                  setEditingTask={setEditingTask}
                  onEditSave={saveEditedTask}
                  onDeleteTask={(dateKey: string, id: string) => {
                    handleDeleteTask(dateKey, id);
                  }}
                  onClearTasks={(dateKey: string) => {
                    handleClearTasks(dateKey);
                  }}
                  navigateToLogin={() => {
                    setPanelOpen(false);
                    navigate("/auth/join-our-community");
                  }}
                />

                {/* <div style={{ marginTop: 12 }}>
                  <UserSearch
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    results={searchResults}
                    loading={searchLoading}
                    error={searchError}
                    onSearch={searchUsers}
                    navigate={(p) => {
                      setPanelOpen(false);
                      navigate(p);
                    }}
                  />
                </div> */}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
