import React from 'react'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h3 style={{ color: '#071D6A' }}>{title}</h3>
            {children}
        </div>
    );
}

export default Section