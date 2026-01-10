import { RotateCcw, Plus, Trash2, Target } from 'lucide-react';
import { useCounterStore } from '@/store/useCounterStore';
import { triggerHaptic } from '@/utils/haptics';

interface ControlPanelProps {
    onAddCounter: () => void;
    onSetTarget: () => void;
}

export function ControlPanel({ onAddCounter, onSetTarget }: ControlPanelProps) {
    const reset = useCounterStore((s) => s.reset);
    const deleteCounter = useCounterStore((s) => s.deleteCounter);
    const counter = useCounterStore((s) => s.getCurrentCounter());
    const counters = useCounterStore((s) => s.counters);
    const settings = useCounterStore((s) => s.settings);

    const handleReset = () => {
        if (counter && counter.count > 0) {
            if (settings.vibration) triggerHaptic('heavy');
            reset();
        }
    };

    const handleDelete = () => {
        if (counter && counters.length > 1) {
            if (confirm(`Delete "${counter.name}"?`)) {
                deleteCounter(counter.id);
            }
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 py-4 px-6">
            {/* Reset Button */}
            <button
                onClick={handleReset}
                disabled={!counter || counter.count === 0}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                aria-label="Reset counter"
            >
                <RotateCcw size={24} />
                <span className="text-xs font-medium">Reset</span>
            </button>

            {/* Add Counter Button */}
            <button
                onClick={onAddCounter}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-all active:scale-95"
                aria-label="Add new counter"
            >
                <Plus size={24} />
                <span className="text-xs font-medium">Add</span>
            </button>

            {/* Set Target Button */}
            <button
                onClick={onSetTarget}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-all active:scale-95"
                aria-label="Set target"
            >
                <Target size={24} />
                <span className="text-xs font-medium">Target</span>
            </button>

            {/* Delete Button */}
            <button
                onClick={handleDelete}
                disabled={counters.length <= 1}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gray-100 dark:bg-dark-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                aria-label="Delete counter"
            >
                <Trash2 size={24} />
                <span className="text-xs font-medium">Delete</span>
            </button>
        </div>
    );
}
