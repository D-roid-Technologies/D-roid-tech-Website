"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Plus, Download, DollarSign, Target, Users, Heart, Edit, Trash2, Mail } from "lucide-react"
import { Modal } from "./micro-ui/modal"
import { StatCard } from "./micro-ui/stat-card"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog"
import { EmptyState } from "./micro-ui/empty-state"
import { SearchFilter } from "./micro-ui/search-filter"
import { type ValidationRules, validateForm } from "./validation/validation"
import toast from "react-hot-toast"

interface Donation {
  id: number
  donor: string
  email: string
  amount: number
  date: string
  campaign: string
  status: "Completed" | "Pending" | "Failed"
}

const initialDonations: Donation[] = [
  {
    id: 1,
    donor: "John Smith",
    email: "john@email.com",
    amount: 500,
    date: "2024-01-15",
    campaign: "Clean Water Initiative",
    status: "Completed",
  },
  {
    id: 2,
    donor: "Sarah Johnson",
    email: "sarah@email.com",
    amount: 250,
    date: "2024-01-14",
    campaign: "Education Fund",
    status: "Pending",
  },
  {
    id: 3,
    donor: "Mike Wilson",
    email: "mike@email.com",
    amount: 1000,
    date: "2024-01-13",
    campaign: "Healthcare Support",
    status: "Completed",
  },
  {
    id: 4,
    donor: "Emily Davis",
    email: "emily@email.com",
    amount: 150,
    date: "2024-01-12",
    campaign: "Food Security",
    status: "Completed",
  },
]

const campaignOptions = [
  { label: "Clean Water Initiative", value: "Clean Water Initiative" },
  { label: "Education Fund", value: "Education Fund" },
  { label: "Healthcare Support", value: "Healthcare Support" },
  { label: "Food Security", value: "Food Security" },
  { label: "Emergency Relief", value: "Emergency Relief" },
]

const statusOptions = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
]

const validationRules: ValidationRules = {
  donor: { required: true, minLength: 2, maxLength: 100 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  amount: { required: true },
  campaign: { required: true },
}

export const DonationsSection: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>(initialDonations)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [donationToDelete, setDonationToDelete] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [formData, setFormData] = useState<{
    donor: string
    email: string
    amount: string
    campaign: string
    status: "Pending" | "Completed" | "Failed"
  }>({
    donor: "",
    email: "",
    amount: "",
    campaign: "",
    status: "Pending",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.donor.toLowerCase().includes(searchValue.toLowerCase()) ||
        donation.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        donation.campaign.toLowerCase().includes(searchValue.toLowerCase())
      const matchesFilter = !filterValue || donation.status === filterValue
      return matchesSearch && matchesFilter
    })
  }, [donations, searchValue, filterValue])

  const stats = useMemo(() => {
    const totalRaised = donations.reduce((sum, d) => (d.status === "Completed" ? sum + d.amount : sum), 0)
    const totalDonors = new Set(donations.map((d) => d.email)).size
    const avgDonation = totalRaised / donations.filter((d) => d.status === "Completed").length || 0
    const activeCampaigns = new Set(donations.map((d) => d.campaign)).size
    return {
      totalRaised: `₦${totalRaised.toLocaleString()}`,
      activeCampaigns: activeCampaigns.toString(),
      totalDonors: totalDonors.toString(),
      avgDonation: `₦${Math.round(avgDonation)}`,
    }
  }, [donations])

  const resetForm = () => {
    setFormData({
      donor: "",
      email: "",
      amount: "",
      campaign: "",
      status: "Pending",
    })
    setFormErrors({})
    setEditingDonation(null)
  }

  const openModal = (donation?: Donation) => {
    if (donation) {
      setEditingDonation(donation)
      setFormData({
        donor: donation.donor,
        email: donation.email,
        amount: donation.amount.toString(),
        campaign: donation.campaign,
        status: donation.status,
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
    const donationData: Donation = {
      id: editingDonation?.id || Date.now(),
      donor: formData.donor,
      email: formData.email,
      amount: Number.parseFloat(formData.amount),
      date: editingDonation?.date || new Date().toISOString().split("T")[0],
      campaign: formData.campaign,
      status: formData.status,
    }
    if (editingDonation) {
      setDonations((prev) => prev.map((d) => (d.id === editingDonation.id ? donationData : d)))
      toast.success("The donation has been successfully updated.", { style: { background: "#4BB543", color: "#fff" } })
    } else {
      setDonations((prev) => [...prev, donationData])
      toast.success("The donation has been successfully recorded.", { style: { background: "#4BB543", color: "#fff" } })
    }
    closeModal()
  }

  const handleDelete = (id: number) => {
    setDonationToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (donationToDelete) {
      setDonations((prev) => prev.filter((d) => d.id !== donationToDelete))
      toast.success("The donation has been successfully deleted.", { style: { background: "#4BB543", color: "#fff" } })
      setDonationToDelete(null)
    }
  }

  const exportData = () => {
    const csvContent = [
      ["Donor", "Email", "Amount", "Campaign", "Date", "Status"],
      ...filteredDonations.map((d) => [d.donor, d.email, d.amount, d.campaign, d.date, d.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "donations.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Donations data has been exported successfully.", { style: { background: "#4BB543", color: "#fff" } })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return componentStyles.badgeSuccess
      case "Pending":
        return componentStyles.badgeWarning
      case "Failed":
        return componentStyles.badgeSecondary
      default:
        return componentStyles.badgeSecondary
    }
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Donations</h1>
          <p className={styles.sectionDescription}>Manage donations and fundraising campaigns</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`} onClick={() => openModal()}>
          <Plus size={16} />
          Add Donation
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Total Raised" value={stats.totalRaised} change="+20.1% from last month" icon={DollarSign} />
        <StatCard title="Active Campaigns" value={stats.activeCampaigns} change="3 ending this month" icon={Target} />
        <StatCard title="Total Donors" value={stats.totalDonors} change="+15% new donors" icon={Users} />
        <StatCard title="Avg. Donation" value={stats.avgDonation} change="+5% from last month" icon={Heart} />
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
          <h2 className={componentStyles.cardTitle}>Donations ({filteredDonations.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SearchFilter
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterValue={filterValue}
              onFilterChange={setFilterValue}
              filterOptions={statusOptions}
              placeholder="Search donations..."
              filterLabel="Filter by status"
            />
            <button
              className={`${componentStyles.button} ${componentStyles.buttonSecondary} ${componentStyles.buttonSmall}`}
              onClick={exportData}
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>
        <div className={componentStyles.cardContent}>
          {filteredDonations.length === 0 ? (
            <EmptyState
              title="No donations found"
              description={
                searchValue || filterValue
                  ? "Try adjusting your search or filter criteria."
                  : "No donations have been recorded yet."
              }
            />
          ) : (
            <div className={componentStyles.responsiveTableContainer}>
              {/* Desktop Table View */}
              <div className={componentStyles.desktopTable}>
                <table className={componentStyles.table}>
                  <thead className={componentStyles.tableHeader}>
                    <tr>
                      <th className={componentStyles.tableHeaderCell}>Donor</th>
                      <th className={componentStyles.tableHeaderCell}>Email</th>
                      <th className={componentStyles.tableHeaderCell}>Amount</th>
                      <th className={componentStyles.tableHeaderCell}>Campaign</th>
                      <th className={componentStyles.tableHeaderCell}>Date</th>
                      <th className={componentStyles.tableHeaderCell}>Status</th>
                      <th className={componentStyles.tableHeaderCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.map((donation) => (
                      <tr key={donation.id} className={componentStyles.tableRow}>
                        <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>
                          {donation.donor}
                        </td>
                        <td className={componentStyles.tableCell}>{donation.email}</td>
                        <td className={componentStyles.tableCell}>${donation.amount.toLocaleString()}</td>
                        <td className={componentStyles.tableCell}>{donation.campaign}</td>
                        <td className={componentStyles.tableCell}>{donation.date}</td>
                        <td className={componentStyles.tableCell}>
                          <span className={`${componentStyles.badge} ${getStatusColor(donation.status)}`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className={componentStyles.tableCell}>
                          <div className={componentStyles.tableActions}>
                            <button
                              className={componentStyles.actionButton}
                              onClick={() => openModal(donation)}
                              title="Edit donation"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                              onClick={() => handleDelete(donation.id)}
                              title="Delete donation"
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
                {filteredDonations.map((donation) => (
                  <div key={donation.id} className={componentStyles.departmentCard}>
                    <div className={componentStyles.cardHeader}>
                      <div className={componentStyles.cardTitleSection}>
                        <h3 className={componentStyles.cardTitle}>{donation.donor}</h3>
                        <span className={`${componentStyles.badge} ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </div>
                      <div className={componentStyles.cardActions}>
                        <button
                          className={componentStyles.actionButton}
                          onClick={() => openModal(donation)}
                          title="Edit donation"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`${componentStyles.actionButton} ${componentStyles.actionButtonDanger}`}
                          onClick={() => handleDelete(donation.id)}
                          title="Delete donation"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={componentStyles.cardBody}>
                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Email</span>
                          <div className={componentStyles.fieldValue}>
                            <div className={componentStyles.iconButton}>
                              <Mail size={12} />
                              {donation.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Amount</span>
                          <span className={componentStyles.fieldValue}>${donation.amount.toLocaleString()}</span>
                        </div>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Campaign</span>
                          <span className={componentStyles.fieldValue}>{donation.campaign}</span>
                        </div>
                      </div>

                      <div className={componentStyles.cardRow}>
                        <div className={componentStyles.cardField}>
                          <span className={componentStyles.fieldLabel}>Date</span>
                          <span className={componentStyles.fieldValue}>{donation.date}</span>
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
        title={editingDonation ? "Edit Donation" : "Add New Donation"}
        description={editingDonation ? "Update donation information" : "Record a new donation"}
      >
        <form onSubmit={handleSubmit}>
          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Donor Name *</label>
            <input
              className={`${componentStyles.input} ${formErrors.donor ? componentStyles.inputError : ""}`}
              placeholder="Enter donor name"
              value={formData.donor}
              onChange={(e) => handleInputChange("donor", e.target.value)}
            />
            {formErrors.donor && <div className={componentStyles.errorText}>{formErrors.donor}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Email *</label>
            <input
              type="email"
              className={`${componentStyles.input} ${formErrors.email ? componentStyles.inputError : ""}`}
              placeholder="donor@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {formErrors.email && <div className={componentStyles.errorText}>{formErrors.email}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Amount ($) *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className={`${componentStyles.input} ${formErrors.amount ? componentStyles.inputError : ""}`}
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
            />
            {formErrors.amount && <div className={componentStyles.errorText}>{formErrors.amount}</div>}
          </div>

          <div className={componentStyles.formGroup}>
            <label className={componentStyles.label}>Campaign *</label>
            <select
              className={`${componentStyles.select} ${formErrors.campaign ? componentStyles.inputError : ""}`}
              value={formData.campaign}
              onChange={(e) => handleInputChange("campaign", e.target.value)}
            >
              <option value="">Select campaign</option>
              {campaignOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.campaign && <div className={componentStyles.errorText}>{formErrors.campaign}</div>}
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
              {editingDonation ? "Update Donation" : "Add Donation"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Donation"
        message="Are you sure you want to delete this donation? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}
