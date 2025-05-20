import React, { useState } from 'react';

const SayIt: React.FC = () => {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (message.trim()) {
            console.log('Submitted complaint:', message);
            setSubmitted(true);
            setMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Say It</h1>
            <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '12px' }}>
                Share any concerns, suggestions, or complaints. We value your voice.
            </p>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                rows={5}
                style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '12px',
                }}
            />
            <button
                onClick={handleSubmit}
                style={{
                    padding: '10px 16px',
                    backgroundColor: '#2563EB',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                }}
            >
                Submit
            </button>
            {submitted && <p style={{ marginTop: '12px', color: 'green', fontSize: '14px' }}>Thank you for your feedback!</p>}
        </div>
    );
};

export default SayIt;