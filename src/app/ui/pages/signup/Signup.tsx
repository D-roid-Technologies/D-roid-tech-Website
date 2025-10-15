import React, { useEffect, useState } from "react";
import { FaUsers, FaArrowLeft } from "react-icons/fa";
import { RoutePaths } from "../../../routes/Index";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RootState, store } from "../../../redux/Store";
import { addLocation } from "../../../redux/slices/Location";
import { useSelector } from "react-redux";
import { LocationState, UserType } from "../../../utils/Types";
import { authService } from "../../../redux/configuration/auth.service";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import "../../components/liteGrid@v1.0/lite-grid.css";
import styles from "./Signup.module.css"; // Adjust the path as necessary

interface FormData {
  firstName: string;
  lastName: string;
  middleName: string;
  initials: string;
  userType: string;
  uniqueId: string;
  email: string;
  phone: string;
  agreeToPolicy: boolean;
  isLoggedIn: boolean;
  gender: string;
  dateOfBirth: string;
  disability: boolean;
  disabilityType: string;
  photoUrl: string;
  educationalLevel: string;
  referralName: string;
  secondaryEmail: string;
  securityQuestion: string;
  securityAnswer: string;
  verifiedEmail: boolean;
  verifyPhoneNumber: boolean;
  agreedToTerms: boolean;
  twoFactorSettings: boolean;
  password: string;
  confirmPassword: string;
  role?: string; // ✅ Optional role field
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
}

interface FormErrors {
  userType?: string;
  staffId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToPolicy?: string;
}

const SignUp: React.FunctionComponent = () => {
  const [text, setText] = useState<any>("Sign Up");
  const userLocation: LocationState = useSelector(
    (state: RootState) => state.location
  );
  // const [formData, setFormData] = useState<FormData>({

  const [formData, setFormData] = useState<
    UserType & { confirmPassword: string }
  >({
    firstName: "",
    lastName: "",
    middleName: "",
    initials: "",
    userType: "",
    uniqueId: "",
    staffId: "",
    email: "",
    phone: "",
    agreeToPolicy: false,
    isLoggedIn: false,
    gender: "",
    dateOfBirth: "",
    disability: false,
    disabilityType: "",
    photoUrl: "",
    educationalLevel: "",
    referralName: "",
    secondaryEmail: "",
    securityQuestion: "",
    securityAnswer: "",
    verifiedEmail: false,
    verifyPhoneNumber: false,
    agreedToTerms: false,
    twoFactorSettings: false,
    password: "",
    confirmPassword: "",
    role: undefined, // optional field
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    country: "",
    // new
    // confirmPassword: "", // Add this extra field for form validation
    skills: [],
    certifications: [],
    accessLevel: "",
    permissions: [],
    notificationPreferences: { email: true },
    organisationalType: "",
    isCompanyRegistered: "",
    dateOfRegistration: "",
  });

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = 5000;

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (res) => {
          const { latitude, longitude } = res.coords;
          const geoApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          const response = await fetch(geoApi);
          const data = await response.json();

          store.dispatch(addLocation(data));
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            attempts++;
            if (attempts < maxAttempts) {
              console.warn("Permission denied. Retrying in 5 seconds...");
              setTimeout(fetchLocation, retryDelay);
            } else {
              console.error(
                "User denied location access. Max retries reached."
              );
            }
          } else {
            console.error("Geolocation error:", error.message);
          }
        }
      );
    };

    fetchLocation();
  }, []);

  const regex = {
    name: /^[A-Za-z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let errors: FormErrors = {};
    let isValid = true;

    if (!formData.userType) {
      errors.userType = "Please select a user type.";
      isValid = false;
    }

    if (formData.userType === "Staff" && !formData.uniqueId.trim()) {
      errors.staffId = "Staff ID is required for staff users.";
      isValid = false;
    }

    if (!formData.firstName || !regex.name.test(formData.firstName)) {
      errors.firstName = "First name should only contain letters.";
      isValid = false;
    }

    if (!formData.lastName || !regex.name.test(formData.lastName)) {
      errors.lastName = "Last name should only contain letters.";
      isValid = false;
    }

    if (!formData.email || !regex.email.test(formData.email)) {
      errors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!formData.password || !regex.password.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters long and include a number.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!formData.agreeToPolicy) {
      errors.agreeToPolicy = "You must agree to the privacy policy.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  function generateUniqueId(userType: string): string {
    const prefix = "DT-";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";

    for (let i = 0; i < 5; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let suffix = "";
    const lowerType = userType;

    if (lowerType === "Organisation") {
      suffix = "O";
    } else if (lowerType === "Member") {
      suffix = "M";
    } else {
      return ""; // better to return null for invalid type
    }

    return `${prefix}${randomPart}-${suffix}`;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validate()) return;

    let generatedId = formData.uniqueId;

    if (formData.userType.trim().toLowerCase() !== "staff") {
      generatedId = generateUniqueId(formData.userType.trim());

      if (!generatedId) {
        toast.error("Invalid user type — could not generate ID. 🚫", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return;
      }
    }

    const updatedFormData = {
      ...formData,
      uniqueId: generatedId,
      organisationalType: "",
      isCompanyRegistered: "",
      dateOfRegistration: "",
    };

    setText("Creating your D'roid Account...");

    const startCountdown = (
      seconds: number,
      onTick: (value: number) => void
    ): Promise<void> => {
      return new Promise((resolve) => {
        let count = seconds;
        const interval = setInterval(() => {
          onTick(count);
          if (count <= 0) {
            clearInterval(interval);
            resolve();
          }
          count--;
        }, 1000);
      });
    };

    await authService
      .handleUserRegistration(updatedFormData, userLocation)
      .then(async () => {
        await startCountdown(5, (value) => {
          setText(`User Created. Redirecting in ${value}s...`);
        }).then(() => {
          // Optional: only navigate if developer explicitly uncomments this
          navigate(RoutePaths.DashBoard);

          const templateParams = {
            name: `${updatedFormData.firstName} ${updatedFormData.lastName}`,
            title: `Welcome to D'roid Technologies Ltd...`,
            email: updatedFormData.email,
          };

          // emailjs
          //   .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
          //   .then(
          //     () => {
          //       toast.success("Email successfully sent!", {
          //         style: { background: "#4BB543", color: "#fff" },
          //       });
          //     },
          //     () => {
          //       toast.error("Error sending email 🚫", {
          //         style: { background: "#ff4d4f", color: "#fff" },
          //       });
          //     }
          //   );
        });
      })
      .catch(() => {
        setText("Sign Up");
        toast.error("User registration failed.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  };

  return (
    <div
      className="group group-blocks-1 group-blocks-md-2"
      style={{
        height: "100vh",
        backgroundColor: "#F9F9F9",
      }}
    >
      {/* Left Side */}
      <div className={`block ${styles.leftBlock}`}>
        <a href="/" className={styles.backLink}>
          {/* @ts-ignore */}
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Home
        </a>

        {/* @ts-ignore */}
        <FaUsers className={styles.heroIcon} />
      </div>

      {/* Right Side */}
      <div className={`block ${styles.rightBlock}`}>
        {/* Top Links */}
        <div className={styles.topLeftLinks}>
          <a href={RoutePaths.StaffLogin} className={styles.loginLink}>
            Staff Login
          </a>
        </div>

        <div className={styles.topRightLinks}>
          <a href={RoutePaths.MemberLogin} className={styles.loginLink}>
            Member Login
          </a>
        </div>

        <h2 className={styles.header}>Join the D'roid Community</h2>
        <p className={styles.subtext}>
          Connect with other developers or like minded individuals. Learn together,
          and build amazing things!
        </p>

        <form onSubmit={handleSubmit}>
          {/* User Type Dropdown */}
          <div style={{ marginBottom: "15px" }}>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC",
                backgroundColor: "#F9F9F9",
                color: formData.userType ? "#000" : "#BAB8B8",
              }}
            >
              <option value="">Select User Type</option>
              <option value="Staff">Staff</option>
              {/* <option value="Organisation">Organisation</option> */}
              <option value="Member">Member</option>
            </select>
            {formErrors.userType && (
              <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                {formErrors.userType}
              </div>
            )}
          </div>

          {/* Staff ID Input (only if userType is Staff) */}
          {formData.userType === "Staff" && (
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="uniqueId"
                placeholder="Unique ID"
                value={formData.uniqueId}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #CCCCCC",
                  backgroundColor: "#F9F9F9",
                }}
              />
              {formErrors.staffId && (
                <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                  {formErrors.staffId}
                </div>
              )}
            </div>
          )}

          {/* Other Fields (firstName, lastName, etc.) */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC",
                backgroundColor: "#F9F9F9",
              }}
            />
            {formErrors.firstName && (
              <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                {formErrors.firstName}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC",
                backgroundColor: "#F9F9F9",
              }}
            />
            {formErrors.lastName && (
              <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                {formErrors.lastName}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC",
                backgroundColor: "#F9F9F9",
              }}
            />
            {formErrors.email && (
              <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                {formErrors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC",
                backgroundColor: "#F9F9F9",
              }}
            />
            {formErrors.password && (
              <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                {formErrors.password}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #CCCCCC",
                backgroundColor: "#F9F9F9",
              }}
            />
            {formErrors.confirmPassword && (
              <div style={{ color: "#FF6F61", fontSize: "12px" }}>
                {formErrors.confirmPassword}
              </div>
            )}
          </div>

          {/* Privacy Checkbox */}
          <div className={`${styles.policyRow}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
            {/* Checkbox + Policies */}
            <label
              style={{
                fontSize: "14px",
                color: "#BAB8B8",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                type="checkbox"
                name="agreeToPolicy"
                checked={formData.agreeToPolicy}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
              />
              By clicking you accept our{" "}
              <span>
                <a
                  href={RoutePaths.TermsAndCondition}
                  style={{
                    color: "#479BE8",
                    textDecoration: "underline",
                    marginLeft: "4px",
                  }}
                >
                  Terms and Condition
                </a>{" "}
                and{" "}
                <a
                  href={RoutePaths.PrivacyPolicy}
                  style={{
                    color: "#479BE8",
                    textDecoration: "underline",
                    marginLeft: "4px",
                  }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Forgot Password */}
            <a
              href={RoutePaths.ForgotPassword}
              style={{
                fontSize: "14px",
                color: "#479BE8",
                textDecoration: "underline",
                marginLeft: "15px",
                whiteSpace: "nowrap",
              }}
            >
              Forgot Password?
            </a>

            {/* Error (will span full width below) */}
            {formErrors.agreeToPolicy && (
              <div
                className="block"
                style={{
                  color: "#FF6F61",
                  fontSize: "12px",
                  width: "100%",
                  marginTop: "8px",
                }}
              >
                {formErrors.agreeToPolicy}
              </div>
            )}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: "#479BE8",
              color: "#FFFFFF",
              padding: "12px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "5px",
              width: "100%",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#071D6A";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#479BE8";
            }}
          >
            {text}
          </button>
          {/* Register with Google Button */}
          {/* <button
            type="button"
            onClick={() => alert("Google Sign-in coming soon 🚀")}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#444",
              padding: "12px 20px",
              border: "1px solid #CCCCCC",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.borderColor = "#999";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.borderColor = "#CCCCCC";
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: "20px", height: "20px" }}
            />
            Register with Google
          </button> */}

        </form>
      </div>

    </div>
  );
};

export default SignUp;
