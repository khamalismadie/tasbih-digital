import { useState } from 'react';
import { X } from 'lucide-react';
import { useCounterStore } from '@/store/useCounterStore';
import { COMMON_TARGETS } from '@/types';

interface TargetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TargetModal({ isOpen, onClose }: TargetModalProps) {
    const counter = useCounterStore((s) => s.getCurrentCounter());
    const setTarget = useCounterStore((s) => s.setTarget);
    const [customTarget, setCustomTarget] = useState('');

    if (!isOpen || !counter) return null;

    const handleQuickSelect = (value: number) => {
        setTarget(value);
        onClose();
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = parseInt(customTarget, 10);
        if (value > 0) {
            setTarget(value);
            setCustomTarget('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-dark-800 rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Set Target
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Current target */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Current target
                        </p>
                        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                            {counter.target}
                        </p>
                    </div>

                    {/* Quick select */}
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                            Quick Select
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {COMMON_TARGETS.map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => handleQuickSelect(value)}
                                    className={`
                    py-3 rounded-xl font-medium transition-all active:scale-95
                    ${counter.target === value
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                                        }
                  `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom input */}
                    <form onSubmit={handleCustomSubmit}>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                            Custom Target
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="1"
                                placeholder="Enter custom target..."
                                value={customTarget}
                                onChange={(e) => setCustomTarget(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="submit"
                                disabled={!customTarget || parseInt(customTarget, 10) <= 0}
                                className="px-6 py-3 rounded-xl bg-primary-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors active:scale-95"
                            >
                                Set
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
