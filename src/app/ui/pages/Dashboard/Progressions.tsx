import React from 'react';

type Milestone = {
    title: string;
    achieved: boolean;
};

const milestones: Milestone[] = [
    { title: 'Onboarding Process', achieved: true },
    { title: 'First Week Review', achieved: true },
    { title: 'First Month Review', achieved: false },
    { title: 'Training Completed', achieved: false },
];

const Progression: React.FC = () => {
    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            {/* <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Progression</h1> */}
            {milestones.map((m, i) => (
                <div
                    key={i}
                    style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: m.achieved ? '#ECFDF5' : '#FEF2F2',
                        marginBottom: '12px',
                    }}
                >
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: m.achieved ? '#065F46' : '#991B1B' }}>
                        {m.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>{m.achieved ? 'Completed' : 'Pending'}</p>
                </div>
            ))}
        </div>
    );
};

export default Progression;