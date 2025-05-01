import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../redux/configuration/auth.service';
import { RoutePaths } from '../../../routes/Index';

const ForgotPassword: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    } else {
      await authService.handlePasswordReset(email).then(() => {
        setError('');
        setSubmitted(true);
        navigate(RoutePaths.JoinOurCommunity)
      }).catch(() => {
        alert(`There was an error resetting your password using ${email}`)
      })
    }
    // You would typically make an API call here
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
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Login
        </a>

        <h1 style={{ color: '#FFFFFF', fontSize: '36px', textAlign: 'center' }}>
          Forgot Password?
        </h1>
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
        }}
      >
        <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#071D6A', fontWeight: '800' }}>
          Reset Your Password
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '30px', color: '#BAB8B8' }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        {submitted ? (
          <div style={{ color: '#479BE8', fontSize: '18px' }}>
            A reset link has been sent to your email!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #CCCCCC',
                  backgroundColor: '#F9F9F9',
                }}
              />
              {error && (
                <div style={{ color: '#FF6F61', fontSize: '12px', marginTop: '8px' }}>
                  {error}
                </div>
              )}
            </div>

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
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
