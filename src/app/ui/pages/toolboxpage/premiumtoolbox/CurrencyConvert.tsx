import React from "react";

interface ComponentProps {
  onClose: () => void;
}

const CurrencyConvert: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div>CurrencyConvert</div>;
};

export default CurrencyConvert;
