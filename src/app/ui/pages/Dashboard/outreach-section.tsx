"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Plus, Calendar, Megaphone, Users, TrendingUp, MapPin, Edit, Trash2 } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"
import { Modal } from "./micro-ui/modal"
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog"
import { EmptyState } from "./micro-ui/empty-state"
import { SearchFilter } from "./micro-ui/search-filter"
import { validateForm, type ValidationRules } from "./validation/validation"
import toast from "react-hot-toast"

interface OutreachProgram {
  id: number
  program: string
  location: string
  date: string
  participants: number
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled"
}

type ProgramStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled"

const initialOutreachData: OutreachProgram[] = [
  {
    id: 1,
    program: "Community Health Workshop",
    location: "Downtown Center",
    date: "2024-02-15",
    participants: 45,
    status: "Scheduled",
  },
  {
    id: 2,
    program: "Youth Mentorship",
    location: "Local Schools",
    date: "2024-01-20",
    participants: 120,
    status: "Ongoing",
  },
  {
    id: 3,
    program: "Environmental Cleanup",
    location: "City Park",
    date: "2024-01-10",
    participants: 80,
    status: "Completed",
  },
  {
    id: 4,
    program: "Senior Wellness Program",
    location: "Community Hall",
    date: "2024-03-01",
    participants: 60,
    status: "Scheduled",
  },
]

const statusOptions = [
  { label: "Scheduled", value: "Scheduled" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
]

const validationRules: ValidationRules = {
  program: { required: true, minLength: 3, maxLength: 150 },
  location: { required: true, minLength: 3, maxLength: 150 },
  date: { required: true },
  // participants: { required: true, min: 1 },
}

export const OutreachSection: React.FC = () => {
  const [outreachPrograms, setOutreachPrograms] = useState<OutreachProgram[]>(initialOutreachData)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<OutreachProgram | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [formData, setFormData] = useState({
    program: "",
    location: "",
    date: "",
    participants: "",
    status: "Scheduled" as ProgramStatus,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const filteredOutreach = useMemo(() => {
    return outreachPrograms.filter((program) => {
      const matchesSearch =
        program.program.toLowerCase().includes(searchValue.toLowerCase()) ||
        program.location.toLowerCase().includes(searchValue.toLowerCase()) ||
        program.status.toLowerCase().includes(searchValue.toLowerCase())

      const matchesFilter = !filterValue || program.status === filterValue

      return matchesSearch && matchesFilter
    })
  }, [outreachPrograms, searchValue, filterValue])

  const stats = useMemo(() => {
    const activePrograms = outreachPrograms.filter((p) => p.status === "Scheduled" || p.status === "Ongoing").length
    const totalParticipants = outreachPrograms.reduce((sum, p) => sum + p.participants, 0)
    const completedPrograms = outreachPrograms.filter((p) => p.status === "Completed").length
    const successRate =
      outreachPrograms.length > 0 ? Math.round((completedPrograms / outreachPrograms.length) * 100) : 0

    return {
      activePrograms: activePrograms.toString(),
      totalParticipants: totalParticipants.toLocaleString(),
      successRate: `${successRate}%`,
    }
  }, [outreachPrograms])

  const resetForm = () => {
    setFormData({
      program: "",
      location: "",
      date: "",
      participants: "",
      status: "Scheduled",
    })
    setFormErrors({})
    setEditingProgram(null)
  }

  const openModal = (program?: OutreachProgram) => {
    if (program) {
      setEditingProgram(program)
      setFormData({
        program: program.program,
        location: program.location,
        date: program.date,
        participants: program.participants.toString(),
        status: program.status as ProgramStatus,
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

    const programData: OutreachProgram = {
      id: editingProgram?.id || Date.now(),
      program: formData.program,
      location: formData.location,
      date: formData.date,
      participants: Number.parseInt(formData.participants),
      status: formData.status as ProgramStatus,
    }

    if (editingProgram) {
      setOutreachPrograms((prev) => prev.map((p) => (p.id === editingProgram.id ? programData : p)))
      toast.success("The program has been successfully updated.")
    } else {
      setOutreachPrograms((prev) => [...prev, programData])
      toast.success("The program has been successfully created.")
    }

    closeModal()
  }

  const handleDelete = (id: number) => {
    setProgramToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (programToDelete) {
      setOutreachPrograms((prev) => prev.filter((p) => p.id !== programToDelete))
      toast.success("The program has been successfully removed.")
      setProgramToDelete(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return componentStyles.badgeSuccess
      case "Ongoing":
        return componentStyles.badgeDefault
      case "Scheduled":
        return componentStyles.badgeWarning
      case "Cancelled":
        return componentStyles.badgeSecondary
      default:
        return componentStyles.badgeSecondary
    }
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Outreach</h1>
          <p className={styles.sectionDescription}>Manage community outreach programs and events</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`} onClick={() => openModal()}>
          <Plus size={16} />
          New Program
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Programs" value={stats.activePrograms} change="2 starting this week" icon={Megaphone} />
        <StatCard title="People Reached" value={stats.totalParticipants} change="This quarter" icon={Users} />
        <StatCard title="Success Rate" value={stats.successRate} change="Program completion" icon={TrendingUp} />
        <StatCard title="Upcoming Events" value="5" change="Next 30 days" icon={Calendar} />
      </div>

      <div className={componentStyles.card}>
        <div
          className={componentStyles.cardHeader}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h2 className={componentStyles.cardTitle}>Outreach Programs ({filteredOutreach.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchFilter
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterValue={filterValue}
              onFilterChange={setFilterValue}
              filterOptions={statusOptions}
              placeholder="Search programs..."
              filterLabel="Filter by status"
            />
            <button
              className={`${componentStyles.button} ${componentStyles.buttonSecondary} ${componentStyles.buttonSmall}`}
            >
              <Calendar size={14} />
              Schedule
            </button>
          </div>
        </div>
        <div className={componentStyles.cardContent}>
          {filteredOutreach.length === 0 ? (
            <EmptyState
              title="No programs found"
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : "No outreach programs have been created yet."
              }
            />
          ) : (
            <div className={componentStyles.responsiveTableContainer}>
              {/* Desktop Table View */}
              <div className={componentStyles.desktopTable}>
                <table className={componentStyles.table}>
                  <thead className={componentStyles.tableHeader}>
                    <tr>
                      <th className={componentStyles.tableHeaderCell}>Program</th>
                      <th className={componentStyles.tableHeaderCell}>Location</th>
                      <th className={componentStyles.tableHeaderCell}>Date</th>
                      <th className={componentStyles.tableHeaderCell}>Participants</th>
                      <th className={componentStyles.tableHeaderCell}>Status</th>
                      <th className={componentStyles.tableHeaderCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOutreach.map((program) => (
                      <tr key={program.id} className={componentStyles.tableRow}>
                        <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>
                          {program.program}
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div className={componentStyles.iconButton}>
                            <MapPin size={12} />
                            {program.location}
                          </div>
                        </td>
                        <td className={componentStyles.tableCell}>{program.date}</td>
                        <td className={componentStyles.tableCell}>{program.participants}</td>
                        <td className={componentStyles.tableCell}>
                          <span className={`${componentStyles.badge} ${getStatusColor(program.status)}`}>
                            {program.status}
                          </span>
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div className={componentStyles.tableActions}>
                            <button
                              className={componentStyles.actionButton}
                              onClick={() => openModal(program)}
                              title="Edit program"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                              onClick={() => handleDelete(program.id)}
                              title="Delete program"
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
                {filteredOutreach.map((program) => (
                  <div key={program.id} className={componentStyles.departmentCard}>
                    <div className={componentStyles.cardHeader}>
                      <div className={componentStyles.cardTitleSection}>
                        <h3 className={componentStyles.cardTitle}>{program.program}</h3>
                        <span className={`${componentStyles.badge} ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </div>
                      <div className={componentStyles.cardActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(program)}
                          title="Edit program"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(program.id)}
                          title="Delete program"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={componentStyles.cardBody}>
                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Location</span>
                          <div className={componentStyles.fieldValue}>
                            <div className={componentStyles.iconButton}>
                              <MapPin size={12} />
                              {program.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Date</span>
                          <span className={componentStyles.fieldValue}>{program.date}</span>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Participants</span>
                          <span className={componentStyles.fieldValue}>{program.participants}</span>
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
        title={editingProgram ? "Edit Program" : "Create New Program"}
        description={editingProgram ? "Update program details" : "Add a new outreach program"}
      >
        <form onSubmit={handleSubmit}>
          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Program Name *</label>
            <input
              className={`${componentStyles.input} ${formErrors.program ? componentStyles.inputError : ""}`}
              placeholder="Enter program name"
              value={formData.program}
              onChange={(e) => handleInputChange("program", e.target.value)}
            />
            {formErrors.program && <div className={componentStyles.errorText}>{formErrors.program}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Location *</label>
            <input
              className={`${componentStyles.input} ${formErrors.location ? componentStyles.inputError : ""}`}
              placeholder="e.g., Community Hall, City Park"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            {formErrors.location && <div className={componentStyles.errorText}>{formErrors.location}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Date *</label>
            <input
              type="date"
              className={`${componentStyles.input} ${formErrors.date ? componentStyles.inputError : ""}`}
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
            {formErrors.date && <div className={componentStyles.errorText}>{formErrors.date}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Number of Participants *</label>
            <input
              type="number"
              min="1"
              className={`${componentStyles.input} ${formErrors.participants ? componentStyles.inputError : ""}`}
              placeholder="0"
              value={formData.participants}
              onChange={(e) => handleInputChange("participants", e.target.value)}
            />
            {formErrors.participants && <div className={componentStyles.errorText}>{formErrors.participants}</div>}
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
              {editingProgram ? "Update Program" : "Create Program"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Program"
        message="Are you sure you want to delete this program? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}
