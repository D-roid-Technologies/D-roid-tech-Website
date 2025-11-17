"use client";

import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import "./CalendarCreateTask.css";
import { authService } from "../../../redux/configuration/auth.service";
import { TaskMain, UserRef } from "../../../redux/slices/scheduleTask";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Store";
import { addNotification } from "../../../redux/slices/notificationSlice";

interface CreateTaskFormProps {
  onBack: () => void;
  onTaskCreated?: (task: TaskMain) => void; // Callback when task is created
  initialData?: TaskMain;
  mode?: "add" | "edit";
  onTaskUpdated?: (task: TaskMain) => void; // Callback when task is updated
}

const statusOptions = [
  { value: "event", label: "Events" },
  { value: "reminder", label: "Reminder" },
  { value: "task", label: "Task" },
  { value: "note", label: "Note" },
  { value: "appiontment", label: "Appiontement" },
  { value: "meeting", label: "Meeting" },
  { value: "goal", label: "Goal" },
  { value: "routine", label: "Routine" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
  { value: "critical", label: "Critical" },
];

const CalendarCreateTask: React.FC<CreateTaskFormProps> = ({
  onBack,
  onTaskCreated,
  initialData,
  mode = "add",
  onTaskUpdated,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<TaskMain>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    status: "event",
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
      name: user.firstName + " " + user.lastName,
      email: user.email,
    },
    dateCreated: new Date().toLocaleString(),
    dateModified: "",
    dateDeleted: "",
  });

  const [errors, setErrors] = useState<Partial<TaskMain>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        ...initialData,
        tags: initialData.tags?.length ? initialData.tags : [""],
        checklist: initialData.checklist?.length ? initialData.checklist : [],
      });
    }
  }, [initialData, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof TaskMain]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TaskMain
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Number.parseFloat(value),
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleListboxChange = (field: keyof TaskMain, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }

    if (!formData.startDate) {
      setErrors({ startDate: "Start date is required" });
      return;
    }

    setIsSubmitting(true);

    try {
      const taskToSave = {
        ...formData,
        dateModified: mode === "edit" ? new Date().toLocaleString() : "",
      };

      await authService.handleCreateTask(taskToSave as any);


      // Create notification
      const now = new Date();
      const notification = {
        id: Date.now(),
        title: mode === "edit" ? "Task Updated" : "New Task Created",
        message: `Task "${formData.title}" has been ${mode === "edit" ? "updated" : "created"
          } successfully with ${formData.priority} priority.`,
        date: now.toISOString().split("T")[0],
        time: now.toISOString(),
        type: "info",
        isRead: false,
      };

      dispatch(addNotification(notification));

      // Call the appropriate callback
      if (mode === "edit" && onTaskUpdated) {
        onTaskUpdated(taskToSave);
      } else if (onTaskCreated) {
        onTaskCreated(taskToSave);
      }

      handleReset();
      onBack(); // Close the modal
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorNotification = {
        id: Date.now(),
        title: "Error",
        message: `Failed to ${mode === "edit" ? "update" : "create"
          } task. Please try again.`,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        type: "error",
        isRead: false,
      };
      dispatch(addNotification(errorNotification));
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
      });
    } else {
      setFormData({
        id: crypto.randomUUID(),
        title: "",
        description: "",
        status: "event",
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
    setErrors({});
  };

  const isEditMode = mode === "edit";

  return (
    <div className="ct-form-container">
      <div className="ct-form-wrapper">
        <div className="ct-form-header">
          <h2 className="ct-form-title">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h2>
          <p className="ct-form-subtitle">
            {isEditMode
              ? "Update the details below to modify the task information"
              : "Fill in the details below to create a new task"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ct-flex-column">
          {/* Task Details */}
          <div className="ct-form-section">
            <h3 className="ct-section-title">Task Details</h3>

            <div className="ct-input-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title *"
                className="ct-input"
                required
              />
              {errors.title && (
                <span className="ct-error-text">{errors.title as string}</span>
              )}

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows={3}
                className="ct-textarea"
              />

              <div className="lf-form-group">
                <label className="lf-label">Type</label>
                <Listbox
                  value={formData.status}
                  onChange={(value) => handleListboxChange("status", value)}
                >
                  <div className="lf-dropdown">
                    <Listbox.Button className="lf-dropdown-btn">
                      <span>
                        {statusOptions.find(
                          (option) => option.value === formData.status
                        )?.label || "Select Type"}
                      </span>
                      <ChevronsUpDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Listbox.Button>
                    <Listbox.Options className="lf-dropdown-options">
                      {statusOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active, selected }) =>
                            `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between">
                              <span>{option.label}</span>
                              {selected && (
                                <Check className="h-5 w-5" aria-hidden="true" />
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* <div className="lf-form-group">
                <label className="lf-label">Priority</label>
                <Listbox
                  value={formData.priority}
                  onChange={(value) => handleListboxChange("priority", value)}
                >
                  <div className="lf-dropdown">
                    <Listbox.Button className="lf-dropdown-btn">
                      <span>
                        {priorityOptions.find(
                          (option) => option.value === formData.priority
                        )?.label || "Select priority"}
                      </span>
                      <ChevronsUpDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Listbox.Button>
                    <Listbox.Options className="lf-dropdown-options">
                      {priorityOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active, selected }) =>
                            `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between">
                              <span>{option.label}</span>
                              {selected && (
                                <Check className="h-5 w-5" aria-hidden="true" />
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div> */}
            </div>
          </div>

          {/* Time Tracking */}
          <div className="ct-form-section">
            <h3 className="ct-section-title">Time & Scheduling</h3>

            <div className="ct-date-input-row">
              <div className="ct-date-input-wrapper">
                <label className="ct-date-label">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="ct-input"
                  required
                />
                {errors.startDate && (
                  <span className="ct-error-text">
                    {errors.startDate as string}
                  </span>
                )}
              </div>
              <div className="ct-date-input-wrapper">
                <label className="ct-date-label">End Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="ct-input"
                />
              </div>
            </div>
          </div>

          {/* Feedback */}
          {/* <div className="ct-form-section">
            <h3 className="ct-section-title">Feedback & Scoring</h3>
            <div className="ct-feedback-section">
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={(e) => handleNumberInputChange(e, "score")}
                placeholder="Score"
                className="ct-input"
              />
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                placeholder="Feedback"
                rows={3}
                className="ct-textarea"
              />
            </div>
          </div> */}

          {/* System fields */}
          <div className="ct-system-metadata">
            <h3 className="ct-section-title">System Metadata</h3>
            <p className="ct-metadata-text">
              <b>Created By:</b> {formData.createdBy.name} (
              {formData.createdBy.email})
            </p>
            <p className="ct-metadata-text">
              <b>Date Created:</b> {formData.dateCreated}
            </p>
            {formData.dateModified && (
              <p className="ct-metadata-text">
                <b>Date Modified:</b> {formData.dateModified}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="ct-button-group">
            <button
              type="button"
              onClick={handleReset}
              className="ct-button ct-secondary-button"
            >
              Reset
            </button>
            <button
              type="submit"
              className="ct-button ct-primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarCreateTask;

// "use client";

// import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Listbox } from "@headlessui/react";
// import { ChevronsUpDown, Check } from "lucide-react";
// import "./CalendarCreateTask.css";
// import { authService } from "../../../redux/configuration/auth.service";
// import { TaskMain, UserRef } from "../../../redux/slices/scheduleTask";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../../redux/Store";
// import { addNotification } from "../../../redux/slices/notificationSlice";

// interface CreateTaskFormProps {
//   onBack: () => void;
//   initialData?: TaskMain;
//   mode?: "add" | "edit";
// }

// const statusOptions = [
//   { value: "pending", label: "Pending" },
//   { value: "in_progress", label: "In Progress" },
//   { value: "completed", label: "Completed" },
//   { value: "cancelled", label: "Cancelled" },
//   { value: "archived", label: "Archived" },
//   { value: "on_hold", label: "On Hold" },
//   { value: "reopened", label: "Reopened" },
// ];

// const priorityOptions = [
//   { value: "low", label: "Low" },
//   { value: "medium", label: "Medium" },
//   { value: "high", label: "High" },
//   { value: "urgent", label: "Urgent" },
//   { value: "critical", label: "Critical" },
// ];

// const recurrenceOptions = [
//   { value: "custom", label: "Custom" },
//   { value: "daily", label: "Daily" },
//   { value: "weekly", label: "Weekly" },
//   { value: "monthly", label: "Monthly" },
// ];

// const CalendarCreateTask: React.FC<CreateTaskFormProps> = ({
//   onBack,
//   initialData,
//   mode = "add",
// }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.user);
//   const [formData, setFormData] = useState<TaskMain>({
//     id: crypto.randomUUID(),
//     title: "",
//     description: "",
//     status: "pending",
//     priority: "low",
//     category: "",
//     projectId: "",
//     boardColumn: "",
//     sprintId: "",
//     parentTaskId: "",
//     subtasks: [],
//     dependencies: [],
//     dependents: [],
//     tags: [],
//     checklist: [],
//     assignee: {} as UserRef,
//     collaborators: [],
//     reporter: {} as UserRef,
//     comments: [],
//     attachments: [],
//     estimatedHours: 0,
//     actualHours: 0,
//     startDate: "",
//     dueDate: "",
//     completedAt: "",
//     reminderAt: "",
//     recurring: false,
//     recurrencePattern: "custom",
//     customRecurrenceRule: "",
//     isPrivate: false,
//     isBlocked: false,
//     blockReason: "",
//     score: 0,
//     feedback: "",
//     linkedResources: [],
//     auditTrail: [],
//     createdBy: {
//       id: user.staffId,
//       name: user.firstName + " " + user.lastName,
//       email: user.email,
//     },
//     dateCreated: new Date().toLocaleString(),
//     dateModified: "",
//     dateDeleted: "",
//   });

//   const [errors, setErrors] = useState<Partial<TaskMain>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   React.useEffect(() => {
//     if (initialData && mode === "edit") {
//       setFormData({
//         ...initialData,
//         tags: initialData.tags?.length ? initialData.tags : [""],
//         checklist: initialData.checklist?.length ? initialData.checklist : [],
//       });
//     }
//   }, [initialData, mode]);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (errors[name as keyof TaskMain]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleNumberInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: keyof TaskMain
//   ) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value === "" ? "" : Number.parseFloat(value),
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   const handleArrayChange = (
//     field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">,
//     index: number,
//     value: any
//   ) => {
//     setFormData((prev) => {
//       const updated = [...(prev[field] || [])];
//       updated[index] = value;
//       return { ...prev, [field]: updated };
//     });
//   };

//   const addArrayItem = (
//     field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]:
//         field === "tags"
//           ? [...(prev.tags || []), ""]
//           : field === "checklist"
//           ? [
//               ...(prev.checklist || []),
//               { id: crypto.randomUUID(), title: "", checked: false },
//             ]
//           : [...(prev.linkedResources || []), { title: "", url: "" }],
//     }));
//   };

//   const removeArrayItem = (
//     field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">,
//     index: number
//   ) => {
//     setFormData((prev) => {
//       const updated = [...((prev[field] as any[]) || [])].filter(
//         (_, i) => i !== index
//       );
//       return {
//         ...prev,
//         [field]: updated,
//       };
//     });
//   };

//   const handleListboxChange = (field: keyof TaskMain, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setIsSubmitting(true);

//     try {
//       const newTask = { ...formData };

//       await authService.handleCreateTask(newTask).then(() => {
//         // Create notification for task creation
//         const now = new Date();
//         const notification = {
//           id: Date.now(),
//           title: "New Task Created",
//           message: `Task "${formData.title}" has been created successfully with ${formData.priority} priority.`,
//           date: now.toISOString().split("T")[0],
//           time: now.toISOString(), // Store full ISO timestamp for real-time calculation
//           type: "info",
//           isRead: false,
//         };

//         // Dispatch notification to Redux store
//         dispatch(addNotification(notification));

//         handleReset();
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     if (mode === "edit" && initialData) {
//       setFormData({
//         ...initialData,
//         tags: initialData.tags?.length ? initialData.tags : [""],
//         checklist: initialData.checklist?.length ? initialData.checklist : [],
//       });
//     } else {
//       setFormData({
//         id: crypto.randomUUID(),
//         title: "",
//         description: "",
//         status: "pending",
//         priority: "low",
//         category: "",
//         projectId: "",
//         boardColumn: "",
//         sprintId: "",
//         parentTaskId: "",
//         subtasks: [],
//         dependencies: [],
//         dependents: [],
//         tags: [],
//         checklist: [],
//         assignee: {} as UserRef,
//         collaborators: [],
//         reporter: {} as UserRef,
//         comments: [],
//         attachments: [],
//         estimatedHours: 0,
//         actualHours: 0,
//         startDate: "",
//         dueDate: "",
//         completedAt: "",
//         reminderAt: "",
//         recurring: false,
//         recurrencePattern: "custom",
//         customRecurrenceRule: "",
//         isPrivate: false,
//         isBlocked: false,
//         blockReason: "",
//         score: 0,
//         feedback: "",
//         linkedResources: [],
//         auditTrail: [],
//         createdBy: {
//           id: user.staffId,
//           name: `${user.firstName} ${user.lastName}`,
//           email: user.email,
//         },
//         dateCreated: new Date().toLocaleString(),
//         dateModified: "",
//         dateDeleted: "",
//       });
//     }
//     setErrors({});
//   };

//   const isEditMode = mode === "edit";

//   return (
//     <div className="ct-form-container">
//       <div className="ct-form-wrapper">
//         <div className="ct-form-header">
//           <h2 className="ct-form-title">
//             {isEditMode ? "Edit Task" : "Create New Task"}
//           </h2>
//           <p className="ct-form-subtitle">
//             {isEditMode
//               ? "Update the details below to modify the task information"
//               : "Fill in the details below to create a new task"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="ct-flex-column">
//           {/* Task Details */}
//           <div className="ct-form-section">
//             <h3 className="ct-section-title">Task Details</h3>

//             <div className="ct-input-group">
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 placeholder="Title *"
//                 className="ct-input"
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Description"
//                 rows={3}
//                 className="ct-textarea"
//               />

//               <div className="lf-form-group">
//                 <label className="lf-label">Status</label>
//                 <Listbox
//                   value={formData.status}
//                   onChange={(value) => handleListboxChange("status", value)}
//                 >
//                   <div className="lf-dropdown">
//                     <Listbox.Button className="lf-dropdown-btn">
//                       <span>
//                         {statusOptions.find(
//                           (option) => option.value === formData.status
//                         )?.label || "Select status"}
//                       </span>
//                       <ChevronsUpDown
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Listbox.Button>
//                     <Listbox.Options className="lf-dropdown-options">
//                       {statusOptions.map((option) => (
//                         <Listbox.Option
//                           key={option.value}
//                           value={option.value}
//                           className={({ active, selected }) =>
//                             `lf-dropdown-item ${active ? "lf-active" : ""} ${
//                               selected ? "lf-selected" : ""
//                             }`
//                           }
//                         >
//                           {({ selected }) => (
//                             <div className="flex items-center justify-between">
//                               <span>{option.label}</span>
//                               {selected && (
//                                 <Check className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </div>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>
//                   </div>
//                 </Listbox>
//               </div>

//               <div className="lf-form-group">
//                 <label className="lf-label">Priority</label>
//                 <Listbox
//                   value={formData.priority}
//                   onChange={(value) => handleListboxChange("priority", value)}
//                 >
//                   <div className="lf-dropdown">
//                     <Listbox.Button className="lf-dropdown-btn">
//                       <span>
//                         {priorityOptions.find(
//                           (option) => option.value === formData.priority
//                         )?.label || "Select priority"}
//                       </span>
//                       <ChevronsUpDown
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Listbox.Button>
//                     <Listbox.Options className="lf-dropdown-options">
//                       {priorityOptions.map((option) => (
//                         <Listbox.Option
//                           key={option.value}
//                           value={option.value}
//                           className={({ active, selected }) =>
//                             `lf-dropdown-item ${active ? "lf-active" : ""} ${
//                               selected ? "lf-selected" : ""
//                             }`
//                           }
//                         >
//                           {({ selected }) => (
//                             <div className="flex items-center justify-between">
//                               <span>{option.label}</span>
//                               {selected && (
//                                 <Check className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </div>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>
//                   </div>
//                 </Listbox>
//               </div>
//             </div>
//           </div>

//           {/* Time Tracking */}
//           <div className="ct-form-section">
//             <h3 className="ct-section-title">Time & Scheduling</h3>

//             <div className="ct-date-input-row">
//               <div className="ct-date-input-wrapper">
//                 <label className="ct-date-label">Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleInputChange}
//                   className="ct-input"
//                 />
//               </div>
//               <div className="ct-date-input-wrapper">
//                 <label className="ct-date-label">End Date</label>
//                 <input
//                   type="date"
//                   name="dueDate"
//                   value={formData.dueDate}
//                   onChange={handleInputChange}
//                   className="ct-input"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Feedback */}
//           <div className="ct-form-section">
//             <h3 className="ct-section-title">Feedback & Scoring</h3>
//             <div className="ct-feedback-section">
//               <input
//                 type="number"
//                 name="score"
//                 value={formData.score}
//                 onChange={(e) => handleNumberInputChange(e, "score")}
//                 placeholder="Score"
//                 className="ct-input"
//               />
//               <textarea
//                 name="feedback"
//                 value={formData.feedback}
//                 onChange={handleInputChange}
//                 placeholder="Feedback"
//                 rows={3}
//                 className="ct-textarea"
//               />
//             </div>
//           </div>

//           {/* System fields */}
//           <div className="ct-system-metadata">
//             <h3 className="ct-section-title">System Metadata</h3>
//             <p className="ct-metadata-text">
//               <b>Created By:</b> {formData.createdBy.name} (
//               {formData.createdBy.email})
//             </p>
//             <p className="ct-metadata-text">
//               <b>Date Created:</b> {formData.dateCreated}
//             </p>
//             {formData.dateModified && (
//               <p className="ct-metadata-text">
//                 <b>Date Modified:</b> {formData.dateModified}
//               </p>
//             )}
//             {formData.dateDeleted && (
//               <p className="ct-metadata-text">
//                 <b>Date Deleted:</b> {formData.dateDeleted}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <div className="ct-button-group">
//             <button
//               type="button"
//               onClick={handleReset}
//               className="ct-button ct-secondary-button"
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="ct-button ct-primary-button"
//               disabled={isSubmitting}
//             >
//               {isSubmitting
//                 ? "Submitting..."
//                 : isEditMode
//                 ? "Update Task"
//                 : "Create Task"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CalendarCreateTask;

// "use client";

// import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Listbox } from "@headlessui/react";
// import { ChevronsUpDown, Check } from "lucide-react";
// import styles from "./CreateTasks.module.css";
// import { authService } from "../../../redux/configuration/auth.service";
// import { TaskMain, UserRef } from "../../../redux/slices/scheduleTask";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../../redux/Store";
// import { addNotification } from "../../../redux/slices/notificationSlice";

// interface CreateTaskFormProps {
//   onBack: () => void;
//   initialData?: TaskMain;
//   mode?: "add" | "edit";
// }

// const statusOptions = [
//   { value: "pending", label: "Pending" },
//   { value: "in_progress", label: "In Progress" },
//   { value: "completed", label: "Completed" },
//   { value: "cancelled", label: "Cancelled" },
//   { value: "archived", label: "Archived" },
//   { value: "on_hold", label: "On Hold" },
//   { value: "reopened", label: "Reopened" },
// ];

// const priorityOptions = [
//   { value: "low", label: "Low" },
//   { value: "medium", label: "Medium" },
//   { value: "high", label: "High" },
//   { value: "urgent", label: "Urgent" },
//   { value: "critical", label: "Critical" },
// ];

// const recurrenceOptions = [
//   { value: "custom", label: "Custom" },
//   { value: "daily", label: "Daily" },
//   { value: "weekly", label: "Weekly" },
//   { value: "monthly", label: "Monthly" },
// ];

// const CalendarCreateTask: React.FC<CreateTaskFormProps> = ({
//   onBack,
//   initialData,
//   mode = "add",
// }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.user);
//   const [formData, setFormData] = useState<TaskMain>({
//     id: crypto.randomUUID(),
//     title: "",
//     description: "",
//     status: "pending",
//     priority: "low",
//     category: "",
//     projectId: "",
//     boardColumn: "",
//     sprintId: "",
//     parentTaskId: "",
//     subtasks: [],
//     dependencies: [],
//     dependents: [],
//     tags: [],
//     checklist: [],
//     assignee: {} as UserRef,
//     collaborators: [],
//     reporter: {} as UserRef,
//     comments: [],
//     attachments: [],
//     estimatedHours: 0,
//     actualHours: 0,
//     startDate: "",
//     dueDate: "",
//     completedAt: "",
//     reminderAt: "",
//     recurring: false,
//     recurrencePattern: "custom",
//     customRecurrenceRule: "",
//     isPrivate: false,
//     isBlocked: false,
//     blockReason: "",
//     score: 0,
//     feedback: "",
//     linkedResources: [],
//     auditTrail: [],
//     createdBy: {
//       id: user.staffId,
//       name: user.firstName + " " + user.lastName,
//       email: user.email,
//     },
//     dateCreated: new Date().toLocaleString(),
//     dateModified: "",
//     dateDeleted: "",
//   });

//   const [errors, setErrors] = useState<Partial<TaskMain>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   React.useEffect(() => {
//     if (initialData && mode === "edit") {
//       setFormData({
//         ...initialData,
//         tags: initialData.tags?.length ? initialData.tags : [""],
//         checklist: initialData.checklist?.length ? initialData.checklist : [],
//       });
//     }
//   }, [initialData, mode]);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (errors[name as keyof TaskMain]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleNumberInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: keyof TaskMain
//   ) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value === "" ? "" : Number.parseFloat(value),
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   const handleArrayChange = (
//     field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">,
//     index: number,
//     value: any
//   ) => {
//     setFormData((prev) => {
//       const updated = [...(prev[field] || [])];
//       updated[index] = value;
//       return { ...prev, [field]: updated };
//     });
//   };

//   const addArrayItem = (
//     field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]:
//         field === "tags"
//           ? [...(prev.tags || []), ""]
//           : field === "checklist"
//           ? [
//               ...(prev.checklist || []),
//               { id: crypto.randomUUID(), title: "", checked: false },
//             ]
//           : [...(prev.linkedResources || []), { title: "", url: "" }],
//     }));
//   };

//   const removeArrayItem = (
//     field: keyof Pick<TaskMain, "tags" | "checklist" | "linkedResources">,
//     index: number
//   ) => {
//     setFormData((prev) => {
//       const updated = [...((prev[field] as any[]) || [])].filter(
//         (_, i) => i !== index
//       );
//       return {
//         ...prev,
//         [field]: updated,
//       };
//     });
//   };

//   const handleListboxChange = (field: keyof TaskMain, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setIsSubmitting(true);

//     try {
//       // const processedData: TaskMain = {
//       //   ...formData,
//       //   tags: (formData.tags || []).filter((item) => item.trim() !== ""),
//       //   checklist: (formData.checklist || []).filter(
//       //     (item) => item.title.trim() !== ""
//       //   ),
//       //   linkedResources: (formData.linkedResources || []).filter(
//       //     (res) => res.title.trim() !== "" || res.url.trim() !== ""
//       //   ),
//       // };
//       const newTask = { ...formData };

//       await authService.handleCreateTask(newTask).then(() => {
//         // Create notification for task creation
//         const now = new Date();
//         const notification = {
//           id: Date.now(),
//           title: "New Task Created",
//           message: `Task "${formData.title}" has been created successfully with ${formData.priority} priority.`,
//           date: now.toISOString().split("T")[0],
//           time: now.toISOString(), // Store full ISO timestamp for real-time calculation
//           type: "info",
//           isRead: false,
//         };

//         // Dispatch notification to Redux store
//         dispatch(addNotification(notification));

//         handleReset();
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // const createTask = async () => {
//   //   if (!title.trim()) return;

//   //   const now = new Date().toISOString();

//   //   const newTask: Task = {
//   //     id: crypto.randomUUID(),  // generate unique id here
//   //     title: title.trim(),
//   //     desc: desc.trim(),
//   //     completed: false,
//   //     dateCreated: now,
//   //     dateModified: now,
//   //   };

//   //   console.log(newTask);

//   //   await authService.handleCreateTask(user.uniqueId, newTask);

//   //   setTitle('');
//   //   setDesc('');
//   // };

//   const handleReset = () => {
//     if (mode === "edit" && initialData) {
//       setFormData({
//         ...initialData,
//         tags: initialData.tags?.length ? initialData.tags : [""],
//         checklist: initialData.checklist?.length ? initialData.checklist : [],
//       });
//     } else {
//       setFormData({
//         id: crypto.randomUUID(),
//         title: "",
//         description: "",
//         status: "pending",
//         priority: "low",
//         category: "",
//         projectId: "",
//         boardColumn: "",
//         sprintId: "",
//         parentTaskId: "",
//         subtasks: [],
//         dependencies: [],
//         dependents: [],
//         tags: [],
//         checklist: [],
//         assignee: {} as UserRef,
//         collaborators: [],
//         reporter: {} as UserRef,
//         comments: [],
//         attachments: [],
//         estimatedHours: 0,
//         actualHours: 0,
//         startDate: "",
//         dueDate: "",
//         completedAt: "",
//         reminderAt: "",
//         recurring: false,
//         recurrencePattern: "custom",
//         customRecurrenceRule: "",
//         isPrivate: false,
//         isBlocked: false,
//         blockReason: "",
//         score: 0,
//         feedback: "",
//         linkedResources: [],
//         auditTrail: [],
//         createdBy: {
//           id: user.staffId,
//           name: `${user.firstName} ${user.lastName}`,
//           email: user.email,
//         },
//         dateCreated: new Date().toLocaleString(),
//         dateModified: "",
//         dateDeleted: "",
//       });
//     }
//     setErrors({});
//   };

//   const isEditMode = mode === "edit";

//   return (
//     <div className={styles.addStaffFormContainer}>
//       {/* <button className={styles.backButton} onClick={onBack}>
//         <ArrowLeft />
//         Back to Task Management
//       </button> */}

//       <div className={styles.formWrapper}>
//         <div className={styles.formHeader}>
//           <h2 className={styles.formTitle}>
//             {isEditMode ? "Edit Task" : "Create New Task"}
//           </h2>
//           <p className={styles.formSubtitle}>
//             {isEditMode
//               ? "Update the details below to modify the task information"
//               : "Fill in the details below to create a new task"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className={styles.flexColumn}>
//           {/* Task Details */}
//           <div className={styles.formSection}>
//             <h3 className={styles.sectionTitle}>Task Details</h3>

//             <div className={styles.inputGroup}>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 placeholder="Title *"
//                 className={styles.input}
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 placeholder="Description"
//                 rows={3}
//                 className={styles.textarea}
//               />

//               <div className="lf-form-group">
//                 <label className="lf-label">Status</label>
//                 <Listbox
//                   value={formData.status}
//                   onChange={(value) => handleListboxChange("status", value)}
//                 >
//                   <div className="lf-dropdown">
//                     <Listbox.Button className="lf-dropdown-btn">
//                       <span>
//                         {statusOptions.find(
//                           (option) => option.value === formData.status
//                         )?.label || "Select status"}
//                       </span>
//                       <ChevronsUpDown
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Listbox.Button>
//                     <Listbox.Options className="lf-dropdown-options">
//                       {statusOptions.map((option) => (
//                         <Listbox.Option
//                           key={option.value}
//                           value={option.value}
//                           className={({ active, selected }) =>
//                             `lf-dropdown-item ${active ? "lf-active" : ""} ${
//                               selected ? "lf-selected" : ""
//                             }`
//                           }
//                         >
//                           {({ selected }) => (
//                             <div className="flex items-center justify-between">
//                               <span>{option.label}</span>
//                               {selected && (
//                                 <Check className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </div>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>
//                   </div>
//                 </Listbox>
//               </div>

//               <div className="lf-form-group">
//                 <label className="lf-label">Priority</label>
//                 <Listbox
//                   value={formData.priority}
//                   onChange={(value) => handleListboxChange("priority", value)}
//                 >
//                   <div className="lf-dropdown">
//                     <Listbox.Button className="lf-dropdown-btn">
//                       <span>
//                         {priorityOptions.find(
//                           (option) => option.value === formData.priority
//                         )?.label || "Select priority"}
//                       </span>
//                       <ChevronsUpDown
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                       />
//                     </Listbox.Button>
//                     <Listbox.Options className="lf-dropdown-options">
//                       {priorityOptions.map((option) => (
//                         <Listbox.Option
//                           key={option.value}
//                           value={option.value}
//                           className={({ active, selected }) =>
//                             `lf-dropdown-item ${active ? "lf-active" : ""} ${
//                               selected ? "lf-selected" : ""
//                             }`
//                           }
//                         >
//                           {({ selected }) => (
//                             <div className="flex items-center justify-between">
//                               <span>{option.label}</span>
//                               {selected && (
//                                 <Check className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </div>
//                           )}
//                         </Listbox.Option>
//                       ))}
//                     </Listbox.Options>
//                   </div>
//                 </Listbox>
//               </div>
//             </div>
//           </div>

//           {/* Time Tracking */}
//           <div className={styles.formSection}>
//             <h3 className={styles.sectionTitle}>Time & Scheduling</h3>

//             <div className={styles.dateInputRow}>
//               <div className={styles.dateInputWrapper}>
//                 <label className={styles.dateLabel}>Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleInputChange}
//                   className={styles.input}
//                 />
//               </div>
//               <div className={styles.dateInputWrapper}>
//                 <label className={styles.dateLabel}>End Date</label>
//                 <input
//                   type="date"
//                   name="dueDate"
//                   value={formData.dueDate}
//                   onChange={handleInputChange}
//                   className={styles.input}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Privacy & Blocking */}
//           {/* <div className={styles.formSection}>
//             <h3 className={styles.sectionTitle}>Privacy & Blocking</h3>

//             <div className={styles.checkboxGroup}>
//               <label className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="isPrivate"
//                   checked={formData.isPrivate}
//                   onChange={handleInputChange}
//                 />
//                 Private Task
//               </label>

//               <label className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="isBlocked"
//                   checked={formData.isBlocked}
//                   onChange={handleInputChange}
//                 />
//                 Blocked
//               </label>
//             </div>

//             {formData.isBlocked && (
//               <input
//                 type="text"
//                 name="blockReason"
//                 value={formData.blockReason}
//                 onChange={handleInputChange}
//                 placeholder="Reason for blocking"
//                 className={styles.input}
//               />
//             )}
//           </div> */}

//           {/* Feedback */}
//           <div className={styles.formSection}>
//             <h3 className={styles.sectionTitle}>Feedback & Scoring</h3>
//             <div className={styles.feedbacksection}>
//               <input
//                 type="number"
//                 name="score"
//                 value={formData.score}
//                 onChange={(e) => handleNumberInputChange(e, "score")}
//                 placeholder="Score"
//                 className={styles.input}
//               />
//               <textarea
//                 name="feedback"
//                 value={formData.feedback}
//                 onChange={handleInputChange}
//                 placeholder="Feedback"
//                 rows={3}
//                 className={styles.textarea}
//               />
//             </div>
//           </div>

//           {/* Linked Resources */}
//           {/* <div className={styles.formSection}>
//             <h3 className={styles.sectionTitle}>Linked Resources</h3>
//             {formData.linkedResources?.map((res, i) => (
//               <div key={i} className={styles.resourceRow}>
//                 <input
//                   type="text"
//                   value={res.title}
//                   onChange={(e) =>
//                     handleArrayChange("linkedResources", i, {
//                       ...res,
//                       title: e.target.value,
//                     })
//                   }
//                   placeholder="Title"
//                   className={styles.input}
//                 />
//                 <input
//                   type="url"
//                   value={res.url}
//                   onChange={(e) =>
//                     handleArrayChange("linkedResources", i, {
//                       ...res,
//                       url: e.target.value,
//                     })
//                   }
//                   placeholder="URL"
//                   className={styles.input}
//                 />
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addArrayItem("linkedResources")}
//               className={styles.addButton}
//             >
//               Add Resource
//             </button>
//           </div> */}

//           {/* System fields */}
//           <div className={styles.systemMetadata}>
//             <h3 className={styles.sectionTitle}>System Metadata</h3>
//             <p className={styles.metadataText}>
//               <b>Created By:</b> {formData.createdBy.name} (
//               {formData.createdBy.email})
//             </p>
//             <p className={styles.metadataText}>
//               <b>Date Created:</b> {formData.dateCreated}
//             </p>
//             {formData.dateModified && (
//               <p className={styles.metadataText}>
//                 <b>Date Modified:</b> {formData.dateModified}
//               </p>
//             )}
//             {formData.dateDeleted && (
//               <p className={styles.metadataText}>
//                 <b>Date Deleted:</b> {formData.dateDeleted}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <div className={styles.buttonGroup}>
//             <button
//               type="button"
//               onClick={handleReset}
//               className={`${styles.button} ${styles.secondaryButton}`}
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className={`${styles.button} ${styles.primaryButton}`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting
//                 ? "Submitting..."
//                 : isEditMode
//                 ? "Update Task"
//                 : "Create Task"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CalendarCreateTask;
