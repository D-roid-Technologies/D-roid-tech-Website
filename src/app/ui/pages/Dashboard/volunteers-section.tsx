import type React from "react"
import { Plus, Users, Clock, UserCheck, Award, Edit, Trash2 } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"
import { useState, useMemo } from "react"
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog"
import { EmptyState } from "./micro-ui/empty-state"
import { Modal } from "./micro-ui/modal"
import { ValidationRules, emailPattern, validateForm } from "./validation/validation"
import { SearchFilter } from "./micro-ui/search-filter"
import toast from "react-hot-toast"

interface Volunteer {
  id: number
  name: string
  email: string
  phone: string
  skills: string
  hours: number
  status: "Active" | "Inactive" | "Pending"
  joinDate: string
  availability: string
}

const initialVolunteers: Volunteer[] = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice@email.com",
    phone: "+1-555-0101",
    skills: "Teaching, Mentoring",
    hours: 45,
    status: "Active",
    joinDate: "2024-01-01",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob@email.com",
    phone: "+1-555-0102",
    skills: "Construction, Logistics",
    hours: 32,
    status: "Active",
    joinDate: "2024-01-05",
    availability: "Weekdays",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@email.com",
    phone: "+1-555-0103",
    skills: "Healthcare, First Aid",
    hours: 28,
    status: "Inactive",
    joinDate: "2023-12-15",
    availability: "Flexible",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@email.com",
    phone: "+1-555-0104",
    skills: "IT Support, Training",
    hours: 52,
    status: "Active",
    joinDate: "2023-11-20",
    availability: "Evenings",
  },
]

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "Pending" },
]

const availabilityOptions = [
  { label: "Weekends", value: "Weekends" },
  { label: "Weekdays", value: "Weekdays" },
  { label: "Evenings", value: "Evenings" },
  { label: "Flexible", value: "Flexible" },
]

const validationRules: ValidationRules = {
  name: { required: true, minLength: 2, maxLength: 100 },
  email: { required: true, pattern: emailPattern },
  phone: { required: true, minLength: 10 },
  skills: { required: true, minLength: 3 },
  availability: { required: true },
}

export const VolunteersSection: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [volunteerToDelete, setVolunteerToDelete] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [formData, setFormData] = useState<{
    name: string
    email: string
    phone: string
    skills: string
    availability: string
    status: "Pending" | "Active" | "Inactive"
  }>({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    status: "Pending",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const matchesSearch =
        volunteer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        volunteer.skills.toLowerCase().includes(searchValue.toLowerCase())

      const matchesFilter = !filterValue || volunteer.status === filterValue

      return matchesSearch && matchesFilter
    })
  }, [volunteers, searchValue, filterValue])

  const stats = useMemo(() => {
    const activeVolunteers = volunteers.filter((v) => v.status === "Active").length
    const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0)
    const pendingApplications = volunteers.filter((v) => v.status === "Pending").length
    const retentionRate = Math.round((activeVolunteers / volunteers.length) * 100) || 0

    return {
      activeVolunteers: activeVolunteers.toString(),
      totalHours: totalHours.toString(),
      pendingApplications: pendingApplications.toString(),
      retentionRate: `${retentionRate}%`,
    }
  }, [volunteers])

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "",
      status: "Pending",
    })
    setFormErrors({})
    setEditingVolunteer(null)
  }

  const openModal = (volunteer?: Volunteer) => {
    if (volunteer) {
      setEditingVolunteer(volunteer)
      setFormData({
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        skills: volunteer.skills,
        availability: volunteer.availability,
        status: volunteer.status,
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

    const volunteerData: Volunteer = {
      id: editingVolunteer?.id || Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills,
      availability: formData.availability,
      status: formData.status,
      hours: editingVolunteer?.hours || 0,
      joinDate: editingVolunteer?.joinDate || new Date().toISOString().split("T")[0],
    }

    if (editingVolunteer) {
      setVolunteers((prev) => prev.map((v) => (v.id === editingVolunteer.id ? volunteerData : v)))
      toast.success("The volunteer information has been successfully updated.", { style: { background: '#4BB543', color: '#fff' } })
    } else {
      setVolunteers((prev) => [...prev, volunteerData])
      toast.success("The volunteer has been successfully registered.", { style: { background: '#4BB543', color: '#fff' } })
    }

    closeModal()
  }

  const handleDelete = (id: number) => {
    setVolunteerToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (volunteerToDelete) {
      setVolunteers((prev) => prev.filter((v) => v.id !== volunteerToDelete))
      toast.success("The volunteer has been successfully removed.", { style: { background: '#4BB543', color: '#fff' } })
      setVolunteerToDelete(null)
    }
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Volunteers</h1>
          <p className={styles.sectionDescription}>Manage volunteer recruitment and activities</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`} onClick={() => openModal()}>
          <Plus size={16} />
          Add Volunteer
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Volunteers" value={stats.activeVolunteers} change="+12 this month" icon={Users} />
        <StatCard title="Total Hours" value={stats.totalHours} change="This month" icon={Clock} />
        <StatCard title="New Applications" value={stats.pendingApplications} change="Pending review" icon={UserCheck} />
        <StatCard title="Retention Rate" value={stats.retentionRate} change="+3% from last year" icon={Award} />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Volunteer Directory ({filteredVolunteers.length})</h2>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            filterOptions={statusOptions}
            placeholder="Search volunteers..."
            filterLabel="Filter by status"
          />
        </div>
        <div className={componentStyles.cardContent}>
          {filteredVolunteers.length === 0 ? (
            <EmptyState
              title="No volunteers found"
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : "No volunteers have been registered yet."
              }
            />
          ) : (
            <table className={componentStyles.table}>
              <thead className={componentStyles.tableHeader}>
                <tr>
                  <th className={componentStyles.tableHeaderCell}>Name</th>
                  <th className={componentStyles.tableHeaderCell}>Email</th>
                  <th className={componentStyles.tableHeaderCell}>Phone</th>
                  <th className={componentStyles.tableHeaderCell}>Skills</th>
                  <th className={componentStyles.tableHeaderCell}>Hours</th>
                  <th className={componentStyles.tableHeaderCell}>Status</th>
                  <th className={componentStyles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id} className={componentStyles.tableRow}>
                    <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>
                      {volunteer.name}
                    </td>
                    <td className={componentStyles.tableCell}>{volunteer.email}</td>
                    <td className={componentStyles.tableCell}>{volunteer.phone}</td>
                    <td className={componentStyles.tableCell}>{volunteer.skills}</td>
                    <td className={componentStyles.tableCell}>{volunteer.hours}h</td>
                    <td className={componentStyles.tableCell}>
                      <span
                        className={`${componentStyles.badge} ${
                          volunteer.status === "Active"
                            ? componentStyles.badgeSuccess
                            : volunteer.status === "Pending"
                              ? componentStyles.badgeWarning
                              : componentStyles.badgeSecondary
                        }`}
                      >
                        {volunteer.status}
                      </span>
                    </td>
                    <td className={componentStyles.tableCell}>
                      <div className={componentStyles.tableActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(volunteer)}
                          title="Edit volunteer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(volunteer.id)}
                          title="Delete volunteer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingVolunteer ? "Edit Volunteer" : "Add New Volunteer"}
        description={editingVolunteer ? "Update volunteer information" : "Register a new volunteer"}
      >
        <form onSubmit={handleSubmit}>
          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Full Name *</label>
            <input
              className={`${componentStyles.input} ${formErrors.name ? componentStyles.inputError : ""}`}
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {formErrors.name && <div className={componentStyles.errorText}>{formErrors.name}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Email *</label>
            <input
              type="email"
              className={`${componentStyles.input} ${formErrors.email ? componentStyles.inputError : ""}`}
              placeholder="volunteer@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {formErrors.email && <div className={componentStyles.errorText}>{formErrors.email}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Phone *</label>
            <input
              type="tel"
              className={`${componentStyles.input} ${formErrors.phone ? componentStyles.inputError : ""}`}
              placeholder="+1-555-0123"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            {formErrors.phone && <div className={componentStyles.errorText}>{formErrors.phone}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Skills *</label>
            <input
              className={`${componentStyles.input} ${formErrors.skills ? componentStyles.inputError : ""}`}
              placeholder="Teaching, Healthcare, IT..."
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
            />
            {formErrors.skills && <div className={componentStyles.errorText}>{formErrors.skills}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Availability *</label>
            <select
              className={`${componentStyles.select} ${formErrors.availability ? componentStyles.inputError : ""}`}
              value={formData.availability}
              onChange={(e) => handleInputChange("availability", e.target.value)}
            >
              <option value="">Select availability</option>
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.availability && <div className={componentStyles.errorText}>{formErrors.availability}</div>}
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

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
            <button
              type="button"
              className={`${componentStyles.button} ${componentStyles.buttonSecondary}`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}>
              {editingVolunteer ? "Update Volunteer" : "Add Volunteer"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Volunteer"
        message="Are you sure you want to remove this volunteer? This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

