import React, { useState } from "react";
import PayStackPop from "@paystack/inline-js";

const ChessRegistration: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Please enter a valid email!");
      return;
    }

    const payStack = new PayStackPop();
    payStack.newTransaction({
      key: "pk_test_db0145199289f83c428d57cf70755142bb0b8b28", // use your own key
      email: formData.email,
      amount: 1000 * 100, // Paystack expects amount in Kobo
      onSuccess: (res: any) => {
        console.log("Payment success:", res);
        alert("✅ Payment successful! Welcome to the Chess Competition 🎉");
      },
      onCancel: () => {
        console.log("Payment cancelled");
        alert("❌ Payment was cancelled.");
      },
      onError: (error: any) => {
        console.log("Payment error:", error);
        alert(`⚠️ Payment error: ${error.message}`);
      },
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* Toggle Button */}
      <button
        onClick={toggleForm}
        style={{
          backgroundColor: "#003366",
          color: "#fff",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#002244")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#003366")
        }
      >
        {showForm ? "Cancel" : "Start Your Registration"}
      </button>

      {/* Registration Form */}
      {showForm && (
        <form
          style={{
            marginTop: "20px",
            padding: "20px",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            textAlign: "left",
            color: "#333",
          }}
          onSubmit={handleSubmit}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#003366",
            }}
          >
            Chess Competition Registration
          </h3>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>

          <p
            style={{
              fontWeight: "bold",
              color: "#003366",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Registration Fee: ₦1000
          </p>

          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              marginTop: "15px",
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Submit & Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default ChessRegistration;
