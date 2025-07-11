import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendar,
  FaImage,
  FaTrophy,
  FaClock,
  FaMapMarkerAlt,
  FaBookOpen,
} from "react-icons/fa";
import styles from "./AddStaff.module.css";

interface AddStaffFormProps {
  onBack: () => void;
  onSubmit: (staffData: StaffFormData) => void;
}

interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  grade: string;
  experience: string;
  education: string;
  startDate: string;
  profileImage: string;
  description: string;
  achievements: string[];
  specializations: string[];
  officeHours: string;
  room: string;
}

const AddStaff: React.FC<AddStaffFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<StaffFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    grade: "",
    experience: "",
    education: "",
    startDate: "",
    profileImage: "",
    description: "",
    achievements: [""],
    specializations: [""],
    officeHours: "",
    room: "",
  });

  const [errors, setErrors] = useState<Partial<StaffFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof StaffFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleArrayChange = (
    field: "achievements" | "specializations",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "achievements" | "specializations") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "achievements" | "specializations",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StaffFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.grade.trim()) newErrors.grade = "Grade level is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.startDate.trim())
      newErrors.startDate = "Start date is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.officeHours.trim())
      newErrors.officeHours = "Office hours are required";
    if (!formData.room.trim()) newErrors.room = "Room assignment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Filter out empty achievements and specializations
      const processedData = {
        ...formData,
        achievements: formData.achievements.filter(
          (item) => item.trim() !== ""
        ),
        specializations: formData.specializations.filter(
          (item) => item.trim() !== ""
        ),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(processedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      grade: "",
      experience: "",
      education: "",
      startDate: "",
      profileImage: "",
      description: "",
      achievements: [""],
      specializations: [""],
      officeHours: "",
      room: "",
    });
    setErrors({});
  };

  return (
    <div className={styles.addStaffFormContainer}>
      <button className={styles.backButton} onClick={onBack}>
        <IoMdArrowRoundBack />
        Back to Staff Management
      </button>

      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Add New Staff Member</h2>
          <p className={styles.formSubtitle}>
            Fill in the details below to add a new staff member to your
            organization
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.staffForm}>
          <div className={styles.formGrid}>
            {/* Personal Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FaUser className={styles.sectionIcon} />
                Personal Information
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="firstName" className={styles.inputLabel}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.firstName ? styles.inputError : ""
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <span className={styles.errorMessage}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="lastName" className={styles.inputLabel}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.lastName ? styles.inputError : ""
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <span className={styles.errorMessage}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="email" className={styles.inputLabel}>
                      <FaEnvelope className={styles.inputIcon} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.email ? styles.inputError : ""
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <span className={styles.errorMessage}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="phone" className={styles.inputLabel}>
                      <FaPhone className={styles.inputIcon} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.phone ? styles.inputError : ""
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <span className={styles.errorMessage}>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="profileImage" className={styles.inputLabel}>
                      <FaImage className={styles.inputIcon} />
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      id="profileImage"
                      name="profileImage"
                      value={formData.profileImage}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Enter profile image URL"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FaGraduationCap className={styles.sectionIcon} />
                Professional Information
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="subject" className={styles.inputLabel}>
                      Subject/Department *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.subject ? styles.inputError : ""
                      }`}
                    >
                      <option value="">Select subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Physical Education">
                        Physical Education
                      </option>
                      <option value="Art">Art</option>
                      <option value="Music">Music</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Special Education">
                        Special Education
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <span className={styles.errorMessage}>
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="grade" className={styles.inputLabel}>
                      Grade Level *
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.grade ? styles.inputError : ""
                      }`}
                    >
                      <option value="">Select grade level</option>
                      <option value="K-2">K-2</option>
                      <option value="3-5">3-5</option>
                      <option value="6-8">6-8</option>
                      <option value="9-12">9-12</option>
                      <option value="All Grades">All Grades</option>
                    </select>
                    {errors.grade && (
                      <span className={styles.errorMessage}>
                        {errors.grade}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="experience" className={styles.inputLabel}>
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.experience ? styles.inputError : ""
                      }`}
                      placeholder="e.g., 8 years"
                    />
                    {errors.experience && (
                      <span className={styles.errorMessage}>
                        {errors.experience}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="education" className={styles.inputLabel}>
                      Education *
                    </label>
                    <input
                      type="text"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.education ? styles.inputError : ""
                      }`}
                      placeholder="e.g., M.S. in Mathematics Education, B.S. in Mathematics"
                    />
                    {errors.education && (
                      <span className={styles.errorMessage}>
                        {errors.education}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputField}>
                    <label htmlFor="startDate" className={styles.inputLabel}>
                      <FaCalendar className={styles.inputIcon} />
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.startDate ? styles.inputError : ""
                      }`}
                    />
                    {errors.startDate && (
                      <span className={styles.errorMessage}>
                        {errors.startDate}
                      </span>
                    )}
                  </div>

                  <div className={styles.inputField}>
                    <label htmlFor="room" className={styles.inputLabel}>
                      <FaMapMarkerAlt className={styles.inputIcon} />
                      Room Assignment *
                    </label>
                    <input
                      type="text"
                      id="room"
                      name="room"
                      value={formData.room}
                      onChange={handleInputChange}
                      className={`${styles.input} ${
                        errors.room ? styles.inputError : ""
                      }`}
                      placeholder="e.g., Room 205, Math Wing"
                    />
                    {errors.room && (
                      <span className={styles.errorMessage}>{errors.room}</span>
                    )}
                  </div>
                </div>

                <div className={styles.inputField}>
                  <label htmlFor="officeHours" className={styles.inputLabel}>
                    <FaClock className={styles.inputIcon} />
                    Office Hours *
                  </label>
                  <input
                    type="text"
                    id="officeHours"
                    name="officeHours"
                    value={formData.officeHours}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      errors.officeHours ? styles.inputError : ""
                    }`}
                    placeholder="e.g., Monday-Friday: 3:00 PM - 4:00 PM"
                  />
                  {errors.officeHours && (
                    <span className={styles.errorMessage}>
                      {errors.officeHours}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FaTrophy className={styles.sectionIcon} />
                Additional Information
              </h3>

              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>
                    <FaTrophy className={styles.inputIcon} />
                    Achievements
                  </label>
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className={styles.arrayItemContainer}>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) =>
                          handleArrayChange(
                            "achievements",
                            index,
                            e.target.value
                          )
                        }
                        className={styles.arrayInput}
                        placeholder="Enter achievement"
                      />
                      {formData.achievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("achievements", index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("achievements")}
                    className={styles.addButton}
                  >
                    Add Achievement
                  </button>
                </div>

                <div className={styles.inputField}>
                  <label className={styles.inputLabel}>
                    <FaBookOpen className={styles.inputIcon} />
                    Specializations
                  </label>
                  {formData.specializations.map((specialization, index) => (
                    <div key={index} className={styles.arrayItemContainer}>
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) =>
                          handleArrayChange(
                            "specializations",
                            index,
                            e.target.value
                          )
                        }
                        className={styles.arrayInput}
                        placeholder="Enter specialization"
                      />
                      {formData.specializations.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("specializations", index)
                          }
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("specializations")}
                    className={styles.addButton}
                  >
                    Add Specialization
                  </button>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className={styles.formSection}>
              <div className={styles.inputField}>
                <label htmlFor="description" className={styles.inputLabel}>
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${
                    errors.description ? styles.inputError : ""
                  }`}
                  placeholder="Enter a brief description of the staff member's role and expertise"
                  rows={4}
                />
                {errors.description && (
                  <span className={styles.errorMessage}>
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              disabled={isSubmitting}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Staff..." : "Add Staff Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;

// import React, { useState } from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaGraduationCap,
//   FaCalendar,
//   FaImage,
// } from "react-icons/fa";
// import styles from "./AddStaff.module.css";

// interface AddStaffFormProps {
//   onBack: () => void;
//   onSubmit: (staffData: StaffFormData) => void;
// }

// interface StaffFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   subject: string;
//   grade: string;
//   experience: string;
//   education: string;
//   startDate: string;
//   profileImage: string;
//   description: string;
// }

// const AddStaff: React.FC<AddStaffFormProps> = ({ onBack, onSubmit }) => {
//   const [formData, setFormData] = useState<StaffFormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     subject: "",
//     grade: "",
//     experience: "",
//     education: "",
//     startDate: "",
//     profileImage: "",
//     description: "",
//   });

//   const [errors, setErrors] = useState<Partial<StaffFormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name as keyof StaffFormData]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<StaffFormData> = {};

//     if (!formData.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.grade.trim()) newErrors.grade = "Grade level is required";
//     if (!formData.experience.trim())
//       newErrors.experience = "Experience is required";
//     if (!formData.education.trim())
//       newErrors.education = "Education is required";
//     if (!formData.startDate.trim())
//       newErrors.startDate = "Start date is required";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       onSubmit(formData);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       subject: "",
//       grade: "",
//       experience: "",
//       education: "",
//       startDate: "",
//       profileImage: "",
//       description: "",
//     });
//     setErrors({});
//   };

//   return (
//     <div className={styles.addStaffFormContainer}>
//       <button className={styles.backButton} onClick={onBack}>
//         <IoMdArrowRoundBack />
//         Back to Staff Management
//       </button>

//       <div className={styles.formWrapper}>
//         <div className={styles.formHeader}>
//           <h2 className={styles.formTitle}>Add New Staff Member</h2>
//           <p className={styles.formSubtitle}>
//             Fill in the details below to add a new staff member to your
//             organization
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className={styles.staffForm}>
//           <div className={styles.formGrid}>
//             {/* Personal Information Section */}
//             <div className={styles.formSection}>
//               <h3 className={styles.sectionTitle}>
//                 <FaUser className={styles.sectionIcon} />
//                 Personal Information
//               </h3>

//               <div className={styles.inputGroup}>
//                 <div className={styles.inputRow}>
//                   <div className={styles.inputField}>
//                     <label htmlFor="firstName" className={styles.inputLabel}>
//                       First Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.firstName ? styles.inputError : ""
//                       }`}
//                       placeholder="Enter first name"
//                     />
//                     {errors.firstName && (
//                       <span className={styles.errorMessage}>
//                         {errors.firstName}
//                       </span>
//                     )}
//                   </div>

//                   <div className={styles.inputField}>
//                     <label htmlFor="lastName" className={styles.inputLabel}>
//                       Last Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.lastName ? styles.inputError : ""
//                       }`}
//                       placeholder="Enter last name"
//                     />
//                     {errors.lastName && (
//                       <span className={styles.errorMessage}>
//                         {errors.lastName}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.inputRow}>
//                   <div className={styles.inputField}>
//                     <label htmlFor="email" className={styles.inputLabel}>
//                       <FaEnvelope className={styles.inputIcon} />
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.email ? styles.inputError : ""
//                       }`}
//                       placeholder="Enter email address"
//                     />
//                     {errors.email && (
//                       <span className={styles.errorMessage}>
//                         {errors.email}
//                       </span>
//                     )}
//                   </div>

//                   <div className={styles.inputField}>
//                     <label htmlFor="phone" className={styles.inputLabel}>
//                       <FaPhone className={styles.inputIcon} />
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.phone ? styles.inputError : ""
//                       }`}
//                       placeholder="Enter phone number"
//                     />
//                     {errors.phone && (
//                       <span className={styles.errorMessage}>
//                         {errors.phone}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Professional Information Section */}
//             <div className={styles.formSection}>
//               <h3 className={styles.sectionTitle}>
//                 <FaGraduationCap className={styles.sectionIcon} />
//                 Professional Information
//               </h3>

//               <div className={styles.inputGroup}>
//                 <div className={styles.inputRow}>
//                   <div className={styles.inputField}>
//                     <label htmlFor="subject" className={styles.inputLabel}>
//                       Subject/Department *
//                     </label>
//                     <select
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.subject ? styles.inputError : ""
//                       }`}
//                     >
//                       <option value="">Select subject</option>
//                       <option value="Mathematics">Mathematics</option>
//                       <option value="Science">Science</option>
//                       <option value="English">English</option>
//                       <option value="History">History</option>
//                       <option value="Physical Education">
//                         Physical Education
//                       </option>
//                       <option value="Art">Art</option>
//                       <option value="Music">Music</option>
//                       <option value="Computer Science">Computer Science</option>
//                       <option value="Special Education">
//                         Special Education
//                       </option>
//                       <option value="Other">Other</option>
//                     </select>
//                     {errors.subject && (
//                       <span className={styles.errorMessage}>
//                         {errors.subject}
//                       </span>
//                     )}
//                   </div>

//                   <div className={styles.inputField}>
//                     <label htmlFor="grade" className={styles.inputLabel}>
//                       Grade Level *
//                     </label>
//                     <select
//                       id="grade"
//                       name="grade"
//                       value={formData.grade}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.grade ? styles.inputError : ""
//                       }`}
//                     >
//                       <option value="">Select grade level</option>
//                       <option value="K-2">K-2</option>
//                       <option value="3-5">3-5</option>
//                       <option value="6-8">6-8</option>
//                       <option value="9-12">9-12</option>
//                       <option value="All Grades">All Grades</option>
//                     </select>
//                     {errors.grade && (
//                       <span className={styles.errorMessage}>
//                         {errors.grade}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.inputRow}>
//                   <div className={styles.inputField}>
//                     <label htmlFor="experience" className={styles.inputLabel}>
//                       Years of Experience *
//                     </label>
//                     <input
//                       type="number"
//                       id="experience"
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.experience ? styles.inputError : ""
//                       }`}
//                       placeholder="Enter years of experience"
//                       min="0"
//                     />
//                     {errors.experience && (
//                       <span className={styles.errorMessage}>
//                         {errors.experience}
//                       </span>
//                     )}
//                   </div>

//                   <div className={styles.inputField}>
//                     <label htmlFor="education" className={styles.inputLabel}>
//                       Education Level *
//                     </label>
//                     <select
//                       id="education"
//                       name="education"
//                       value={formData.education}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.education ? styles.inputError : ""
//                       }`}
//                     >
//                       <option value="">Select education level</option>
//                       <option value="Bachelor's Degree">
//                         Bachelor's Degree
//                       </option>
//                       <option value="Master's Degree">Master's Degree</option>
//                       <option value="Doctoral Degree">Doctoral Degree</option>
//                       <option value="Teaching Certificate">
//                         Teaching Certificate
//                       </option>
//                     </select>
//                     {errors.education && (
//                       <span className={styles.errorMessage}>
//                         {errors.education}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.inputRow}>
//                   <div className={styles.inputField}>
//                     <label htmlFor="startDate" className={styles.inputLabel}>
//                       <FaCalendar className={styles.inputIcon} />
//                       Start Date *
//                     </label>
//                     <input
//                       type="date"
//                       id="startDate"
//                       name="startDate"
//                       value={formData.startDate}
//                       onChange={handleInputChange}
//                       className={`${styles.input} ${
//                         errors.startDate ? styles.inputError : ""
//                       }`}
//                     />
//                     {errors.startDate && (
//                       <span className={styles.errorMessage}>
//                         {errors.startDate}
//                       </span>
//                     )}
//                   </div>

//                   <div className={styles.inputField}>
//                     <label htmlFor="profileImage" className={styles.inputLabel}>
//                       <FaImage className={styles.inputIcon} />
//                       Profile Image URL
//                     </label>
//                     <input
//                       type="url"
//                       id="profileImage"
//                       name="profileImage"
//                       value={formData.profileImage}
//                       onChange={handleInputChange}
//                       className={styles.input}
//                       placeholder="Enter profile image URL"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Description Section */}
//             <div className={styles.formSection}>
//               <div className={styles.inputField}>
//                 <label htmlFor="description" className={styles.inputLabel}>
//                   Description *
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   className={`${styles.textarea} ${
//                     errors.description ? styles.inputError : ""
//                   }`}
//                   placeholder="Enter a brief description of the staff member's role and expertise"
//                   rows={4}
//                 />
//                 {errors.description && (
//                   <span className={styles.errorMessage}>
//                     {errors.description}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className={styles.formActions}>
//             <button
//               type="button"
//               onClick={handleReset}
//               className={styles.resetButton}
//               disabled={isSubmitting}
//             >
//               Reset Form
//             </button>
//             <button
//               type="submit"
//               className={styles.submitButton}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Adding Staff..." : "Add Staff Member"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStaff;
