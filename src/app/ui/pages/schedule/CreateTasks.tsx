import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../../redux/configuration/auth.service';
import { addTask, deleteThisTask, updateTask } from '../../../redux/slices/scheduleTask';
import { RootState } from '../../../redux/Store';
import { ChecklistItem, Task, UserRef, } from '../../../utils/Types';
import {
    EditIcon,
    DeleteIcon
} from '../../components/dashboard-card/Icons';

const CreateTasks: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const tasks = useSelector((state: RootState) => state.scheduleTask.tasks);
    const dispatch = useDispatch();

    // const [title, setTitle] = useState('');
    // const [desc, setDesc] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDesc, setEditingDesc] = useState('');

    // const [type, setType] = useState('task');
    // const [category, setCategory] = useState('work');
    // const [priority, setPriority] = useState('medium');
    // const [status, setStatus] = useState('pending');
    const [groupId, setGroupId] = useState('');
    const [phaseId, setPhaseId] = useState('');
    const [boardColumn, setBoardColumn] = useState('');
    // const [tags, setTags] = useState('');
    // const [estimatedHours, setEstimatedHours] = useState<number | ''>('');
    // const [actualHours, setActualHours] = useState<number | ''>('');
    // const [dueDays, setDueDays] = useState<number | ''>('');
    // const [reminderDays, setReminderDays] = useState<number | ''>('');
    // const [recurrencePattern, setRecurrencePattern] = useState('custom');
    // const [customRecurrenceRule, setCustomRecurrenceRule] = useState('');
    // const [locationAddress, setLocationAddress] = useState('');
    // const [latitude, setLatitude] = useState<number>();
    // const [longitude, setLongitude] = useState<number>();
    // const [score, setScore] = useState<number | ''>('');
    // const [feedback, setFeedback] = useState('');
    // const [linkedResourceTitle, setLinkedResourceTitle] = useState('');
    // const [linkedResourceUrl, setLinkedResourceUrl] = useState('');
    // const [isPrivate, setIsPrivate] = useState(false);
    // const [isBlocked, setIsBlocked] = useState(false);
    // const [blockReason, setBlockReason] = useState('');

    // const [checklistInput, setChecklistInput] = useState('');
    // const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    type StatusType = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'archived' | 'on_hold' | 'reopened';

    type Priority = 'low' | 'medium' | 'high';
    const [step, setStep] = useState(1);

    // Step 1: Text Inputs
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tags, setTags] = useState('');
    const [checklistInput, setChecklistInput] = useState('');
    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    const [locationAddress, setLocationAddress] = useState('');
    const [linkedResourceTitle, setLinkedResourceTitle] = useState('');
    const [linkedResourceUrl, setLinkedResourceUrl] = useState('');

    // Step 2: Numbers
    const [latitude, setLatitude] = useState<number | ''>('');
    const [longitude, setLongitude] = useState<number | ''>('');
    const [estimatedHours, setEstimatedHours] = useState<any>('');
    const [actualHours, setActualHours] = useState<any>('');
    const [dueDays, setDueDays] = useState<any>('');
    const [reminderDays, setReminderDays] = useState<number | "">('');
    const [score, setScore] = useState<number | "">('');

    // Step 3: Long text
    const [feedback, setFeedback] = useState('');

    // Step 4: Dropdowns
    const [type, setType] = useState<'' | 'task' | 'event' | 'appointment' | 'reminder' | 'habit' | 'note'>('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState<any>('');
    const [status, setStatus] = useState<any>('');
    const [recurrencePattern, setRecurrencePattern] = useState('custom');
    const [customRecurrenceRule, setCustomRecurrenceRule] = useState('');

    // Step 5: Toggles
    const [isPrivate, setIsPrivate] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockReason, setBlockReason] = useState('');


    const createTask = async () => {
        if (!title.trim() || !status || !priority) {
            toast.error("Please fill required fields");
            return;
        }

        const now = new Date().toLocaleString();
        const userRef: UserRef = {
            id: user.uniqueId,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
        };

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            description: desc.trim(),
            type: type === '' ? undefined : type,
            status: status === '' ? undefined : status,
            priority: priority === '' ? undefined : priority,
            category: category, // e.g., 'work', 'personal', 'health', etc.
            // groupId: '', // replaces projectId
            // boardColumn: 'To Do',
            // phaseId: '', // replaces sprintId
            // parentTaskId: undefined,
            subtasks: [],
            dependencies: [],
            dependents: [],
            tags: [],
            checklist: checklist,
            assignee: userRef,
            collaborators: [userRef],
            reporter: userRef,
            // comments: comments,
            // attachments: attachements,
            estimatedHours: estimatedHours,
            actualHours: actualHours,
            startDate: now,
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleString(), // +3 days
            completedAt: undefined,
            reminderAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleString(), // +1 day
            recurring: false,
            recurrencePattern: 'custom',
            customRecurrenceRule: '',
            location: {
                address: locationAddress,
                latitude: latitude === '' ? undefined : latitude,
                longitude: longitude === '' ? undefined : longitude,
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

        await authService.handleCreateTask(newTask).then(() => {
            toast.success('Task stored in database 🎉', {
                style: { background: '#4BB543', color: '#fff' },
            });
            setStep(1);

            // Step 1
            setTitle('');
            setDesc('');
            setTags('');
            setChecklistInput('');
            setChecklist([]);
            setLocationAddress('');
            setLinkedResourceTitle('');
            setLinkedResourceUrl('');

            // Step 2
            setLatitude('');
            setLongitude('');
            setEstimatedHours('');
            setActualHours('');
            setDueDays('');
            setReminderDays('');
            setScore('');

            // Step 3
            setFeedback('');

            // Step 4
            setType('');
            setCategory('');
            setPriority('');
            setStatus('');
            setRecurrencePattern('custom');
            setCustomRecurrenceRule('');

            // Step 5
            setIsPrivate(false);
            setIsBlocked(false);
            setBlockReason('');


            // console.log(newTask);
        }).catch((err) => {
            toast.error(`${err} 🚫`, {
                style: { background: '#ff4d4f', color: '#fff' },
            });
            console.log(err)
        })


        // dispatch(addTask(newTask));

    };


    const handleUpdateTask = () => {
        if (!editingTaskId || !editingTitle.trim()) return;

        const now = new Date().toISOString();
        const updatedTask: Task = {
            ...tasks.find((t: { id: string; }) => t.id === editingTaskId)!,
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

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div style={{ padding: '2rem', background: 'grey', color: '#fff' }}>
            <h2>Your Tasks</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
                {step === 1 && (
                    <>
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
                        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} style={{ ...inputStyle, height: '80px' }} />
                        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} style={inputStyle} />
                        <input
                            type="text"
                            placeholder="Checklist (comma separated)"
                            value={checklistInput}
                            onChange={e => {
                                const input = e.target.value;
                                setChecklistInput(input);
                                const items = input.split(',').map((title, index) => ({
                                    id: `chk-${index + 1}`,
                                    title: title.trim(),
                                    checked: false
                                })).filter(item => item.title.length > 0);
                                setChecklist(items);
                            }}
                            style={inputStyle}
                        />
                        <input type="text" placeholder="Location Address" value={locationAddress} onChange={e => setLocationAddress(e.target.value)} style={inputStyle} />
                        <input type="text" placeholder="Linked Resource Title" value={linkedResourceTitle} onChange={e => setLinkedResourceTitle(e.target.value)} style={inputStyle} />
                        <input type="url" placeholder="Linked Resource URL" value={linkedResourceUrl} onChange={e => setLinkedResourceUrl(e.target.value)} style={inputStyle} />
                        <button onClick={nextStep} style={buttonStyle('#2196F3')}>Continue</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        {/* <input type="number" placeholder="Latitude" value={latitude} onChange={e => setLatitude(Number(e.target.value))} style={inputStyle} />
                        <input type="number" placeholder="Longitude" value={longitude} onChange={e => setLongitude(Number(e.target.value))} style={inputStyle} /> */}
                        <input
                            type="number"
                            placeholder="Estimated Hours"
                            value={estimatedHours}
                            onChange={e => {
                                const val = e.target.value;
                                setEstimatedHours(val === '' ? '' : parseFloat(val));
                            }}
                            style={inputStyle}
                        />
                        <input type="number" placeholder="Actual Hours" value={actualHours} onChange={e => setActualHours(Number(e.target.value))} style={inputStyle} />
                        <input type="number" placeholder="Due in (days)" value={dueDays} onChange={e => setDueDays(Number(e.target.value))} style={inputStyle} />
                        <input type="number" placeholder="Reminder in (days)" value={reminderDays} onChange={e => setReminderDays(Number(e.target.value))} style={inputStyle} />
                        <input type="number" placeholder="Score" value={score} onChange={e => setScore(Number(e.target.value))} style={inputStyle} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} style={buttonStyle('#aaa')}>Back</button>
                            <button onClick={nextStep} style={buttonStyle('#2196F3')}>Continue</button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <textarea placeholder="Feedback" value={feedback} onChange={e => setFeedback(e.target.value)} style={{ ...inputStyle, height: '60px' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} style={buttonStyle('#aaa')}>Back</button>
                            <button onClick={nextStep} style={buttonStyle('#2196F3')}>Continue</button>
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <select value={type} onChange={e => setType(e.target.value as '' | 'task' | 'event' | 'appointment' | 'reminder' | 'habit' | 'note')} style={inputStyle}>
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
                        <select value={recurrencePattern} onChange={e => setRecurrencePattern(e.target.value)} style={inputStyle}>
                            <option value="custom">Custom</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <input type="text" placeholder="Custom Recurrence Rule (iCal RRULE)" value={customRecurrenceRule} onChange={e => setCustomRecurrenceRule(e.target.value)} style={inputStyle} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} style={buttonStyle('#aaa')}>Back</button>
                            <button onClick={nextStep} style={buttonStyle('#2196F3')}>Continue</button>
                        </div>
                    </>
                )}

                {step === 5 && (
                    <>
                        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
                            Private Task
                        </label>
                        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input type="checkbox" checked={isBlocked} onChange={e => setIsBlocked(e.target.checked)} />
                            Blocked
                        </label>
                        {isBlocked && (
                            <input type="text" placeholder="Reason for blocking" value={blockReason} onChange={e => setBlockReason(e.target.value)} style={inputStyle} />
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={prevStep} style={buttonStyle('#aaa')}>Back</button>
                            <button onClick={createTask} style={buttonStyle('#4CAF50')}>Add Task</button>
                        </div>
                    </>
                )}
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