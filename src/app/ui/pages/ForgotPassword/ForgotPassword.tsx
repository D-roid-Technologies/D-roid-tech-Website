import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../redux/configuration/auth.service";
import { RoutePaths } from "../../../routes/Index";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    } else {
      await authService
        .handlePasswordReset(email)
        .then(() => {
          setError("");
          setSubmitted(true);
          navigate(RoutePaths.JoinOurCommunity);
        })
        .catch(() => {
          alert(`There was an error resetting your password using ${email}`);
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <a href="/auth/join-our-community" className={styles.backLink}>
          {/* @ts-ignore */}
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Sign Up
        </a>
        <br />
        <h1 className={styles.heading}>Forgot Password?</h1>
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>Reset Your Password</h2>
        <p className={styles.subtext}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        {submitted ? (
          <div className={styles.success}>
            A reset link has been sent to your email!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              {error && <div className={styles.error}>{error}</div>}
            </div>

            <button type="submit" className={styles.button}>
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
