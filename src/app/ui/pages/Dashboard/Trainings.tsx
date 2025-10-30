import React, { useState } from "react";
import { PlayCircle, CheckCircle, X } from "lucide-react";

// ✅ Type definition for a course
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  scheduled_date: string;
  completed: boolean;
  completed_date?: string;
}

const Trainings: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Workplace Safety Fundamentals",
      description:
        "Learn the key safety rules and emergency protocols to stay safe and ensure workplace compliance.",
      thumbnail:
        "https://cdn.pixabay.com/photo/2021/07/01/16/15/safety-first-6379751_1280.jpg",
      duration: "2h 15m",
      scheduled_date: "2025-05-22",
      completed: true,
      completed_date: "2025-05-22",
    },
    {
      id: "2",
      title: "Time Management Mastery",
      description:
        "Discover proven productivity frameworks and tools to manage your time effectively.",
      thumbnail:
        "https://cdn.pixabay.com/photo/2024/10/02/18/24/ai-generated-9091889_1280.jpg",
      duration: "1h 30m",
      scheduled_date: "2025-06-01",
      completed: false,
    },
    {
      id: "3",
      title: "Communication in the Workplace",
      description:
        "Improve your ability to communicate clearly and collaborate efficiently within any team.",
      thumbnail:
        "https://cdn.pixabay.com/photo/2024/08/21/15/33/ai-generated-8986487_1280.jpg",
      duration: "2h 45m",
      scheduled_date: "2025-06-10",
      completed: false,
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleStartLearning = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleMarkAsCompleted = (id: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, completed: true, completed_date: new Date().toISOString().split("T")[0] }
          : c
      )
    );
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "8px",
          color: "#1E3A8A",
        }}
      >
        My Courses
      </h1>
      <p style={{ color: "#6B7280", marginBottom: "24px" }}>
        Explore your assigned trainings, enhance your skills, and continue learning.
      </p>

      {/* Grid of courses */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              background: "white",
              transition: "transform 0.3s ease",
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: "relative" }}>
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                }}
              />
              {course.completed && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "4px",
                  }}
                >
                  <CheckCircle color="#10B981" size={20} />
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: "6px",
                }}
              >
                {course.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4B5563",
                  marginBottom: "10px",
                  lineHeight: 1.5,
                }}
              >
                {course.description}
              </p>

              <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "8px" }}>
                Duration: <strong>{course.duration}</strong>
              </p>
              <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "14px" }}>
                Scheduled: {course.scheduled_date}
              </p>

              <button
                onClick={() => handleStartLearning(course)}
                style={{
                  width: "100%",
                  backgroundColor: course.completed ? "#9CA3AF" : "#2563EB",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
              >
                {course.completed ? "Completed" : "Start Learning"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course modal / player */}
    {selectedCourse && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      padding: "20px", // prevent edges cutoff on small screens
    }}
  >
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        width: "100%",
        maxWidth: "600px", // smaller width for better focus
        maxHeight: "90vh", // limit height
        overflowY: "auto", // scroll if too tall
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        position: "relative",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setSelectedCourse(null)}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <X size={22} color="#9CA3AF" />
      </button>

      {/* Thumbnail */}
      <img
        src={selectedCourse.thumbnail}
        alt={selectedCourse.title}
        style={{
          width: "100%",
          height: "200px", // reduced height
          borderRadius: "8px",
          objectFit: "cover",
          marginBottom: "16px",
        }}
      />

      {/* Title */}
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "8px",
          color: "#1F2937",
        }}
      >
        {selectedCourse.title}
      </h2>

      {/* Description */}
      <p
        style={{
          color: "#4B5563",
          marginBottom: "16px",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        {selectedCourse.description}
      </p>

      {/* Lesson Section */}
      <div
        style={{
          backgroundColor: "#F9FAFB",
          borderRadius: "8px",
          padding: "14px",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "8px", color: "#374151", fontWeight: 500 }}>
          🎥 Lesson Preview (Coming Soon)
        </p>
        <div
          style={{
            height: "150px",
            backgroundColor: "#E5E7EB",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayCircle size={36} color="#2563EB" />
        </div>
      </div>

      {/* Action Button */}
      {!selectedCourse.completed && (
        <button
          onClick={() => {
            handleMarkAsCompleted(selectedCourse.id);
            setSelectedCourse(null);
          }}
          style={{
            backgroundColor: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.3s ease",
          }}
        >
          Mark as Completed
        </button>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Trainings;
