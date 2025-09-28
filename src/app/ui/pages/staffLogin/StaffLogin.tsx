import React, { useState } from "react";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../redux/configuration/auth.service";
import { RoutePaths } from "../../../routes/Index";
import styles from "./StaffLogin.module.css";

const StaffLogin: React.FC<any> = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [text, setText] = useState<string>("Login");

  const isStaff = true;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmitStaff = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    setText("Verifying your credentials...");

    try {
      await authService.handleUserLogin(
        formData.email,
        formData.password,
        isStaff
      );
      setText("Fetching your information...");
      navigate(RoutePaths.DashBoard, { replace: true });
    } catch (err) {
      setText("Login");
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.leftPane}>
        <a href={RoutePaths.JoinOurCommunity} className={styles.backLink}>
          <FaArrowLeft className={styles.icon} /> Back to Sign Up
        </a>
        <FaUsers className={styles.usersIcon} />
      </div>

      {/* Right Side */}
      <div className={styles.rightPane}>
        <h2 className={styles.title}>Staff Login</h2>
        <p className={styles.subtitle}>
          Welcome back! Please login to your Staff account.
        </p>

        <form onSubmit={handleSubmitStaff}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
            {formErrors.email && (
              <div className={styles.errorText}>{formErrors.email}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
            />
            {formErrors.password && (
              <div className={styles.errorText}>{formErrors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#071D6A")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#479BE8")
            }
          >
            {text}
          </button>
        </form>

        <div className={styles.forgotPassword}>
          <a href={RoutePaths.ForgotPassword}>Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
