"use client"

import React, { useState } from "react"
import {
  ArrowLeft,
  Tag,
  ListTodo,
  MapPin,
  Link,
  Scale,
  MessageSquare,
  Clock,
  Calendar,
  Lock,
  Ban,
  Info,
  CheckCircle,
  Hourglass,
  Zap,
  Star,
  BookOpen,
  Layers,
  Repeat,
} from "lucide-react"
import styles from "./CreateTasks.module.css"
import { authService } from "../../../redux/configuration/auth.service"
import { Task } from "../../../utils/Types"

interface ChecklistItem {
  id: string
  title: string
  checked: boolean
}

interface TaskFormData {
  id?: string
  title: string
  description: string
  type: "" | "task" | "event" | "appointment" | "reminder" | "habit" | "note"
  category: string
  priority: "" | "low" | "medium" | "high" | "urgent" | "critical"
  status: "" | "pending" | "in_progress" | "completed" | "cancelled" | "archived" | "on_hold" | "reopened"
  tags: string[]
  checklist: ChecklistItem[]
  estimatedHours: number | ""
  actualHours: number | ""
  dueDays: number | ""
  reminderDays: number | ""
  recurrencePattern: string
  customRecurrenceRule: string
  locationAddress: string
  latitude: number | ""
  longitude: number | ""
  score: number | ""
  feedback: string
  linkedResourceTitle: string
  linkedResourceUrl: string
  isPrivate: boolean
  isBlocked: boolean
  blockReason: string
}

interface TaskFormErrors {
  title?: string;
  type?: string;
  category?: string;
  priority?: string;
  status?: string;
  
}

interface CreateTaskFormProps {
  onBack: () => void
  onSubmit: (taskData: TaskFormData) => void
  initialData?: TaskFormData
  mode?: "add" | "edit"
}

const CreateTasks: React.FC<CreateTaskFormProps> = ({ onBack, onSubmit, initialData, mode = "add" }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    type: "task",
    category: "work",
    priority: "medium",
    status: "pending",
    tags: [""],
    checklist: [],
    estimatedHours: "",
    actualHours: "",
    dueDays: "",
    reminderDays: "",
    recurrencePattern: "custom",
    customRecurrenceRule: "",
    locationAddress: "",
    latitude: "",
    longitude: "",
    score: "",
    feedback: "",
    linkedResourceTitle: "",
    linkedResourceUrl: "",
    isPrivate: false,
    isBlocked: false,
    blockReason: "",
  })

  const [errors, setErrors] = useState<Partial<TaskFormData>>({})
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

    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof TaskFormData) => {
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

  const handleArrayChange = (field: "tags" | "checklist", index: number, value: string) => {
    if (field === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.map((item, i) => (i === index ? value : item)),
      }))
    } else if (field === "checklist") {
      setFormData((prev) => ({
        ...prev,
        checklist: prev.checklist.map((item, i) => (i === index ? { ...item, title: value } : item)),
      }))
    }
  }

  const addArrayItem = (field: "tags" | "checklist") => {
    if (field === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, ""],
      }))
    } else if (field === "checklist") {
      setFormData((prev) => ({
        ...prev,
        checklist: [...prev.checklist, { id: crypto.randomUUID(), title: "", checked: false }],
      }))
    }
  }

  const removeArrayItem = (field: "tags" | "checklist", index: number) => {
    if (field === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index),
      }))
    } else if (field === "checklist") {
      setFormData((prev) => ({
        ...prev,
        checklist: prev.checklist.filter((_, i) => i !== index),
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormErrors> = {}

    if (!formData.title.trim()) newErrors.title = "Task title is required"
    if (!formData.type) newErrors.type = "Task type is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.priority) newErrors.priority = "Priority is required"
    if (!formData.status) newErrors.status = "Status is required"
    // if (formData.isBlocked && !formData.blockReason.trim())
    //   newErrors.blockReason = "Block reason is required if task is blocked"

    // setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const processedData: any = {
        ...formData,
        tags: formData.tags.filter((item) => item.trim() !== ""),
        checklist: formData.checklist.filter((item) => item.title.trim() !== ""),
      };
  
      // Call handleCreateTask instead of simulating API
      const result = await authService.handleCreateTask(processedData);
  
      // if (result) {
      //   // Optionally: Call onSubmit if you still need to trigger parent logic
      //   onSubmit(result);
      // }
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
        title: "",
        description: "",
        type: "task",
        category: "work",
        priority: "medium",
        status: "pending",
        tags: [""],
        checklist: [],
        estimatedHours: "",
        actualHours: "",
        dueDays: "",
        reminderDays: "",
        recurrencePattern: "custom",
        customRecurrenceRule: "",
        locationAddress: "",
        latitude: "",
        longitude: "",
        score: "",
        feedback: "",
        linkedResourceTitle: "",
        linkedResourceUrl: "",
        isPrivate: false,
        isBlocked: false,
        blockReason: "",
      })
    }
    setErrors({})
  }

  const isEditMode = mode === "edit"

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

        <form onSubmit={handleSubmit} className={styles.staffForm}>
          <div className={styles.formGrid}>
            {/* Task Details Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Info className={styles.sectionIcon} />
                Task Details
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label htmlFor="title" className={styles.inputLabel}>
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                    placeholder="Enter task title"
                  />
                  {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
                </div>

                <div className={styles.inputField}>
                  <label htmlFor="description" className={styles.inputLabel}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    placeholder="Enter a detailed description of the task"
                    rows={3}
                  />
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="type" className={styles.inputLabel}>
                      <Layers className={styles.inputIcon} />
                      Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.type ? styles.inputError : ""}`}
                    >
                      <option value="task">Task</option>
                      <option value="event">Event</option>
                      <option value="appointment">Appointment</option>
                      <option value="reminder">Reminder</option>
                      <option value="habit">Habit</option>
                      <option value="note">Note</option>
                    </select>
                    {errors.type && <span className={styles.errorMessage}>{errors.type}</span>}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="category" className={styles.inputLabel}>
                      <BookOpen className={styles.inputIcon} />
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.category ? styles.inputError : ""}`}
                    >
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="health">Health</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="home">Home</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="priority" className={styles.inputLabel}>
                      <Zap className={styles.inputIcon} />
                      Priority *
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.priority ? styles.inputError : ""}`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                    {errors.priority && <span className={styles.errorMessage}>{errors.priority}</span>}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="status" className={styles.inputLabel}>
                      <CheckCircle className={styles.inputIcon} />
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.status ? styles.inputError : ""}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="archived">Archived</option>
                      <option value="on_hold">On Hold</option>
                      <option value="reopened">Reopened</option>
                    </select>
                    {errors.status && <span className={styles.errorMessage}>{errors.status}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduling Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Calendar className={styles.sectionIcon} />
                Scheduling
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="estimatedHours" className={styles.inputLabel}>
                      <Hourglass className={styles.inputIcon} />
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      id="estimatedHours"
                      name="estimatedHours"
                      value={formData.estimatedHours}
                      onChange={(e) => handleNumberInputChange(e, "estimatedHours")}
                      className={styles.input}
                      placeholder="e.g., 8"
                      min="0"
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="actualHours" className={styles.inputLabel}>
                      <Clock className={styles.inputIcon} />
                      Actual Hours
                    </label>
                    <input
                      type="number"
                      id="actualHours"
                      name="actualHours"
                      value={formData.actualHours}
                      onChange={(e) => handleNumberInputChange(e, "actualHours")}
                      className={styles.input}
                      placeholder="e.g., 7.5"
                      min="0"
                    />
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="dueDays" className={styles.inputLabel}>
                      <Calendar className={styles.inputIcon} />
                      Due in (days)
                    </label>
                    <input
                      type="number"
                      id="dueDays"
                      name="dueDays"
                      value={formData.dueDays}
                      onChange={(e) => handleNumberInputChange(e, "dueDays")}
                      className={styles.input}
                      placeholder="e.g., 3"
                      min="0"
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="reminderDays" className={styles.inputLabel}>
                      <Clock className={styles.inputIcon} />
                      Reminder in (days)
                    </label>
                    <input
                      type="number"
                      id="reminderDays"
                      name="reminderDays"
                      value={formData.reminderDays}
                      onChange={(e) => handleNumberInputChange(e, "reminderDays")}
                      className={styles.input}
                      placeholder="e.g., 1"
                      min="0"
                    />
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="recurrencePattern" className={styles.inputLabel}>
                      <Repeat className={styles.inputIcon} />
                      Recurrence Pattern
                    </label>
                    <select
                      id="recurrencePattern"
                      name="recurrencePattern"
                      value={formData.recurrencePattern}
                      onChange={handleInputChange}
                      className={styles.input}
                    >
                      <option value="custom">Custom</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  {formData.recurrencePattern === "custom" && (
                    <div className={styles.inputField}>
                      <label htmlFor="customRecurrenceRule" className={styles.inputLabel}>
                        Custom Recurrence Rule (iCal RRULE)
                      </label>
                      <input
                        type="text"
                        id="customRecurrenceRule"
                        name="customRecurrenceRule"
                        value={formData.customRecurrenceRule}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="e.g., FREQ=WEEKLY;BYDAY=MO,WE,FR"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <MapPin className={styles.sectionIcon} />
                Location
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label htmlFor="locationAddress" className={styles.inputLabel}>
                    Address
                  </label>
                  <input
                    type="text"
                    id="locationAddress"
                    name="locationAddress"
                    value={formData.locationAddress}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter location address"
                  />
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="latitude" className={styles.inputLabel}>
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={(e) => handleNumberInputChange(e, "latitude")}
                      className={styles.input}
                      placeholder="e.g., 34.0522"
                      step="any"
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="longitude" className={styles.inputLabel}>
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={(e) => handleNumberInputChange(e, "longitude")}
                      className={styles.input}
                      placeholder="e.g., -118.2437"
                      step="any"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Star className={styles.sectionIcon} />
                Additional Information
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>
                    <Tag className={styles.inputIcon} />
                    Tags
                  </label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className={styles.arrayItemContainer}>
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                        className={styles.arrayInput}
                        placeholder="Enter tag"
                      />
                      {formData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("tags", index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("tags")} className={styles.addButton}>
                    Add Tag
                  </button>
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>
                    <ListTodo className={styles.inputIcon} />
                    Checklist
                  </label>
                  {formData.checklist.map((item, index) => (
                    <div key={item.id} className={styles.arrayItemContainer}>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleArrayChange("checklist", index, e.target.value)}
                        className={styles.arrayInput}
                        placeholder="Enter checklist item"
                      />
                      {formData.checklist.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("checklist", index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("checklist")} className={styles.addButton}>
                    Add Checklist Item
                  </button>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="linkedResourceTitle" className={styles.inputLabel}>
                      <Link className={styles.inputIcon} />
                      Linked Resource Title
                    </label>
                    <input
                      type="text"
                      id="linkedResourceTitle"
                      name="linkedResourceTitle"
                      value={formData.linkedResourceTitle}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="e.g., Design Spec"
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="linkedResourceUrl" className={styles.inputLabel}>
                      <Link className={styles.inputIcon} />
                      Linked Resource URL
                    </label>
                    <input
                      type="url"
                      id="linkedResourceUrl"
                      name="linkedResourceUrl"
                      value={formData.linkedResourceUrl}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="e.g., https://example.com/design-spec"
                    />
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="score" className={styles.inputLabel}>
                      <Scale className={styles.inputIcon} />
                      Score
                    </label>
                    <input
                      type="number"
                      id="score"
                      name="score"
                      value={formData.score}
                      onChange={(e) => handleNumberInputChange(e, "score")}
                      className={styles.input}
                      placeholder="e.g., 5"
                      min="0"
                      max="10"
                    />
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="feedback" className={styles.inputLabel}>
                      <MessageSquare className={styles.inputIcon} />
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      placeholder="Enter feedback for the task"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy and Blocking Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <Lock className={styles.sectionIcon} />
                Privacy & Blocking
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.checkboxField}>
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="isPrivate" className={styles.checkboxLabel}>
                    Private Task
                  </label>
                </div>

                <div className={styles.checkboxField}>
                  <input
                    type="checkbox"
                    id="isBlocked"
                    name="isBlocked"
                    checked={formData.isBlocked}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="isBlocked" className={styles.checkboxLabel}>
                    Blocked
                  </label>
                </div>

                {formData.isBlocked && (
                  <div className={styles.inputField}>
                    <label htmlFor="blockReason" className={styles.inputLabel}>
                      <Ban className={styles.inputIcon} />
                      Reason for Blocking *
                    </label>
                    <input
                      type="text"
                      id="blockReason"
                      name="blockReason"
                      value={formData.blockReason}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.blockReason ? styles.inputError : ""}`}
                      placeholder="Enter reason for blocking this task"
                    />
                    {errors.blockReason && <span className={styles.errorMessage}>{errors.blockReason}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleReset} className={styles.resetButton} disabled={isSubmitting}>
              {isEditMode ? "Reset Changes" : "Reset Form"}
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? "Updating Task..."
                  : "Creating Task..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTasks
