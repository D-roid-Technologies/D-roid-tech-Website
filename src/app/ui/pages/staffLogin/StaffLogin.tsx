// @ts-nocheck

import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../../firebase';
import { setUser } from '../../../redux/slices/User';
import { store } from '../../../redux/Store';
import { RoutePaths } from '../../../routes/Index';

const StaffLogin: React.FC<any> = ({ navigation }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors: { email?: string; password?: string } = {};
        let isValid = true;

        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required.';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmitStaff = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password).then(async (res) => {
                const userDocRef = doc(collection(db, "users"), res.user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const fetchedUserData = userDocSnap.data();
                    store.dispatch(setUser(fetchedUserData));
                    navigate(RoutePaths.DashBoard);
                }
            }).catch((err) => {
                console.log(err.message);
                alert(err.message);
            })

            return userCredential
        } else {
            alert("Wrong Validation");
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
                <div
                    onClick={() => navigate(RoutePaths.Signup)}  // Use navigate.goBack()
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: '#FFFFFF',
                        color: '#071D6A',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer', // Add cursor pointer to indicate it's clickable
                    }}
                >
                    {/* You can use an icon if you want */}
                    &#8592;
                </div>

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

                <form onSubmit={handleSubmitStaff}>
                    {/* Email Input */}
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
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
