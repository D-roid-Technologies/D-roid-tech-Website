import React, { useState } from 'react';

type TaskStatus = 'not_started' | 'ongoing' | 'completed';

type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
};

const initialTasks: Task[] = [
    {
        id: 1,
        title: 'Fill Personal Info',
        description: 'Complete your personal information form.',
        status: 'completed',
    },
    {
        id: 2,
        title: 'Upload Documents',
        description: 'Upload your identification and address proof.',
        status: 'ongoing',
    },
    {
        id: 3,
        title: 'Set Preferences',
        description: 'Indicate your job preferences and availability.',
        status: 'not_started',
    },
];

const statusLabels: Record<TaskStatus, string> = {
    not_started: 'Not Started',
    ongoing: 'Ongoing',
    completed: 'Completed',
};

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const updateTaskStatus = (id: number, newStatus: TaskStatus) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const renderTasksByStatus = (status: TaskStatus) => {
        const filtered = tasks.filter(task => task.status === status);

        return (
            <div style={{ marginBottom: '24px', color: '#000000' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#000000' }}>{statusLabels[status]}</h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                    {filtered.length === 0 ? (
                        <p style={{ color: '#000000', fontSize: '14px' }}>No tasks.</p>
                    ) : (
                        filtered.map(task => (
                            <div
                                key={task.id}
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #E5E7EB',
                                }}
                            >
                                <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>{task.title}</h3>
                                <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>{task.description}</p>
                                <select
                                    value={task.status}
                                    onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                                    style={{
                                        padding: '6px 12px',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {Object.entries(statusLabels).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            <p style={{ fontWeight: '400', marginBottom: '24px', color: '#000000' }}>See all list of tasks here.</p>
            {renderTasksByStatus('not_started')}
            {renderTasksByStatus('ongoing')}
            {renderTasksByStatus('completed')}
        </div>
    );
};

export default Tasks;