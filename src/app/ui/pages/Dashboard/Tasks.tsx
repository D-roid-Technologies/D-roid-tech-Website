import React, { useState } from 'react';

type TaskStatus = 'not_started' | 'ongoing' | 'completed';

type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
};

const initialTasks: Task[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    description: `Description for task ${i + 1}`,
    status: i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'ongoing' : 'not_started',
}));

const statusLabels: Record<TaskStatus, string> = {
    not_started: 'Not Started',
    ongoing: 'Ongoing',
    completed: 'Completed',
};

const statusColors: Record<TaskStatus, string> = {
    not_started: '#F3F4F6', // Gray
    ongoing: '#DBEAFE',     // Blue
    completed: '#D1FAE5',   // Green
};

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [page, setPage] = useState<Record<TaskStatus, number>>({
        not_started: 1,
        ongoing: 1,
        completed: 1,
    });

    const updateTaskStatus = (id: number, newStatus: TaskStatus) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const renderTasksByStatus = (status: TaskStatus) => {
        const filtered = tasks.filter(task => task.status === status);
        const itemsPerPage = 10;
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const currentPage = page[status];

        const paginated = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        return (
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
                    {statusLabels[status]}
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                    {paginated.length === 0 ? (
                        <p style={{ fontSize: '14px', color: '#4B5563' }}>No tasks.</p>
                    ) : (
                        paginated.map(task => (
                            <div
                                key={task.id}
                                style={{
                                    padding: '16px',
                                    backgroundColor: statusColors[task.status],
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB',
                                }}
                            >
                                <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px', color: '#000000', }}>{task.title}</h3>
                                <p style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>{task.description}</p>
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

                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '8px' }}>
                        <button
                            onClick={() => setPage(prev => ({ ...prev, [status]: Math.max(1, prev[status] - 1) }))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '6px 12px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #D1D5DB',
                                backgroundColor: currentPage === 1 ? '#F3F4F6' : '#FFF',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                color: '#000000'
                            }}
                        >
                            Previous
                        </button>
                        <span style={{ fontSize: '14px', alignSelf: 'center', color: '#000000' }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(prev => ({ ...prev, [status]: Math.min(totalPages, prev[status] + 1) }))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '6px 12px',
                                color: '#000000',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #D1D5DB',
                                backgroundColor: currentPage === totalPages ? '#F3F4F6' : '#FFF',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '24px' }}>
            {renderTasksByStatus('not_started')}
            {renderTasksByStatus('ongoing')}
            {renderTasksByStatus('completed')}
        </div>
    );
};

export default Tasks;
