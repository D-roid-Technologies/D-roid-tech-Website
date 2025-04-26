// @ts-nocheck

import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToPolicy: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToPolicy: '',
  });

  const regex = {
    name: /^[A-Za-z]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = () => {
    let errors: any = {};
    let isValid = true;

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
      errors.password = 'Password must be at least 8 characters long and include a number.';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully');
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
        {/* Back Button */}
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
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <a
            href="/login"
            style={{
              color: '#479BE8',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            Log me in
          </a>
        </div>

        <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#071D6A' }}>
          Join the D'roid Community
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', color: '#BAB8B8' }}>
          Connect with other developers, learn together, and build amazing things!
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
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
              type="password"
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
              type="password"
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
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', color: '#BAB8B8' }}>
              <input
                type="checkbox"
                name="agreeToPolicy"
                checked={formData.agreeToPolicy}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
              />
              I agree to the{' '}
              <a
                href="/privacy-policy"
                style={{ color: '#479BE8', textDecoration: 'underline' }}
              >
                Privacy Policy
              </a>
            </label>
            {formErrors.agreeToPolicy && (
              <div style={{ color: '#FF6F61', fontSize: '12px' }}>{formErrors.agreeToPolicy}</div>
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
