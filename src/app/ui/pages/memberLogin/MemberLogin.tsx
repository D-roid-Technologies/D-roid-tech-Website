import React, { useState } from "react";
import { FaUser, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../redux/configuration/auth.service";
import { RoutePaths } from "../../../routes/Index";
import styles from "./MemberLogin.module.css";

const MemberLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [text, setText] = useState<string>("Login");

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors: any = {};
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

  const handleSubmitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setText("Verifying your credentials...");

    try {
      // Updated: Passing "Member" string for role validation
      await authService.handleUserLogin(
        formData.email,
        formData.password,
        "Member"
      );
      setText("Fetching your information...");
      navigate(RoutePaths.DashBoard, { replace: true });
    } catch {
      setText("Login");
      // Toast errors are handled in authService
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <a href={RoutePaths.JoinOurCommunity} className={styles.backLink}>
          {/* @ts-ignore */}
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Sign Up
        </a>
        {/* @ts-ignore */}
        <FaUser className={styles.icon} />
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>Member Login</h2>
        <p className={styles.subtext}>
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmitMember}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
            {formErrors.email && (
              <div className={styles.error}>{formErrors.email}</div>
            )}
          </div>

          {/* Password Field with Eye Icon */}
          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              style={{ paddingRight: "40px" }} // Added padding for icon space
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "14px",
                cursor: "pointer",
                color: "#BAB8B8",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formErrors.password && (
              <div className={styles.error}>{formErrors.password}</div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            {text}
          </button>
        </form>

        <div className={styles.forgotPasswordLink}>
          <a href={RoutePaths.ForgotPassword} className={styles.link}>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;
