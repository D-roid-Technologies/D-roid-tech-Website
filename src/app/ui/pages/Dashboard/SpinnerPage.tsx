import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import Spinner from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import styles from "./SpinnerPage.module.css";

const SpinnerPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  
  // Get user ID from Redux state
  const userId = user?.uniqueId || user?.email || "guest";

  const handleSpinComplete = (outcome: number, giftAwarded: boolean) => {
    console.log(`Spin complete! Outcome: ${outcome}, Gift awarded: ${giftAwarded}`);
    // You can add additional logic here, such as:
    // - Sending analytics
    // - Updating user profile
    // - Triggering notifications
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.pageContainer}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={handleBackToDashboard}>
        ← Back to Dashboard
      </button>

      {/* Spinner Component */}
      <Spinner userId={userId} onSpinComplete={handleSpinComplete} />

      {/* Additional Info Section */}
      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>How It Works</h3>
          <ul className={styles.infoList}>
            <li>Each registered user gets <strong>one spin</strong></li>
            <li>Land on numbers 1-6 for a chance to win</li>
            <li>Landing on 0 means no reward</li>
            <li>Only the first 5 winners receive gifts</li>
            <li>After all gifts are claimed, the spinner continues but no rewards are given</li>
          </ul>
        </div>

        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Prize Details</h3>
          <div className={styles.prizeInfo}>
            <span className={styles.prizeEmoji}>👕</span>
            <div>
              <p className={styles.prizeName}>Exclusive D'roid T-Shirt</p>
              <p className={styles.prizeDescription}>
                Premium quality branded merchandise for our lucky winners!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerPage;
