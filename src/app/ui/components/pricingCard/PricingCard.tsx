import React, { useState } from 'react';

type PricingCardProps = {
  title: string;
  offers: string[];
  price: string;
};

const PricingCard: React.FC<PricingCardProps> = ({ title, offers, price }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  return (
    <div
      style={{
        borderRadius: '12px',
        padding: '1.5rem',
        color: '#fff',
        transition: 'all 0.3s ease',
        background: selected
          ? 'linear-gradient(135deg, #1e3a8a 20%, #6b21a8 80%)'
          : '#1e293b',
        boxShadow: selected ? '0 8px 24px rgba(107, 33, 168, 0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        maxWidth: '300px',
        margin: '1rem auto',
      }}
    >
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{title}</h3>

      <ul style={{ listStyleType: 'disc', paddingLeft: '1rem', marginBottom: '1rem' }}>
        {offers.map((offer, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {offer}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{price}</p>

      <button
        onClick={handleSelect}
        style={{
          backgroundColor: selected ? '#fff' : '#2563eb',
          color: selected ? '#1e3a8a' : '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.5rem 1rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {selected ? 'Selected' : 'Select Plan'}
      </button>
    </div>
  );
};

export default PricingCard;
