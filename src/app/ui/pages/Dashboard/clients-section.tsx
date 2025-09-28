"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Plus, Users, DollarSign, Building, TrendingUp, Edit, Trash2, Mail, Phone } from "lucide-react"
import { Modal } from "./micro-ui/modal"
import { StatCard } from "./micro-ui/stat-card"
import { SearchFilter } from "./micro-ui/search-filter"
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog"
import { EmptyState } from "./micro-ui/empty-state"
import { validateForm, type ValidationRules, emailPattern, phonePattern } from "./validation/validation"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"
import { toast } from "react-toastify"

interface Client {
  id: number
  name: string
  company: string
  email: string
  phone: string
  address: string
  industry: string
  status: "Active" | "Inactive" | "Prospect" | "Former"
  contractValue: number
  startDate: string
  lastContact: string
  notes: string
  accountManager: string
}

type ClientStatus = "Active" | "Inactive" | "Prospect" | "Former"

const initialClients: Client[] = [
  {
    id: 1,
    name: "John Anderson",
    company: "TechCorp Solutions",
    email: "john.anderson@techcorp.com",
    phone: "+1-555-0101",
    address: "123 Business Ave, New York, NY 10001",
    industry: "Technology",
    status: "Active",
    contractValue: 150000,
    startDate: "2023-06-15",
    lastContact: "2024-01-10",
    notes: "Key client for enterprise solutions. Regular quarterly reviews scheduled.",
    accountManager: "Sarah Johnson",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    company: "Global Manufacturing Inc",
    email: "maria.rodriguez@globalmfg.com",
    phone: "+1-555-0102",
    address: "456 Industrial Blvd, Chicago, IL 60601",
    industry: "Manufacturing",
    status: "Active",
    contractValue: 280000,
    startDate: "2023-03-20",
    lastContact: "2024-01-08",
    notes: "Large-scale manufacturing client. Interested in automation solutions.",
    accountManager: "Mike Wilson",
  },
  {
    id: 3,
    name: "David Chen",
    company: "HealthFirst Medical",
    email: "david.chen@healthfirst.com",
    phone: "+1-555-0103",
    address: "789 Medical Center Dr, Los Angeles, CA 90210",
    industry: "Healthcare",
    status: "Prospect",
    contractValue: 0,
    startDate: "",
    lastContact: "2024-01-12",
    notes: "Potential client for healthcare management system. Follow-up meeting scheduled.",
    accountManager: "Emily Davis",
  },
  {
    id: 4,
    name: "Lisa Thompson",
    company: "EduTech Academy",
    email: "lisa.thompson@edutech.edu",
    phone: "+1-555-0104",
    address: "321 Education Way, Boston, MA 02101",
    industry: "Education",
    status: "Former",
    contractValue: 95000,
    startDate: "2022-09-01",
    lastContact: "2023-12-15",
    notes: "Contract completed successfully. Open to future collaborations.",
    accountManager: "John Smith",
  },
]

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Prospect", value: "Prospect" },
  { label: "Former", value: "Former" },
]

const industryOptions = [
  { label: "Technology", value: "Technology" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Finance", value: "Finance" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Education", value: "Education" },
  { label: "Retail", value: "Retail" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Other", value: "Other" },
]

const accountManagerOptions = [
  { label: "Sarah Johnson", value: "Sarah Johnson" },
  { label: "Mike Wilson", value: "Mike Wilson" },
  { label: "Emily Davis", value: "Emily Davis" },
  { label: "John Smith", value: "John Smith" },
]

const validationRules: ValidationRules = {
  name: { required: true, minLength: 2, maxLength: 100 },
  company: { required: true, minLength: 2, maxLength: 100 },
  email: { required: true, pattern: emailPattern },
  phone: { required: true, pattern: phonePattern },
  address: { required: true, minLength: 10 },
  industry: { required: true },
  accountManager: { required: true },
}

export const ClientsSection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    industry: "",
    status: "Prospect" as ClientStatus,
    contractValue: "",
    startDate: "",
    notes: "",
    accountManager: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.company.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchValue.toLowerCase())

      const matchesFilter = !filterValue || client.status === filterValue

      return matchesSearch && matchesFilter
    })
  }, [clients, searchValue, filterValue])

  const stats = useMemo(() => {
    const totalClients = clients.length
    const activeClients = clients.filter((c) => c.status === "Active").length
    const prospects = clients.filter((c) => c.status === "Prospect").length
    const totalValue = clients.filter((c) => c.status === "Active").reduce((sum, c) => sum + c.contractValue, 0)

    return {
      totalClients: totalClients.toString(),
      activeClients: activeClients.toString(),
      prospects: prospects.toString(),
      totalValue: `₦${(totalValue / 1000000).toFixed(1)}M`,
    }
  }, [clients])

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      industry: "",
      status: "Prospect",
      contractValue: "",
      startDate: "",
      notes: "",
      accountManager: "",
    })
    setFormErrors({})
    setEditingClient(null)
  }

  const openModal = (client?: Client) => {
    if (client) {
      setEditingClient(client)
      setFormData({
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        address: client.address,
        industry: client.industry,
        status: client.status as ClientStatus,
        contractValue: client.contractValue.toString(),
        startDate: client.startDate,
        notes: client.notes,
        accountManager: client.accountManager,
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

    const clientData: Client = {
      id: editingClient?.id || Date.now(),
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      industry: formData.industry,
      status: formData.status as ClientStatus,
      contractValue: Number.parseFloat(formData.contractValue) || 0,
      startDate: formData.startDate,
      lastContact: editingClient?.lastContact || new Date().toISOString().split("T")[0],
      notes: formData.notes,
      accountManager: formData.accountManager,
    }

    if (editingClient) {
      setClients((prev) => prev.map((c) => (c.id === editingClient.id ? clientData : c)))
      toast.success("The client information has been successfully updated.")
    } else {
      setClients((prev) => [...prev, clientData])
      toast.success("The client has been successfully added.")
    }

    closeModal()
  }

  const handleDelete = (id: number) => {
    setClientToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients((prev) => prev.filter((c) => c.id !== clientToDelete))
      toast.success("The client has been successfully removed.")
      setClientToDelete(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return componentStyles.badgeSuccess
      case "Prospect":
        return componentStyles.badgeWarning
      case "Inactive":
        return componentStyles.badgeSecondary
      case "Former":
        return componentStyles.badgeOutline
      default:
        return componentStyles.badgeSecondary
    }
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Clients</h1>
          <p className={styles.sectionDescription}>Manage client relationships and business opportunities</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`} onClick={() => openModal()}>
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Total Clients" value={stats.totalClients} change="All relationships" icon={Users} />
        <StatCard title="Active Clients" value={stats.activeClients} change="Current contracts" icon={Building} />
        <StatCard title="Prospects" value={stats.prospects} change="Potential clients" icon={TrendingUp} />
        <StatCard title="Contract Value" value={stats.totalValue} change="Active contracts" icon={DollarSign} />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Client Directory ({filteredClients.length})</h2>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            filterOptions={statusOptions}
            placeholder="Search clients..."
            filterLabel="Filter by status"
          />
        </div>
        <div className={componentStyles.cardContent}>
          {filteredClients.length === 0 ? (
            <EmptyState
              title="No clients found"
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : "No clients have been added yet."
              }
            />
          ) : (
            <div className={componentStyles.responsiveTableContainer}>
              {/* Desktop Table View */}
              <div className={componentStyles.desktopTable}>
                <table className={componentStyles.table}>
                  <thead className={componentStyles.tableHeader}>
                    <tr>
                      <th className={componentStyles.tableHeaderCell}>Client</th>
                      <th className={componentStyles.tableHeaderCell}>Contact</th>
                      <th className={componentStyles.tableHeaderCell}>Industry</th>
                      <th className={componentStyles.tableHeaderCell}>Status</th>
                      <th className={componentStyles.tableHeaderCell}>Contract Value</th>
                      <th className={componentStyles.tableHeaderCell}>Account Manager</th>
                      <th className={componentStyles.tableHeaderCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className={componentStyles.tableRow}>
                        <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>
                          <div>
                            <div>{client.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{client.company}</div>
                          </div>
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div>
                            <div className={componentStyles.iconButton}>
                              <Mail size={12} />
                              {client.email}
                            </div>
                            <div className={componentStyles.iconButton}>
                              <Phone size={12} />
                              {client.phone}
                            </div>
                          </div>
                        </td>
                        <td className={componentStyles.tableCell}>{client.industry}</td>
                        <td className={componentStyles.tableCell}>
                          <span className={`${componentStyles.badge} ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className={componentStyles.tableCell}>
                          {client.contractValue > 0 ? `₦${client.contractValue.toLocaleString()}` : "—"}
                        </td>
                        <td className={componentStyles.tableCell}>{client.accountManager}</td>
                        <td className={componentStyles.tableCell}>
                          <div className={componentStyles.tableActions}>
                            <button
                              className={componentStyles.actionButton}
                              onClick={() => openModal(client)}
                              title="Edit client"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                              onClick={() => handleDelete(client.id)}
                              title="Delete client"
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
                {filteredClients.map((client) => (
                  <div key={client.id} className={componentStyles.departmentCard}>
                    <div className={componentStyles.cardHeader}>
                      <div className={componentStyles.cardTitleSection}>
                        <h3 className={componentStyles.cardTitle}>{client.name}</h3>
                        <span className={`${componentStyles.badge} ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </div>
                      <div className={componentStyles.cardActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(client)}
                          title="Edit client"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(client.id)}
                          title="Delete client"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={componentStyles.cardBody}>
                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Company</span>
                          <span className={componentStyles.fieldValue}>{client.company}</span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Contact</span>
                          <div className={componentStyles.fieldValue}>
                            <div className={componentStyles.iconButton}>
                              <Mail size={12} />
                              {client.email}
                            </div>
                            <div className={componentStyles.iconButton}>
                              <Phone size={12} />
                              {client.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Industry</span>
                          <span className={componentStyles.fieldValue}>{client.industry}</span>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Contract Value</span>
                          <span className={componentStyles.fieldValue}>
                            {client.contractValue > 0 ? `₦${client.contractValue.toLocaleString()}` : "—"}
                          </span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Account Manager</span>
                          <span className={componentStyles.fieldValue}>{client.accountManager}</span>
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
        title={editingClient ? "Edit Client" : "Add New Client"}
        description={editingClient ? "Update client information" : "Add a new client to your database"}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Contact Name *</label>
              <input
                className={`${componentStyles.input} ${formErrors.name ? componentStyles.inputError : ""}`}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {formErrors.name && <div className={componentStyles.errorText}>{formErrors.name}</div>}
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Company *</label>
              <input
                className={`${componentStyles.input} ${formErrors.company ? componentStyles.inputError : ""}`}
                placeholder="Company Name Inc."
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
              {formErrors.company && <div className={componentStyles.errorText}>{formErrors.company}</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Email *</label>
              <input
                type="email"
                className={`${componentStyles.input} ${formErrors.email ? componentStyles.inputError : ""}`}
                placeholder="contact@company.com"
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
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Address *</label>
            <input
              className={`${componentStyles.input} ${formErrors.address ? componentStyles.inputError : ""}`}
              placeholder="123 Business Ave, City, State 12345"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            {formErrors.address && <div className={componentStyles.errorText}>{formErrors.address}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Industry *</label>
              <select
                className={`${componentStyles.select} ${formErrors.industry ? componentStyles.inputError : ""}`}
                value={formData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
              >
                <option value="">Select industry</option>
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors.industry && <div className={componentStyles.errorText}>{formErrors.industry}</div>}
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
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Contract Value (₦)</label>
              <input
                type="number"
                min="0"
                step="1000"
                className={componentStyles.input}
                placeholder="150000"
                value={formData.contractValue}
                onChange={(e) => handleInputChange("contractValue", e.target.value)}
              />
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Start Date</label>
              <input
                type="date"
                className={componentStyles.input}
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Account Manager *</label>
            <select
              className={`${componentStyles.select} ${formErrors.accountManager ? componentStyles.inputError : ""}`}
              value={formData.accountManager}
              onChange={(e) => handleInputChange("accountManager", e.target.value)}
            >
              <option value="">Select account manager</option>
              {accountManagerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.accountManager && <div className={componentStyles.errorText}>{formErrors.accountManager}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Notes</label>
            <textarea
              className={componentStyles.textarea}
              placeholder="Additional notes about the client..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
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
              {editingClient ? "Update Client" : "Add Client"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Client"
        message="Are you sure you want to remove this client? This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}
