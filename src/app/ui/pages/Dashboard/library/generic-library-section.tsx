"use client"

import type React from "react"
import { Plus, Edit, Trash2, Book, BookOpen, Users, GraduationCap } from "lucide-react"
import { StatCard } from "../micro-ui/stat-card"
import { useState, useMemo } from "react"
import { ConfirmationDialog } from "../micro-ui/confirmation-dialog"
import { EmptyState } from "../micro-ui/empty-state"
import { Modal } from "../micro-ui/modal"
import { type ValidationRules, validateForm } from "../validation/validation"
import { SearchFilter } from "../micro-ui/search-filter"
import componentStyles from "../components.module.css"


// Simple toast implementation since we can't use external libraries
const showToast = (message: string, type: "success" | "error" = "success") => {
  const toast = document.createElement("div")
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#4BB543" : "#ef4444"};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 10000;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `
  document.body.appendChild(toast)
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}

// Generic interfaces that can be extended for any library type
interface BaseLibraryItem {
  id: number
  title: string
  author?: string
  isbn?: string
  category: string
  status: "Available" | "Checked Out" | "Reserved" | "Maintenance"
  addedDate: string
  location?: string
}

interface LibraryConfig {
  sectionTitle: string
  sectionDescription: string
  itemName: string // "Book", "Journal", "Media", etc.
  itemNamePlural: string // "Books", "Journals", "Media", etc.
  addButtonText: string
  modalTitle: {
    add: string
    edit: string
  }
  modalDescription: {
    add: string
    edit: string
  }
  fields: LibraryFieldConfig[]
  statusOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
}

interface LibraryFieldConfig {
  key: string
  label: string
  type: "text" | "email" | "tel" | "select" | "textarea"
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
  }
}

interface GenericLibrarySectionProps {
  config: LibraryConfig
  initialData: BaseLibraryItem[]
  onDataChange?: (data: BaseLibraryItem[]) => void
}

export const GenericLibrarySection: React.FC<GenericLibrarySectionProps> = ({ config, initialData, onDataChange }) => {
  const [items, setItems] = useState<BaseLibraryItem[]>(initialData)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BaseLibraryItem | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Create validation rules from config
  const validationRules: ValidationRules = useMemo(() => {
    const rules: ValidationRules = {}
    config.fields.forEach((field) => {
      if (field.validation) {
        rules[field.key] = field.validation
      }
    })
    return rules
  }, [config.fields])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchValue.toLowerCase())) ||
        item.category.toLowerCase().includes(searchValue.toLowerCase())

      const matchesFilter = !filterValue || item.status === filterValue

      return matchesSearch && matchesFilter
    })
  }, [items, searchValue, filterValue])

  const stats = useMemo(() => {
    const availableItems = items.filter((item) => item.status === "Available").length
    const checkedOutItems = items.filter((item) => item.status === "Checked Out").length
    const reservedItems = items.filter((item) => item.status === "Reserved").length
    const utilizationRate = Math.round(((checkedOutItems + reservedItems) / items.length) * 100) || 0

    return {
      stat1: availableItems.toString(),
      stat2: checkedOutItems.toString(),
      stat3: reservedItems.toString(),
      stat4: `${utilizationRate}%`,
    }
  }, [items])

  const resetForm = () => {
    const initialFormData: Record<string, any> = {}
    config.fields.forEach((field) => {
      initialFormData[field.key] = ""
    })
    initialFormData.status = "Available" // Default status
    setFormData(initialFormData)
    setFormErrors({})
    setEditingItem(null)
  }

  const openModal = (item?: BaseLibraryItem) => {
    if (item) {
      setEditingItem(item)
      const itemFormData: Record<string, any> = {}
      config.fields.forEach((field) => {
        itemFormData[field.key] = (item as any)[field.key] || ""
      })
      itemFormData.status = item.status
      setFormData(itemFormData)
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

    const itemData: BaseLibraryItem = {
      id: editingItem?.id || Date.now(),
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      category: formData.category,
      status: formData.status,
      location: formData.location,
      addedDate: editingItem?.addedDate || new Date().toISOString().split("T")[0],
      ...formData, // Include any additional fields from config
    }

    if (editingItem) {
      const updatedItems = items.map((item) => (item.id === editingItem.id ? itemData : item))
      setItems(updatedItems)
      onDataChange?.(updatedItems)
      showToast(`The ${config.itemName.toLowerCase()} has been successfully updated.`)
    } else {
      const newItems = [...items, itemData]
      setItems(newItems)
      onDataChange?.(newItems)
      showToast(`The ${config.itemName.toLowerCase()} has been successfully added.`)
    }

    closeModal()
  }

  const handleDelete = (id: number) => {
    setItemToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedItems = items.filter((item) => item.id !== itemToDelete)
      setItems(updatedItems)
      onDataChange?.(updatedItems)
      showToast(`The ${config.itemName.toLowerCase()} has been successfully removed.`)
      setItemToDelete(null)
    }
  }

  const renderFormField = (field: LibraryFieldConfig) => {
    const hasError = !!formErrors[field.key]
    const commonProps = {
      value: formData[field.key] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        handleInputChange(field.key, e.target.value),
    }

    switch (field.type) {
      case "select":
        return (
          <select {...commonProps} className={`form-select ${hasError ? "error" : ""}`}>
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case "textarea":
        return (
          <textarea
            {...commonProps}
            placeholder={field.placeholder}
            rows={3}
            className={`form-input ${hasError ? "error" : ""}`}
          />
        )
      default:
        return (
          <input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            className={`form-input ${hasError ? "error" : ""}`}
          />
        )
    }
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">{config.sectionTitle}</h1>
          <p className="section-description">{config.sectionDescription}</p>
        </div>
        <button className="button button-primary" onClick={() => openModal()}>
          <Plus size={16} />
          {config.addButtonText}
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="Available Items" value={stats.stat1} change="Ready to borrow" icon={Book} />
        <StatCard title="Checked Out" value={stats.stat2} change="Currently borrowed" icon={BookOpen} />
        <StatCard title="Reserved" value={stats.stat3} change="Awaiting pickup" icon={Users} />
        <StatCard title="Utilization Rate" value={stats.stat4} change="Collection usage" icon={GraduationCap} />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>
            {config.itemNamePlural} Directory ({filteredItems.length})
          </h2>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            filterOptions={config.statusOptions}
            placeholder={`Search ${config.itemNamePlural.toLowerCase()}...`}
            filterLabel="Filter by status"
          />
        </div>
        <div className={componentStyles.cardContent}>
          {filteredItems.length === 0 ? (
            <EmptyState
              title={`No ${config.itemNamePlural.toLowerCase()} found`}
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : `No ${config.itemNamePlural.toLowerCase()} have been added yet.`
              }
            />
          ) : (
            <table className={componentStyles.table}>
              <thead className={componentStyles.tableHeader}>
                <tr>
                  <th className={componentStyles.tableHeaderCell}>Title</th>
                  <th className={componentStyles.tableHeaderCell}>Author</th>
                  <th className={componentStyles.tableHeaderCell}>Category</th>
                  <th className={componentStyles.tableHeaderCell}>Location</th>
                  <th className={componentStyles.tableHeaderCell}>Status</th>
                  <th className={componentStyles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className={componentStyles.tableRow}>
                    <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>{item.title}</td>
                    <td className={componentStyles.tableCell}>{item.author || "N/A"}</td>
                    <td className={componentStyles.tableCell}>{item.category}</td>
                    <td className={componentStyles.tableCell}>{item.location || "N/A"}</td>
                    <td className={componentStyles.tableCell}>
                      <span className={`${componentStyles.badge}  badge-${item.status.toLowerCase().replace(" ", "-")}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={componentStyles.tableCell}>
                      <div className={componentStyles.tableActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(item)}
                          title={`Edit ${config.itemName.toLowerCase()}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(item.id)}
                          title={`Delete ${config.itemName.toLowerCase()}`}
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

  {/* <div className={componentStyles.card}>
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
      </div> */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingItem ? config.modalTitle.edit : config.modalTitle.add}
        description={editingItem ? config.modalDescription.edit : config.modalDescription.add}
      >
        <form onSubmit={handleSubmit}>
          {config.fields.map((field) => (
            <div key={field.key} className="form-group">
              <label className="form-label">
                {field.label} {field.required && "*"}
              </label>
              {renderFormField(field)}
              {formErrors[field.key] && <div className="error-text">{formErrors[field.key]}</div>}
            </div>
          ))}

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formData.status || "Available"}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              {config.statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="button button-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {editingItem ? `Update ${config.itemName}` : `Add ${config.itemName}`}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={`Remove ${config.itemName}`}
        message={`Are you sure you want to remove this ${config.itemName.toLowerCase()}? This action cannot be undone.`}
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />

      <style>{`
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        .section-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }
        .section-description {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          text-decoration: none;
        }
        .button-primary {
          background: #3b82f6;
          color: white;
        }
        .button-primary:hover {
          background: #2563eb;
        }
        .button-secondary {
          background: #f8fafc;
          color: #475569;
          border-color: #e2e8f0;
        }
        .button-secondary:hover {
          background: #f1f5f9;
          border-color: #cbd5e0;
        }
        .card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          gap: 1rem;
        }
        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        .card-content {
          padding: 0;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .table-header {
          background: #f8fafc;
        }
        .table-header-cell {
          padding: 0.75rem 1.5rem;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .table-row {
          border-bottom: 1px solid #e2e8f0;
        }
        .table-row:hover {
          background: #f8fafc;
        }
        .table-cell {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          color: #475569;
        }
        .table-cell-bold {
          font-weight: 600;
          color: #1e293b;
        }
        .table-actions {
          display: flex;
          gap: 0.5rem;
        }
        .action-button {
          padding: 0.5rem;
          border: none;
          background: none;
          border-radius: 6px;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
        }
        .action-button:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
        .action-button-danger:hover {
          background: #fef2f2;
          color: #ef4444;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .badge-available {
          background: #dcfce7;
          color: #166534;
        }
        .badge-checked-out {
          background: #fef3c7;
          color: #92400e;
        }
        .badge-reserved {
          background: #dbeafe;
          color: #1e40af;
        }
        .badge-maintenance {
          background: #f1f5f9;
          color: #475569;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .form-input,
        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }
        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .form-input.error,
        .form-select.error {
          border-color: #ef4444;
        }
        .form-input.error:focus,
        .form-select.error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        .error-text {
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.25rem;
        }
        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }
        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: stretch;
          }
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          .card-header {
            flex-direction: column;
            align-items: stretch;
          }
          .table-header-cell,
          .table-cell {
            padding: 0.75rem 1rem;
          }
          .data-table {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export type { LibraryConfig, LibraryFieldConfig, BaseLibraryItem }
