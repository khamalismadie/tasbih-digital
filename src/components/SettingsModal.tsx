import { X, Vibrate, Volume2 } from 'lucide-react';
import { useCounterStore } from '@/store/useCounterStore';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const settings = useCounterStore((s) => s.settings);
    const updateSettings = useCounterStore((s) => s.updateSettings);

    if (!isOpen) return null;

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
                        Settings
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
                    {/* Vibration Toggle */}
                    <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                                <Vibrate size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Haptic Feedback
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Vibrate on tap
                                </p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.vibration}
                            onChange={(e) => updateSettings({ vibration: e.target.checked })}
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500 relative cursor-pointer appearance-none"
                            style={{
                                backgroundColor: settings.vibration ? '#14B8A6' : undefined,
                            }}
                        />
                    </label>

                    {/* Sound Toggle */}
                    <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg text-accent-600 dark:text-accent-400">
                                <Volume2 size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Sound Effects
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Play sound on tap
                                </p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.sound}
                            onChange={(e) => updateSettings({ sound: e.target.checked })}
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500 relative cursor-pointer appearance-none"
                            style={{
                                backgroundColor: settings.sound ? '#14B8A6' : undefined,
                            }}
                        />
                    </label>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-dark-700">
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                        Tasbih Digital v1.0.0
                    </p>
                </div>
            </div>
        </div>
    );
}
