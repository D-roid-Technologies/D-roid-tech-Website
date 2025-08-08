"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  Plus,
  Calendar,
  Target,
  CheckCircle,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import { Modal } from "./micro-ui/modal";
import { StatCard } from "./micro-ui/stat-card";
import { SearchFilter } from "./micro-ui/search-filter";
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog";
import { EmptyState } from "./micro-ui/empty-state";
import { validateForm, type ValidationRules } from "./validation/validation";
import styles from "./dashboard.module.css";
import componentStyles from "./components.module.css";
import { toast } from "react-toastify";

interface Project {
  id: number;
  name: string;
  description: string;
  manager: string;
  client: string;
  status: "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Critical";
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
  teamSize: number;
  department: string;
}

type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "On Hold"
  | "Completed"
  | "Cancelled";
type ProjectPriority = "Low" | "Medium" | "High" | "Critical";

const initialProjects: Project[] = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    description: "Complete overhaul of the company's e-commerce platform",
    manager: "John Smith",
    client: "Internal",
    status: "In Progress",
    priority: "High",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 250000,
    progress: 65,
    teamSize: 8,
    department: "Engineering",
  },
  {
    id: 2,
    name: "Marketing Campaign Q2",
    description: "Digital marketing campaign for Q2 product launch",
    manager: "Sarah Johnson",
    client: "Acme Corp",
    status: "Planning",
    priority: "Medium",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    budget: 75000,
    progress: 25,
    teamSize: 5,
    department: "Marketing",
  },
  {
    id: 3,
    name: "HR System Integration",
    description: "Integration of new HR management system",
    manager: "Mike Wilson",
    client: "Internal",
    status: "Completed",
    priority: "Medium",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    budget: 120000,
    progress: 100,
    teamSize: 6,
    department: "Human Resources",
  },
  {
    id: 4,
    name: "Financial Audit 2024",
    description: "Annual financial audit and compliance review",
    manager: "Emily Davis",
    client: "External Auditor",
    status: "In Progress",
    priority: "Critical",
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    budget: 50000,
    progress: 80,
    teamSize: 4,
    department: "Finance",
  },
];

const statusOptions = [
  { label: "Planning", value: "Planning" },
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];

const departmentOptions = [
  { label: "Engineering", value: "Engineering" },
  { label: "Marketing", value: "Marketing" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Finance", value: "Finance" },
  { label: "Operations", value: "Operations" },
];

const validationRules: ValidationRules = {
  name: { required: true, minLength: 3, maxLength: 100 },
  description: { required: true, minLength: 10, maxLength: 500 },
  manager: { required: true, minLength: 2, maxLength: 100 },
  client: { required: true, minLength: 2, maxLength: 100 },
  startDate: { required: true },
  endDate: { required: true },
  budget: { required: true },
  department: { required: true },
};

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    client: "",
    status: "Planning" as ProjectStatus,
    priority: "Medium" as ProjectPriority,
    startDate: "",
    endDate: "",
    budget: "",
    progress: "0",
    teamSize: "1",
    department: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        project.manager.toLowerCase().includes(searchValue.toLowerCase()) ||
        project.client.toLowerCase().includes(searchValue.toLowerCase()) ||
        project.department.toLowerCase().includes(searchValue.toLowerCase());

      const matchesFilter = !filterValue || project.status === filterValue;

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchValue, filterValue]);

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(
      (p) => p.status === "In Progress"
    ).length;
    const completedProjects = projects.filter(
      (p) => p.status === "Completed"
    ).length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

    return {
      totalProjects: totalProjects.toString(),
      activeProjects: activeProjects.toString(),
      completedProjects: completedProjects.toString(),
      totalBudget: `$${(totalBudget / 1000000).toFixed(1)}M`,
    };
  }, [projects]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      manager: "",
      client: "",
      status: "Planning" as ProjectStatus,
      priority: "Medium" as ProjectPriority,
      startDate: "",
      endDate: "",
      budget: "",
      progress: "0",
      teamSize: "1",
      department: "",
    });
    setFormErrors({});
    setEditingProject(null);
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        manager: project.manager,
        client: project.client,
        status: project.status as ProjectStatus,
        priority: project.priority as ProjectPriority,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget.toString(),
        progress: project.progress.toString(),
        teamSize: project.teamSize.toString(),
        department: project.department,
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData, validationRules);

    // Additional validation for date range
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      errors.endDate = "End date must be after start date";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const projectData: Project = {
      id: editingProject?.id || Date.now(),
      name: formData.name,
      description: formData.description,
      manager: formData.manager,
      client: formData.client,
      status: formData.status as
        | "Planning"
        | "In Progress"
        | "On Hold"
        | "Completed"
        | "Cancelled",
      priority: formData.priority as "Low" | "Medium" | "High" | "Critical",
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: Number.parseFloat(formData.budget),
      progress: Number.parseInt(formData.progress),
      teamSize: Number.parseInt(formData.teamSize),
      department: formData.department,
    };

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? projectData : p))
      );
      toast.success("The project has been successfully updated");
    } else {
      setProjects((prev) => [...prev, projectData]);
      toast.success("The project has been successfully created.");
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setProjectToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
      toast.success("The project has been successfully removed.");
      setProjectToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return componentStyles.badgeSuccess;
      case "In Progress":
        return componentStyles.badgeDefault;
      case "Planning":
        return componentStyles.badgeWarning;
      case "On Hold":
        return componentStyles.badgeSecondary;
      case "Cancelled":
        return componentStyles.badgeSecondary;
      default:
        return componentStyles.badgeSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return componentStyles.badgeDanger || componentStyles.badgeSecondary;
      case "High":
        return componentStyles.badgeWarning;
      case "Medium":
        return componentStyles.badgeDefault;
      case "Low":
        return componentStyles.badgeSecondary;
      default:
        return componentStyles.badgeSecondary;
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Projects</h1>
          <p className={styles.sectionDescription}>
            Manage and track project progress and deliverables
          </p>
        </div>
        <button
          className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}
          onClick={() => openModal()}
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          change="All time"
          icon={Target}
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          change="In progress"
          icon={Clock}
        />
        <StatCard
          title="Completed"
          value={stats.completedProjects}
          change="Successfully delivered"
          icon={CheckCircle}
        />
        <StatCard
          title="Total Budget"
          value={stats.totalBudget}
          change="Allocated funds"
          icon={Calendar}
        />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>
            Projects ({filteredProjects.length})
          </h2>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            filterOptions={statusOptions}
            placeholder="Search projects..."
            filterLabel="Filter by status"
          />
        </div>
        <div className={componentStyles.cardContent}>
          {filteredProjects.length === 0 ? (
            <EmptyState
              title="No projects found"
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : "No projects have been created yet."
              }
            />
          ) : (
            <div className={componentStyles.responsiveTableContainer}>
              {/* Desktop Table View */}
              <div className={componentStyles.desktopTable}>
                <table className={componentStyles.table}>
                  <thead className={componentStyles.tableHeader}>
                    <tr>
                      <th className={componentStyles.tableHeaderCell}>
                        Project
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Manager
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Client
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Status
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Priority
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Progress
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Budget
                      </th>
                      <th className={componentStyles.tableHeaderCell}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className={componentStyles.tableRow}>
                        <td
                          className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}
                        >
                          <div>
                            <div>{project.name}</div>
                            <div
                              style={{ fontSize: "0.75rem", color: "#64748b" }}
                            >
                              {project.department}
                            </div>
                          </div>
                        </td>
                        <td className={componentStyles.tableCell}>
                          {project.manager}
                        </td>
                        <td className={componentStyles.tableCell}>
                          {project.client}
                        </td>
                        <td className={componentStyles.tableCell}>
                          <span
                            className={`${
                              componentStyles.badge
                            } ${getStatusColor(project.status)}`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className={componentStyles.tableCell}>
                          <span
                            className={`${
                              componentStyles.badge
                            } ${getPriorityColor(project.priority)}`}
                          >
                            {project.priority}
                          </span>
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <div
                              className={componentStyles.progress}
                              style={{ width: "60px" }}
                            >
                              <div
                                className={componentStyles.progressBar}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span style={{ fontSize: "0.75rem" }}>
                              {project.progress}%
                            </span>
                          </div>
                        </td>
                        <td className={componentStyles.tableCell}>
                          ${project.budget.toLocaleString()}
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div className={componentStyles.tableActions}>
                            <button
                              className={componentStyles.actionButton}
                              onClick={() => openModal(project)}
                              title="Edit project"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                              onClick={() => handleDelete(project.id)}
                              title="Delete project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className={componentStyles.mobileCards}>
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={componentStyles.departmentCard}
                  >
                    <div className={componentStyles.cardHeader}>
                      <div className={componentStyles.cardTitleSection}>
                        <h3 className={componentStyles.cardTitle}>
                          {project.name}
                        </h3>
                        <span
                          className={`${componentStyles.badge} ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className={componentStyles.cardActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(project)}
                          title="Edit project"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(project.id)}
                          title="Delete project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={componentStyles.cardBody}>
                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>
                            Department
                          </span>
                          <span className={componentStyles.fieldValue}>
                            {project.department}
                          </span>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>
                            Priority
                          </span>
                          <span
                            className={`${
                              componentStyles.badge
                            } ${getPriorityColor(project.priority)}`}
                          >
                            {project.priority}
                          </span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>
                            Manager
                          </span>
                          <span className={componentStyles.fieldValue}>
                            {project.manager}
                          </span>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>
                            Client
                          </span>
                          <span className={componentStyles.fieldValue}>
                            {project.client}
                          </span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>
                            Progress
                          </span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            <div
                              className={componentStyles.progress}
                              style={{ flexGrow: 1 }}
                            >
                              <div
                                className={componentStyles.progressBar}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span style={{ fontSize: "0.75rem" }}>
                              {project.progress}%
                            </span>
                          </div>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>
                            Budget
                          </span>
                          <span className={componentStyles.fieldValue}>
                            ${project.budget.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingProject ? "Edit Project" : "Create New Project"}
        description={
          editingProject ? "Update project information" : "Create a new project"
        }
      >
        {/* <form onSubmit={handleSubmit}>
          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Project Name *</label>
            <input
              className={`${componentStyles.input} ${formErrors.name ? componentStyles.inputError : ""}`}
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {formErrors.name && <div className={componentStyles.errorText}>{formErrors.name}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Description *</label>
            <textarea
              className={`${componentStyles.textarea} ${formErrors.description ? componentStyles.inputError : ""}`}
              placeholder="Project description and objectives"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            {formErrors.description && <div className={componentStyles.errorText}>{formErrors.description}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Project Manager *</label>
              <input
                className={`${componentStyles.input} ${formErrors.manager ? componentStyles.inputError : ""}`}
                placeholder="Manager name"
                value={formData.manager}
                onChange={(e) => handleInputChange("manager", e.target.value)}
              />
              {formErrors.manager && <div className={componentStyles.errorText}>{formErrors.manager}</div>}
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Client *</label>
              <input
                className={`${componentStyles.input} ${formErrors.client ? componentStyles.inputError : ""}`}
                placeholder="Client name"
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
              />
              {formErrors.client && <div className={componentStyles.errorText}>{formErrors.client}</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Status</label>
              <select
                className={componentStyles.select}
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Priority</label>
              <select
                className={componentStyles.select}
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Start Date *</label>
              <input
                type="date"
                className={`${componentStyles.input} ${formErrors.startDate ? componentStyles.inputError : ""}`}
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
              {formErrors.startDate && <div className={componentStyles.errorText}>{formErrors.startDate}</div>}
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>End Date *</label>
              <input
                type="date"
                className={`${componentStyles.input} ${formErrors.endDate ? componentStyles.inputError : ""}`}
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
              {formErrors.endDate && <div className={componentStyles.errorText}>{formErrors.endDate}</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Budget ($) *</label>
              <input
                type="number"
                min="0"
                step="1000"
                className={`${componentStyles.input} ${formErrors.budget ? componentStyles.inputError : ""}`}
                placeholder="50000"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              />
              {formErrors.budget && <div className={componentStyles.errorText}>{formErrors.budget}</div>}
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className={componentStyles.input}
                value={formData.progress}
                onChange={(e) => handleInputChange("progress", e.target.value)}
              />
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Team Size</label>
              <input
                type="number"
                min="1"
                className={componentStyles.input}
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
              />
            </div>
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Department *</label>
            <select
              className={`${componentStyles.select} ${formErrors.department ? componentStyles.inputError : ""}`}
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
            >
              <option value="">Select department</option>
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.department && <div className={componentStyles.errorText}>{formErrors.department}</div>}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
            <button
              type="button"
              className={`${componentStyles.button} ${componentStyles.buttonSecondary}`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}>
              {editingProject ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form> */}
        <form onSubmit={handleSubmit}>
          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Project Name *</label>
            <input
              className={`${componentStyles.input} ${
                formErrors.name ? componentStyles.inputError : ""
              }`}
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {formErrors.name && (
              <div className={componentStyles.errorText}>{formErrors.name}</div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Description *</label>
            <textarea
              className={`${componentStyles.textarea} ${
                formErrors.description ? componentStyles.inputError : ""
              }`}
              placeholder="Project description and objectives"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            {formErrors.description && (
              <div className={componentStyles.errorText}>
                {formErrors.description}
              </div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Project Manager *</label>
            <input
              className={`${componentStyles.input} ${
                formErrors.manager ? componentStyles.inputError : ""
              }`}
              placeholder="Manager name"
              value={formData.manager}
              onChange={(e) => handleInputChange("manager", e.target.value)}
            />
            {formErrors.manager && (
              <div className={componentStyles.errorText}>
                {formErrors.manager}
              </div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Client *</label>
            <input
              className={`${componentStyles.input} ${
                formErrors.client ? componentStyles.inputError : ""
              }`}
              placeholder="Client name"
              value={formData.client}
              onChange={(e) => handleInputChange("client", e.target.value)}
            />
            {formErrors.client && (
              <div className={componentStyles.errorText}>
                {formErrors.client}
              </div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Status</label>
            <select
              className={componentStyles.select}
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Priority</label>
            <select
              className={componentStyles.select}
              value={formData.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Start Date *</label>
            <input
              type="date"
              className={`${componentStyles.input} ${
                formErrors.startDate ? componentStyles.inputError : ""
              }`}
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
            {formErrors.startDate && (
              <div className={componentStyles.errorText}>
                {formErrors.startDate}
              </div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>End Date *</label>
            <input
              type="date"
              className={`${componentStyles.input} ${
                formErrors.endDate ? componentStyles.inputError : ""
              }`}
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
            />
            {formErrors.endDate && (
              <div className={componentStyles.errorText}>
                {formErrors.endDate}
              </div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Budget ($) *</label>
            <input
              type="number"
              min="0"
              step="1000"
              className={`${componentStyles.input} ${
                formErrors.budget ? componentStyles.inputError : ""
              }`}
              placeholder="50000"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
            {formErrors.budget && (
              <div className={componentStyles.errorText}>
                {formErrors.budget}
              </div>
            )}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className={componentStyles.input}
              value={formData.progress}
              onChange={(e) => handleInputChange("progress", e.target.value)}
            />
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Team Size</label>
            <input
              type="number"
              min="1"
              className={componentStyles.input}
              value={formData.teamSize}
              onChange={(e) => handleInputChange("teamSize", e.target.value)}
            />
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Department *</label>
            <select
              className={`${componentStyles.select} ${
                formErrors.department ? componentStyles.inputError : ""
              }`}
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
            >
              <option value="">Select department</option>
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.department && (
              <div className={componentStyles.errorText}>
                {formErrors.department}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "flex-end",
              marginTop: "1.5rem",
            }}
          >
            <button
              type="button"
              className={`${componentStyles.button} ${componentStyles.buttonSecondary}`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}
            >
              {editingProject ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};
