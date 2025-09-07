"use client"

import React, { useState } from "react";
import {
  ArrowLeft,
} from "lucide-react";
import styles from "./CreateTasks.module.css";
import { authService } from "../../../redux/configuration/auth.service";
import { TaskMain, UserRef } from "../../../redux/slices/scheduleTask";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

interface CreateTaskFormProps {
  onBack: () => void
  initialData?: TaskMain
  mode?: "add" | "edit"
}

const CreateTasks: React.FC<CreateTaskFormProps> = ({ onBack, initialData, mode = "add" }) => {
  const user = useSelector((state: RootState) => state.user)
  const [formData, setFormData] = useState<TaskMain>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    category: "",
    projectId: "",
    boardColumn: "",
    sprintId: "",
    parentTaskId: "",
    subtasks: [],
    dependencies: [],
    dependents: [],
    tags: [],
    checklist: [],
    assignee: {} as UserRef,
    collaborators: [],
    reporter: {} as UserRef,
    comments: [],
    attachments: [],
    estimatedHours: 0,
    actualHours: 0,
    startDate: "",
    dueDate: "",
    completedAt: "",
    reminderAt: "",
    recurring: false,
    recurrencePattern: "custom",
    customRecurrenceRule: "",
    isPrivate: false,
    isBlocked: false,
    blockReason: "",
    score: 0,
    feedback: "",
    linkedResources: [],
    auditTrail: [],
    createdBy: { id: user.staffId, name: user.firstName + " " + user.lastName, email: user.email },
    dateCreated: new Date().toLocaleString(),
    dateModified: "",
    dateDeleted: "",
  });


  const [errors, setErrors] = useState<Partial<TaskMain>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form with initial data when editing
  React.useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        ...initialData,
        tags: initialData.tags?.length ? initialData.tags : [""],
        checklist: initialData.checklist?.length ? initialData.checklist : [],
      })
    }
  }, [initialData, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name as keyof TaskMain]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof TaskMain) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Number.parseFloat(value),
    }))
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleArrayChange = (
    field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">,
    index: number,
    value: any
  ) => {
    setFormData((prev) => {
      const updated = [...(prev[field] || [])];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayItem = (
    field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "tags"
          ? [...(prev.tags || []), ""]
          : field === "checklist"
            ? [...(prev.checklist || []), { id: crypto.randomUUID(), title: "", checked: false }]
            : [...(prev.linkedResources || []), { title: "", url: "" }],
    }));
  };

  const removeArrayItem = (
    field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">,
    index: number
  ) => {
    setFormData((prev) => {
      const updated = [...((prev[field] as any[]) || [])].filter((_, i) => i !== index);
      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  // const validateForm = (): boolean => {
  //   const newErrors: Partial<TaskFormErrors> = {}

  //   if (!formData.title.trim()) newErrors.title = "Task title is required"
  //   // if (!formData.type) newErrors.type = "Task type is required"
  //   if (!formData.category) newErrors.category = "Category is required"
  //   if (!formData.priority) newErrors.priority = "Priority is required"
  //   if (!formData.status) newErrors.status = "Status is required"
  //   // if (formData.isBlocked && !formData.blockReason.trim())
  //   //   newErrors.blockReason = "Block reason is required if task is blocked"

  //   // setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const processedData: TaskMain = {
        ...formData,
        tags: (formData.tags || []).filter((item) => item.trim() !== ""),
        checklist: (formData.checklist || []).filter((item) => item.title.trim() !== ""),
        linkedResources: (formData.linkedResources || []).filter(
          (res) => res.title.trim() !== "" || res.url.trim() !== ""
        ),
      };

      await authService.handleCreateTask(processedData).then(() => {
        handleReset();
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (mode === "edit" && initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.length ? initialData.tags : [""],
        checklist: initialData.checklist?.length ? initialData.checklist : [],
      })
    } else {
      setFormData({
        id: crypto.randomUUID(),
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        category: "",
        projectId: "",
        boardColumn: "",
        sprintId: "",
        parentTaskId: "",
        subtasks: [],
        dependencies: [],
        dependents: [],
        tags: [],
        checklist: [],
        assignee: {} as UserRef,
        collaborators: [],
        reporter: {} as UserRef,
        comments: [],
        attachments: [],
        estimatedHours: 0,
        actualHours: 0,
        startDate: "",
        dueDate: "",
        completedAt: "",
        reminderAt: "",
        recurring: false,
        recurrencePattern: "custom",
        customRecurrenceRule: "",
        isPrivate: false,
        isBlocked: false,
        blockReason: "",
        score: 0,
        feedback: "",
        linkedResources: [],
        auditTrail: [],
        createdBy: {
          id: user.staffId,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
        dateCreated: new Date().toLocaleString(),
        dateModified: "",
        dateDeleted: "",
      });
    }
    setErrors({})
  }

  const isEditMode = mode === "edit"
  const [showScheduling, setShowScheduling] = React.useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = React.useState(false);
  const [showPrivacySection, setShowPrivacySection] = React.useState(false);

  return (
    <div className={styles.addStaffFormContainer}>
      <button className={styles.backButton} onClick={onBack}>
        <ArrowLeft />
        Back to Task Management
      </button>

      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>{isEditMode ? "Edit Task" : "Create New Task"}</h2>
          <p className={styles.formSubtitle}>
            {isEditMode
              ? "Update the details below to modify the task information"
              : "Fill in the details below to create a new task"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
          {/* Task Details */}
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px", color: "#071D6A" }}>Task Details</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title *" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows={3} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />

              <select name="status" value={formData.status} onChange={handleInputChange} style={{ padding: "8px", borderRadius: "6px" }}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="archived">Archived</option>
                <option value="on_hold">On Hold</option>
                <option value="reopened">Reopened</option>
              </select>

              <select name="priority" value={formData.priority} onChange={handleInputChange} style={{ padding: "8px", borderRadius: "6px" }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>

              <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <input type="text" name="projectId" value={formData.projectId} onChange={handleInputChange} placeholder="Project ID" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <input type="text" name="boardColumn" value={formData.boardColumn} onChange={handleInputChange} placeholder="Board Column" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <input type="text" name="sprintId" value={formData.sprintId} onChange={handleInputChange} placeholder="Sprint ID" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <input type="text" name="parentTaskId" value={formData.parentTaskId} onChange={handleInputChange} placeholder="Parent Task ID" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
            </div>
          </div>

          {/* Time Tracking */}
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
            <h3 style={{ color: "#071D6A", marginBottom: "15px" }}>Time & Scheduling</h3>

            {/* Hours Row */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={(e) => handleNumberInputChange(e, "estimatedHours")}
                placeholder="Estimated Hours"
                style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="number"
                name="actualHours"
                value={formData.actualHours}
                onChange={(e) => handleNumberInputChange(e, "actualHours")}
                placeholder="Actual Hours"
                style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            {/* Dates Row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                style={{ flex: "1 1 200px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                style={{ flex: "1 1 200px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="date"
                name="completedAt"
                value={formData.completedAt}
                onChange={handleInputChange}
                style={{ flex: "1 1 200px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="date"
                name="reminderAt"
                value={formData.reminderAt}
                onChange={handleInputChange}
                style={{ flex: "1 1 200px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            {/* Recurring & Pattern */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#000" }}>
                <input
                  type="checkbox"
                  name="recurring"
                  checked={formData.recurring}
                  onChange={handleInputChange}
                />
                Recurring
              </label>

              <select
                name="recurrencePattern"
                value={formData.recurrencePattern}
                onChange={handleInputChange}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", maxWidth: "220px" }}
              >
                <option value="custom">Custom</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              {formData.recurrencePattern === "custom" && (
                <input
                  type="text"
                  name="customRecurrenceRule"
                  value={formData.customRecurrenceRule}
                  onChange={handleInputChange}
                  placeholder="Custom RRULE"
                  style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", maxWidth: "400px" }}
                />
              )}
            </div>
          </div>


          {/* Privacy & Blocking */}
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
            <h3 style={{ color: "#071D6A", marginBottom: "15px" }}>Privacy & Blocking</h3>

            {/* Checkbox Row */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: formData.isBlocked ? "10px" : "0" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#000000" }}>
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleInputChange}
                />
                Private Task
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#000000" }}>
                <input
                  type="checkbox"
                  name="isBlocked"
                  checked={formData.isBlocked}
                  onChange={handleInputChange}
                />
                Blocked
              </label>
            </div>

            {/* Block Reason Input */}
            {formData.isBlocked && (
              <input
                type="text"
                name="blockReason"
                value={formData.blockReason}
                onChange={handleInputChange}
                placeholder="Reason for blocking"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                }}
              />
            )}
          </div>


          {/* Feedback */}
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3 style={{ color: "#071D6A" }}>Feedback & Scoring</h3>
            <input type="number" name="score" value={formData.score} onChange={(e) => handleNumberInputChange(e, "score")} placeholder="Score" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }} />
            <textarea name="feedback" value={formData.feedback} onChange={handleInputChange} placeholder="Feedback" rows={3} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
          </div>

          {/* Linked Resources */}
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3 style={{ color: "#071D6A" }}>Linked Resources</h3>
            {formData.linkedResources?.map((res, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <input
                  type="text"
                  value={res.title}
                  onChange={(e) =>
                    handleArrayChange("linkedResources", i, { ...res, title: e.target.value })
                  }
                  placeholder="Title"
                  style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <input
                  type="url"
                  value={res.url}
                  onChange={(e) =>
                    handleArrayChange("linkedResources", i, { ...res, url: e.target.value })
                  }
                  placeholder="URL"
                  style={{ flex: 2, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("linkedResources")} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #007BFF", background: "#007BFF", color: "#fff" }}>Add Resource</button>
          </div>

          {/* System fields */}
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9" }}>
            <h3 style={{ color: "#071D6A" }}>System Metadata</h3>
            <p style={{ color: "#000000" }}><b>Created By:</b> {formData.createdBy.name} ({formData.createdBy.email})</p>
            <p style={{ color: "#000000" }}><b>Date Created:</b> {formData.dateCreated}</p>
            {formData.dateModified && <p style={{ color: "#000000" }}><b>Date Modified:</b> {formData.dateModified}</p>}
            {formData.dateDeleted && <p style={{ color: "#000000" }}><b>Date Deleted:</b> {formData.dateDeleted}</p>}
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button type="button" onClick={handleReset} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #aaa", background: "#eee", color: "#000000" }}>Reset</button>
            <button type="submit" style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #007BFF", background: "#007BFF", color: "#fff" }}>
              {isEditMode ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTasks
