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

const Calendar: React.FC = () => {
    const today = dayjs();
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [view, setView] = useState("Month");
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const navigate = useNavigate();

    // events
    const [userEvents, setUserEvents] = useState<EventsMap>(() => {
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (raw) return JSON.parse(raw) as EventsMap;
        } catch { }
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
        } catch { }
    }, [userEvents]);

    // form state
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formType, setFormType] = useState("");
    const [formStartDate, setFormStartDate] = useState<string>(() => dayjs().format("YYYY-MM-DD"));
    const [formEndDate, setFormEndDate] = useState<string | "">("");

    // viewing/editing state
    const [viewingTask, setViewingTask] = useState<Task | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // search state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{ id: string; name: string; title?: string }[]>([]);
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
                // move week by -7 days; keep to week view
                const base = selectedDate ?? today;
                const newDate = base.subtract(7, "day");
                setSelectedDate(newDate);
                // if the new week is in different month, update month label
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
        } catch { }
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
        // startOf('week') uses locale default (Sun). Adjust as needed.
        const startOfWeek = base.startOf("week");
        const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
        return (
            <>
                <div style={styles.daysGrid}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} style={styles.dayLabel}>
                            {d}
                        </div>
                    ))}
                </div>
                <div style={{ ...styles.daysGrid, gridTemplateColumns: "repeat(7, 1fr)" }}>
                    {weekDays.map((date) => {
                        const isToday = date.isSame(today, "day");
                        return (
                            <div
                                key={date.format("YYYY-MM-DD")}
                                onClick={() => {
                                    setSelectedDate(date);
                                    setView("Day");
                                }}
                                style={{
                                    ...styles.dayCell,
                                    ...(isToday ? styles.todayCell : {}),
                                }}
                            >
                                <div style={{ fontWeight: 600 }}>{date.format("D")}</div>
                                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{date.format("ddd")}</div>
                                {userEvents[date.format("YYYY-MM-DD")]?.length ? (
                                    <div style={{ marginTop: "6px", height: 6, width: 6, borderRadius: 3, background: "#10b981", marginLeft: "auto", marginRight: "auto" }} />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div style={styles.calendarWrapper}>
            <div style={{ gridColumn: "1/2" }}>
                <CalendarHeader currentMonthLabel={currentMonth.format("MMMM YYYY")} view={view} onPrev={goPrev} onNext={goNext} onChangeView={(v) => setView(v)} views={views} />
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
                                <h3 style={styles.dayHeader}>{selectedDate.format("dddd, MMMM D, YYYY")}</h3>
                                <p style={{ color: "#000" }}>All tasks & events for this day are shown below</p>
                            </div>
                        </div>
                    )}

                    {/* Year view simple representation: show months grid (click month to go to Month view) */}
                    {view === "Year" && (
                        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                            {Array.from({ length: 12 }, (_, i) => {
                                const monthDate = currentMonth.month(i).startOf("month");
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setCurrentMonth(monthDate);
                                            setView("Month");
                                        }}
                                        style={{ ...styles.dayCell, padding: "1rem", textAlign: "center" }}
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
            <DayPanel
                selectedDate={selectedDate}
                isLoggedIn={isLoggedIn}
                userEvents={userEvents}
                setUserEvents={setUserEvents}
                formState={{ formTitle, formDescription, formType, formStartDate, formEndDate }}
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

            {/* User search under the panel */}
            <div style={{ gridColumn: "2/3" }}>
                <UserSearch query={searchQuery} setQuery={setSearchQuery} results={searchResults} loading={searchLoading} error={searchError} onSearch={searchUsers} navigate={(p) => navigate(p)} />
            </div>
        </div>
    );
};

export default Calendar;