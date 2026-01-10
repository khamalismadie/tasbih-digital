import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Counter, AppSettings, DEFAULT_SETTINGS, createCounter } from '@/types';

interface CounterStore {
    // State
    counters: Counter[];
    currentCounterId: string;
    settings: AppSettings;

    // Counter actions
    increment: () => void;
    reset: () => void;
    setCount: (count: number) => void;
    setTarget: (target: number) => void;
    setName: (name: string) => void;

    // Counter management
    addCounter: (name?: string, target?: number) => void;
    deleteCounter: (id: string) => void;
    selectCounter: (id: string) => void;

    // Settings
    updateSettings: (settings: Partial<AppSettings>) => void;
    toggleTheme: () => void;

    // Helpers
    getCurrentCounter: () => Counter | undefined;
}

const initialCounter = createCounter('Subhanallah', 33);

export const useCounterStore = create<CounterStore>()(
    persist(
        (set, get) => ({
            // Initial state
            counters: [initialCounter],
            currentCounterId: initialCounter.id,
            settings: DEFAULT_SETTINGS,

            // Increment current counter
            increment: () => {
                set((state) => ({
                    counters: state.counters.map((counter) =>
                        counter.id === state.currentCounterId
                            ? { ...counter, count: counter.count + 1 }
                            : counter
                    ),
                }));
            },

            // Reset current counter
            reset: () => {
                const today = new Date().toISOString().split('T')[0];
                set((state) => ({
                    counters: state.counters.map((counter) => {
                        if (counter.id !== state.currentCounterId) return counter;

                        // Save to history before reset
                        const existingEntry = counter.history.find((h) => h.date === today);
                        const newHistory = existingEntry
                            ? counter.history.map((h) =>
                                h.date === today
                                    ? { ...h, count: h.count + counter.count }
                                    : h
                            )
                            : [...counter.history, { date: today, count: counter.count }];

                        return {
                            ...counter,
                            count: 0,
                            history: newHistory.slice(-30), // Keep last 30 days
                        };
                    }),
                }));
            },

            // Set specific count
            setCount: (count: number) => {
                set((state) => ({
                    counters: state.counters.map((counter) =>
                        counter.id === state.currentCounterId
                            ? { ...counter, count: Math.max(0, count) }
                            : counter
                    ),
                }));
            },

            // Set target for current counter
            setTarget: (target: number) => {
                set((state) => ({
                    counters: state.counters.map((counter) =>
                        counter.id === state.currentCounterId
                            ? { ...counter, target: Math.max(1, target) }
                            : counter
                    ),
                }));
            },

            // Set name for current counter
            setName: (name: string) => {
                set((state) => ({
                    counters: state.counters.map((counter) =>
                        counter.id === state.currentCounterId
                            ? { ...counter, name: name.trim() || 'Tasbih' }
                            : counter
                    ),
                }));
            },

            // Add new counter
            addCounter: (name?: string, target?: number) => {
                const newCounter = createCounter(name, target);
                set((state) => ({
                    counters: [...state.counters, newCounter],
                    currentCounterId: newCounter.id,
                }));
            },

            // Delete counter
            deleteCounter: (id: string) => {
                set((state) => {
                    const newCounters = state.counters.filter((c) => c.id !== id);
                    if (newCounters.length === 0) {
                        const defaultCounter = createCounter('Subhanallah', 33);
                        return {
                            counters: [defaultCounter],
                            currentCounterId: defaultCounter.id,
                        };
                    }
                    return {
                        counters: newCounters,
                        currentCounterId:
                            state.currentCounterId === id
                                ? newCounters[0].id
                                : state.currentCounterId,
                    };
                });
            },

            // Select counter
            selectCounter: (id: string) => {
                set({ currentCounterId: id });
            },

            // Update settings
            updateSettings: (newSettings: Partial<AppSettings>) => {
                set((state) => ({
                    settings: { ...state.settings, ...newSettings },
                }));
            },

            // Toggle theme
            toggleTheme: () => {
                set((state) => ({
                    settings: {
                        ...state.settings,
                        theme: state.settings.theme === 'dark' ? 'light' : 'dark',
                    },
                }));
            },

            // Get current counter
            getCurrentCounter: () => {
                const state = get();
                return state.counters.find((c) => c.id === state.currentCounterId);
            },
        }),
        {
            name: 'tasbih-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                counters: state.counters,
                currentCounterId: state.currentCounterId,
                settings: state.settings,
            }),
        }
    )
);
