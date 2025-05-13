import React, { useEffect, useState } from 'react';
import { FaUsers, FaArrowLeft } from 'react-icons/fa';
import { RoutePaths } from '../../../routes/Index';
import { useNavigate } from 'react-router-dom';
import { RootState, store } from '../../../redux/Store';
import { addLocation } from '../../../redux/slices/Location';
import { useSelector } from 'react-redux';
import { LocationState } from '../../../utils/Types';
import { authService } from '../../../redux/configuration/auth.service';
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

interface FormData {
  userType: string;
  uniqueId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToPolicy: boolean;
  initials: string;
  phone: string;
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
};

const SignUp: React.FunctionComponent = () => {
  const [text, setText] = useState<any>("Sign Up");
  const userLocation: LocationState = useSelector((state: RootState) => state.location)
  const [formData, setFormData] = useState<FormData>({
    middleName: '',
    userType: '',
    uniqueId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToPolicy: false,
    initials: "",
    phone: "",
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
              console.error("User denied location access. Max retries reached.");
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
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    let errors: FormErrors = {};
    let isValid = true;

    if (!formData.userType) {
      errors.userType = 'Please select a user type.';
      isValid = false;
    }

    if (formData.userType === 'Staff' && !formData.uniqueId.trim()) {
      errors.staffId = 'Staff ID is required for staff users.';
      isValid = false;
    }

    if (!formData.firstName || !regex.name.test(formData.firstName)) {
      errors.firstName = 'First name should only contain letters.';
      isValid = false;
    }

    if (!formData.lastName || !regex.name.test(formData.lastName)) {
      errors.lastName = 'Last name should only contain letters.';
      isValid = false;
    }

    if (!formData.email || !regex.email.test(formData.email)) {
      errors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (!formData.password || !regex.password.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters long and include a number.';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!formData.agreeToPolicy) {
      errors.agreeToPolicy = 'You must agree to the privacy policy.';
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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!validate()) return;
    const generatedId = generateUniqueId(formData.userType.trim());;
    if (!generatedId) {
      toast.error('Invalid user type — could not generate ID. 🚫', {
        style: {
          background: '#ff4d4f',
          color: '#fff',
        },
      });
      return;
    };

    const updatedFormData = {
      ...formData,
      uniqueId: generatedId,
    };
    console.log("Generated ID:", generatedId, updatedFormData);

    await authService.handleUserRegistration(updatedFormData, userLocation).then(() => {
      setText("Creating your D'roid Account");
      const templatePharams = {
        name: updatedFormData.firstName + " " + updatedFormData.lastName,
        title: `Welcome to D'roid Technologies Ltd. We are thrilled to have you join our community. 

        Please confirm your account by clicking on the verification link we sent to your email. For your security, remember never to share your password with anyone.

        At D'roid Technologies, we value innovation, creativity and freedom. If you have any questions or need assistance, don't hesitate to reach out - we're here to help.

        We look forward to achieving great things together`,
        email: updatedFormData.email,
      }
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templatePharams, PUBLIC_KEY)
        .then(
          (result) => {
            toast.success('Email successfully sent!', {
              style: {
                background: '#4BB543',
                color: '#fff',
              },
            });
          },
          (error) => {
            toast.error('Error sending email 🚫', {
              style: {
                background: '#ff4d4f',
                color: '#fff',
              },
            });
          }
        );
      setTimeout(() => {
        navigate(RoutePaths.DashBoard)
      }, 4000)
    }).catch((error) => {
      setText("Sign Up");
      setFormErrors({ ...formErrors, email: error.message });
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#F9F9F9',
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: '1',
          backgroundColor: '#071D6A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          position: 'relative',
        }}
      >
        <a
          href="/"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* @ts-ignore */}
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
        </a>

        {/* @ts-ignore */}
        <FaUsers style={{ fontSize: '120px', color: '#FFFFFF' }} />
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: '1',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px',
          position: 'relative',
        }}
      >
        {/* Top Links */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          gap: '20px',
        }}>
          <a href={RoutePaths.StaffLogin} style={{ color: '#479BE8', textDecoration: 'none', fontSize: '16px' }}>
            Staff Login
          </a>
        </div>

        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}>
          <a href={RoutePaths.MemberLogin} style={{ color: '#479BE8', textDecoration: 'none', fontSize: '16px' }}>
            Member Login
          </a>
        </div>

        <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#071D6A', fontWeight: '800' }}>
          Join the D'roid Community
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', color: '#BAB8B8' }}>
          Connect with other developers, learn together, and build amazing things!
        </p>

        <form onSubmit={handleSubmit}>
          {/* User Type Dropdown */}
          <div style={{ marginBottom: '15px' }}>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F9F9F9',
                color: formData.userType ? '#000' : '#BAB8B8',
              }}
            >
              <option value="">Select User Type</option>
              <option value="Staff">Staff</option>
              <option value="Organisation">Organisation</option>
              <option value="Member">Member</option>
            </select>
            {formErrors.userType && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.userType}</div>
            )}
          </div>

          {/* Staff ID Input (only if userType is Staff) */}
          {formData.userType === 'Staff' && (
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="uniqueId"
                placeholder="Unique ID"
                value={formData.uniqueId}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #CCCCCC',
                  backgroundColor: '#F9F9F9',
                }}
              />
              {formErrors.staffId && (
                <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.staffId}</div>
              )}
            </div>
          )}

          {/* Other Fields (firstName, lastName, etc.) */}
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F9F9F9',
              }}
            />
            {formErrors.firstName && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.firstName}</div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F9F9F9',
              }}
            />
            {formErrors.lastName && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.lastName}</div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F9F9F9',
              }}
            />
            {formErrors.email && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.email}</div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F9F9F9',
              }}
            />
            {formErrors.password && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.password}</div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#F9F9F9',
              }}
            />
            {formErrors.confirmPassword && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.confirmPassword}</div>
            )}
          </div>

          {/* Privacy Checkbox */}
          {/* Privacy Checkbox and Forgot Password */}
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <label style={{ fontSize: '14px', color: '#BAB8B8', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="agreeToPolicy"
                checked={formData.agreeToPolicy}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
              />
              By clicking you accept our{' '} <a href={RoutePaths.TermsAndCondition} style={{ color: '#479BE8', textDecoration: 'underline', marginLeft: '4px' }}>
                Terms and Condition
              </a> {" "} and {" "}
              <a href={RoutePaths.PrivacyPolicy} style={{ color: '#479BE8', textDecoration: 'underline', marginLeft: '4px' }}>
                Privacy Policy
              </a>
            </label>

            <a href={RoutePaths.ForgotPassword} style={{ fontSize: '14px', color: '#479BE8', textDecoration: 'underline' }}>
              Forgot Password?
            </a>

            {formErrors.agreeToPolicy && (
              <div style={{ color: '#FF6F61', fontSize: '12px', width: '100%', marginTop: '8px' }}>
                {formErrors.agreeToPolicy}
              </div>
            )}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: '#479BE8',
              color: '#FFFFFF',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#071D6A';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#479BE8';
            }}
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
