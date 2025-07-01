import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Types
type UserRef = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
};

type Comment = {
    id: string;
    author: UserRef;
    content: string;
    createdAt: string;
    updatedAt?: string;
    reactions?: {
        [emoji: string]: number;
    };
};

type Attachment = {
    id: string;
    filename: string;
    url: string;
    fileType: string;
    uploadedBy: UserRef;
    uploadedAt: string;
};

type TaskHistoryEntry = {
    id: string;
    timestamp: string;
    action: string;
    performedBy: UserRef;
    metadata?: Record<string, any>;
};

type ChecklistItem = {
    id: string;
    title: string;
    checked: boolean;
};

type Task = {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'archived' | 'on_hold' | 'reopened';
    priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
    category?: string;
    projectId?: string;
    boardColumn?: string;
    sprintId?: string;
    parentTaskId?: string;
    subtasks?: Task[];
    dependencies?: string[];
    dependents?: string[];
    tags?: string[];
    checklist?: ChecklistItem[];
    assignee?: UserRef;
    collaborators?: UserRef[];
    reporter?: UserRef;
    comments?: Comment[];
    attachments?: Attachment[];
    estimatedHours?: number;
    actualHours?: number;
    startDate?: string;
    dueDate?: string;
    completedAt?: string;
    reminderAt?: string;
    recurring?: boolean;
    recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'custom';
    customRecurrenceRule?: string;
    location?: {
        address?: string;
        latitude?: number;
        longitude?: number;
    };
    isPrivate?: boolean;
    isBlocked?: boolean;
    blockReason?: string;
    score?: number;
    feedback?: string;
    linkedResources?: {
        title: string;
        url: string;
    }[];
    auditTrail?: TaskHistoryEntry[];
    createdBy: UserRef;
    dateCreated: string;
    dateModified?: string;
    dateDeleted?: string;
};

type TasksState = {
    tasks: Task[];
    loading: boolean;
    error: string | null;
};

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

// Async Thunk (example for loading tasks)
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch('/api/tasks'); // replace with actual API endpoint
    return (await response.json()) as Task[];
});

// Slice
export const scheduleTask = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            console.log("from state", [...state.tasks]);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = { ...action.payload, dateModified: new Date().toISOString() };
            }
        },
        deleteThisTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
                task.dateModified = new Date().toISOString();
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load tasks';
            });
    },
});

export const { addTask, updateTask, deleteThisTask, toggleTaskStatus } = scheduleTask.actions;
export default scheduleTask.reducer;