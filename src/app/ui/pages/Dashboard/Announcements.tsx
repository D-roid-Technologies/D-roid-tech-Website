import React from 'react';

type Announcement = {
    id: number;
    title: string;
    message: string;
    date: string;
};

const announcements: Announcement[] = [
    { id: 1, title: 'System Maintenance', message: 'Scheduled maintenance this Friday at 10 PM.', date: '2025-05-15' },
    { id: 2, title: 'New Policy Update', message: 'Please review the updated attendance policy.', date: '2025-05-12' },
];

const Announcements: React.FC = () => {
    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Announcements</h1>
            {announcements.map(a => (
                <div key={a.id} style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{a.title}</h2>
                    <p style={{ fontSize: '14px', color: '#4B5563', margin: '8px 0' }}>{a.message}</p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{a.date}</p>
                </div>
            ))}
        </div>
    );
};

export default Announcements;