import React, { useState } from 'react';

type Training = {
    id: number;
    title: string;
    description: string;
    scheduledDate: string;
    completed: boolean;
    completedDate?: string;
};

const initialTrainings: Training[] = [
    {
        id: 1,
        title: 'Workplace Safety',
        description: 'Learn about safety protocols.',
        scheduledDate: '2025-05-22',
        completed: true,
        completedDate: '2025-05-22',
    },
    {
        id: 2,
        title: 'Time Management',
        description: 'Strategies to improve productivity.',
        scheduledDate: '2025-06-01',
        completed: false,
    },
    {
        id: 3,
        title: 'Remote Work',
        description: 'Best practices for working effectively from home or any remote location.',
        scheduledDate: '2025-06-05',
        completed: false,
    },
    {
        id: 4,
        title: 'Professional Speaking',
        description: 'Improve your public speaking and presentation skills.',
        scheduledDate: '2025-06-10',
        completed: false,
    },
    {
        id: 5,
        title: 'Conflict Resolution',
        description: 'Learn techniques to manage and resolve workplace conflicts.',
        scheduledDate: '2025-06-15',
        completed: false,
    },
    {
        id: 6,
        title: 'Time Management',
        description: 'Strategies to prioritize tasks and manage your time efficiently.',
        scheduledDate: '2025-06-20',
        completed: false,
    },
    {
        id: 7,
        title: 'Team Collaboration',
        description: 'Effective ways to collaborate and communicate within a team.',
        scheduledDate: '2025-06-25',
        completed: false,
    }
];

const Trainings: React.FC = () => {
    const [trainings, setTrainings] = useState<Training[]>(initialTrainings);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(trainings.length / itemsPerPage);

    // Get trainings for current page
    const currentTrainings = trainings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handler for page change
    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const markCompleted = (id: number) => {
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
        setTrainings((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, completed: true, completedDate: today }
                    : t
            )
        );
    };

    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            {currentTrainings.map((t) => (
                <div
                    key={t.id}
                    style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: t.completed ? '#ECFDF5' : '#FEF2F2',
                        marginBottom: '12px',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: t.completed ? '#065F46' : '#991B1B',
                        }}
                    >
                        {t.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        {t.completed ? `Completed on ${t.completedDate}` : 'Pending'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                        Scheduled: {t.scheduledDate}
                    </p>
                    {!t.completed && (
                        <button
                            onClick={() => markCompleted(t.id)}
                            style={{
                                marginTop: '8px',
                                padding: '8px 12px',
                                backgroundColor: '#2563EB',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Mark as Completed
                        </button>
                    )}
                </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '8px', color: "#000000" }}>
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 12px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            color: "#000000",
                            backgroundColor: currentPage === 1 ? '#f3f4f6' : '#fff',
                        }}
                    >
                        Previous
                    </button>

                    <span style={{ padding: '8px 12px', alignSelf: 'center' }}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 12px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            color: "#000000",
                            backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#fff',
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Trainings;
