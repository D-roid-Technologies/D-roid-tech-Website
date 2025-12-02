import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlayCircle, CheckCircle, X } from "lucide-react";
import { RootState } from "../../../redux/Store";
import { markTrainingAsCompleted, Training } from "../../../redux/slices/TrainingsSlice";

const Trainings: React.FC = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.trainings);

  const [selectedCourse, setSelectedCourse] = useState<Training | null>(null);

  const handleStartLearning = (course: Training) => {
    setSelectedCourse(course);
  };

  const handleMarkAsCompleted = (course: Training) => {
    dispatch(markTrainingAsCompleted(course));
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
     {/* Grid of courses OR Empty State */}
{courses.length === 0 ? (
  <div
    style={{
      textAlign: "center",
      padding: "60px 20px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    }}
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
      alt="No Courses"
      style={{ width: "120px", marginBottom: "20px", opacity: 0.8 }}
    />

    <h2
      style={{
        fontSize: "20px",
        fontWeight: 600,
        marginBottom: "6px",
        color: "#1E3A8A",
      }}
    >
      No Trainings Assigned
    </h2>

    <p style={{ fontSize: "14px", color: "#6B7280" }}>
      You currently have no assigned trainings.  
      Please check back later.
    </p>
  </div>
) : (
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
            Scheduled: {course.scheduledDate}
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
)}


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
      padding: "20px", 
    }}
  >
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        width: "100%",
        maxWidth: "600px", 
        maxHeight: "90vh", 
        overflowY: "auto", 
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
            handleMarkAsCompleted(selectedCourse);
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
