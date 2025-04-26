// @ts-nocheck 
import React, { useState } from 'react';
import { FaUsers, FaArrowLeft } from 'react-icons/fa';
import { RoutePaths } from '../../../routes/Index';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../../../../firebase'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

interface FormData {
  userType: string;
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToPolicy: boolean;
};

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

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    userType: '',
    staffId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToPolicy: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});


  const regex = {
    name: /^[A-Za-z]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
  };

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!formData.userType) {
      errors.userType = 'Please select a user type.';
      isValid = false;
    }

    if (formData.userType === 'Staff' && !formData.staffId.trim()) {
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

  const navigate = useNavigate();

  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (validate()) {
        const auth = getAuth(); // Initialize auth
  
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            const user = userCredential.user;
            
            // Update profile information
            updateProfile(user, {
              displayName: `${formData.firstName} ${formData.lastName}`,
            }).then(() => {
              console.log('Profile updated!');
            });
  
            // Send verification email
            sendEmailVerification(user)
              .then(() => {
                console.log('Verification email sent!');
              })
              .catch((error) => {
                console.error('Error sending verification email:', error);
              });
  
            // Redirect to login page
            navigate(RoutePaths.DashBoard);
          })
          .catch((error) => {
            console.error('Error creating user:', error.message);
            setFormErrors({ ...formErrors, email: error.message });
          });
      }
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
          {/* ts-nocheck */}
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
        </a>

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
                name="staffId"
                placeholder="Staff ID"
                value={formData.staffId}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
