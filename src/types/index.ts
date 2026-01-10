// Counter data model
export interface Counter {
    id: string;
    name: string;
    count: number;
    target: number;
    color: string;
    createdAt: string;
    history: DailyCount[];
}

// Daily count tracking
export interface DailyCount {
    date: string;
    count: number;
}

// App settings
export interface AppSettings {
    vibration: boolean;
    sound: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
}

// Complete app state
export interface AppState {
    counters: Counter[];
    currentCounterId: string;
    settings: AppSettings;
}

// Default counter colors (spiritual palette)
export const COUNTER_COLORS = [
    '#14B8A6', // Teal (primary)
    '#0EA5E9', // Sky Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#6366F1', // Indigo
    '#F97316', // Orange
] as const;

// Common targets for prayers/dhikr
export const COMMON_TARGETS = [
    { value: 33, label: '33' },
    { value: 99, label: '99' },
    { value: 100, label: '100' },
    { value: 1000, label: '1000' },
] as const;

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
    vibration: true,
    sound: false,
    theme: 'dark',
    language: 'en',
};

// Create a new counter with defaults
export const createCounter = (name: string = 'Tasbih', target: number = 33): Counter => ({
    id: crypto.randomUUID(),
    name,
    count: 0,
    target,
    color: COUNTER_COLORS[Math.floor(Math.random() * COUNTER_COLORS.length)],
    createdAt: new Date().toISOString(),
    history: [],
});
