import React, { useState } from "react";
import "./PricingCalclator.css";

type Service = {
  category: string;
  options: { name: string; price: number }[];
};

const services: Service[] = [
  {
    category: "Software Development",
    options: [
      { name: "Frontend Development", price: 1000 },
      { name: "Backend Development", price: 1200 },
      { name: "Database & Cloud", price: 800 },
      { name: "Cross-Platform Apps", price: 1500 },
    ],
  },
  {
    category: "Tech Training",
    options: [
      { name: "Frontend Training", price: 600 },
      { name: "Backend Training", price: 700 },
      { name: "Fullstack Bootcamp", price: 900 },
    ],
  },
  {
    category: "Animation Creation",
    options: [
      { name: "Character Modelling", price: 1100 },
      { name: "3D Animation", price: 1400 },
      { name: "Motion Graphics", price: 1000 },
    ],
  },
  {
    category: "Tech Consultant Services",
    options: [
      { name: "Architecture Review", price: 1300 },
      { name: "Cloud Strategy", price: 1200 },
      { name: "Security Audit", price: 1000 },
    ],
  },
];

const PricingCalculator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: number;
  }>({});
  const [discount, setDiscount] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [total, setTotal] = useState<number | null>(null);

  const handleQuantityChange = (serviceName: string, quantity: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: quantity,
    }));
  };

  const calculateTotal = () => {
    let subtotal = 0;
    services.forEach((service) => {
      service.options.forEach((option) => {
        const qty = selectedServices[option.name] || 0;
        subtotal += option.price * qty;
      });
    });

    const disc = parseFloat(discount) || 0;
    const tax = parseFloat(taxRate) || 0;

    const discounted = subtotal - subtotal * (disc / 100);
    const taxed = discounted + discounted * (tax / 100);
    setTotal(taxed);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Service Pricing Calculator</h2>

      {services.map((service) => (
        <div key={service.category} style={styles.category}>
          <h3 style={styles.subTitle}>{service.category}</h3>
          {service.options.map((option) => (
            <div key={option.name} style={styles.serviceRow}>
              <label style={styles.label}>
                {option.name} (${option.price})
              </label>
              <input
                type="number"
                min={0}
                placeholder="Qty"
                value={selectedServices[option.name] || ""}
                onChange={(e) =>
                  handleQuantityChange(
                    option.name,
                    parseInt(e.target.value) || 0
                  )
                }
                style={styles.input}
              />
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <div className="discount-input-container">
          <label style={styles.label}>Discount (%)</label>
          <input
            type="number"
            value={discount}
             placeholder="Qty"
            onChange={(e) => setDiscount(e.target.value)}
            style={styles.input}
          />
        </div>
        <div className="discount-input-container">
        <label style={styles.label}>Tax Rate (%)</label>
        <input
          type="number"
          value={taxRate}
           placeholder="Qty"
          onChange={(e) => setTaxRate(e.target.value)}
          style={styles.input}
        />
        </div>
      </div>

      <button onClick={calculateTotal} style={styles.button}>
        Calculate Total
      </button>

      {total !== null && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "16px",
            textAlign: "center",
            color: "#000000",
          }}
        >
          Total Estimated Cost: ${total.toFixed(2)}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center" as const, // Use 'as const' for literal values
    marginBottom: 30, // Use number instead of "30px"
    color: "#071D6A",
    fontSize: 24, // Use number instead of "24px"
  },
  subTitle: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "18px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  category: {
    marginBottom: "20px",
  },
  serviceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#000000",
  },
  label: {
    flex: "1",
    marginRight: "10px",
    fontSize: "14px",
    color: "#000000",
  },
  input: {
    width: "100px",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#071D6A",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  total: {
    marginTop: "30px",
    fontSize: "18px",
    textAlign: "center",
    color: "#333",
  },
};

export default PricingCalculator;
