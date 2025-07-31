"use client"

import type React from "react"
import { useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import { FaBook, FaInfoCircle, FaChartBar, FaCog, FaClock, FaPhone, FaList, FaTools, FaHashtag } from "react-icons/fa"
import styles from "./AddLibraryForm.module.css"
import type { LibraryStats } from "./library-data"

interface AddLibraryFormProps {
  onBack: () => void
  onSubmit: (libraryData: LibraryFormData) => void
}

interface LibraryFormData {
  id: string
  name: string
  title: string
  icon: string
  description: string
  shortDescription: string
  stats: LibraryStats
  detailedInfo: {
    features: string[]
    services: string[]
    hours: string
    contact: string
  }
}

const AddLibraryForm: React.FC<AddLibraryFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<LibraryFormData>({
    id: "",
    name: "",
    title: "",
    icon: "",
    description: "",
    shortDescription: "",
    stats: {
      totalItems: 0,
      availableItems: 0,
      checkedOut: 0,
      reserved: 0,
    },
    detailedInfo: {
      features: [""],
      services: [""],
      hours: "",
      contact: "",
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.startsWith("stats.")) {
      const statField = name.split(".")[1] as keyof LibraryStats
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statField]: Number.parseInt(value) || 0,
        },
      }))
    } else if (name.startsWith("detailedInfo.")) {
      const detailField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        detailedInfo: {
          ...prev.detailedInfo,
          [detailField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleArrayChange = (field: "features" | "services", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      detailedInfo: {
        ...prev.detailedInfo,
        [field]: prev.detailedInfo[field].map((item, i) => (i === index ? value : item)),
      },
    }))
  }

  const addArrayItem = (field: "features" | "services") => {
    setFormData((prev) => ({
      ...prev,
      detailedInfo: {
        ...prev.detailedInfo,
        [field]: [...prev.detailedInfo[field], ""],
      },
    }))
  }

  const removeArrayItem = (field: "features" | "services", index: number) => {
    setFormData((prev) => ({
      ...prev,
      detailedInfo: {
        ...prev.detailedInfo,
        [field]: prev.detailedInfo[field].filter((_, i) => i !== index),
      },
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.id.trim()) newErrors.id = "Library ID is required"
    if (!formData.name.trim()) newErrors.name = "Library name is required"
    if (!formData.title.trim()) newErrors.title = "Library title is required"
    if (!formData.icon.trim()) newErrors.icon = "Library icon is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required"
    if (!formData.detailedInfo.hours.trim()) newErrors["detailedInfo.hours"] = "Operating hours are required"
    if (!formData.detailedInfo.contact.trim()) newErrors["detailedInfo.contact"] = "Contact information is required"

    // Validate stats
    if (formData.stats.totalItems < 0) newErrors["stats.totalItems"] = "Total items cannot be negative"
    if (formData.stats.availableItems < 0) newErrors["stats.availableItems"] = "Available items cannot be negative"
    if (formData.stats.checkedOut < 0) newErrors["stats.checkedOut"] = "Checked out items cannot be negative"
    if (formData.stats.reserved < 0) newErrors["stats.reserved"] = "Reserved items cannot be negative"

    // Check if available + checked out + reserved <= total
    const totalAccounted = formData.stats.availableItems + formData.stats.checkedOut + formData.stats.reserved
    if (totalAccounted > formData.stats.totalItems) {
      newErrors["stats.totalItems"] =
        "Total items must be greater than or equal to the sum of available, checked out, and reserved items"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Filter out empty features and services
      const processedData = {
        ...formData,
        detailedInfo: {
          ...formData.detailedInfo,
          features: formData.detailedInfo.features.filter((item) => item.trim() !== ""),
          services: formData.detailedInfo.services.filter((item) => item.trim() !== ""),
        },
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSubmit(processedData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      title: "",
      icon: "",
      description: "",
      shortDescription: "",
      stats: {
        totalItems: 0,
        availableItems: 0,
        checkedOut: 0,
        reserved: 0,
      },
      detailedInfo: {
        features: [""],
        services: [""],
        hours: "",
        contact: "",
      },
    })
    setErrors({})
  }

  const iconOptions = [
    { value: "📚", label: "📚 Books" },
    { value: "🔬", label: "🔬 Science" },
    { value: "💻", label: "💻 Digital" },
    { value: "📖", label: "📖 Reference" },
    { value: "🎬", label: "🎬 Media" },
    { value: "📰", label: "📰 Periodicals" },
    { value: "🎓", label: "🎓 Academic" },
    { value: "👨‍🏫", label: "👨‍🏫 Faculty" },
    { value: "📜", label: "📜 Archives" },
    { value: "🏛️", label: "🏛️ Institution" },
  ]

  return (
    <div className={styles.addStaffFormContainer}>
      <button className={styles.backButton} onClick={onBack}>
        <IoMdArrowRoundBack />
        Back to Library Management
      </button>

      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Add New Library</h2>
          <p className={styles.formSubtitle}>Fill in the details below to add a new library to your system</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.staffForm}>
          <div className={styles.formGrid}>
            {/* Basic Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FaBook className={styles.sectionIcon} />
                Basic Information
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="id" className={styles.inputLabel}>
                      <FaHashtag className={styles.inputIcon} />
                      Library ID *
                    </label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.id ? styles.inputError : ""}`}
                      placeholder="e.g., general, science, digital"
                    />
                    {errors.id && <span className={styles.errorMessage}>{errors.id}</span>}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="name" className={styles.inputLabel}>
                      Library Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                      placeholder="Enter library name"
                    />
                    {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="title" className={styles.inputLabel}>
                      Library Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                      placeholder="Enter library title"
                    />
                    {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="icon" className={styles.inputLabel}>
                      Library Icon *
                    </label>
                    <select
                      id="icon"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.icon ? styles.inputError : ""}`}
                    >
                      <option value="">Select an icon</option>
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.icon && <span className={styles.errorMessage}>{errors.icon}</span>}
                  </div>
                </div>

                <div className={styles.inputField}>
                  <label htmlFor="shortDescription" className={styles.inputLabel}>
                    <FaInfoCircle className={styles.inputIcon} />
                    Short Description *
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.shortDescription ? styles.inputError : ""}`}
                    placeholder="Brief description for library cards"
                  />
                  {errors.shortDescription && <span className={styles.errorMessage}>{errors.shortDescription}</span>}
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FaChartBar className={styles.sectionIcon} />
                Library Statistics
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="stats.totalItems" className={styles.inputLabel}>
                      Total Items *
                    </label>
                    <input
                      type="number"
                      id="stats.totalItems"
                      name="stats.totalItems"
                      value={formData.stats.totalItems}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors["stats.totalItems"] ? styles.inputError : ""}`}
                      placeholder="Total number of items"
                      min="0"
                    />
                    {errors["stats.totalItems"] && (
                      <span className={styles.errorMessage}>{errors["stats.totalItems"]}</span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="stats.availableItems" className={styles.inputLabel}>
                      Available Items *
                    </label>
                    <input
                      type="number"
                      id="stats.availableItems"
                      name="stats.availableItems"
                      value={formData.stats.availableItems}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors["stats.availableItems"] ? styles.inputError : ""}`}
                      placeholder="Available items"
                      min="0"
                    />
                    {errors["stats.availableItems"] && (
                      <span className={styles.errorMessage}>{errors["stats.availableItems"]}</span>
                    )}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="stats.checkedOut" className={styles.inputLabel}>
                      Checked Out Items *
                    </label>
                    <input
                      type="number"
                      id="stats.checkedOut"
                      name="stats.checkedOut"
                      value={formData.stats.checkedOut}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors["stats.checkedOut"] ? styles.inputError : ""}`}
                      placeholder="Checked out items"
                      min="0"
                    />
                    {errors["stats.checkedOut"] && (
                      <span className={styles.errorMessage}>{errors["stats.checkedOut"]}</span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="stats.reserved" className={styles.inputLabel}>
                      Reserved Items *
                    </label>
                    <input
                      type="number"
                      id="stats.reserved"
                      name="stats.reserved"
                      value={formData.stats.reserved}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors["stats.reserved"] ? styles.inputError : ""}`}
                      placeholder="Reserved items"
                      min="0"
                    />
                    {errors["stats.reserved"] && (
                      <span className={styles.errorMessage}>{errors["stats.reserved"]}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FaCog className={styles.sectionIcon} />
                Detailed Information
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="detailedInfo.hours" className={styles.inputLabel}>
                      <FaClock className={styles.inputIcon} />
                      Operating Hours *
                    </label>
                    <input
                      type="text"
                      id="detailedInfo.hours"
                      name="detailedInfo.hours"
                      value={formData.detailedInfo.hours}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors["detailedInfo.hours"] ? styles.inputError : ""}`}
                      placeholder="e.g., Monday-Friday: 8:00 AM - 6:00 PM"
                    />
                    {errors["detailedInfo.hours"] && (
                      <span className={styles.errorMessage}>{errors["detailedInfo.hours"]}</span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="detailedInfo.contact" className={styles.inputLabel}>
                      <FaPhone className={styles.inputIcon} />
                      Contact Information *
                    </label>
                    <input
                      type="text"
                      id="detailedInfo.contact"
                      name="detailedInfo.contact"
                      value={formData.detailedInfo.contact}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors["detailedInfo.contact"] ? styles.inputError : ""}`}
                      placeholder="Phone, email, or extension"
                    />
                    {errors["detailedInfo.contact"] && (
                      <span className={styles.errorMessage}>{errors["detailedInfo.contact"]}</span>
                    )}
                  </div>
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>
                    <FaList className={styles.inputIcon} />
                    Library Features
                  </label>
                  {formData.detailedInfo.features.map((feature, index) => (
                    <div key={index} className={styles.arrayItemContainer}>
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleArrayChange("features", index, e.target.value)}
                        className={styles.arrayInput}
                        placeholder="Enter library feature"
                      />
                      {formData.detailedInfo.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("features", index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("features")} className={styles.addButton}>
                    Add Feature
                  </button>
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>
                    <FaTools className={styles.inputIcon} />
                    Library Services
                  </label>
                  {formData.detailedInfo.services.map((service, index) => (
                    <div key={index} className={styles.arrayItemContainer}>
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => handleArrayChange("services", index, e.target.value)}
                        className={styles.arrayInput}
                        placeholder="Enter library service"
                      />
                      {formData.detailedInfo.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("services", index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("services")} className={styles.addButton}>
                    Add Service
                  </button>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className={styles.formSection}>
              <div className={styles.inputField}>
                <label htmlFor="description" className={styles.inputLabel}>
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
                  placeholder="Enter a comprehensive description of the library, its purpose, and resources"
                  rows={4}
                />
                {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleReset} className={styles.resetButton} disabled={isSubmitting}>
              Reset Form
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Adding Library..." : "Add Library"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLibraryForm
