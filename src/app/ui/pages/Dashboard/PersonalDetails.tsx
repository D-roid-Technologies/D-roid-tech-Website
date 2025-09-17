"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Listbox } from "@headlessui/react"
import { ChevronsUpDown, Check } from "lucide-react"
import { authService } from "../../../redux/configuration/auth.service"
import type { RootState } from "../../../redux/Store"
import type { UserType } from "../../../utils/Types"
import AffiliatedApps from "./AffiliatedApps"
import DocumentUploadUI from "./DocumentUploadUI"
import PreferencesUI from "./PreferencesUI"
import SecuritySettingsUI from "./SecuritySettingsUI"
import "../softwareDevelopment/SoftwarePages/LeadForm.css"

interface ValidationErrors {
  [key: string]: string
}

const PersonalDetails: React.FunctionComponent = () => {
  const userDetails: UserType = useSelector((state: RootState) => state.user)
  const userType = userDetails.userType
  const [formData, setFormData] = useState<UserType | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<null | {
    title: string
    content: string
    icon: React.JSX.Element
  }>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  useEffect(() => {
    setFormData({
      ...userDetails,
      referralName: generateReferralName(userDetails),
    })
    setPhotoPreview(userDetails.photoUrl || null)
  }, [userDetails])

  const generateReferralName = (user: UserType) => {
    return `${user.firstName}_${user.lastName}_${user.uniqueId}`
  }

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  }

  const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString)
    const now = new Date()
    return date instanceof Date && !isNaN(date.getTime()) && date <= now
  }

  const validateAge = (dateOfBirth: string): boolean => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 13 // Must be at least 13 years old
    }
    return age >= 13
  }

  const validateRequired = (value: any): boolean => {
    if (typeof value === "string") {
      return value.trim().length > 0
    }
    return value !== null && value !== undefined && value !== ""
  }

  const validateNumericRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max
  }

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!validateRequired(value))
          return `${name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`
        if (value.length < 2)
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} must be at least 2 characters`
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} can only contain letters, spaces, hyphens, and apostrophes`
        break

      case "middleName":
        if (value && !/^[a-zA-Z\s'-]+$/.test(value))
          return "Middle name can only contain letters, spaces, hyphens, and apostrophes"
        break

      case "phone":
        if (!validateRequired(value)) return "Phone number is required"
        if (!validatePhone(value)) return "Please enter a valid phone number with country code e.g +234"
        break

      case "email":
        if (!validateRequired(value)) return "Email is required"
        if (!validateEmail(value)) return "Please enter a valid email address"
        break

      case "dateOfBirth":
        if (userType !== "Organisation") {
          if (!validateRequired(value)) return "Date of birth is required"
          if (!validateDate(value)) return "Please enter a valid date"
          if (!validateAge(value)) return "You must be at least 13 years old"
        }
        break

      case "gender":
        if (userType !== "Organisation" && !validateRequired(value)) return "Gender is required"
        break

      case "city":
      case "state":
      case "country":
        if (!validateRequired(value)) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } can only contain letters, spaces, hyphens, and apostrophes`
        break

      case "streetNumber":
        if (!validateRequired(value)) return "Street number is required"
        break

      case "streetName":
        if (!validateRequired(value)) return "Street name is required"
        break

      case "performanceScore":
      case "attendanceRate":
      case "trainingProgress":
        if (userType === "Staff" && value !== "" && value !== null) {
          const numValue = Number.parseFloat(value)
          if (isNaN(numValue) || !validateNumericRange(numValue, 0, 100)) {
            return `${name
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())} must be between 0 and 100`
          }
        }
        break

      case "activeTasks":
        if (userType === "Staff" && value !== "" && value !== null) {
          const numValue = Number.parseFloat(value)
          if (isNaN(numValue) || numValue < 0) {
            return "Active tasks must be a positive number"
          }
        }
        break

      case "position":
      case "department":
      case "employeeId":
        if (userType === "Staff" && !validateRequired(value)) {
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} is required for staff members`
        }
        break

      case "joinDate":
        if (userType === "Staff") {
          if (!validateRequired(value)) return "Join date is required for staff members"
          if (!validateDate(value)) return "Please enter a valid join date"
        }
        break

      case "employmentStatus":
      case "workLocation":
      case "accessLevel":
        if (userType === "Staff" && !validateRequired(value)) {
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} is required for staff members`
        }
        break

      case "organisationalType":
        if (userType === "Organisation" && !validateRequired(value)) return "Organisational type is required"
        if (userType === "Organisation" && !["school", "business", "ngo"].includes(value)) {
          return "Organisational type must be school, business, or ngo"
        }
        break

      case "isCompanyRegistered":
        if (userType === "Organisation" && !validateRequired(value)) return "Company registration status is required"
        if (userType === "Organisation" && !["Yes", "No"].includes(value)) {
          return "Company registration must be Yes or No"
        }
        break

      case "dateOfRegistration":
        if (userType === "Organisation" && (formData as any)?.isCompanyRegistered === "Yes") {
          if (!validateRequired(value)) return "Registration date is required for registered companies"
          if (!validateDate(value)) return "Please enter a valid registration date"
        }
        break

      case "securityQuestion":
        if (!validateRequired(value)) return "Security question is required"
        break

      case "securityAnswer":
        if (!validateRequired(value)) return "Security answer is required"
        if (value.length < 3) return "Security answer must be at least 3 characters"
        break

      default:
        break
    }
    return ""
  }

  const validateForm = (): boolean => {
    if (!formData) return false

    const newErrors: ValidationErrors = {}

    // Get all form fields based on user type
    const fieldsToValidate = [
      "firstName",
      "lastName",
      "phone",
      "streetNumber",
      "streetName",
      "city",
      "state",
      "country",
      "securityQuestion",
      "securityAnswer",
    ]

    // Add user-type specific fields
    if (userType !== "Organisation") {
      fieldsToValidate.push("middleName", "gender", "dateOfBirth")
    }

    if (userType === "Organisation") {
      fieldsToValidate.push("organisationalType", "isCompanyRegistered")
      if ((formData as any)?.isCompanyRegistered === "Yes") {
        fieldsToValidate.push("dateOfRegistration")
      }
    }

    if (userType === "Staff") {
      fieldsToValidate.push(
        "position",
        "department",
        "employeeId",
        "joinDate",
        "employmentStatus",
        "workLocation",
        "accessLevel",
      )
    }

    // Validate each field
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, (formData as any)[field])
      if (error) {
        newErrors[field] = error
      }
    })

    // Validate performance metrics if they have values
    if (userType === "Staff") {
      ;["performanceScore", "attendanceRate", "trainingProgress", "activeTasks"].forEach((field) => {
        const value = (formData as any)[field]
        if (value !== "" && value !== null && value !== undefined) {
          const error = validateField(field, value)
          if (error) {
            newErrors[field] = error
          }
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (!formData) return

    let processedValue: any = value

    // Handle number inputs
    if (type === "number") {
      processedValue = value === "" ? "" : Number.parseFloat(value) || 0
    } else {
      processedValue = value.trim()
    }

    setFormData({ ...formData, [name]: processedValue })

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Real-time validation for immediate feedback
    const error = validateField(name, processedValue)
    if (error && processedValue !== "") {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Photo must be less than 5MB",
        }))
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please select a valid image file",
        }))
        return
      }

      // Clear photo error
      setErrors((prev) => ({ ...prev, photo: "" }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setFormData((prev) => (prev ? { ...prev, photoUrl: reader.result as string } : null))
      }
      reader.readAsDataURL(file)
    }
  }

  const rightMenuItems = [
    {
      title: "Affiliated Apps",
      content: "Control and Manage all connected D'roid One Apps.",
      icon: <i className="fas fa-file-alt"></i>,
    },
    {
      title: "Security",
      content: "Manage your security settings.",
      icon: <i className="fas fa-shield-alt"></i>,
    },
    {
      title: "Preferences",
      content: "Set your personal preferences.",
      icon: <i className="fas fa-cog"></i>,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    // Clear previous submit status
    setSubmitStatus(null)

    // Validate form
    if (!validateForm()) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      await authService.updatePrimaryInformation(formData)
      setSubmitStatus("success")
      setErrors({})
    } catch (error) {
      setSubmitStatus("error")
      setErrors({ submit: "Failed to update information. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderSelectedComponent = () => {
    switch (selectedMenuItem?.title) {
      case "Security":
        return <SecuritySettingsUI user={formData} onChange={setFormData} />
      case "Preferences":
        return <PreferencesUI user={formData} onChange={setFormData} />
      case "Affiliated Apps":
        return <AffiliatedApps />
      case "Documents":
        return <DocumentUploadUI />
      default:
        return null
    }
  }

  const renderErrorMessage = (fieldName: string) => {
    if (errors[fieldName]) {
      return (
        <span
          style={{
            color: "#dc3545",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {errors[fieldName]}
        </span>
      )
    }
    return null
  }

  const getLabelStyle = () => ({
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  })

  const getInputStyle = (fieldName: string) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${errors[fieldName] ? "#dc3545" : "#ccc"}`,
    fontSize: "14px",
    backgroundColor: errors[fieldName] ? "#fff5f5" : "#fff",
    outline: errors[fieldName] ? "none" : "initial",
  })

  const employmentStatusOptions = [
    { value: "Active", label: "Active" },
    { value: "On Leave", label: "On Leave" },
    { value: "Probation", label: "Probation" },
    { value: "Suspended", label: "Suspended" },
    { value: "Terminated", label: "Terminated" },
  ]

  const workLocationOptions = [
    { value: "Remote", label: "Remote" },
    { value: "Office", label: "Office" },
    { value: "Hybrid", label: "Hybrid" },
  ]

  const educationalLevelOptions = [
    { value: "High School", label: "High School" },
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Graduate", label: "Graduate" },
    { value: "Postgraduate", label: "Postgraduate" },
  ]

  const disabilityTypeOptions = [
    { value: "None", label: "None" },
    { value: "Visual", label: "Visual" },
    { value: "Hearing", label: "Hearing" },
    { value: "Motor", label: "Motor" },
    { value: "Cognitive", label: "Cognitive" },
  ]

  const handleListboxChange = (field: string, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      })
    }
  }

  const renderStaffFields = () => {
    if (userType !== "Staff") return null

    return (
      <>
        {/* Staff Information Section */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#071D6A",
              marginBottom: "15px",
              borderBottom: "2px solid #071D6A",
              paddingBottom: "5px",
            }}
          >
            Staff Information
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <label style={getLabelStyle()}>Position/Job Title *</label>
              <input
                name="position"
                type="text"
                placeholder="Enter position or job title"
                value={(formData as any)?.position || ""}
                onChange={handleInputChange}
                style={getInputStyle("position")}
              />
              {renderErrorMessage("position")}
            </div>

            <div>
              <label style={getLabelStyle()}>Department *</label>
              <input
                name="department"
                type="text"
                placeholder="Enter department"
                value={(formData as any)?.department || ""}
                onChange={handleInputChange}
                style={getInputStyle("department")}
              />
              {renderErrorMessage("department")}
            </div>

            <div>
              <label style={getLabelStyle()}>Employee ID *</label>
              <input
                name="employeeId"
                type="text"
                placeholder="Enter employee ID"
                value={(formData as any)?.employeeId || ""}
                onChange={handleInputChange}
                style={getInputStyle("employeeId")}
              />
              {renderErrorMessage("employeeId")}
            </div>

            <div>
              <label style={getLabelStyle()}>Join Date *</label>
              <input
                name="joinDate"
                type="date"
                value={(formData as any)?.joinDate || ""}
                onChange={handleInputChange}
                style={getInputStyle("joinDate")}
              />
              {renderErrorMessage("joinDate")}
            </div>

            <div>
              <label style={getLabelStyle()}>Employment Status *</label>
              <Listbox
                value={(formData as any)?.employmentStatus || ""}
                onChange={(value) => handleListboxChange("employmentStatus", value)}
              >
                <div className="lf-dropdown">
                  <Listbox.Button className={`lf-dropdown-btn ${errors.employmentStatus ? "lf-error" : ""}`}>
                    <span className={(formData as any)?.employmentStatus ? "" : "text-gray-400"}>
                      {(formData as any)?.employmentStatus
                        ? employmentStatusOptions.find((option) => option.value === (formData as any)?.employmentStatus)
                            ?.label
                        : "Select Employment Status"}
                    </span>
                    <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Listbox.Button>
                  <Listbox.Options className="lf-dropdown-options">
                    {employmentStatusOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              {renderErrorMessage("employmentStatus")}
            </div>

            <div>
              <label style={getLabelStyle()}>Work Location *</label>
              <Listbox
                value={(formData as any)?.workLocation || ""}
                onChange={(value) => handleListboxChange("workLocation", value)}
              >
                <div className="lf-dropdown">
                  <Listbox.Button className={`lf-dropdown-btn ${errors.workLocation ? "lf-error" : ""}`}>
                    <span className={(formData as any)?.workLocation ? "" : "text-gray-400"}>
                      {(formData as any)?.workLocation
                        ? workLocationOptions.find((option) => option.value === (formData as any)?.workLocation)?.label
                        : "Select Work Location"}
                    </span>
                    <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Listbox.Button>
                  <Listbox.Options className="lf-dropdown-options">
                    {workLocationOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active, selected }) =>
                          `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              {renderErrorMessage("workLocation")}
            </div>
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "1px solid #ffeaa7",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#856404",
              marginBottom: "15px",
              borderBottom: "2px solid #856404",
              paddingBottom: "5px",
            }}
          >
            Performance Metrics
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <label style={getLabelStyle()}>Performance Score (0-100)</label>
              <input
                name="performanceScore"
                type="number"
                min="0"
                max="100"
                placeholder="Enter performance score"
                value={(formData as any)?.performanceScore || ""}
                onChange={handleInputChange}
                style={getInputStyle("performanceScore")}
              />
              {renderErrorMessage("performanceScore")}
            </div>

            <div>
              <label style={getLabelStyle()}>Attendance Rate (0-100%)</label>
              <input
                name="attendanceRate"
                type="number"
                min="0"
                max="100"
                placeholder="Enter attendance rate"
                value={(formData as any)?.attendanceRate || ""}
                onChange={handleInputChange}
                style={getInputStyle("attendanceRate")}
              />
              {renderErrorMessage("attendanceRate")}
            </div>

            <div>
              <label style={getLabelStyle()}>Training Progress (0-100%)</label>
              <input
                name="trainingProgress"
                type="number"
                min="0"
                max="100"
                placeholder="Enter training progress"
                value={(formData as any)?.trainingProgress || ""}
                onChange={handleInputChange}
                style={getInputStyle("trainingProgress")}
              />
              {renderErrorMessage("trainingProgress")}
            </div>

            <div>
              <label style={getLabelStyle()}>Active Tasks Count</label>
              <input
                name="activeTasks"
                type="number"
                min="0"
                placeholder="Enter number of active tasks"
                value={(formData as any)?.activeTasks || ""}
                onChange={handleInputChange}
                style={getInputStyle("activeTasks")}
              />
              {renderErrorMessage("activeTasks")}
            </div>
          </div>
        </div>

        {/* Skills and Certifications Section */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#d1ecf1",
            borderRadius: "8px",
            border: "1px solid #bee5eb",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0c5460",
              marginBottom: "15px",
              borderBottom: "2px solid #0c5460",
              paddingBottom: "5px",
            }}
          >
            Skills & Professional Development
          </h3>

          <div style={{ marginBottom: "15px" }}>
            <label style={getLabelStyle()}>Skills (comma-separated)</label>
            <input
              name="skills"
              type="text"
              placeholder="e.g., JavaScript, Project Management, Communication"
              value={Array.isArray((formData as any)?.skills) ? (formData as any).skills.join(", ") : ""}
              onChange={(e) => {
                if (!formData) return
                const skillsArray = e.target.value
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter((skill) => skill)
                setFormData({ ...formData, skills: skillsArray })
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          <div>
            <label style={getLabelStyle()}>Certifications (comma-separated)</label>
            <input
              name="certifications"
              type="text"
              placeholder="e.g., PMP, AWS Certified, Scrum Master"
              value={
                Array.isArray((formData as any)?.certifications) ? (formData as any).certifications.join(", ") : ""
              }
              onChange={(e) => {
                if (!formData) return
                const certArray = e.target.value
                  .split(",")
                  .map((cert) => cert.trim())
                  .filter((cert) => cert)
                setFormData({ ...formData, certifications: certArray })
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        {/* Access Level Section */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8d7da",
            borderRadius: "8px",
            border: "1px solid #f5c6cb",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#721c24",
              marginBottom: "15px",
              borderBottom: "2px solid #721c24",
              paddingBottom: "5px",
            }}
          >
            Access & Permissions
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <label style={getLabelStyle()}>Access Level *</label>
              <Listbox
                value={(formData as any)?.accessLevel || ""}
                onChange={(value) => handleListboxChange("accessLevel", value)}
              >
                <div className="lf-dropdown">
                  <Listbox.Button className={`lf-dropdown-btn ${errors.accessLevel ? "lf-error" : ""}`}>
                    <span className={(formData as any)?.accessLevel ? "" : "text-gray-400"}>
                      {(formData as any)?.accessLevel || "Select Access Level"}
                    </span>
                    <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Listbox.Button>
                  <Listbox.Options className="lf-dropdown-options">
                    {["Basic", "Intermediate", "Advanced", "Admin", "Manager"].map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active, selected }) =>
                          `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              {renderErrorMessage("accessLevel")}
            </div>

            <div>
              <label style={getLabelStyle()}>Permissions (comma-separated)</label>
              <input
                name="permissions"
                type="text"
                placeholder="Enter permissions"
                value={Array.isArray((formData as any)?.permissions) ? (formData as any).permissions.join(", ") : ""}
                onChange={(e) => {
                  if (!formData) return
                  const permArray = e.target.value
                    .split(",")
                    .map((perm) => perm.trim())
                    .filter((perm) => perm)
                  setFormData({ ...formData, permissions: permArray })
                }}
                style={getInputStyle("permissions")}
              />
              {renderErrorMessage("permissions")}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "500", color: "#000000" }}>
          Here you can view and update your personal information.
        </p>
        <Listbox
          value={selectedMenuItem?.title || "Edit Profile"}
          onChange={(selectedTitle) => {
            if (selectedTitle === "Edit Profile") {
              setSelectedMenuItem(null)
            } else {
              const foundItem = rightMenuItems.find((item) => item.title === selectedTitle)
              setSelectedMenuItem(foundItem || null)
            }
          }}
        >
          <div className="lf-dropdown">
            <Listbox.Button className="lf-dropdown-btn" style={{ minWidth: "180px" }}>
              <span>{selectedMenuItem?.title || "Edit Profile"}</span>
              <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Listbox.Button>
            <Listbox.Options className="lf-dropdown-options">
              <Listbox.Option
                value="Edit Profile"
                className={({ active, selected }) =>
                  `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>Edit Profile</span>
                    {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                  </div>
                )}
              </Listbox.Option>
              {rightMenuItems.map((item) => (
                <Listbox.Option
                  key={item.title}
                  value={item.title}
                  className={({ active, selected }) =>
                    `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <span>{item.title}</span>
                      {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                    </div>
                  )}
                </Listbox.Option>
              ))}
              <Listbox.Option
                value="Documents"
                className={({ active, selected }) =>
                  `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>Documents</span>
                    {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                  </div>
                )}
              </Listbox.Option>
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <p style={{ fontSize: "14px", color: "#555" }}>
        Kindly fill the form below to update your information. Fields marked with * are required.
      </p>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "8px",
            color: "#155724",
            marginTop: "10px",
          }}
        >
          ✓ Information updated successfully!
        </div>
      )}

      {submitStatus === "error" && Object.keys(errors).length > 0 && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            color: "#721c24",
            marginTop: "10px",
          }}
        >
          ⚠ Please fix the errors below before submitting.
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            minHeight: "300px",
            padding: "30px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            backgroundColor: "#fafafa",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          {selectedMenuItem === null && formData ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {/* Photo Upload */}
              <div>
                <label style={getLabelStyle()}>Profile Photo</label>
                {photoPreview ? (
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  />
                ) : (
                  <p style={{ color: "#666", marginBottom: "8px" }}>No photo selected</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{
                    fontSize: "14px",
                    color: "#000000",
                  }}
                />
                {renderErrorMessage("photo")}
              </div>

              {/* Basic Information Section */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "8px",
                  border: "1px solid #bbdefb",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1565c0",
                    marginBottom: "15px",
                    borderBottom: "2px solid #1565c0",
                    paddingBottom: "5px",
                  }}
                >
                  Basic Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "15px",
                  }}
                >
                  {/* First Name */}
                  <div>
                    <label style={getLabelStyle()}>First Name *</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={(formData as any).firstName || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("firstName")}
                    />
                    {renderErrorMessage("firstName")}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label style={getLabelStyle()}>Last Name *</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={(formData as any).lastName || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("lastName")}
                    />
                    {renderErrorMessage("lastName")}
                  </div>

                  {/* Middle Name - only for non-organisation users */}
                  {userType !== "Organisation" && (
                    <div>
                      <label style={getLabelStyle()}>Middle Name</label>
                      <input
                        name="middleName"
                        type="text"
                        placeholder="Enter middle name"
                        value={(formData as any).middleName || ""}
                        onChange={handleInputChange}
                        style={getInputStyle("middleName")}
                      />
                      {renderErrorMessage("middleName")}
                    </div>
                  )}

                  {/* Gender - only for non-organisation users */}
                  {userType !== "Organisation" && (
                    <div>
                      <label style={getLabelStyle()}>Gender *</label>
                      <select
                        name="gender"
                        value={(formData as any).gender || ""}
                        onChange={handleInputChange}
                        style={getInputStyle("gender")}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {renderErrorMessage("gender")}
                    </div>
                  )}

                  {/* Date of Birth - only for non-organisation users */}
                  {userType !== "Organisation" && (
                    <div>
                      <label style={getLabelStyle()}>Date of Birth *</label>
                      <input
                        name="dateOfBirth"
                        type="date"
                        value={(formData as any).dateOfBirth || ""}
                        onChange={handleInputChange}
                        style={getInputStyle("dateOfBirth")}
                      />
                      {renderErrorMessage("dateOfBirth")}
                    </div>
                  )}

                  {/* Phone */}
                  <div>
                    <label style={getLabelStyle()}>Phone Number *</label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Enter phone number with country code"
                      value={(formData as any).phone || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("phone")}
                    />
                    {renderErrorMessage("phone")}
                  </div>

                  {/* Street Number */}
                  <div>
                    <label style={getLabelStyle()}>Street Number *</label>
                    <input
                      name="streetNumber"
                      type="text"
                      placeholder="Enter street number"
                      value={(formData as any).streetNumber || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("streetNumber")}
                    />
                    {renderErrorMessage("streetNumber")}
                  </div>

                  {/* Street Name */}
                  <div>
                    <label style={getLabelStyle()}>Street Name *</label>
                    <input
                      name="streetName"
                      type="text"
                      placeholder="Enter street name"
                      value={(formData as any).streetName || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("streetName")}
                    />
                    {renderErrorMessage("streetName")}
                  </div>

                  {/* City */}
                  <div>
                    <label style={getLabelStyle()}>City *</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      value={(formData as any).city || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("city")}
                    />
                    {renderErrorMessage("city")}
                  </div>

                  {/* State */}
                  <div>
                    <label style={getLabelStyle()}>State *</label>
                    <input
                      name="state"
                      type="text"
                      placeholder="Enter state"
                      value={(formData as any).state || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("state")}
                    />
                    {renderErrorMessage("state")}
                  </div>

                  {/* Country */}
                  <div>
                    <label style={getLabelStyle()}>Country *</label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Enter country"
                      value={(formData as any).country || ""}
                      onChange={handleInputChange}
                      style={getInputStyle("country")}
                    />
                    {renderErrorMessage("country")}
                  </div>

                  {/* Organisation-specific fields */}
                  {userType === "Organisation" && (
                    <>
                      <div>
                        <label style={getLabelStyle()}>Organisational Type *</label>
                        <select
                          name="organisationalType"
                          value={(formData as any).organisationalType || ""}
                          onChange={handleInputChange}
                          style={getInputStyle("organisationalType")}
                        >
                          <option value="">Select Organisational Type</option>
                          <option value="school">School</option>
                          <option value="business">Business</option>
                          <option value="ngo">NGO</option>
                        </select>
                        {renderErrorMessage("organisationalType")}
                      </div>

                      <div>
                        <label style={getLabelStyle()}>Is Company Registered? *</label>
                        <select
                          name="isCompanyRegistered"
                          value={(formData as any).isCompanyRegistered || ""}
                          onChange={handleInputChange}
                          style={getInputStyle("isCompanyRegistered")}
                        >
                          <option value="">Select Registration Status</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {renderErrorMessage("isCompanyRegistered")}
                      </div>

                      {(formData as any)?.isCompanyRegistered === "Yes" && (
                        <div>
                          <label style={getLabelStyle()}>Date of Registration *</label>
                          <input
                            name="dateOfRegistration"
                            type="date"
                            value={(formData as any).dateOfRegistration || ""}
                            onChange={handleInputChange}
                            style={getInputStyle("dateOfRegistration")}
                          />
                          {renderErrorMessage("dateOfRegistration")}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Disability Type & Educational Level - hide if organisation */}
              {userType !== "Organisation" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <div>
                    <label style={getLabelStyle()}>Disability Type</label>
                    <Listbox
                      value={(formData as any)?.disabilityType || ""}
                      onChange={(value) => handleListboxChange("disabilityType", value)}
                    >
                      <div className="lf-dropdown">
                        <Listbox.Button className={`lf-dropdown-btn ${errors.disabilityType ? "lf-error" : ""}`}>
                          <span className={(formData as any)?.disabilityType ? "" : "text-gray-400"}>
                            {(formData as any)?.disabilityType
                              ? disabilityTypeOptions.find(
                                  (option) => option.value === (formData as any)?.disabilityType,
                                )?.label
                              : "Select Disability Type"}
                          </span>
                          <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Listbox.Button>
                        <Listbox.Options className="lf-dropdown-options">
                          {disabilityTypeOptions.map((option) => (
                            <Listbox.Option
                              key={option.value}
                              value={option.value}
                              className={({ active, selected }) =>
                                `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                              }
                            >
                              {({ selected }) => (
                                <div className="flex items-center justify-between">
                                  <span>{option.label}</span>
                                  {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                    {renderErrorMessage("disabilityType")}
                  </div>

                  <div>
                    <label style={getLabelStyle()}>Educational Level</label>
                    <Listbox
                      value={(formData as any)?.educationalLevel || ""}
                      onChange={(value) => handleListboxChange("educationalLevel", value)}
                    >
                      <div className="lf-dropdown">
                        <Listbox.Button className={`lf-dropdown-btn ${errors.educationalLevel ? "lf-error" : ""}`}>
                          <span className={(formData as any)?.educationalLevel ? "" : "text-gray-400"}>
                            {(formData as any)?.educationalLevel
                              ? educationalLevelOptions.find(
                                  (option) => option.value === (formData as any)?.educationalLevel,
                                )?.label
                              : "Select Educational Level"}
                          </span>
                          <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Listbox.Button>
                        <Listbox.Options className="lf-dropdown-options">
                          {educationalLevelOptions.map((option) => (
                            <Listbox.Option
                              key={option.value}
                              value={option.value}
                              className={({ active, selected }) =>
                                `lf-dropdown-item ${active ? "lf-active" : ""} ${selected ? "lf-selected" : ""}`
                              }
                            >
                              {({ selected }) => (
                                <div className="flex items-center justify-between">
                                  <span>{option.label}</span>
                                  {selected && <Check className="h-5 w-5" aria-hidden="true" />}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                    {renderErrorMessage("educationalLevel")}
                  </div>
                </div>
              )}

              {/* Render Staff-specific fields */}
              {renderStaffFields()}

              {/* Security Information Section */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "#f3e5f5",
                  borderRadius: "8px",
                  border: "1px solid #e1bee7",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#7b1fa2",
                    marginBottom: "15px",
                    borderBottom: "2px solid #7b1fa2",
                    paddingBottom: "5px",
                  }}
                >
                  Security Information
                </h3>

                {/* Security Question */}
                <div style={{ marginBottom: "15px" }}>
                  <label style={getLabelStyle()}>Security Question *</label>
                  <select
                    name="securityQuestion"
                    value={(formData as any).securityQuestion || ""}
                    onChange={handleInputChange}
                    style={getInputStyle("securityQuestion")}
                  >
                    <option value="">Select Security Question</option>
                    <option value="mother_maiden">What is your mother's maiden name?</option>
                    <option value="first_pet">What was your first pet's name?</option>
                    <option value="birth_city">What city were you born in?</option>
                  </select>
                  {renderErrorMessage("securityQuestion")}
                </div>

                {/* Security Answer */}
                <div>
                  <label style={getLabelStyle()}>Security Answer *</label>
                  <input
                    type="text"
                    name="securityAnswer"
                    placeholder="Enter your security answer"
                    value={(formData as any).securityAnswer || ""}
                    onChange={handleInputChange}
                    style={getInputStyle("securityAnswer")}
                  />
                  {renderErrorMessage("securityAnswer")}
                </div>
              </div>

              {/* Referral Name (auto-generated) */}
              <div>
                <label style={getLabelStyle()}>Referral Name (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.referralName}
                  disabled
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Disabled fields */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#666",
                    marginBottom: "15px",
                    borderBottom: "2px solid #666",
                    paddingBottom: "5px",
                  }}
                >
                  Read-Only Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "15px",
                  }}
                >
                  <div>
                    <label style={getLabelStyle()}>User Type</label>
                    <input
                      type="text"
                      value={(formData as any).userType}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={getLabelStyle()}>Unique ID</label>
                    <input
                      type="text"
                      value={(formData as any).uniqueId}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={getLabelStyle()}>Email</label>
                    <input
                      type="text"
                      value={(formData as any).email}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={getLabelStyle()}>Disability Status</label>
                    <input
                      type="text"
                      value={(formData as any).disability ? "Yes" : "No"}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={getLabelStyle()}>Policy Agreement</label>
                    <input
                      type="text"
                      value={(formData as any).agreeToPolicy ? "Yes" : "No"}
                      disabled
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit button with validation feedback */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: isSubmitting ? "#6c757d" : "#071D6A",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#05205C"
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#071D6A"
                  }
                }}
              >
                {isSubmitting ? "Updating..." : "Update Information"}
              </button>

              {/* General submit error */}
              {errors.submit && (
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "#f8d7da",
                    border: "1px solid #f5c6cb",
                    borderRadius: "8px",
                    color: "#721c24",
                    marginTop: "10px",
                  }}
                >
                  {errors.submit}
                </div>
              )}
            </form>
          ) : (
            <div style={{ textAlign: "center", marginTop: "30px" }}>{renderSelectedComponent()}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
