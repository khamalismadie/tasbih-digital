import { useState } from 'react';
import { X } from 'lucide-react';
import { useCounterStore } from '@/store/useCounterStore';
import { COMMON_TARGETS, COUNTER_COLORS } from '@/types';

interface AddCounterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PRESET_NAMES = [
    'Subhanallah',
    'Alhamdulillah',
    'Allahu Akbar',
    'La ilaha illallah',
    'Astaghfirullah',
    'Prayer',
    'Meditation',
    'Custom',
];

export function AddCounterModal({ isOpen, onClose }: AddCounterModalProps) {
    const addCounter = useCounterStore((s) => s.addCounter);
    const [name, setName] = useState('');
    const [target, setTarget] = useState(33);
    const [selectedColor, setSelectedColor] = useState<string>(COUNTER_COLORS[0]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCounter(name || 'New Counter', target);
        setName('');
        setTarget(33);
        onClose();
    };

    const handlePresetClick = (preset: string) => {
        if (preset === 'Custom') {
            setName('');
        } else {
            setName(preset);
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
            <div className="relative w-full max-w-md bg-white dark:bg-dark-800 rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-700 sticky top-0 bg-white dark:bg-dark-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Add Counter
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name presets */}
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                            Counter Name
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {PRESET_NAMES.map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => handlePresetClick(preset)}
                                    className={`
                    px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${name === preset || (preset === 'Custom' && !PRESET_NAMES.includes(name))
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                                        }
                  `}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter counter name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Target selection */}
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                            Target Count
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {COMMON_TARGETS.map(({ value, label }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setTarget(value)}
                                    className={`
                    py-3 rounded-xl font-medium transition-all active:scale-95
                    ${target === value
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

                    {/* Color selection */}
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                            Color
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {COUNTER_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setSelectedColor(color)}
                                    className={`
                    w-10 h-10 rounded-full transition-all
                    ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-dark-800' : ''}
                  `}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors active:scale-[0.98]"
                    >
                        Add Counter
                    </button>
                </form>
            </div>
        </div>
    );
}
