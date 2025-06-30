import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteThisTask, updateTask } from '../../../redux/slices/scheduleTask';
import { RootState } from '../../../redux/Store';
import { Task, UserRef, } from '../../../utils/Types';

const CreateTasks: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const tasks = useSelector((state: RootState) => state.scheduleTask.tasks);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDesc, setEditingDesc] = useState('');

    const createTask = () => {
        if (!title.trim()) return;

        const now = new Date().toISOString();
        const userRef: UserRef = {
            id: user.uniqueId,
            name: user.firstName,
            email: user.email,
        };

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            description: desc.trim(),
            status: 'pending',
            priority: 'medium',
            createdBy: userRef,
            reporter: userRef,
            dateCreated: now,
            dateModified: now,
        };

        dispatch(addTask(newTask));
        setTitle('');
        setDesc('');
    };

    const handleUpdateTask = () => {
        if (!editingTaskId || !editingTitle.trim()) return;

        const now = new Date().toISOString();
        const updatedTask: Task = {
            ...tasks.find(t => t.id === editingTaskId)!,
            title: editingTitle.trim(),
            description: editingDesc.trim(),
            dateModified: now,
        };

        dispatch(updateTask(updatedTask));
        setEditingTaskId(null);
        setEditingTitle('');
        setEditingDesc('');
    };

    const deleteTask = (id: string) => {
        dispatch(deleteThisTask(id));
    };

    return (
        <div style={{ padding: '2rem', background: 'grey', color: '#fff' }}>
            <h2>Your Tasks</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder="Description"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    style={{ ...inputStyle, height: '80px' }}
                />
                <button onClick={createTask} style={buttonStyle('#4CAF50')}>
                    Add Task
                </button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <li key={task.id} style={taskItemStyle}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={e => setEditingTitle(e.target.value)}
                                    style={inputStyle}
                                />
                                <textarea
                                    value={editingDesc}
                                    onChange={e => setEditingDesc(e.target.value)}
                                    style={{ ...inputStyle, height: '60px' }}
                                />
                                <div>
                                    <button onClick={handleUpdateTask} style={buttonStyle('#2196F3')}>
                                        Save
                                    </button>
                                    <button onClick={() => setEditingTaskId(null)} style={buttonStyle('#777')}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <strong>{task.title}</strong>
                                <div>{task.description}</div>
                                <div style={{ marginTop: '8px', display: "flex", justifyContent: "left", gap: 20 }}>
                                    <button
                                        onClick={() => {
                                            setEditingTaskId(task.id);
                                            setEditingTitle(task.title);
                                            setEditingDesc(task.description);
                                        }}
                                        style={buttonStyle('#FF9800')}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} style={buttonStyle('#f44336')}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateTasks;

const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #444',
    background: '#ffffff',
    color: '#000000',
    width: '100%',
};

const buttonStyle = (bgColor: string): React.CSSProperties => ({
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    background: bgColor,
    color: '#fff',
    marginRight: '8px',
});

const taskItemStyle: React.CSSProperties = {
    background: '#000000',
    padding: '12px 16px',
    marginBottom: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};