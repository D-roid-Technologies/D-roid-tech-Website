import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../redux/Store";
import {
  updateField,
  submitLeadForm,
  resetSubmissionState,
  selectFormData,
  selectErrors,
  selectIsSubmitting,
  selectIsSubmitted,
  selectSubmitError,
  serviceOptions,
  startDateOptions,
  type FormData,
} from "../../../../redux/slices/LeadFormSlice";
import "./LeadForm.css";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";

const LeadForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select state from Redux store
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectErrors);
  const isSubmitting = useSelector(selectIsSubmitting);
  const isSubmitted = useSelector(selectIsSubmitted);
  const submitError = useSelector(selectSubmitError);

  const serviceId = "service_o1jbklr"
  const templateId = "template_p8h58ur"
  const publicKey = "hcj3DsJ8MfNfUrE8J"

  const generateReferenceNumber = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(
      now.getSeconds()
    )}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    return `REF-${date}-${time}-${random}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name as keyof FormData, value }));
  };

  const handleSubmit = async () => {
    const referenceNumber = generateReferenceNumber();
    // dispatch(submitLeadForm(formData));
    const templateParams = {
      name: formData.firstName + " " + formData.lastName,
      title: `We have received your request of ${formData.service} for our ongoing free service plan. 
  
      See details below:
      Full Name: ${formData.firstName} ${formData.lastName},
      Phone Number: ${formData.phoneNumber},
      Email: ${formData.email},
      Refrence Number: ${referenceNumber}
      Message: ${formData.businessName} would like to start the free 1 page and 1 month hosting plan ${formData.startDate}.
  
      Our team will review and get back to you in three working days`,
      email: formData.email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success("Message successfully sent!", {
        style: { background: "#4BB543", color: "#fff" },
      });

    } catch (error) {
      console.error("Email send error:", error);
      toast.error("Error sending email 🚫", {
        style: { background: "#ff4d4f", color: "#fff" },
      });

    } finally {

    }
  };

  const handleSubmitAnother = () => {
    dispatch(resetSubmissionState());
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="lf-container">
        <div className="lf-success-message">
          <div className="lf-success-icon">✓</div>
          <h2>Thank you for your interest!</h2>
          <p>We've received your information and will get back to you soon.</p>
          <button
            className="lf-btn lf-btn-primary"
            onClick={handleSubmitAnother}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lf-container">
      <div className="lf-form-wrapper">
        <div className="lf-form-header">
          <h2>Your free website</h2>
          <p>
            Fill the form below to get a free 1 page website and a free 1 month
            hosting
          </p>
        </div>

        {/* Show submission error if any */}
        {submitError && (
          <div className="lf-error-banner">
            <p>{submitError}</p>
          </div>
        )}

        <div className="lf-form">
          <div className="lf-form-group">
            <label className="lf-label" htmlFor="service">
              What service do you need? <span className="lf-required">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`lf-select ${errors.service ? "lf-error" : ""}`}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <span className="lf-error-message">{errors.service}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="businessName">
              What's your First Name? <span className="lf-required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`lf-input ${errors.firstName ? "lf-error" : ""}`}
              placeholder="Enter your first name"
            />
            {errors.businessName && (
              <span className="lf-error-message">{errors.firstName}</span>
            )}
          </div>
          <div className="lf-form-group">
            <label className="lf-label" htmlFor="businessName">
              What's your Last Name? <span className="lf-required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`lf-input ${errors.lastName ? "lf-error" : ""}`}
              placeholder="Enter your last name"
            />
            {errors.businessName && (
              <span className="lf-error-message">{errors.lastName}</span>
            )}
          </div>
          <div className="lf-form-group">
            <label className="lf-label" htmlFor="businessName">
              What's your business name? <span className="lf-required">*</span>
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className={`lf-input ${errors.businessName ? "lf-error" : ""}`}
              placeholder="Enter your business name"
            />
            {errors.businessName && (
              <span className="lf-error-message">{errors.businessName}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="phoneNumber">
              Phone number <span className="lf-required">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`lf-input ${errors.phoneNumber ? "lf-error" : ""}`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <span className="lf-error-message">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="email">
              Email address <span className="lf-optional">(optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`lf-input ${errors.email ? "lf-error" : ""}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="lf-error-message">{errors.email}</span>
            )}
          </div>

          <div className="lf-form-group">
            <label className="lf-label" htmlFor="startDate">
              When do you want to get started?{" "}
              <span className="lf-required">*</span>
            </label>
            <select
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className={`lf-select ${errors.startDate ? "lf-error" : ""}`}
            >
              <option value="">Select timeline</option>
              {startDateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.startDate && (
              <span className="lf-error-message">{errors.startDate}</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`lf-btn lf-btn-primary ${isSubmitting ? "lf-btn-loading" : ""
              }`}
          >
            {isSubmitting ? (
              <>
                <span className="lf-spinner"></span>
                Submitting...
              </>
            ) : (
              "Get Started"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;

// import React, { useState } from "react";
// import "./LeadForm.css";

// interface FormData {
//   service: string;
//   businessName: string;
//   phoneNumber: string;
//   email: string;
//   startDate: string;
// }

// interface FormErrors {
//   service?: string;
//   businessName?: string;
//   phoneNumber?: string;
//   email?: string;
//   startDate?: string;
// }

// const LeadForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     service: "",
//     businessName: "",
//     phoneNumber: "",
//     email: "",
//     startDate: "",
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const serviceOptions = [
//     { value: "website-development", label: "Website Development" },
//     { value: "mobile-app-development", label: "Mobile App Development" },
//     { value: "company-management-portal", label: "Company Management Portal" },
//     { value: "custom-software", label: "Custom Software" },
//     { value: "ecommerce-website", label: "E-commerce Website" },
//   ];

//   const startDateOptions = [
//     { value: "immediately", label: "Immediately" },
//     { value: "within-week", label: "Within a week" },
//     { value: "this-month", label: "This month" },
//   ];

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     if (!formData.service) {
//       newErrors.service = "Please select a service";
//     }

//     if (!formData.businessName.trim()) {
//       newErrors.businessName = "Business name is required";
//     }

//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required";
//     } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Please enter a valid phone number";
//     }

//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.startDate) {
//       newErrors.startDate = "Please select when you want to get started";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name as keyof FormErrors]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: undefined,
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log("Form submitted:", formData);
//       setIsSubmitted(true);

//       // Reset form after successful submission
//       setFormData({
//         service: "",
//         businessName: "",
//         phoneNumber: "",
//         email: "",
//         startDate: "",
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="lf-container">
//         <div className="lf-success-message">
//           <div className="lf-success-icon">✓</div>
//           <h2>Thank you for your interest!</h2>
//           <p>We've received your information and will get back to you soon.</p>
//           <button
//             className="lf-btn lf-btn-primary"
//             onClick={() => setIsSubmitted(false)}
//           >
//             Submit Another Request
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="lf-container">
//       <div className="lf-form-wrapper">
//         <div className="lf-form-header">
//           <h2>Your free website</h2>
//           <p>
//             Fill the form below to get a free 1 page website and a free 1 month
//             hosting
//           </p>
//         </div>

//         <div className="lf-form" onSubmit={handleSubmit}>
//           <div className="lf-form-group">
//             <label className="lf-label" htmlFor="service">
//               What service do you need? <span className="lf-required">*</span>
//             </label>
//             <select
//               id="service"
//               name="service"
//               value={formData.service}
//               onChange={handleInputChange}
//               className={`lf-select ${errors.service ? "lf-error" : ""}`}
//             >
//               <option value="">Select a service</option>
//               {serviceOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             {errors.service && (
//               <span className="lf-error-message">{errors.service}</span>
//             )}
//           </div>

//           <div className="lf-form-group">
//             <label className="lf-label" htmlFor="businessName">
//               What's your business name? <span className="lf-required">*</span>
//             </label>
//             <input
//               type="text"
//               id="businessName"
//               name="businessName"
//               value={formData.businessName}
//               onChange={handleInputChange}
//               className={`lf-input ${errors.businessName ? "lf-error" : ""}`}
//               placeholder="Enter your business name"
//             />
//             {errors.businessName && (
//               <span className="lf-error-message">{errors.businessName}</span>
//             )}
//           </div>

//           <div className="lf-form-group">
//             <label className="lf-label" htmlFor="phoneNumber">
//               Phone number <span className="lf-required">*</span>
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               className={`lf-input ${errors.phoneNumber ? "lf-error" : ""}`}
//               placeholder="Enter your phone number"
//             />
//             {errors.phoneNumber && (
//               <span className="lf-error-message">{errors.phoneNumber}</span>
//             )}
//           </div>

//           <div className="lf-form-group">
//             <label className="lf-label" htmlFor="email">
//               Email address <span className="lf-optional">(optional)</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className={`lf-input ${errors.email ? "lf-error" : ""}`}
//               placeholder="Enter your email address"
//             />
//             {errors.email && (
//               <span className="lf-error-message">{errors.email}</span>
//             )}
//           </div>

//           <div className="lf-form-group">
//             <label className="lf-label" htmlFor="startDate">
//               When do you want to get started?{" "}
//               <span className="lf-required">*</span>
//             </label>
//             <select
//               id="startDate"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               className={`lf-select ${errors.startDate ? "lf-error" : ""}`}
//             >
//               <option value="">Select timeline</option>
//               {startDateOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             {errors.startDate && (
//               <span className="lf-error-message">{errors.startDate}</span>
//             )}
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className={`lf-btn lf-btn-primary ${
//               isSubmitting ? "lf-btn-loading" : ""
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="lf-spinner"></span>
//                 Submitting...
//               </>
//             ) : (
//               "Get Started"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadForm;
