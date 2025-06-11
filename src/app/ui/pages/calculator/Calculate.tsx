import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/Store";
import { UserType } from "../../../utils/Types";
import {
  FaUser,
  FaTasks,
  FaBullhorn,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaCommentDots,
  FaChalkboardTeacher,
  FaChartLine,
  FaBookOpen,
  FaToolbox,
  FaCalculator,
  FaCodeBranch,
  FaStamp,
  FaUserTie,
  FaFilePdf,
  FaMagic,
} from "react-icons/fa";

import { GiCalculator } from "react-icons/gi";

const Calculate = () => {
  const navigate = useNavigate();
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  const staffDetails = useSelector(
    (state: RootState) => state.SignInO.staffDetails
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<null | {
    title: string;
    content: string;
    icon: JSX.Element;
  }>(null);
  const [input, setInput] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const grossPay = parseFloat(staffDetails?.staffGrossPay ?? "0");

  const calculateItems = [
    {
      title: "OhmsLawCalculator",
      content: "Calculate voltage, current, and resistance using Ohm's Law.",
    },
    // {
    //   title: "BMICalculator",
    //   content: "Calculate your Body Mass Index (BMI).",
    // },
    {
      title: "Scientific Calculator",
      description:
        "Efficiently resize and optimize images for any device or platform. Maintain quality while reducing file size for faster loading.",
      icon: FaCalculator({ size: 24 }),
      link: "/calculators/sciencecalculate",
    },
    {
      title: "BMI Calculator",
      description:
        "Transform images between color spaces (RGB, CMYK, HSL) with precise calibration. Perfect for print-ready files and digital displays.",
      icon: GiCalculator({ size: 24 }),
      link: "/calculators/bmicalcute",
    },
  ];

  const handleClear = () => {
    setInput("");
  };

  const handleShowPayslip = () => {};

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            minHeight: "400px",
            padding: "30px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            backgroundColor: "#fafafa",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          {selectedMenuItem === null ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                type="text"
                value={input}
                readOnly
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "20px",
                  textAlign: "right",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  width: "100%",
                  color: "#000000",
                }}
              >
                {[
                  "7",
                  "8",
                  "9",
                  "/",
                  "4",
                  "5",
                  "6",
                  "*",
                  "1",
                  "2",
                  "3",
                  "-",
                  "0",
                  ".",
                  "=",
                  "+",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleButtonClick(item)}
                    style={{
                      padding: "15px",
                      fontSize: "18px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ffffff")
                    }
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  style={{
                    gridColumn: "span 4",
                    padding: "15px",
                    fontSize: "18px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
                {selectedMenuItem?.title}
              </h3>
              <p style={{ fontSize: "16px", color: "#666" }}>
                {selectedMenuItem?.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculate;
