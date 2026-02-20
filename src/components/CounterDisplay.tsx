import { useState, useEffect, useRef } from 'react';
import { useCounterStore } from '@/store/useCounterStore';
import { Check, Pencil } from 'lucide-react';

export function CounterDisplay() {
    const counter = useCounterStore((s) => s.getCurrentCounter());
    const setName = useCounterStore((s) => s.setName);

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const prevCount = useRef(counter?.count ?? 0);

    useEffect(() => {
        if (counter && counter.count !== prevCount.current) {
            setIsAnimating(true);
            prevCount.current = counter.count;
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    if (!counter) return null;

    const progress = Math.min((counter.count / counter.target) * 100, 100);
    const circumference = 2 * Math.PI * 120; // radius 120

    const handleEditStart = () => {
        setEditValue(counter.name);
        setIsEditing(true);
    };

    const handleEditSave = () => {
        setName(editValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleEditSave();
        if (e.key === 'Escape') setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center justify-center py-6 px-4">
            {/* Counter Name */}
            <div className="flex items-center gap-2 mb-6">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleEditSave}
                            className="text-xl font-medium text-center bg-transparent border-b-2 border-primary-500 focus:outline-none text-gray-900 dark:text-white max-w-[200px]"
                        />
                        <button
                            onClick={handleEditSave}
                            className="p-1.5 rounded-full bg-primary-500 text-white"
                        >
                            <Check size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleEditStart}
                        className="flex items-center gap-2 text-xl font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                        <span>{counter.name}</span>
                        <Pencil size={16} className="opacity-50" />
                    </button>
                )}
            </div>

            {/* Progress Circle with Count */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                        cx="128"
                        cy="128"
                        r="120"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-dark-700"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="128"
                        cy="128"
                        r="120"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-primary-500 transition-all duration-300"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: circumference - (progress / 100) * circumference,
                        }}
                    />
                </svg>

                {/* Count Display */}
                <div className="flex flex-col items-center z-10">
                    <span
                        className={`text-6xl font-bold font-display text-gray-900 dark:text-white tabular-nums ${isAnimating ? 'animate-count-up' : ''
                            }`}
                        style={{ color: counter.color }}
                    >
                        {counter.count}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        / {counter.target}
                    </span>
                </div>
            </div>

            {/* Target Completion Indicator */}
            {counter.count > 0 && counter.count % counter.target === 0 && (
                <div className="mt-4 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-sm font-medium animate-bounce-soft">
                    🎉 Target Reached! ({Math.floor(counter.count / counter.target)}x)
                </div>
            )}
        </div>
    );
}
