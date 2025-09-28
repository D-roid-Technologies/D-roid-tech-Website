import React, { useState } from "react";
import styles from "./classes/CreateClassForm.module.css";
import { Assets } from "../../../utils/constant/Assets";

type Subject = {
  name: string;
  code: string;
  description: string;
};

type Student = {
  id: string;
  name: string;
  email: string;
  enrollmentStatus: string;
};

type Teacher = {
  name: string;
  email: string;
};

type TimetableEntry = {
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
};

type Exam = {
  title: string;
  date: string;
  maxMarks: string;
  subject: string;
};

const CreateClassForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [classData, setClassData] = useState({
    classDetails: {
      className: "",
      classCode: "",
      level: "",
      subject: "",
      teacher: "",
      schedule: "",
      room: "",
      capacity: "",
      term: "",
      academicYear: "",
      department: "",
      mode: "",
      description: "",
    },
    subjects: [
      {
        name: "",
        code: "",
        description: "",
      },
    ],
    students: [
      {
        id: "",
        name: "",
        email: "",
        enrollmentStatus: "",
      },
    ],
    subjectTeachers: {} as Record<string, Teacher[]>,
    timetable: [
      {
        day: "",
        subject: "",
        startTime: "",
        endTime: "",
        room: "",
      },
    ],
    exams: {
      internal: [
        {
          title: "",
          date: "",
          maxMarks: "",
          subject: "",
        },
      ],
      external: [
        {
          title: "",
          date: "",
          maxMarks: "",
          subject: "",
        },
      ],
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateClassDetails = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setClassData((prev) => ({
      ...prev,
      classDetails: { ...prev.classDetails, [name]: value },
    }));
  };

  const updateSubjectField = (
    index: number,
    field: keyof Subject,
    value: string
  ) => {
    const newSubjects = [...classData.subjects];
    newSubjects[index][field] = value;
    setClassData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  const addSubject = () => {
    setClassData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", code: "", description: "" }],
    }));
  };

  const removeSubject = (index: number) => {
    const newSubjects = classData.subjects.filter((_, i) => i !== index);
    setClassData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  // Student management functions
  const updateStudentField = (
    index: number,
    field: keyof Student,
    value: string
  ) => {
    const newStudents = [...classData.students];
    newStudents[index][field] = value;
    setClassData((prev) => ({ ...prev, students: newStudents }));
  };

  const addStudent = () => {
    setClassData((prev) => ({
      ...prev,
      students: [
        ...prev.students,
        { id: "", name: "", email: "", enrollmentStatus: "" },
      ],
    }));
  };

  const removeStudent = (index: number) => {
    const newStudents = classData.students.filter((_, i) => i !== index);
    setClassData((prev) => ({ ...prev, students: newStudents }));
  };

  // Subject teacher management functions
  const updateSubjectTeacher = (
    subject: string,
    teacherIndex: number,
    field: keyof Teacher,
    value: string
  ) => {
    const newSubjectTeachers = { ...classData.subjectTeachers };
    if (!newSubjectTeachers[subject]) {
      newSubjectTeachers[subject] = [{ name: "", email: "" }];
    }
    newSubjectTeachers[subject][teacherIndex][field] = value;
    setClassData((prev) => ({ ...prev, subjectTeachers: newSubjectTeachers }));
  };

  const addSubjectTeacher = (subject: string) => {
    const newSubjectTeachers = { ...classData.subjectTeachers };
    if (!newSubjectTeachers[subject]) {
      newSubjectTeachers[subject] = [];
    }
    newSubjectTeachers[subject].push({ name: "", email: "" });
    setClassData((prev) => ({ ...prev, subjectTeachers: newSubjectTeachers }));
  };

  const removeSubjectTeacher = (subject: string, teacherIndex: number) => {
    const newSubjectTeachers = { ...classData.subjectTeachers };
    if (newSubjectTeachers[subject]) {
      newSubjectTeachers[subject] = newSubjectTeachers[subject].filter(
        (_, i) => i !== teacherIndex
      );
    }
    setClassData((prev) => ({ ...prev, subjectTeachers: newSubjectTeachers }));
  };

  // Timetable management functions
  const updateTimetableEntry = (
    index: number,
    field: keyof TimetableEntry,
    value: string
  ) => {
    const newTimetable = [...classData.timetable];
    newTimetable[index][field] = value;
    setClassData((prev) => ({ ...prev, timetable: newTimetable }));
  };

  const addTimetableEntry = () => {
    setClassData((prev) => ({
      ...prev,
      timetable: [
        ...prev.timetable,
        { day: "", subject: "", startTime: "", endTime: "", room: "" },
      ],
    }));
  };

  const removeTimetableEntry = (index: number) => {
    const newTimetable = classData.timetable.filter((_, i) => i !== index);
    setClassData((prev) => ({ ...prev, timetable: newTimetable }));
  };

  // Exam management functions
  const updateExam = (
    examType: "internal" | "external",
    index: number,
    field: keyof Exam,
    value: string
  ) => {
    const newExams = { ...classData.exams };
    newExams[examType][index][field] = value;
    setClassData((prev) => ({ ...prev, exams: newExams }));
  };

  const addExam = (examType: "internal" | "external") => {
    const newExams = { ...classData.exams };
    newExams[examType].push({ title: "", date: "", maxMarks: "", subject: "" });
    setClassData((prev) => ({ ...prev, exams: newExams }));
  };

  const removeExam = (examType: "internal" | "external", index: number) => {
    const newExams = { ...classData.exams };
    newExams[examType] = newExams[examType].filter((_, i) => i !== index);
    setClassData((prev) => ({ ...prev, exams: newExams }));
  };

  const handleFinalSubmit = () => {
    console.log("Submitting full class:", classData);
    // TODO: send classData to backend API
  };

  const getStepTitle = () => {
    const titles = [
      "Class Details",
      "Subjects",
      "Students",
      "Subject Teachers",
      "Timetable",
      "Exams",
    ];
    return titles[step - 1];
  };

  const renderFormField = (
    key: string,
    value: string,
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void,
    isRequired: boolean = true
  ) => {
    const isTextarea = key === "description";
    const isSelect = key === "mode";
    const type =
      key === "capacity"
        ? "number"
        : key === "schedule"
        ? "datetime-local"
        : "text";

    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    if (isSelect) {
      return (
        <div key={key} className={styles.inputField}>
          <label htmlFor={key} className={styles.inputLabel}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
          <select
            id={key}
            name={key}
            value={value}
            onChange={onChange}
            required={isRequired}
            className={styles.select}
          >
            <option value="">Select Mode</option>
            <option value="online">Online</option>
            <option value="in-person">In-person</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      );
    }

    if (isTextarea) {
      return (
        <div key={key} className={styles.inputField}>
          <label htmlFor={key} className={styles.inputLabel}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
          <textarea
            id={key}
            name={key}
            value={value}
            onChange={onChange}
            rows={5}
            placeholder="Optional description or notes"
            className={styles.textarea}
          />
        </div>
      );
    }

    return (
      <div key={key} className={styles.inputField}>
        <label htmlFor={key} className={styles.inputLabel}>
          {label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
        <input
          id={key}
          type={type}
          name={key}
          value={value}
          onChange={onChange}
          required={isRequired}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={styles.input}
        />
      </div>
    );
  };

  return (
    <div className={styles.createClassFormContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Create New Class</h2>
          <div className={styles.stepIndicator}>
            <span className={styles.stepBadge}>
              Step {step} of {totalSteps}: {getStepTitle()}
            </span>
          </div>
        </div>

        <div className={styles.classForm}>
          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <div className={styles.progressText}>
              {Math.round((step / totalSteps) * 100)}% Complete
            </div>
          </div>

          {/* Step Navigation Dots */}
          <div className={styles.stepNavigation}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`${styles.stepDot} ${
                  i + 1 < step
                    ? styles.completed
                    : i + 1 === step
                    ? styles.active
                    : ""
                }`}
              />
            ))}
          </div>

          <div className={styles.formContent}>
            {/* Step 1: Class Details */}
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
                className={styles.formSection}
              >
                <h3 className={styles.sectionTitle}>
                  📚 Basic Class Information
                </h3>
                <div className={styles.inputGroup}>
                  <div className={styles.inputRow}>
                    {Object.entries(classData.classDetails)
                      .slice(0, 2)
                      .map(([key, value]) =>
                        renderFormField(
                          key,
                          value,
                          updateClassDetails,
                          key !== "description" && key !== "department"
                        )
                      )}
                  </div>
                  <div className={styles.inputRow}>
                    {Object.entries(classData.classDetails)
                      .slice(2, 4)
                      .map(([key, value]) =>
                        renderFormField(
                          key,
                          value,
                          updateClassDetails,
                          key !== "description" && key !== "department"
                        )
                      )}
                  </div>
                  <div className={styles.inputRow}>
                    {Object.entries(classData.classDetails)
                      .slice(4, 6)
                      .map(([key, value]) =>
                        renderFormField(
                          key,
                          value,
                          updateClassDetails,
                          key !== "description" && key !== "department"
                        )
                      )}
                  </div>
                  <div className={styles.inputRow}>
                    {Object.entries(classData.classDetails)
                      .slice(6, 8)
                      .map(([key, value]) =>
                        renderFormField(
                          key,
                          value,
                          updateClassDetails,
                          key !== "description" && key !== "department"
                        )
                      )}
                  </div>
                  <div className={styles.inputRow}>
                    {Object.entries(classData.classDetails)
                      .slice(8, 10)
                      .map(([key, value]) =>
                        renderFormField(
                          key,
                          value,
                          updateClassDetails,
                          key !== "description" && key !== "department"
                        )
                      )}
                  </div>
                  <div className={styles.inputRow}>
                    {Object.entries(classData.classDetails)
                      .slice(10, 12)
                      .map(([key, value]) =>
                        renderFormField(
                          key,
                          value,
                          updateClassDetails,
                          key !== "description" && key !== "department"
                        )
                      )}
                  </div>
                  <div className={styles.fullWidth}>
                    {renderFormField(
                      "description",
                      classData.classDetails.description,
                      updateClassDetails,
                      false
                    )}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <div></div>
                  <button type="submit" className={styles.primaryButton}>
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Subjects */}
            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>📖 Class Subjects</h3>

                  {classData.subjects.map((subject, index) => (
                    <div key={index} className={styles.subjectCard}>
                      <div className={styles.dynamicSectionHeader}>
                        <h4 className={styles.dynamicSectionTitle}>
                          Subject {index + 1}
                        </h4>
                        {classData.subjects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSubject(index)}
                            className={styles.removeButton}
                          >
                            Remove Subject
                          </button>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <div className={styles.inputRow}>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Subject Name{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="text"
                              value={subject.name}
                              onChange={(e) =>
                                updateSubjectField(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Enter subject name"
                              className={styles.input}
                            />
                          </div>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Subject Code{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="text"
                              value={subject.code}
                              onChange={(e) =>
                                updateSubjectField(
                                  index,
                                  "code",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Enter subject code"
                              className={styles.input}
                            />
                          </div>
                        </div>
                        <div className={styles.inputField}>
                          <label className={styles.inputLabel}>
                            Description
                          </label>
                          <textarea
                            value={subject.description}
                            onChange={(e) =>
                              updateSubjectField(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Optional description"
                            rows={3}
                            className={styles.textarea}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addSubject}
                    className={styles.addButton}
                  >
                    + Add Subject
                  </button>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.secondaryButton}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.primaryButton}>
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Students */}
            {step === 3 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>👥 Add Students</h3>

                  {classData.students.map((student, index) => (
                    <div key={index} className={styles.studentCard}>
                      <div className={styles.dynamicSectionHeader}>
                        <h4 className={styles.dynamicSectionTitle}>
                          Student {index + 1}
                        </h4>
                        {classData.students.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStudent(index)}
                            className={styles.removeButton}
                          >
                            Remove Student
                          </button>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <div className={styles.inputRow}>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Student ID{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="text"
                              value={student.id}
                              onChange={(e) =>
                                updateStudentField(index, "id", e.target.value)
                              }
                              required
                              placeholder="Enter student ID"
                              className={styles.input}
                            />
                          </div>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Student Name{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="text"
                              value={student.name}
                              onChange={(e) =>
                                updateStudentField(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Enter student name"
                              className={styles.input}
                            />
                          </div>
                        </div>
                        <div className={styles.inputRow}>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Email <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="email"
                              value={student.email}
                              onChange={(e) =>
                                updateStudentField(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Enter student email"
                              className={styles.input}
                            />
                          </div>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Enrollment Status{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <select
                              value={student.enrollmentStatus}
                              onChange={(e) =>
                                updateStudentField(
                                  index,
                                  "enrollmentStatus",
                                  e.target.value
                                )
                              }
                              required
                              className={styles.select}
                            >
                              <option value="">Select Status</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="pending">Pending</option>
                              <option value="graduated">Graduated</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addStudent}
                    className={styles.addButton}
                  >
                    + Add Student
                  </button>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.secondaryButton}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.primaryButton}>
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Subject Teachers */}
            {step === 4 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>
                    👨‍🏫 Assign Subject Teachers
                  </h3>

                  {classData.subjects.map((subject, subjectIndex) => (
                    <div
                      key={subjectIndex}
                      className={styles.teacherAssignmentCard}
                    >
                      <div className={styles.teacherAssignmentHeader}>
                        <h4 className={styles.dynamicSectionTitle}>
                          {subject.name}
                        </h4>
                        <span className={styles.subjectBadge}>
                          {subject.code}
                        </span>
                      </div>

                      {(classData.subjectTeachers[subject.name] || []).map(
                        (teacher, teacherIndex) => (
                          <div
                            key={teacherIndex}
                            className={styles.teacherGrid}
                          >
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Teacher Name{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="text"
                                value={teacher.name}
                                onChange={(e) =>
                                  updateSubjectTeacher(
                                    subject.name,
                                    teacherIndex,
                                    "name",
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="Enter teacher name"
                                className={styles.input}
                              />
                            </div>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Teacher Email{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="email"
                                value={teacher.email}
                                onChange={(e) =>
                                  updateSubjectTeacher(
                                    subject.name,
                                    teacherIndex,
                                    "email",
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="Enter teacher email"
                                className={styles.input}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                removeSubjectTeacher(subject.name, teacherIndex)
                              }
                              className={styles.removeButton}
                            >
                              Remove
                            </button>
                          </div>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() => addSubjectTeacher(subject.name)}
                        className={styles.addButton}
                      >
                        + Add Teacher for {subject.name}
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.secondaryButton}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.primaryButton}>
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {/* Step 5: Timetable */}
            {step === 5 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
              >
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>📅 Create Timetable</h3>

                  {classData.timetable.map((entry, index) => (
                    <div key={index} className={styles.timetableCard}>
                      <div className={styles.dynamicSectionHeader}>
                        <h4 className={styles.dynamicSectionTitle}>
                          Time Slot {index + 1}
                        </h4>
                        {classData.timetable.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTimetableEntry(index)}
                            className={styles.removeButton}
                          >
                            Remove Entry
                          </button>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <div className={styles.inputRowThree}>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Day <span className={styles.required}>*</span>
                            </label>
                            <select
                              value={entry.day}
                              onChange={(e) =>
                                updateTimetableEntry(
                                  index,
                                  "day",
                                  e.target.value
                                )
                              }
                              required
                              className={styles.select}
                            >
                              <option value="">Select Day</option>
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                              <option value="Sunday">Sunday</option>
                            </select>
                          </div>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Subject <span className={styles.required}>*</span>
                            </label>
                            <select
                              value={entry.subject}
                              onChange={(e) =>
                                updateTimetableEntry(
                                  index,
                                  "subject",
                                  e.target.value
                                )
                              }
                              required
                              className={styles.select}
                            >
                              <option value="">Select Subject</option>
                              {classData.subjects.map(
                                (subject, subjectIndex) => (
                                  <option
                                    key={subjectIndex}
                                    value={subject.name}
                                  >
                                    {subject.name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Room <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="text"
                              value={entry.room}
                              onChange={(e) =>
                                updateTimetableEntry(
                                  index,
                                  "room",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Enter room number"
                              className={styles.input}
                            />
                          </div>
                        </div>
                        <div className={styles.inputRow}>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              Start Time{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="time"
                              value={entry.startTime}
                              onChange={(e) =>
                                updateTimetableEntry(
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                              required
                              className={styles.input}
                            />
                          </div>
                          <div className={styles.inputField}>
                            <label className={styles.inputLabel}>
                              End Time{" "}
                              <span className={styles.required}>*</span>
                            </label>
                            <input
                              type="time"
                              value={entry.endTime}
                              onChange={(e) =>
                                updateTimetableEntry(
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                              required
                              className={styles.input}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addTimetableEntry}
                    className={styles.addButton}
                  >
                    + Add Timetable Entry
                  </button>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.secondaryButton}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.primaryButton}>
                    Next Step →
                  </button>
                </div>
              </form>
            )}

            {/* Step 6: Exams */}
            {step === 6 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFinalSubmit();
                }}
              >
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>📝 Setup Exams</h3>

                  {/* Internal Exams */}
                  <div className={styles.examTypeSection}>
                    <h4 className={styles.examTypeTitle}>Internal Exams</h4>

                    {classData.exams.internal.map((exam, index) => (
                      <div key={index} className={styles.examCard}>
                        <div className={styles.dynamicSectionHeader}>
                          <h5 className={styles.dynamicSectionTitle}>
                            Internal Exam {index + 1}
                          </h5>
                          {classData.exams.internal.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExam("internal", index)}
                              className={styles.removeButton}
                            >
                              Remove Exam
                            </button>
                          )}
                        </div>

                        <div className={styles.inputGroup}>
                          <div className={styles.inputRow}>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Exam Title{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="text"
                                value={exam.title}
                                onChange={(e) =>
                                  updateExam(
                                    "internal",
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="Enter exam title"
                                className={styles.input}
                              />
                            </div>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Subject{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <select
                                value={exam.subject}
                                onChange={(e) =>
                                  updateExam(
                                    "internal",
                                    index,
                                    "subject",
                                    e.target.value
                                  )
                                }
                                required
                                className={styles.select}
                              >
                                <option value="">Select Subject</option>
                                {classData.subjects.map(
                                  (subject, subjectIndex) => (
                                    <option
                                      key={subjectIndex}
                                      value={subject.name}
                                    >
                                      {subject.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <div className={styles.inputRow}>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Date <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="date"
                                value={exam.date}
                                onChange={(e) =>
                                  updateExam(
                                    "internal",
                                    index,
                                    "date",
                                    e.target.value
                                  )
                                }
                                required
                                className={styles.input}
                              />
                            </div>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Max Marks{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="number"
                                value={exam.maxMarks}
                                onChange={(e) =>
                                  updateExam(
                                    "internal",
                                    index,
                                    "maxMarks",
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="Enter max marks"
                                className={styles.input}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addExam("internal")}
                      className={styles.addButton}
                    >
                      + Add Internal Exam
                    </button>
                  </div>

                  {/* External Exams */}
                  <div className={styles.examTypeSection}>
                    <h4 className={styles.examTypeTitle}>External Exams</h4>

                    {classData.exams.external.map((exam, index) => (
                      <div key={index} className={styles.examCard}>
                        <div className={styles.dynamicSectionHeader}>
                          <h5 className={styles.dynamicSectionTitle}>
                            External Exam {index + 1}
                          </h5>
                          {classData.exams.external.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExam("external", index)}
                              className={styles.removeButton}
                            >
                              Remove Exam
                            </button>
                          )}
                        </div>

                        <div className={styles.inputGroup}>
                          <div className={styles.inputRow}>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Exam Title{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="text"
                                value={exam.title}
                                onChange={(e) =>
                                  updateExam(
                                    "external",
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="Enter exam title"
                                className={styles.input}
                              />
                            </div>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Subject{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <select
                                value={exam.subject}
                                onChange={(e) =>
                                  updateExam(
                                    "external",
                                    index,
                                    "subject",
                                    e.target.value
                                  )
                                }
                                required
                                className={styles.select}
                              >
                                <option value="">Select Subject</option>
                                {classData.subjects.map(
                                  (subject, subjectIndex) => (
                                    <option
                                      key={subjectIndex}
                                      value={subject.name}
                                    >
                                      {subject.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <div className={styles.inputRow}>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Date <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="date"
                                value={exam.date}
                                onChange={(e) =>
                                  updateExam(
                                    "external",
                                    index,
                                    "date",
                                    e.target.value
                                  )
                                }
                                required
                                className={styles.input}
                              />
                            </div>
                            <div className={styles.inputField}>
                              <label className={styles.inputLabel}>
                                Max Marks{" "}
                                <span className={styles.required}>*</span>
                              </label>
                              <input
                                type="number"
                                value={exam.maxMarks}
                                onChange={(e) =>
                                  updateExam(
                                    "external",
                                    index,
                                    "maxMarks",
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="Enter max marks"
                                className={styles.input}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addExam("external")}
                      className={styles.addButton}
                    >
                      + Add External Exam
                    </button>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={prevStep}
                    className={styles.secondaryButton}
                  >
                    ← Back
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    🎉 Create Class
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassForm;

// import React, { useState } from "react";

// type Subject = {
//   name: string;
//   code: string;
//   description: string;
// };

// type Student = {
//   id: string;
//   name: string;
//   email: string;
//   enrollmentStatus: string;
// };

// type Teacher = {
//   name: string;
//   email: string;
// };

// type TimetableEntry = {
//   day: string;
//   subject: string;
//   startTime: string;
//   endTime: string;
//   room: string;
// };

// type Exam = {
//   title: string;
//   date: string;
//   maxMarks: string;
//   subject: string;
// };

// const CreateClassForm: React.FC = () => {
//   const [step, setStep] = useState(1);

//   const [classData, setClassData] = useState({
//     classDetails: {
//       className: "",
//       classCode: "",
//       level: "",
//       subject: "",
//       teacher: "",
//       schedule: "",
//       room: "",
//       capacity: "",
//       term: "",
//       academicYear: "",
//       department: "",
//       mode: "",
//       description: "",
//     },
//     subjects: [
//       {
//         name: "",
//         code: "",
//         description: "",
//       },
//     ],
//     students: [
//       {
//         id: "",
//         name: "",
//         email: "",
//         enrollmentStatus: "",
//       },
//     ],
//     subjectTeachers: {} as Record<string, Teacher[]>,
//     timetable: [
//       {
//         day: "",
//         subject: "",
//         startTime: "",
//         endTime: "",
//         room: "",
//       },
//     ],
//     exams: {
//       internal: [
//         {
//           title: "",
//           date: "",
//           maxMarks: "",
//           subject: "",
//         },
//       ],
//       external: [
//         {
//           title: "",
//           date: "",
//           maxMarks: "",
//           subject: "",
//         },
//       ],
//     },
//   });

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   const updateClassDetails = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setClassData((prev) => ({
//       ...prev,
//       classDetails: { ...prev.classDetails, [name]: value },
//     }));
//   };

//   const updateSubjectField = (
//     index: number,
//     field: keyof Subject,
//     value: string
//   ) => {
//     const newSubjects = [...classData.subjects];
//     newSubjects[index][field] = value;
//     setClassData((prev) => ({ ...prev, subjects: newSubjects }));
//   };

//   const addSubject = () => {
//     setClassData((prev) => ({
//       ...prev,
//       subjects: [...prev.subjects, { name: "", code: "", description: "" }],
//     }));
//   };

//   const removeSubject = (index: number) => {
//     const newSubjects = classData.subjects.filter((_, i) => i !== index);
//     setClassData((prev) => ({ ...prev, subjects: newSubjects }));
//   };

//   // Student management functions
//   const updateStudentField = (
//     index: number,
//     field: keyof Student,
//     value: string
//   ) => {
//     const newStudents = [...classData.students];
//     newStudents[index][field] = value;
//     setClassData((prev) => ({ ...prev, students: newStudents }));
//   };

//   const addStudent = () => {
//     setClassData((prev) => ({
//       ...prev,
//       students: [
//         ...prev.students,
//         { id: "", name: "", email: "", enrollmentStatus: "" },
//       ],
//     }));
//   };

//   const removeStudent = (index: number) => {
//     const newStudents = classData.students.filter((_, i) => i !== index);
//     setClassData((prev) => ({ ...prev, students: newStudents }));
//   };

//   // Subject teacher management functions
//   const updateSubjectTeacher = (
//     subject: string,
//     teacherIndex: number,
//     field: keyof Teacher,
//     value: string
//   ) => {
//     const newSubjectTeachers = { ...classData.subjectTeachers };
//     if (!newSubjectTeachers[subject]) {
//       newSubjectTeachers[subject] = [{ name: "", email: "" }];
//     }
//     newSubjectTeachers[subject][teacherIndex][field] = value;
//     setClassData((prev) => ({ ...prev, subjectTeachers: newSubjectTeachers }));
//   };

//   const addSubjectTeacher = (subject: string) => {
//     const newSubjectTeachers = { ...classData.subjectTeachers };
//     if (!newSubjectTeachers[subject]) {
//       newSubjectTeachers[subject] = [];
//     }
//     newSubjectTeachers[subject].push({ name: "", email: "" });
//     setClassData((prev) => ({ ...prev, subjectTeachers: newSubjectTeachers }));
//   };

//   const removeSubjectTeacher = (subject: string, teacherIndex: number) => {
//     const newSubjectTeachers = { ...classData.subjectTeachers };
//     if (newSubjectTeachers[subject]) {
//       newSubjectTeachers[subject] = newSubjectTeachers[subject].filter(
//         (_, i) => i !== teacherIndex
//       );
//     }
//     setClassData((prev) => ({ ...prev, subjectTeachers: newSubjectTeachers }));
//   };

//   // Timetable management functions
//   const updateTimetableEntry = (
//     index: number,
//     field: keyof TimetableEntry,
//     value: string
//   ) => {
//     const newTimetable = [...classData.timetable];
//     newTimetable[index][field] = value;
//     setClassData((prev) => ({ ...prev, timetable: newTimetable }));
//   };

//   const addTimetableEntry = () => {
//     setClassData((prev) => ({
//       ...prev,
//       timetable: [
//         ...prev.timetable,
//         { day: "", subject: "", startTime: "", endTime: "", room: "" },
//       ],
//     }));
//   };

//   const removeTimetableEntry = (index: number) => {
//     const newTimetable = classData.timetable.filter((_, i) => i !== index);
//     setClassData((prev) => ({ ...prev, timetable: newTimetable }));
//   };

//   // Exam management functions
//   const updateExam = (
//     examType: "internal" | "external",
//     index: number,
//     field: keyof Exam,
//     value: string
//   ) => {
//     const newExams = { ...classData.exams };
//     newExams[examType][index][field] = value;
//     setClassData((prev) => ({ ...prev, exams: newExams }));
//   };

//   const addExam = (examType: "internal" | "external") => {
//     const newExams = { ...classData.exams };
//     newExams[examType].push({ title: "", date: "", maxMarks: "", subject: "" });
//     setClassData((prev) => ({ ...prev, exams: newExams }));
//   };

//   const removeExam = (examType: "internal" | "external", index: number) => {
//     const newExams = { ...classData.exams };
//     newExams[examType] = newExams[examType].filter((_, i) => i !== index);
//     setClassData((prev) => ({ ...prev, exams: newExams }));
//   };

//   const handleFinalSubmit = () => {
//     console.log("Submitting full class:", classData);
//     // TODO: send classData to backend API
//   };

//   const renderFormField = (
//     key: string,
//     value: string,
//     onChange: (
//       e: React.ChangeEvent<
//         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//       >
//     ) => void,
//     isRequired: boolean = true
//   ) => {
//     const isTextarea = key === "description";
//     const isSelect = key === "mode";
//     const type =
//       key === "capacity"
//         ? "number"
//         : key === "schedule"
//         ? "datetime-local"
//         : "text";

//     const label = key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());

//     const fieldStyle = {
//       padding: "10px 14px",
//       fontSize: 15,
//       borderRadius: 8,
//       border: "1.5px solid #cbd5e1",
//       transition: "border-color 0.3s ease",
//     };

//     if (isSelect) {
//       return (
//         <div key={key} style={{ display: "flex", flexDirection: "column" }}>
//           <label
//             htmlFor={key}
//             style={{
//               fontWeight: 600,
//               marginBottom: 6,
//               color: "#334155",
//               fontSize: 14,
//             }}
//           >
//             {label}
//           </label>
//           <select
//             id={key}
//             name={key}
//             value={value}
//             onChange={onChange}
//             required={isRequired}
//             style={{
//               ...fieldStyle,
//               backgroundColor: "#fff",
//             }}
//             onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//             onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//           >
//             <option value="">Select Mode</option>
//             <option value="online">Online</option>
//             <option value="in-person">In-person</option>
//             <option value="hybrid">Hybrid</option>
//           </select>
//         </div>
//       );
//     }

//     if (isTextarea) {
//       return (
//         <div key={key} style={{ display: "flex", flexDirection: "column" }}>
//           <label
//             htmlFor={key}
//             style={{
//               fontWeight: 600,
//               marginBottom: 6,
//               color: "#334155",
//               fontSize: 14,
//             }}
//           >
//             {label}
//           </label>
//           <textarea
//             id={key}
//             name={key}
//             value={value}
//             onChange={onChange}
//             rows={5}
//             placeholder="Optional description or notes"
//             style={{
//               ...fieldStyle,
//               padding: 12,
//               resize: "vertical",
//               fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//             }}
//             onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//             onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//           />
//         </div>
//       );
//     }

//     return (
//       <div key={key} style={{ display: "flex", flexDirection: "column" }}>
//         <label
//           htmlFor={key}
//           style={{
//             fontWeight: 600,
//             marginBottom: 6,
//             color: "#334155",
//             fontSize: 14,
//           }}
//         >
//           {label}
//         </label>
//         <input
//           id={key}
//           type={type}
//           name={key}
//           value={value}
//           onChange={onChange}
//           required={isRequired}
//           placeholder={`Enter ${label.toLowerCase()}`}
//           style={fieldStyle}
//           onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//           onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//         />
//       </div>
//     );
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 900,
//         margin: "40px auto",
//         padding: 40,
//         backgroundColor: "#f9fafb",
//         borderRadius: 16,
//         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       }}
//     >
//       <h2
//         style={{
//           fontSize: 28,
//           fontWeight: 700,
//           marginBottom: 40,
//           color: "#0f172a",
//           textAlign: "center",
//           letterSpacing: "0.03em",
//         }}
//       >
//         Create New Class – Step {step}
//       </h2>

//       {/* Step 1: Class Details */}
//       {step === 1 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 24 }}
//         >
//           {Object.entries(classData.classDetails).map(([key, value]) =>
//             renderFormField(
//               key,
//               value,
//               updateClassDetails,
//               key !== "description" && key !== "department"
//             )
//           )}

//           <button
//             type="submit"
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Next
//           </button>
//         </form>
//       )}

//       {/* Step 2: Subjects */}
//       {step === 2 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 30 }}
//         >
//           {classData.subjects.map((subject, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: 12,
//                 padding: 20,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//               }}
//             >
//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   htmlFor={`subject-name-${index}`}
//                   style={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                     color: "#475569",
//                     display: "block",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Subject Name
//                 </label>
//                 <input
//                   id={`subject-name-${index}`}
//                   type="text"
//                   value={subject.name}
//                   onChange={(e) =>
//                     updateSubjectField(index, "name", e.target.value)
//                   }
//                   required
//                   placeholder="Enter subject name"
//                   style={{
//                     width: "100%",
//                     padding: "10px 14px",
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     fontSize: 15,
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>

//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   htmlFor={`subject-code-${index}`}
//                   style={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                     color: "#475569",
//                     display: "block",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Subject Code
//                 </label>
//                 <input
//                   id={`subject-code-${index}`}
//                   type="text"
//                   value={subject.code}
//                   onChange={(e) =>
//                     updateSubjectField(index, "code", e.target.value)
//                   }
//                   required
//                   placeholder="Enter subject code"
//                   style={{
//                     width: "100%",
//                     padding: "10px 14px",
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     fontSize: 15,
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>

//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   htmlFor={`subject-desc-${index}`}
//                   style={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                     color: "#475569",
//                     display: "block",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id={`subject-desc-${index}`}
//                   value={subject.description}
//                   onChange={(e) =>
//                     updateSubjectField(index, "description", e.target.value)
//                   }
//                   placeholder="Optional description"
//                   rows={3}
//                   style={{
//                     width: "100%",
//                     padding: 12,
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     fontSize: 15,
//                     resize: "vertical",
//                     transition: "border-color 0.3s ease",
//                     fontFamily:
//                       "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => removeSubject(index)}
//                 style={{
//                   backgroundColor: "#ef4444",
//                   color: "#fff",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "background-color 0.3s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#b91c1c")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#ef4444")
//                 }
//               >
//                 Remove Subject
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSubject}
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               alignSelf: "start",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Add Subject
//           </button>

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#1e40af")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#2563eb")
//               }
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 3: Students */}
//       {step === 3 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 30 }}
//         >
//           <h3
//             style={{
//               fontSize: 20,
//               fontWeight: 600,
//               color: "#0f172a",
//               marginBottom: 20,
//             }}
//           >
//             Add Students
//           </h3>

//           {classData.students.map((student, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: 12,
//                 padding: 20,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//               }}
//             >
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 15,
//                   marginBottom: 15,
//                 }}
//               >
//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Student ID
//                   </label>
//                   <input
//                     type="text"
//                     value={student.id}
//                     onChange={(e) =>
//                       updateStudentField(index, "id", e.target.value)
//                     }
//                     required
//                     placeholder="Enter student ID"
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Student Name
//                   </label>
//                   <input
//                     type="text"
//                     value={student.name}
//                     onChange={(e) =>
//                       updateStudentField(index, "name", e.target.value)
//                     }
//                     required
//                     placeholder="Enter student name"
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 15,
//                   marginBottom: 15,
//                 }}
//               >
//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={student.email}
//                     onChange={(e) =>
//                       updateStudentField(index, "email", e.target.value)
//                     }
//                     required
//                     placeholder="Enter student email"
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Enrollment Status
//                   </label>
//                   <select
//                     value={student.enrollmentStatus}
//                     onChange={(e) =>
//                       updateStudentField(
//                         index,
//                         "enrollmentStatus",
//                         e.target.value
//                       )
//                     }
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       backgroundColor: "#fff",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   >
//                     <option value="">Select Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="pending">Pending</option>
//                     <option value="graduated">Graduated</option>
//                   </select>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => removeStudent(index)}
//                 style={{
//                   backgroundColor: "#ef4444",
//                   color: "#fff",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "background-color 0.3s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#b91c1c")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#ef4444")
//                 }
//               >
//                 Remove Student
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addStudent}
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               alignSelf: "start",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Add Student
//           </button>

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#1e40af")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#2563eb")
//               }
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 4: Subject Teachers */}
//       {step === 4 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 30 }}
//         >
//           <h3
//             style={{
//               fontSize: 20,
//               fontWeight: 600,
//               color: "#0f172a",
//               marginBottom: 20,
//             }}
//           >
//             Assign Subject Teachers
//           </h3>

//           {classData.subjects.map((subject, subjectIndex) => (
//             <div
//               key={subjectIndex}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: 12,
//                 padding: 20,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//               }}
//             >
//               <h4
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 600,
//                   color: "#0f172a",
//                   marginBottom: 15,
//                 }}
//               >
//                 {subject.name} ({subject.code})
//               </h4>

//               {(classData.subjectTeachers[subject.name] || []).map(
//                 (teacher, teacherIndex) => (
//                   <div
//                     key={teacherIndex}
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "1fr 1fr auto",
//                       gap: 15,
//                       marginBottom: 15,
//                       padding: 15,
//                       backgroundColor: "#f8fafc",
//                       borderRadius: 8,
//                     }}
//                   >
//                     <div>
//                       <label
//                         style={{
//                           fontWeight: 600,
//                           fontSize: 14,
//                           color: "#475569",
//                           display: "block",
//                           marginBottom: 6,
//                         }}
//                       >
//                         Teacher Name
//                       </label>
//                       <input
//                         type="text"
//                         value={teacher.name}
//                         onChange={(e) =>
//                           updateSubjectTeacher(
//                             subject.name,
//                             teacherIndex,
//                             "name",
//                             e.target.value
//                           )
//                         }
//                         required
//                         placeholder="Enter teacher name"
//                         style={{
//                           width: "100%",
//                           padding: "10px 14px",
//                           borderRadius: 8,
//                           border: "1.5px solid #cbd5e1",
//                           fontSize: 15,
//                           transition: "border-color 0.3s ease",
//                         }}
//                         onFocus={(e) =>
//                           (e.target.style.borderColor = "#2563eb")
//                         }
//                         onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                       />
//                     </div>

//                     <div>
//                       <label
//                         style={{
//                           fontWeight: 600,
//                           fontSize: 14,
//                           color: "#475569",
//                           display: "block",
//                           marginBottom: 6,
//                         }}
//                       >
//                         Teacher Email
//                       </label>
//                       <input
//                         type="email"
//                         value={teacher.email}
//                         onChange={(e) =>
//                           updateSubjectTeacher(
//                             subject.name,
//                             teacherIndex,
//                             "email",
//                             e.target.value
//                           )
//                         }
//                         required
//                         placeholder="Enter teacher email"
//                         style={{
//                           width: "100%",
//                           padding: "10px 14px",
//                           borderRadius: 8,
//                           border: "1.5px solid #cbd5e1",
//                           fontSize: 15,
//                           transition: "border-color 0.3s ease",
//                         }}
//                         onFocus={(e) =>
//                           (e.target.style.borderColor = "#2563eb")
//                         }
//                         onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                       />
//                     </div>

//                     <div style={{ display: "flex", alignItems: "end" }}>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           removeSubjectTeacher(subject.name, teacherIndex)
//                         }
//                         style={{
//                           backgroundColor: "#ef4444",
//                           color: "#fff",
//                           padding: "8px 12px",
//                           border: "none",
//                           borderRadius: 8,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                           transition: "background-color 0.3s ease",
//                         }}
//                         onMouseEnter={(e) =>
//                           (e.currentTarget.style.backgroundColor = "#b91c1c")
//                         }
//                         onMouseLeave={(e) =>
//                           (e.currentTarget.style.backgroundColor = "#ef4444")
//                         }
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )}

//               <button
//                 type="button"
//                 onClick={() => addSubjectTeacher(subject.name)}
//                 style={{
//                   backgroundColor: "#10b981",
//                   color: "#fff",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "background-color 0.3s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#059669")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#10b981")
//                 }
//               >
//                 Add Teacher for {subject.name}
//               </button>
//             </div>
//           ))}

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#1e40af")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#2563eb")
//               }
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 5: Timetable */}
//       {step === 5 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 30 }}
//         >
//           <h3
//             style={{
//               fontSize: 20,
//               fontWeight: 600,
//               color: "#0f172a",
//               marginBottom: 20,
//             }}
//           >
//             Create Timetable
//           </h3>

//           {classData.timetable.map((entry, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: 12,
//                 padding: 20,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//               }}
//             >
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr 1fr",
//                   gap: 15,
//                   marginBottom: 15,
//                 }}
//               >
//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Day
//                   </label>
//                   <select
//                     value={entry.day}
//                     onChange={(e) =>
//                       updateTimetableEntry(index, "day", e.target.value)
//                     }
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       backgroundColor: "#fff",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   >
//                     <option value="">Select Day</option>
//                     <option value="Monday">Monday</option>
//                     <option value="Tuesday">Tuesday</option>
//                     <option value="Wednesday">Wednesday</option>
//                     <option value="Thursday">Thursday</option>
//                     <option value="Friday">Friday</option>
//                     <option value="Saturday">Saturday</option>
//                     <option value="Sunday">Sunday</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Subject
//                   </label>
//                   <select
//                     value={entry.subject}
//                     onChange={(e) =>
//                       updateTimetableEntry(index, "subject", e.target.value)
//                     }
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       backgroundColor: "#fff",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   >
//                     <option value="">Select Subject</option>
//                     {classData.subjects.map((subject, subjectIndex) => (
//                       <option key={subjectIndex} value={subject.name}>
//                         {subject.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Room
//                   </label>
//                   <input
//                     type="text"
//                     value={entry.room}
//                     onChange={(e) =>
//                       updateTimetableEntry(index, "room", e.target.value)
//                     }
//                     required
//                     placeholder="Enter room number"
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr auto",
//                   gap: 15,
//                   marginBottom: 15,
//                 }}
//               >
//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Start Time
//                   </label>
//                   <input
//                     type="time"
//                     value={entry.startTime}
//                     onChange={(e) =>
//                       updateTimetableEntry(index, "startTime", e.target.value)
//                     }
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 14,
//                       color: "#475569",
//                       display: "block",
//                       marginBottom: 6,
//                     }}
//                   >
//                     End Time
//                   </label>
//                   <input
//                     type="time"
//                     value={entry.endTime}
//                     onChange={(e) =>
//                       updateTimetableEntry(index, "endTime", e.target.value)
//                     }
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px 14px",
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       fontSize: 15,
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>

//                 <div style={{ display: "flex", alignItems: "end" }}>
//                   <button
//                     type="button"
//                     onClick={() => removeTimetableEntry(index)}
//                     style={{
//                       backgroundColor: "#ef4444",
//                       color: "#fff",
//                       padding: "8px 12px",
//                       border: "none",
//                       borderRadius: 8,
//                       fontWeight: 600,
//                       cursor: "pointer",
//                       transition: "background-color 0.3s ease",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#b91c1c")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#ef4444")
//                     }
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addTimetableEntry}
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               alignSelf: "start",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Add Timetable Entry
//           </button>

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#1e40af")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#2563eb")
//               }
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 6: Exams */}
//       {step === 6 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 30 }}
//         >
//           <h3
//             style={{
//               fontSize: 20,
//               fontWeight: 600,
//               color: "#0f172a",
//               marginBottom: 20,
//             }}
//           >
//             Setup Exams
//           </h3>

//           {/* Internal Exams */}
//           <div>
//             <h4
//               style={{
//                 fontSize: 18,
//                 fontWeight: 600,
//                 color: "#0f172a",
//                 marginBottom: 15,
//               }}
//             >
//               Internal Exams
//             </h4>

//             {classData.exams.internal.map((exam, index) => (
//               <div
//                 key={index}
//                 style={{
//                   backgroundColor: "#ffffff",
//                   borderRadius: 12,
//                   padding: 20,
//                   marginBottom: 15,
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: 15,
//                     marginBottom: 15,
//                   }}
//                 >
//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Exam Title
//                     </label>
//                     <input
//                       type="text"
//                       value={exam.title}
//                       onChange={(e) =>
//                         updateExam("internal", index, "title", e.target.value)
//                       }
//                       required
//                       placeholder="Enter exam title"
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Subject
//                     </label>
//                     <select
//                       value={exam.subject}
//                       onChange={(e) =>
//                         updateExam("internal", index, "subject", e.target.value)
//                       }
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         backgroundColor: "#fff",
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     >
//                       <option value="">Select Subject</option>
//                       {classData.subjects.map((subject, subjectIndex) => (
//                         <option key={subjectIndex} value={subject.name}>
//                           {subject.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr auto",
//                     gap: 15,
//                     marginBottom: 15,
//                   }}
//                 >
//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Date
//                     </label>
//                     <input
//                       type="date"
//                       value={exam.date}
//                       onChange={(e) =>
//                         updateExam("internal", index, "date", e.target.value)
//                       }
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Max Marks
//                     </label>
//                     <input
//                       type="number"
//                       value={exam.maxMarks}
//                       onChange={(e) =>
//                         updateExam(
//                           "internal",
//                           index,
//                           "maxMarks",
//                           e.target.value
//                         )
//                       }
//                       required
//                       placeholder="Enter max marks"
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     />
//                   </div>

//                   <div style={{ display: "flex", alignItems: "end" }}>
//                     <button
//                       type="button"
//                       onClick={() => removeExam("internal", index)}
//                       style={{
//                         backgroundColor: "#ef4444",
//                         color: "#fff",
//                         padding: "8px 12px",
//                         border: "none",
//                         borderRadius: 8,
//                         fontWeight: 600,
//                         cursor: "pointer",
//                         transition: "background-color 0.3s ease",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#b91c1c")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#ef4444")
//                       }
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() => addExam("internal")}
//               style={{
//                 backgroundColor: "#10b981",
//                 color: "#fff",
//                 padding: "8px 16px",
//                 border: "none",
//                 borderRadius: 8,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#059669")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#10b981")
//               }
//             >
//               Add Internal Exam
//             </button>
//           </div>

//           {/* External Exams */}
//           <div>
//             <h4
//               style={{
//                 fontSize: 18,
//                 fontWeight: 600,
//                 color: "#0f172a",
//                 marginBottom: 15,
//               }}
//             >
//               External Exams
//             </h4>

//             {classData.exams.external.map((exam, index) => (
//               <div
//                 key={index}
//                 style={{
//                   backgroundColor: "#ffffff",
//                   borderRadius: 12,
//                   padding: 20,
//                   marginBottom: 15,
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: 15,
//                     marginBottom: 15,
//                   }}
//                 >
//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Exam Title
//                     </label>
//                     <input
//                       type="text"
//                       value={exam.title}
//                       onChange={(e) =>
//                         updateExam("external", index, "title", e.target.value)
//                       }
//                       required
//                       placeholder="Enter exam title"
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Subject
//                     </label>
//                     <select
//                       value={exam.subject}
//                       onChange={(e) =>
//                         updateExam("external", index, "subject", e.target.value)
//                       }
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         backgroundColor: "#fff",
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     >
//                       <option value="">Select Subject</option>
//                       {classData.subjects.map((subject, subjectIndex) => (
//                         <option key={subjectIndex} value={subject.name}>
//                           {subject.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr auto",
//                     gap: 15,
//                     marginBottom: 15,
//                   }}
//                 >
//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Date
//                     </label>
//                     <input
//                       type="date"
//                       value={exam.date}
//                       onChange={(e) =>
//                         updateExam("external", index, "date", e.target.value)
//                       }
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                         color: "#475569",
//                         display: "block",
//                         marginBottom: 6,
//                       }}
//                     >
//                       Max Marks
//                     </label>
//                     <input
//                       type="number"
//                       value={exam.maxMarks}
//                       onChange={(e) =>
//                         updateExam(
//                           "external",
//                           index,
//                           "maxMarks",
//                           e.target.value
//                         )
//                       }
//                       required
//                       placeholder="Enter max marks"
//                       style={{
//                         width: "100%",
//                         padding: "10px 14px",
//                         borderRadius: 8,
//                         border: "1.5px solid #cbd5e1",
//                         fontSize: 15,
//                         transition: "border-color 0.3s ease",
//                       }}
//                       onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                       onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                     />
//                   </div>

//                   <div style={{ display: "flex", alignItems: "end" }}>
//                     <button
//                       type="button"
//                       onClick={() => removeExam("external", index)}
//                       style={{
//                         backgroundColor: "#ef4444",
//                         color: "#fff",
//                         padding: "8px 12px",
//                         border: "none",
//                         borderRadius: 8,
//                         fontWeight: 600,
//                         cursor: "pointer",
//                         transition: "background-color 0.3s ease",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#b91c1c")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#ef4444")
//                       }
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() => addExam("external")}
//               style={{
//                 backgroundColor: "#10b981",
//                 color: "#fff",
//                 padding: "8px 16px",
//                 border: "none",
//                 borderRadius: 8,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#059669")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#10b981")
//               }
//             >
//               Add External Exam
//             </button>
//           </div>
//           {/* new */}
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Previous
//             </button>
//           </div>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#1e40af")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#2563eb")
//               }
//             >
//               Submit Class
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };
// export default CreateClassForm;

// import React, { useState } from "react";

// type Subject = {
//   name: string;
//   code: string;
//   description: string;
// };

// const CreateClassForm: React.FC = () => {
//   const [step, setStep] = useState(1);

//   const [classData, setClassData] = useState({
//     classDetails: {
//       className: "",
//       classCode: "",
//       level: "",
//       subject: "",
//       teacher: "",
//       schedule: "",
//       room: "",
//       capacity: "",
//       term: "",
//       academicYear: "",
//       department: "",
//       mode: "",
//       description: "",
//     },
//     subjects: [
//       {
//         name: "",
//         code: "",
//         description: "",
//       },
//     ],
//     students: [
//       {
//         id: "",
//         name: "",
//         email: "",
//         enrollmentStatus: "",
//       },
//     ],
//     subjectTeachers: {
//       Math: [
//         {
//           name: "",
//           email: "",
//         },
//       ],
//     },
//     timetable: [
//       {
//         day: "",
//         subject: "",
//         startTime: "",
//         endTime: "",
//         room: "",
//       },
//     ],
//     exams: {
//       internal: [
//         {
//           title: "",
//           date: "",
//           maxMarks: "",
//           subject: "",
//         },
//       ],
//       external: [
//         {
//           title: "",
//           date: "",
//           maxMarks: "",
//           subject: "",
//         },
//       ],
//     },
//   });

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   const updateClassDetails = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setClassData((prev) => ({
//       ...prev,
//       classDetails: { ...prev.classDetails, [name]: value },
//     }));
//   };

//   const updateSubjectField = (
//     index: number,
//     field: keyof Subject,
//     value: string
//   ) => {
//     const newSubjects = [...classData.subjects];
//     newSubjects[index][field] = value;
//     setClassData((prev) => ({ ...prev, subjects: newSubjects }));
//   };

//   const addSubject = () => {
//     setClassData((prev) => ({
//       ...prev,
//       subjects: [...prev.subjects, { name: "", code: "", description: "" }],
//     }));
//   };

//   const removeSubject = (index: number) => {
//     const newSubjects = classData.subjects.filter((_, i) => i !== index);
//     setClassData((prev) => ({ ...prev, subjects: newSubjects }));
//   };

//   const handleFinalSubmit = () => {
//     console.log("Submitting full class:", classData);
//     // TODO: send classData to backend API
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 900,
//         margin: "40px auto",
//         padding: 40,
//         backgroundColor: "#f9fafb",
//         borderRadius: 16,
//         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       }}
//     >
//       <h2
//         style={{
//           fontSize: 28,
//           fontWeight: 700,
//           marginBottom: 40,
//           color: "#0f172a",
//           textAlign: "center",
//           letterSpacing: "0.03em",
//         }}
//       >
//         Create New Class – Step {step}
//       </h2>

//       {/* Step 1: Class Details */}
//       {step === 1 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 24 }}
//         >
//           {Object.entries(classData.classDetails).map(([key, value]) => {
//             const isTextarea = key === "description";
//             const isSelect = key === "mode";
//             const type =
//               key === "capacity"
//                 ? "number"
//                 : key === "schedule"
//                 ? "datetime-local"
//                 : "text";

//             const label = key
//               .replace(/([A-Z])/g, " $1")
//               .replace(/^./, (str) => str.toUpperCase());

//             if (isSelect) {
//               return (
//                 <div
//                   key={key}
//                   style={{ display: "flex", flexDirection: "column" }}
//                 >
//                   <label
//                     htmlFor={key}
//                     style={{
//                       fontWeight: 600,
//                       marginBottom: 6,
//                       color: "#334155",
//                       fontSize: 14,
//                     }}
//                   >
//                     {label}
//                   </label>
//                   <select
//                     id={key}
//                     name={key}
//                     value={value}
//                     onChange={updateClassDetails}
//                     required
//                     style={{
//                       padding: "10px 14px",
//                       fontSize: 15,
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       backgroundColor: "#fff",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   >
//                     <option value="">Select Mode</option>
//                     <option value="online">Online</option>
//                     <option value="in-person">In-person</option>
//                     <option value="hybrid">Hybrid</option>
//                   </select>
//                 </div>
//               );
//             }

//             if (isTextarea) {
//               return (
//                 <div
//                   key={key}
//                   style={{ display: "flex", flexDirection: "column" }}
//                 >
//                   <label
//                     htmlFor={key}
//                     style={{
//                       fontWeight: 600,
//                       marginBottom: 6,
//                       color: "#334155",
//                       fontSize: 14,
//                     }}
//                   >
//                     {label}
//                   </label>
//                   <textarea
//                     id={key}
//                     name={key}
//                     value={value}
//                     onChange={updateClassDetails}
//                     rows={5}
//                     placeholder="Optional description or notes"
//                     style={{
//                       padding: 12,
//                       fontSize: 15,
//                       borderRadius: 8,
//                       border: "1.5px solid #cbd5e1",
//                       resize: "vertical",
//                       fontFamily:
//                         "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                     onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                   />
//                 </div>
//               );
//             }

//             return (
//               <div
//                 key={key}
//                 style={{ display: "flex", flexDirection: "column" }}
//               >
//                 <label
//                   htmlFor={key}
//                   style={{
//                     fontWeight: 600,
//                     marginBottom: 6,
//                     color: "#334155",
//                     fontSize: 14,
//                   }}
//                 >
//                   {label}
//                 </label>
//                 <input
//                   id={key}
//                   type={type}
//                   name={key}
//                   value={value}
//                   onChange={updateClassDetails}
//                   required={key !== "description" && key !== "department"}
//                   placeholder={`Enter ${label.toLowerCase()}`}
//                   style={{
//                     padding: "10px 14px",
//                     fontSize: 15,
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>
//             );
//           })}

//           <button
//             type="submit"
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Next
//           </button>
//         </form>
//       )}

//       {/* Step 2: Subjects */}
//       {step === 2 && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             nextStep();
//           }}
//           style={{ display: "flex", flexDirection: "column", gap: 30 }}
//         >
//           {classData.subjects.map((subject, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: 12,
//                 padding: 20,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//               }}
//             >
//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   htmlFor={`subject-name-${index}`}
//                   style={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                     color: "#475569",
//                     display: "block",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Subject Name
//                 </label>
//                 <input
//                   id={`subject-name-${index}`}
//                   type="text"
//                   value={subject.name}
//                   onChange={(e) =>
//                     updateSubjectField(index, "name", e.target.value)
//                   }
//                   required
//                   placeholder="Enter subject name"
//                   style={{
//                     width: "100%",
//                     padding: "10px 14px",
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     fontSize: 15,
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>

//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   htmlFor={`subject-code-${index}`}
//                   style={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                     color: "#475569",
//                     display: "block",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Subject Code
//                 </label>
//                 <input
//                   id={`subject-code-${index}`}
//                   type="text"
//                   value={subject.code}
//                   onChange={(e) =>
//                     updateSubjectField(index, "code", e.target.value)
//                   }
//                   required
//                   placeholder="Enter subject code"
//                   style={{
//                     width: "100%",
//                     padding: "10px 14px",
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     fontSize: 15,
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>

//               <div style={{ marginBottom: 15 }}>
//                 <label
//                   htmlFor={`subject-desc-${index}`}
//                   style={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                     color: "#475569",
//                     display: "block",
//                     marginBottom: 6,
//                   }}
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id={`subject-desc-${index}`}
//                   value={subject.description}
//                   onChange={(e) =>
//                     updateSubjectField(index, "description", e.target.value)
//                   }
//                   placeholder="Optional description"
//                   rows={3}
//                   style={{
//                     width: "100%",
//                     padding: 12,
//                     borderRadius: 8,
//                     border: "1.5px solid #cbd5e1",
//                     fontSize: 15,
//                     resize: "vertical",
//                     transition: "border-color 0.3s ease",
//                     fontFamily:
//                       "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
//                   onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => removeSubject(index)}
//                 style={{
//                   backgroundColor: "#ef4444",
//                   color: "#fff",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "background-color 0.3s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#b91c1c")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#ef4444")
//                 }
//               >
//                 Remove Subject
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addSubject}
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               alignSelf: "start",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Add Subject
//           </button>
//           {/* Exam */}
//           <button
//             type="button"
//             onClick={addSubject}
//             style={{
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               alignSelf: "start",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1e40af")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563eb")
//             }
//           >
//             Exams
//           </button>

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <button
//               type="button"
//               onClick={prevStep}
//               style={{
//                 backgroundColor: "#64748b",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#475569")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#64748b")
//               }
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 padding: "12px 24px",
//                 borderRadius: 10,
//                 fontWeight: 600,
//                 fontSize: 16,
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#1e40af")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#2563eb")
//               }
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       )}

//       {/* For demo, final submit button after step 2 */}
//       {step > 2 && (
//         <div style={{ textAlign: "center", marginTop: 40 }}>
//           <button
//             onClick={prevStep}
//             style={{
//               backgroundColor: "#64748b",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               marginRight: 20,
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#475569")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#64748b")
//             }
//           >
//             Back
//           </button>
//           <button
//             onClick={handleFinalSubmit}
//             style={{
//               backgroundColor: "#16a34a",
//               color: "#fff",
//               padding: "12px 24px",
//               borderRadius: 10,
//               fontWeight: 600,
//               fontSize: 16,
//               border: "none",
//               cursor: "pointer",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#15803d")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#16a34a")
//             }
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateClassForm;
