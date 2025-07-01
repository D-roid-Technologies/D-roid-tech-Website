import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteThisTask, updateTask } from '../../../redux/slices/scheduleTask';
import { RootState } from '../../../redux/Store';
import { Task, UserRef, } from '../../../utils/Types';
import {
    EditIcon,
    DeleteIcon
} from '../../components/dashboard-card/Icons';

const CreateTasks: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const tasks = useSelector((state: RootState) => state.scheduleTask.tasks);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDesc, setEditingDesc] = useState('');

    const [type, setType] = useState('task');
    const [category, setCategory] = useState('work');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('pending');
    const [groupId, setGroupId] = useState('');
    const [phaseId, setPhaseId] = useState('');
    const [boardColumn, setBoardColumn] = useState('');
    const [tags, setTags] = useState('');
    const [estimatedHours, setEstimatedHours] = useState<number | ''>('');
    const [actualHours, setActualHours] = useState<number | ''>('');
    const [dueDays, setDueDays] = useState<number | ''>('');
    const [reminderDays, setReminderDays] = useState<number | ''>('');
    const [recurrencePattern, setRecurrencePattern] = useState('custom');
    const [customRecurrenceRule, setCustomRecurrenceRule] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [latitude, setLatitude] = useState<number | ''>('');
    const [longitude, setLongitude] = useState<number | ''>('');
    const [score, setScore] = useState<number | ''>('');
    const [feedback, setFeedback] = useState('');
    const [linkedResourceTitle, setLinkedResourceTitle] = useState('');
    const [linkedResourceUrl, setLinkedResourceUrl] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockReason, setBlockReason] = useState('');



    const createTask = () => {
        if (!title.trim()) return;

        const now = new Date().toISOString();
        const userRef: UserRef = {
            id: user.uniqueId,
            name: `${user.firstName}, ${user.lastName}`,
            email: user.email,
        };

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            description: desc.trim(),
            type: 'task',
            status: 'pending',
            priority: 'medium',
            category: 'work', // e.g., 'work', 'personal', 'health', etc.
            groupId: 'group-123', // replaces projectId
            boardColumn: 'To Do',
            phaseId: 'phase-456', // replaces sprintId
            parentTaskId: undefined,
            subtasks: [],
            dependencies: [],
            dependents: [],
            tags: ['urgent', 'frontend'],
            checklist: [
                { id: 'chk-1', title: 'Initial setup', checked: false },
                { id: 'chk-2', title: 'Approval from QA', checked: false },
            ],
            assignee: userRef,
            collaborators: [userRef],
            reporter: userRef,
            comments: [],
            attachments: [],
            estimatedHours: 4,
            actualHours: 0,
            startDate: now,
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 days
            completedAt: undefined,
            reminderAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // +1 day
            recurring: false,
            recurrencePattern: 'custom',
            customRecurrenceRule: '',
            location: {
                address: '123 Dev Street, Silicon Valley',
                latitude: 37.7749,
                longitude: -122.4194,
            },
            isPrivate: false,
            isBlocked: false,
            blockReason: '',
            score: 5,
            feedback: '',
            linkedResources: [
                {
                    title: 'Design Spec',
                    url: 'https://example.com/specs/design',
                },
            ],
            auditTrail: [],
            createdBy: userRef,
            dateCreated: now,
            dateModified: now,
            dateDeleted: undefined,
        };


        dispatch(addTask(newTask));
        setTitle('');
        setDesc('');

        console.log(newTask);
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
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

                <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
                    <option value="task">Task</option>
                    <option value="event">Event</option>
                    <option value="reminder">Reminder</option>
                </select>

                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="finance">Finance</option>
                    <option value="other">Other</option>
                </select>

                <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                </select>

                <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="archived">Archived</option>
                    <option value="on_hold">On Hold</option>
                    <option value="reopened">Reopened</option>
                </select>

                <input
                    type="text"
                    placeholder="Group ID"
                    value={groupId}
                    onChange={e => setGroupId(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Phase ID"
                    value={phaseId}
                    onChange={e => setPhaseId(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Board Column"
                    value={boardColumn}
                    onChange={e => setBoardColumn(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Estimated Hours"
                    value={estimatedHours}
                    onChange={e => setEstimatedHours(Number(e.target.value))}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Actual Hours"
                    value={actualHours}
                    onChange={e => setActualHours(Number(e.target.value))}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Due in (days)"
                    value={dueDays}
                    onChange={e => setDueDays(Number(e.target.value))}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Reminder in (days)"
                    value={reminderDays}
                    onChange={e => setReminderDays(Number(e.target.value))}
                    style={inputStyle}
                />

                <select value={recurrencePattern} onChange={e => setRecurrencePattern(e.target.value)} style={inputStyle}>
                    <option value="custom">Custom</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>

                <input
                    type="text"
                    placeholder="Custom Recurrence Rule (iCal RRULE)"
                    value={customRecurrenceRule}
                    onChange={e => setCustomRecurrenceRule(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Location Address"
                    value={locationAddress}
                    onChange={e => setLocationAddress(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={e => setLatitude(Number(e.target.value))}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={e => setLongitude(Number(e.target.value))}
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Score"
                    value={score}
                    onChange={e => setScore(Number(e.target.value))}
                    style={inputStyle}
                />

                <textarea
                    placeholder="Feedback"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    style={{ ...inputStyle, height: '60px' }}
                />

                <input
                    type="text"
                    placeholder="Linked Resource Title"
                    value={linkedResourceTitle}
                    onChange={e => setLinkedResourceTitle(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="url"
                    placeholder="Linked Resource URL"
                    value={linkedResourceUrl}
                    onChange={e => setLinkedResourceUrl(e.target.value)}
                    style={inputStyle}
                />

                <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={e => setIsPrivate(e.target.checked)}
                    />
                    Private Task
                </label>

                <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={isBlocked}
                        onChange={e => setIsBlocked(e.target.checked)}
                    />
                    Blocked
                </label>

                {isBlocked && (
                    <input
                        type="text"
                        placeholder="Reason for blocking"
                        value={blockReason}
                        onChange={e => setBlockReason(e.target.value)}
                        style={inputStyle}
                    />
                )}

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
                                        {/* <EditIcon /> */}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} style={buttonStyle('#f44336')}>
                                        Delete
                                        {/* <DeleteIcon /> */}
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