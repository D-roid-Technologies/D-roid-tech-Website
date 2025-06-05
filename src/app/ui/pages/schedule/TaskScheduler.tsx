import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "../../components/navbar/NavBar";
import "./TaskScheduler.css";

interface Task {
  id: string;
  content: string;
  date: Date;
  completed: boolean;
  color: string;
}

const TaskScheduler: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [selectedColor, setSelectedColor] = useState("#3b82f6");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Date navigation
  const navigateDate = (direction: "prev" | "next" | "today") => {
    const newDate = new Date(currentDate);

    if (direction === "today") {
      setCurrentDate(new Date());
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
      setCurrentDate(newDate);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      setCurrentDate(newDate);
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      setCurrentDate(newDate);
    }
  };

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      content: newTask,
      date: new Date(currentDate),
      completed: false,
      color: selectedColor,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  // Filter tasks by date
  const getFilteredTasks = () => {
    if (view === "day") {
      return tasks.filter(
        (task) => task.date.toDateString() === currentDate.toDateString()
      );
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return tasks.filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      });
    } else {
      return tasks.filter(
        (task) =>
          task.date.getMonth() === currentDate.getMonth() &&
          task.date.getFullYear() === currentDate.getFullYear()
      );
    }
  };

  // Render day view
  const renderDayView = () => {
    const dayTasks = getFilteredTasks();

    return (
      <div className="day-view">
        <h3>
          {currentDate.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {dayTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task ${task.completed ? "completed" : ""}`}
                        style={{ borderLeft: `4px solid ${task.color}` }}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleComplete(task.id)}
                        />
                        <span>{task.content}</span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="delete-btn"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return (
      <div className="week-view">
        <div className="week-header">
          {days.map((day) => (
            <div key={day.toString()} className="day-header">
              <div className="day-name">
                {day.toLocaleDateString(undefined, { weekday: "short" })}
              </div>
              <div
                className={`day-number ${
                  day.toDateString() === new Date().toDateString()
                    ? "today"
                    : ""
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="week-grid">
          {days.map((day) => {
            const dayTasks = tasks.filter(
              (task) => task.date.toDateString() === day.toDateString()
            );

            return (
              <div key={day.toString()} className="day-column">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task ${task.completed ? "completed" : ""}`}
                    style={{ borderLeft: `4px solid ${task.color}` }}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />
                    <span>{task.content}</span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return (
      <div className="month-view">
        <div className="month-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              className={`day-cell ${day ? "" : "empty"} ${
                day && day.toDateString() === new Date().toDateString()
                  ? "today"
                  : ""
              }`}
            >
              {day && (
                <>
                  <div className="day-number">{day.getDate()}</div>
                  <div className="day-tasks">
                    {tasks
                      .filter(
                        (task) =>
                          task.date.toDateString() === day.toDateString()
                      )
                      .slice(0, 2)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="task-preview"
                          style={{ backgroundColor: task.color }}
                        >
                          {task.content}
                        </div>
                      ))}
                    {tasks.filter(
                      (task) => task.date.toDateString() === day.toDateString()
                    ).length > 2 && (
                      <div className="more-tasks">
                        +
                        {tasks.filter(
                          (task) =>
                            task.date.toDateString() === day.toDateString()
                        ).length - 2}{" "}
                        more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="task-scheduler">
      <div className="scheduler-header">
        <h1>Task Scheduler</h1>
        <div className="view-controls">
          <button
            onClick={() => setView("day")}
            className={view === "day" ? "active" : ""}
          >
            Day
          </button>
          <button
            onClick={() => setView("week")}
            className={view === "week" ? "active" : ""}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={view === "month" ? "active" : ""}
          >
            Month
          </button>
        </div>
      </div>

      <div className="date-navigation">
        <div>
          <button onClick={() => navigateDate("prev")}>&lt;</button>
          <h2>
            {view === "day" &&
              currentDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            {view === "week" &&
              `Week of ${currentDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}`}
            {view === "month" &&
              currentDate.toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
          </h2>
          <button onClick={() => navigateDate("next")}>&gt;</button>
        </div>
        <button onClick={() => navigateDate("today")} className="today-btn">
          Today
        </button>
      </div>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <div className="color-picker">
          {["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"].map(
            (color) => (
              <div
                key={color}
                className={`color-option ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            )
          )}
        </div>
        <button className="add_task" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="scheduler-view">
        {view === "day" && renderDayView()}
        {view === "week" && renderWeekView()}
        {view === "month" && renderMonthView()}
      </div>
    </div>
  );
};

export default TaskScheduler;
