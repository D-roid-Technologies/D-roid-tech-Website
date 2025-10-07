import React, { useState } from "react";
import PayStackPop from "@paystack/inline-js";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ChessRegistration: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

    const SERVICE_ID = "service_o1jbklr";
    const TEMPLATE_ID = "template_p8h58ur";
    const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

    // form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        rating: "",
        lichess: "",
        age: "",
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

    const generateReferenceNumber = (): string => {
        const prefix = "DT";
        const timestamp = Date.now().toString(36); // Base36 for compact form
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        const generatedRef = generateReferenceNumber();
        setReferenceNumber(generatedRef);
        e.preventDefault();

        if (!formData.email) {
            alert("Please enter a valid email!");
            return;
        }

        const payStack = new PayStackPop();
        payStack.newTransaction({
            key: "pk_live_d2b967eddda456841f504b85549767fc33cc9fd4",
            // key: "pk_test_db0145199289f83c428d57cf70755142bb0b8b28", // replace with your own key
            email: formData.email,
            amount: 1000 * 100, // Paystack expects amount in Kobo
            onSuccess: (res: any) => {
                // console.log("Payment success:", res);
                const updatedFormData = {
                    ...formData,
                    referenceNumber: referenceNumber,
                };
                const templatePharams = {
                    name: updatedFormData.firstName,
                    title: `Thank You for Registering! We're thrilled to have you join the Clash of Kings Chess Competition.  

                    Your registration has been successfully submitted, and we’re excited to see your skills on the board! Our team will contact you via email with further details, including the competition schedule and venue information.  

                    In the meantime:  
                    • Ensure your contact details are up-to-date.  
                    • Check your email (and spam folder) regularly for updates from us.  
                    • Keep practicing to sharpen your strategies—you’ll need them!

                    Your Details:
                    • First Name: ${updatedFormData.firstName}.
                    • Last Name: ${updatedFormData.lastName}.
                    • Email: ${updatedFormData.email}.
                    • Rating: ${updatedFormData.rating}.
                    • Username: ${updatedFormData.lichess}.
                    • Age: ${updatedFormData.age}.

                    At D'roid Technologies, we believe in learning, competing, and growing together. If you have any questions or need support, don’t hesitate to reach out we’re here to help.  

                    We can’t wait to witness the battles, the brilliance, and crown the Chess King 2025!`,

                    email: updatedFormData.email,
                }
                emailjs
                    .send(SERVICE_ID, TEMPLATE_ID, templatePharams, PUBLIC_KEY)
                    .then(
                        (result) => {
                            toast.success(`Payment successful! Welcome ${formData.firstName} ${formData.lastName} to Clash of Kings - Chess Competition [2025/2026] 🎉`, {
                                style: {
                                    background: '#4BB543',
                                    color: '#fff',
                                },
                            });
                            setFormData({
                                firstName: "",
                                lastName: "",
                                email: "",
                                rating: "",
                                lichess: "",
                                age: "",
                            })
                        },
                        (error) => {
                            toast.error(`Error sending email ${error} `, {
                                style: {
                                    background: '#ff4d4f',
                                    color: '#fff',
                                },
                            });
                        }
                    );
            },
            onCancel: () => {
                console.log("Payment cancelled");
                toast.error(`Payment was cancelled.`, {
                    style: {
                        background: '#ff4d4f',
                        color: '#fff',
                    },
                });
                // alert("❌ Payment was cancelled.");
            },
            onError: (error: any) => {
                console.log("Payment error:", error);
                toast.error(`⚠️ Payment error: ${error.message}`, {
                    style: {
                        background: '#ff4d4f',
                        color: '#fff',
                    },
                });
                // alert(`⚠️ Payment error: ${error.message}`);
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

                    {/* First Name */}
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

                    {/* Last Name */}
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

                    {/* Email */}
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

                    {/* Rating */}
                    <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontWeight: "bold" }}>
                            Rating (e.g., FIDE, National, or Estimated)
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            placeholder="Enter your chess rating"
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

                    {/* Lichess Username */}
                    <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontWeight: "bold" }}>
                            Lichess Username
                        </label>
                        <input
                            type="text"
                            name="lichess"
                            value={formData.lichess}
                            onChange={handleChange}
                            placeholder="Enter your lichess.org username"
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

                    {/* Age */}
                    <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontWeight: "bold" }}>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="6"
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