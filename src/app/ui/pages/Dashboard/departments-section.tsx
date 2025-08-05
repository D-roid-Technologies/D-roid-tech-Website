"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Plus, Users, DollarSign, Building, TrendingUp, Edit, Trash2 } from "lucide-react"
import { Modal } from "./micro-ui/modal"
import { StatCard } from "./micro-ui/stat-card"
import { SearchFilter } from "./micro-ui/search-filter"
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog"
import { EmptyState } from "./micro-ui/empty-state"
import { validateForm, type ValidationRules } from "./validation/validation"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"
import { toast } from "react-toastify"

interface Department {
  id: number
  name: string
  manager: string
  managerEmail: string
  employees: number
  budget: number
  location: string
  status: "Active" | "Inactive" | "Restructuring"
  description: string
  createdDate: string
}

type DepartmentStatus = "Active" | "Inactive" | "Restructuring"

const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Engineering",
    manager: "John Smith",
    managerEmail: "john.smith@company.com",
    employees: 25,
    budget: 2500000,
    location: "Building A, Floor 3",
    status: "Active",
    description: "Software development and technical infrastructure",
    createdDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Marketing",
    manager: "Sarah Johnson",
    managerEmail: "sarah.johnson@company.com",
    employees: 12,
    budget: 800000,
    location: "Building B, Floor 2",
    status: "Active",
    description: "Brand management and customer acquisition",
    createdDate: "2023-02-01",
  },
  {
    id: 3,
    name: "Human Resources",
    manager: "Mike Wilson",
    managerEmail: "mike.wilson@company.com",
    employees: 8,
    budget: 600000,
    location: "Building A, Floor 1",
    status: "Active",
    description: "Employee relations and talent management",
    createdDate: "2023-01-10",
  },
  {
    id: 4,
    name: "Finance",
    manager: "Emily Davis",
    managerEmail: "emily.davis@company.com",
    employees: 15,
    budget: 1200000,
    location: "Building C, Floor 4",
    status: "Restructuring",
    description: "Financial planning and accounting operations",
    createdDate: "2023-01-20",
  },
]

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Restructuring", value: "Restructuring" },
]

const validationRules: ValidationRules = {
  name: { required: true, minLength: 2, maxLength: 100 },
  manager: { required: true, minLength: 2, maxLength: 100 },
  managerEmail: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  budget: { required: true },
  location: { required: true, minLength: 3 },
  description: { required: true, minLength: 10, maxLength: 500 },
}

export const DepartmentsSection: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    managerEmail: "",
    employees: "",
    budget: "",
    location: "",
    status: "Active" as DepartmentStatus,
    description: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        department.manager.toLowerCase().includes(searchValue.toLowerCase()) ||
        department.location.toLowerCase().includes(searchValue.toLowerCase())

      const matchesFilter = !filterValue || department.status === filterValue

      return matchesSearch && matchesFilter
    })
  }, [departments, searchValue, filterValue])

  const stats = useMemo(() => {
    const totalDepartments = departments.length
    const totalEmployees = departments.reduce((sum, d) => sum + d.employees, 0)
    const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0)
    const activeDepartments = departments.filter((d) => d.status === "Active").length

    return {
      totalDepartments: totalDepartments.toString(),
      totalEmployees: totalEmployees.toString(),
      totalBudget: `$${(totalBudget / 1000000).toFixed(1)}M`,
      activeDepartments: activeDepartments.toString(),
    }
  }, [departments])

  const resetForm = () => {
    setFormData({
      name: "",
      manager: "",
      managerEmail: "",
      employees: "",
      budget: "",
      location: "",
      status: "Active",
      description: "",
    })
    setFormErrors({})
    setEditingDepartment(null)
  }

  const openModal = (department?: Department) => {
    if (department) {
      setEditingDepartment(department)
      setFormData({
        name: department.name,
        manager: department.manager,
        managerEmail: department.managerEmail,
        employees: department.employees.toString(),
        budget: department.budget.toString(),
        location: department.location,
        status: department.status as DepartmentStatus,
        description: department.description,
      })
    } else {
      resetForm()
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    resetForm()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm(formData, validationRules)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const departmentData: Department = {
      id: editingDepartment?.id || Date.now(),
      name: formData.name,
      manager: formData.manager,
      managerEmail: formData.managerEmail,
      employees: Number.parseInt(formData.employees),
      budget: Number.parseFloat(formData.budget),
      location: formData.location,
      status: formData.status as DepartmentStatus,
      description: formData.description,
      createdDate: editingDepartment?.createdDate || new Date().toISOString().split("T")[0],
    }

    if (editingDepartment) {
      setDepartments((prev) => prev.map((d) => (d.id === editingDepartment.id ? departmentData : d)))
      toast.success("The department has been successfully updated.")
    } else {
      setDepartments((prev) => [...prev, departmentData])
      toast.success("The department has been successfully created.")
    }

    closeModal()
  }

  const handleDelete = (id: number) => {
    setDepartmentToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (departmentToDelete) {
      setDepartments((prev) => prev.filter((d) => d.id !== departmentToDelete))
      toast.success("The department has been successfully removed.")
      setDepartmentToDelete(null)
    }
  }

 return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Departments</h1>
          <p className={styles.sectionDescription}>Manage company departments and organizational structure</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`} onClick={() => openModal()}>
          <Plus size={16} />
          Add Department
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total Departments"
          value={stats.totalDepartments}
          change="Across organization"
          icon={Building}
        />
        <StatCard title="Total Employees" value={stats.totalEmployees} change="Active workforce" icon={Users} />
        <StatCard title="Total Budget" value={stats.totalBudget} change="Annual allocation" icon={DollarSign} />
        <StatCard
          title="Active Departments"
          value={stats.activeDepartments}
          change="Currently operational"
          icon={TrendingUp}
        />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Departments ({filteredDepartments.length})</h2>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            filterOptions={statusOptions}
            placeholder="Search departments..."
            filterLabel="Filter by status"
          />
        </div>
        <div className={componentStyles.cardContent}>
          {filteredDepartments.length === 0 ? (
            <EmptyState
              title="No departments found"
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : "No departments have been created yet."
              }
            />
          ) : (
            <div className={componentStyles.responsiveTableContainer}>
              {/* Desktop Table View */}
              <div className={componentStyles.desktopTable}>
                <table className={componentStyles.table}>
                  <thead className={componentStyles.tableHeader}>
                    <tr>
                      <th className={componentStyles.tableHeaderCell}>Department</th>
                      <th className={componentStyles.tableHeaderCell}>Manager</th>
                      <th className={componentStyles.tableHeaderCell}>Employees</th>
                      <th className={componentStyles.tableHeaderCell}>Budget</th>
                      <th className={componentStyles.tableHeaderCell}>Location</th>
                      <th className={componentStyles.tableHeaderCell}>Status</th>
                      <th className={componentStyles.tableHeaderCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartments.map((department) => (
                      <tr key={department.id} className={componentStyles.tableRow}>
                        <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>
                          {department.name}
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div>
                            <div>{department.manager}</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{department.managerEmail}</div>
                          </div>
                        </td>
                        <td className={componentStyles.tableCell}>{department.employees}</td>
                        <td className={componentStyles.tableCell}>${department.budget.toLocaleString()}</td>
                        <td className={componentStyles.tableCell}>{department.location}</td>
                        <td className={componentStyles.tableCell}>
                          <span
                            className={`${componentStyles.badge} ${
                              department.status === "Active"
                                ? componentStyles.badgeSuccess
                                : department.status === "Restructuring"
                                  ? componentStyles.badgeWarning
                                  : componentStyles.badgeSecondary
                            }`}
                          >
                            {department.status}
                          </span>
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div className={componentStyles.tableActions}>
                            <button
                              className={componentStyles.actionButton}
                              onClick={() => openModal(department)}
                              title="Edit department"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                              onClick={() => handleDelete(department.id)}
                              title="Delete department"
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
                {filteredDepartments.map((department) => (
                  <div key={department.id} className={componentStyles.departmentCard}>
                    <div className={componentStyles.cardHeader}>
                      <div className={componentStyles.cardTitleSection}>
                        <h3 className={componentStyles.cardTitle}>{department.name}</h3>
                        <span
                          className={`${componentStyles.badge} ${
                            department.status === "Active"
                              ? componentStyles.badgeSuccess
                              : department.status === "Restructuring"
                                ? componentStyles.badgeWarning
                                : componentStyles.badgeSecondary
                          }`}
                        >
                          {department.status}
                        </span>
                      </div>
                      <div className={componentStyles.cardActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(department)}
                          title="Edit department"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(department.id)}
                          title="Delete department"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={componentStyles.cardBody}>
                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Manager</span>
                          <div className={componentStyles.fieldValue}>
                            <div>{department.manager}</div>
                            <div className={componentStyles.fieldSubtext}>{department.managerEmail}</div>
                          </div>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Employees</span>
                          <span className={componentStyles.fieldValue}>{department.employees}</span>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Budget</span>
                          <span className={componentStyles.fieldValue}>${department.budget.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Location</span>
                          <span className={componentStyles.fieldValue}>{department.location}</span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Description</span>
                          <span className={componentStyles.fieldValue}>{department.description}</span>
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
        title={editingDepartment ? "Edit Department" : "Add New Department"}
        description={editingDepartment ? "Update department information" : "Create a new department"}
      >
        <form onSubmit={handleSubmit}>
          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Department Name *</label>
            <input
              className={`${componentStyles.input} ${formErrors.name ? componentStyles.inputError : ""}`}
              placeholder="Enter department name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {formErrors.name && <div className={componentStyles.errorText}>{formErrors.name}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Manager Name *</label>
            <input
              className={`${componentStyles.input} ${formErrors.manager ? componentStyles.inputError : ""}`}
              placeholder="Enter manager name"
              value={formData.manager}
              onChange={(e) => handleInputChange("manager", e.target.value)}
            />
            {formErrors.manager && <div className={componentStyles.errorText}>{formErrors.manager}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Manager Email *</label>
            <input
              type="email"
              className={`${componentStyles.input} ${formErrors.managerEmail ? componentStyles.inputError : ""}`}
              placeholder="manager@company.com"
              value={formData.managerEmail}
              onChange={(e) => handleInputChange("managerEmail", e.target.value)}
            />
            {formErrors.managerEmail && <div className={componentStyles.errorText}>{formErrors.managerEmail}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Number of Employees</label>
            <input
              type="number"
              min="0"
              className={componentStyles.input}
              placeholder="0"
              value={formData.employees}
              onChange={(e) => handleInputChange("employees", e.target.value)}
            />
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Annual Budget ($) *</label>
            <input
              type="number"
              min="0"
              step="1000"
              className={`${componentStyles.input} ${formErrors.budget ? componentStyles.inputError : ""}`}
              placeholder="1000000"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
            {formErrors.budget && <div className={componentStyles.errorText}>{formErrors.budget}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Location *</label>
            <input
              className={`${componentStyles.input} ${formErrors.location ? componentStyles.inputError : ""}`}
              placeholder="Building A, Floor 2"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            {formErrors.location && <div className={componentStyles.errorText}>{formErrors.location}</div>}
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
            <label className={componentStyles.label}>Description *</label>
            <textarea
              className={`${componentStyles.textarea} ${formErrors.description ? componentStyles.inputError : ""}`}
              placeholder="Department description and responsibilities"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            {formErrors.description && <div className={componentStyles.errorText}>{formErrors.description}</div>}
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
              {editingDepartment ? "Update Department" : "Create Department"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      {/* {showToast && (
        <div className={`${componentStyles.toast} ${componentStyles.toastSuccess}`}>
          <div className={componentStyles.toastContent}>
            <p className={componentStyles.toastMessage}>{toastMessage}</p>
          </div>
          <button className={componentStyles.toastClose} onClick={() => setShowToast(false)}>
            ×
          </button>
        </div>
      )} */}
    </div>
  )
}
