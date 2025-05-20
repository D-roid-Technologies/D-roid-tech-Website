import React from 'react';

type Training = {
    id: number;
    title: string;
    description: string;
    date: string;
};

const trainings: Training[] = [
    { id: 1, title: 'Workplace Safety', description: 'Learn about safety protocols.', date: '2025-05-22' },
    { id: 2, title: 'Time Management', description: 'Strategies to improve productivity.', date: '2025-06-01' },
];

const Trainings: React.FC = () => {
    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Available Trainings</h1>
            {trainings.map(t => (
                <div key={t.id} style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#fff', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{t.title}</h2>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '6px' }}>{t.description}</p>
                    <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Scheduled: {t.date}</p>
                </div>
            ))}
        </div>
    );
};

export default Trainings;