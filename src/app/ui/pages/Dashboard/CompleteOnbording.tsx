import React from "react";
import { AlertCircle, UserCheck, UserCog } from "lucide-react";
import styles from "./CompleteOnboarding.module.css";

interface CompleteOnboardingProps {
  handleOnboarding: () => void;
  handleUpdateProfile: () => void;
}

export default function CompleteOnboarding({
  handleOnboarding,
  handleUpdateProfile,
}: CompleteOnboardingProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.inner}>
            <div className={styles.iconWrapper}>
              <div className={styles.iconCircle}>
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>

            <div className={styles.textContent}>
              <h3 className={styles.title}>Action Required</h3>
              <p className={styles.description}>
                Gross pay information is missing or incomplete. Please complete
                your onboarding or update your personal profile to generate your
                payslip.
              </p>

              <div className={styles.buttonGroup}>
                <button
                  onClick={handleOnboarding}
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  <UserCheck className="w-4 h-4" />
                  Complete Onboarding
                </button>

                <button
                  onClick={handleUpdateProfile}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  <UserCog className="w-4 h-4" />
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.accent}></div>
      </div>
    </div>
  );
}
