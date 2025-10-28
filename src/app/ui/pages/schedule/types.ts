// types.ts
export type Task = {
    id: string;
    title: string;
    description?: string;
    type?: string;
    createdAt: string; // ISO
    startDate: string; // YYYY-MM-DD
    endDate?: string; // YYYY-MM-DD optional
};

export type EventsMap = { [date: string]: Task[] };

export const LOCAL_STORAGE_KEY = "droid_schedules_events_v2";

export const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
