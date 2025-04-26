// @ts-nocheck

import React, { useState } from 'react';
import { FaUsers, FaArrowLeft } from 'react-icons/fa';

const StaffLogin = () => {
    const [formData, setFormData] = useState({
        staffId: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors: any = {};
        let isValid = true;

        if (!formData.staffId.trim()) {
            errors.staffId = 'Staff ID is required.';
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required.';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Staff login submitted', formData);
            // Proceed with login logic
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
                <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#071D6A', fontWeight: '800' }}>
                    Staff Login
                </h2>
                <p style={{ fontSize: '18px', marginBottom: '30px', color: '#BAB8B8' }}>
                    Welcome back! Please login to your account.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Staff ID Input */}
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

                    {/* Password Input */}
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
                        Login
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/forgot-password" style={{ color: '#479BE8', textDecoration: 'none', fontSize: '14px' }}>
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StaffLogin;
