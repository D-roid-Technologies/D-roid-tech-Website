import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Assets } from "../../../utils/constant/Assets";
import toast from "react-hot-toast";

// Add this type for your Redux state
interface RootState {
  user: {
    joinDate: string;
    firstName: string;
    lastName: string;
    // ... other user properties
  };
  SignInO: {
    staffDetails: {
      staffStartDate?: string;
    };
  };
}

interface TimeSinceResult {
  months: number;
  days: number;
  hours: number;
}

const Leave: React.FunctionComponent = () => {
  // Get staffStartDate from staff details - this is the only date we use
  const staffStartDate = useSelector(
    (state: RootState) => state.SignInO.staffDetails.staffStartDate
  );
  const firstName = useSelector((state: RootState) => state.user.firstName);

  const [formData, setFormData] = useState({
    startDay: "",
    endDay: "",
    month: "",
    year: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate number inputs for days and year
    if ((name === "startDay" || name === "endDay") && value !== "") {
      // Only allow numbers 1-31 for days
      const dayValue = parseInt(value);
      if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
        return; // Don't update if invalid
      }
    }

    if (name === "year" && value !== "") {
      // Only allow numbers and limit to 4 digits for year
      const yearValue = parseInt(value);
      if (isNaN(yearValue) || value.length > 4) {
        return; // Don't update if invalid
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function timeSinceAccountCreation(creationDateStr: string): TimeSinceResult {
    // Handle different date formats
    let creationDate: Date;

    // Try to parse the date - handle DD/MM/YY format
    if (creationDateStr.includes("/")) {
      const parts = creationDateStr.split("/");
      if (parts.length === 3) {
        // DD/MM/YY or DD/MM/YYYY format
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // Months are 0-indexed in JS Date
        let year = parseInt(parts[2]);

        // Handle 2-digit years (assume 2000s for years < 100)
        if (year < 100) {
          year += 2000;
        }

        creationDate = new Date(year, month, day);
      } else {
        creationDate = new Date(creationDateStr.replace(" ", "T"));
      }
    } else {
      // Try standard ISO format
      creationDate = new Date(creationDateStr.replace(" ", "T"));
    }

    const now = new Date();

    // Check if the date is valid
    if (isNaN(creationDate.getTime())) {
      console.error("Invalid date format:", creationDateStr);
      return {
        months: 0,
        days: 0,
        hours: 0,
      };
    }

    // Total difference in milliseconds
    const diffMs = now.getTime() - creationDate.getTime();

    if (diffMs < 0) {
      // Future date - return 0
      return {
        months: 0,
        days: 0,
        hours: 0,
      };
    }

    // Calculate months, days, and hours more accurately
    let months = 0;
    let days = 0;
    let hours = 0;

    // Start with the creation date
    let tempDate = new Date(creationDate);

    // Count months
    while (tempDate <= now) {
      const nextMonth = new Date(tempDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      if (nextMonth <= now) {
        months++;
        tempDate = nextMonth;
      } else {
        break;
      }
    }

    // Calculate remaining days
    const remainingMs = now.getTime() - tempDate.getTime();
    days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));

    // Calculate remaining hours
    const remainingHoursMs = remainingMs % (1000 * 60 * 60 * 24);
    hours = Math.floor(remainingHoursMs / (1000 * 60 * 60));

    return {
      months,
      days,
      hours,
    };
  }

  // Calculate leave days based on the new logic
  const calculateLeaveDays = (months: number): number => {
    if (months < 6) {
      return 0;
    } else if (months >= 12) {
      return 22;
    } else {
      // Start with 7 days at 6 months
      const baseDays = 7;
      // Calculate additional months beyond 6 months
      const additionalMonths = months - 6;
      // Add 4 days for every 2 additional months
      const additionalDays = Math.floor(additionalMonths / 2) * 4;
      return baseDays + additionalDays;
    }
  };

  // Handle case where staffStartDate is not available
  if (!staffStartDate) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div
          style={{
            backgroundColor: "#FEF2F2",
            padding: "2rem",
            borderRadius: "12px",
            border: "2px solid #FECACA",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              color: "#DC2626",
              marginBottom: "1rem",
              fontSize: "1.125rem",
              fontWeight: "600",
            }}
          >
            Start Date Required
          </h3>
          <p
            style={{
              color: "#7F1D1D",
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
          >
            To calculate your leave eligibility, you need to set your start date
            in the onboarding section.
          </p>
          <div
            style={{
              backgroundColor: "#FEF3C7",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #FCD34D",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                color: "#92400E",
                fontSize: "0.875rem",
                margin: 0,
                fontWeight: "500",
              }}
            >
              📍 <strong>How to set your start date:</strong>
            </p>
            <ol
              style={{
                color: "#92400E",
                fontSize: "0.75rem",
                textAlign: "left",
                margin: "0.5rem 0 0 0",
                paddingLeft: "1.5rem",
              }}
            >
              <li>
                Go to <strong>Personal Info</strong> tab in Onboarding
              </li>
              <li>
                Find the <strong>"Start Date"</strong> field
              </li>
              <li>Enter your employment start date</li>
              <li>
                Click <strong>"Save Personal Info"</strong>
              </li>
            </ol>
          </div>
          <p
            style={{
              color: "#7F1D1D",
              fontSize: "0.75rem",
              fontStyle: "italic",
            }}
          >
            Once you've set your start date, return here to check your leave
            eligibility.
          </p>
        </div>
      </div>
    );
  }

  // Initialize with proper typing
  let result: TimeSinceResult = {
    months: 0,
    days: 0,
    hours: 0,
  };
  let leaveDays = 0;
  let isEligibleForLeave = false;

  try {
    result = timeSinceAccountCreation(staffStartDate);
    leaveDays = calculateLeaveDays(result.months);
    isEligibleForLeave = result.months >= 6;
  } catch (error) {
    // If there's an error with the date, show not eligible message
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div
          style={{
            backgroundColor: "#FEF2F2",
            padding: "2rem",
            borderRadius: "12px",
            border: "2px solid #FECACA",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              color: "#DC2626",
              marginBottom: "1rem",
              fontSize: "1.125rem",
              fontWeight: "600",
            }}
          >
            You are not eligible for leave
          </h3>
          <p
            style={{
              color: "#7F1D1D",
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
          >
            Your start date is invalid or you haven't completed the required 6
            months of service.
          </p>
        </div>
      </div>
    );
  }

  // If the start date results in NaN values (invalid date), show not eligible
  if (isNaN(result.months) || isNaN(result.days)) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div
          style={{
            backgroundColor: "#FEF2F2",
            padding: "2rem",
            borderRadius: "12px",
            border: "2px solid #FECACA",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              color: "#DC2626",
              marginBottom: "1rem",
              fontSize: "1.125rem",
              fontWeight: "600",
            }}
          >
            You are not eligible for leave
          </h3>
          <p
            style={{
              color: "#7F1D1D",
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
          >
            Your start date is invalid or you haven't completed the required 6
            months of service.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !formData.startDay ||
      !formData.endDay ||
      !formData.month ||
      !formData.year
    ) {
      toast.error("Please fill in all leave application fields", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return;
    }

    // Validate day range
    const startDay = parseInt(formData.startDay);
    const endDay = parseInt(formData.endDay);

    if (startDay < 1 || startDay > 31 || endDay < 1 || endDay > 31) {
      toast.error("Please enter valid days (1-31)", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return;
    }

    if (endDay < startDay) {
      toast.error("End day cannot be before start day", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return;
    }

    // Calculate total leave days requested
    const totalDaysRequested = endDay - startDay + 1; // +1 to include both start and end days

    if (totalDaysRequested > leaveDays) {
      toast.error(`You can only apply for maximum ${leaveDays} days of leave`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return;
    }

    if (totalDaysRequested <= 0) {
      toast.error("Please select valid leave dates", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Submitting leave application...", {
      style: { background: "#1890ff", color: "#fff" },
    });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log form data to console
      console.log("=== Leave Application Submitted ===");
      console.log("Leave Details:", {
        startDate: `${formData.startDay} ${formData.month} ${formData.year}`,
        endDate: `${formData.endDay} ${formData.month} ${formData.year}`,
        month: formData.month,
        year: formData.year,
        totalDaysRequested: totalDaysRequested,
        totalLeaveDaysAvailable: leaveDays,
        staffStartDate: staffStartDate,
        appliedAt: new Date().toISOString(),
      });
      console.log("Staff Tenure:", {
        months: result.months,
        days: result.days,
        hours: result.hours,
      });
      console.log("=== End Leave Application ===");

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(
        `Leave application submitted for ${totalDaysRequested} days!`,
        {
          style: { background: "#4BB543", color: "#fff" },
        }
      );

      // Reset form
      setFormData({
        startDay: "",
        endDay: "",
        month: "",
        year: "",
      });
    } catch (error) {
      console.error("Leave application failed:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to submit leave application. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const leaveAvailability = (months: number): JSX.Element => {
    if (months < 6) {
      return (
        <p style={{ color: "#000000", marginBottom: 20 }}>
          You have 0 days of Leave available. You need to complete 6 months to
          be eligible for leave.
        </p>
      );
    } else if (months >= 12) {
      return (
        <p style={{ color: "#000000", marginBottom: 20 }}>
          You have 22 days of Leave available.
        </p>
      );
    } else {
      return (
        <p style={{ color: "#000000", marginBottom: 20 }}>
          You have {leaveDays} days of Leave available.
        </p>
      );
    }
  };

  return (
    <div>
      <p style={{ color: "#000000", marginBottom: 10 }}>
        You have been a staff of {Assets.text.companyName} for {result.months}{" "}
        Months, {result.days} Days
      </p>
      {leaveAvailability(result.months)}

      {/* Show leave calculation explanation */}
      {result.months >= 6 && result.months < 12 && (
        <div
          style={{
            backgroundColor: "#F0F9FF",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #BAE6FD",
          }}
        >
          <p
            style={{
              color: "#0369A1",
              fontSize: "0.875rem",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Leave Calculation: 7 days base + 4 days every 2 months after 6
            months
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Start Day */}
        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#000000",
              fontWeight: "500",
            }}
          >
            Start Day *
          </label>
          <input
            name="startDay"
            type="number"
            min="1"
            max="31"
            placeholder="e.g., 15 (1-31)"
            value={formData.startDay}
            onChange={handleInputChange}
            disabled={!isEligibleForLeave || isSubmitting}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              width: "100%",
              fontSize: "0.875rem",
              backgroundColor: !isEligibleForLeave ? "#F3F4F6" : "#FFFFFF",
              cursor:
                !isEligibleForLeave || isSubmitting ? "not-allowed" : "text",
              color: !isEligibleForLeave ? "#6B7280" : "#000000",
            }}
          />
        </div>

        {/* End Day */}
        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#000000",
              fontWeight: "500",
            }}
          >
            End Day *
          </label>
          <input
            name="endDay"
            type="number"
            min="1"
            max="31"
            placeholder="e.g., 20 (1-31)"
            value={formData.endDay}
            onChange={handleInputChange}
            disabled={!isEligibleForLeave || isSubmitting}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              width: "100%",
              fontSize: "0.875rem",
              backgroundColor: !isEligibleForLeave ? "#F3F4F6" : "#FFFFFF",
              cursor:
                !isEligibleForLeave || isSubmitting ? "not-allowed" : "text",
              color: !isEligibleForLeave ? "#6B7280" : "#000000",
            }}
          />
        </div>

        {/* Month Dropdown */}
        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#000000",
              fontWeight: "500",
            }}
          >
            Month *
          </label>
          <select
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            disabled={!isEligibleForLeave || isSubmitting}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              width: "100%",
              fontSize: "0.875rem",
              backgroundColor: !isEligibleForLeave ? "#F3F4F6" : "#FFFFFF",
              cursor:
                !isEligibleForLeave || isSubmitting ? "not-allowed" : "pointer",
              color: !isEligibleForLeave ? "#6B7280" : "#000000",
            }}
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#000000",
              fontWeight: "500",
            }}
          >
            Year *
          </label>
          <input
            name="year"
            type="number"
            min="2024"
            max="2030"
            placeholder="e.g., 2024 (4 digits)"
            value={formData.year}
            onChange={handleInputChange}
            disabled={!isEligibleForLeave || isSubmitting}
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #D1D5DB",
              width: "100%",
              fontSize: "0.875rem",
              backgroundColor: !isEligibleForLeave ? "#F3F4F6" : "#FFFFFF",
              cursor:
                !isEligibleForLeave || isSubmitting ? "not-allowed" : "text",
              color: !isEligibleForLeave ? "#6B7280" : "#000000",
            }}
          />
        </div>

        {/* Days Calculation Display */}
        {formData.startDay && formData.endDay && (
          <div
            style={{
              backgroundColor: "#F0FDF4",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              border: "1px solid #BBF7D0",
            }}
          >
            <p
              style={{
                color: "#166534",
                fontSize: "0.875rem",
                margin: 0,
                fontWeight: "500",
              }}
            >
              📅 Leave Duration:{" "}
              {parseInt(formData.endDay) - parseInt(formData.startDay) + 1} days
              (from {formData.startDay} to {formData.endDay} {formData.month}{" "}
              {formData.year})
            </p>
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: !isEligibleForLeave ? "#9CA3AF" : "#071D6A",
            color: "#FFFFFF",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: "bold",
            cursor:
              !isEligibleForLeave || isSubmitting ? "not-allowed" : "pointer",
            width: "100%",
            marginTop: "8px",
            opacity: isSubmitting ? 0.7 : 1,
          }}
          disabled={!isEligibleForLeave || isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : !isEligibleForLeave
            ? "Not Eligible for Leave"
            : "Apply for Leave"}
        </button>
      </form>
    </div>
  );
};

export default Leave;
