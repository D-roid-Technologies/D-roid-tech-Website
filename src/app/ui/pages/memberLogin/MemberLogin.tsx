import React, { useState } from "react";
import { FaUser, FaArrowLeft } from "react-icons/fa";
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
  const isStaff = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors: any = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = "Member ID is required.";
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
      await authService.handleUserLogin(
        formData.email,
        formData.password,
        isStaff
      );
      setText("Fetching your information...");
      navigate(RoutePaths.DashBoard, { replace: true });
    } catch {
      setText("Login");
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

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
            {formErrors.password && (
              <div className={styles.error}>{formErrors.password}</div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            {text}
          </button>
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
            Login with Google
          </button> */}
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
