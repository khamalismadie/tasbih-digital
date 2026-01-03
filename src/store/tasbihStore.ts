import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TasbihState {
    count: number;
    target: number;
    dzikirName: string;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setTarget: (target: number) => void;
    setDzikirName: (name: string) => void;
}

export const useTasbihStore = create<TasbihState>()(
    persist(
        (set) => ({
            count: 0,
            target: 33,
            dzikirName: 'Subhanallah',
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
            reset: () => set({ count: 0 }),
            setTarget: (target) => set({ target }),
            setDzikirName: (dzikirName) => set({ dzikirName }),
        }),
        {
            name: 'tasbih-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
