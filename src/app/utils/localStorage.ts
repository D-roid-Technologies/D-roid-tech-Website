// utils/localStorage.ts
export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
        console.error(`Failed to load ${key} from localStorage:`, error);
        return fallback;
    }
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to save ${key} to localStorage:`, error);
    }
};

export const removeFromLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove ${key} from localStorage:`, error);
    }
};

export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Failed to clear localStorage:", error);
    }
};
