import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const CurrencyConvert: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div style={{ color: "#333" }}>CurrencyConvert</div>;
};

export default CurrencyConvert;
