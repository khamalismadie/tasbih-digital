import { Moon, Sun, Settings } from 'lucide-react';
import { useCounterStore } from '@/store/useCounterStore';

interface HeaderProps {
    onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
    const { settings, toggleTheme } = useCounterStore();
    const isDark = settings.theme === 'dark';

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-dark-700/50 sticky top-0 z-50">
            <h1 className="text-xl font-display font-semibold text-gray-900 dark:text-white tracking-tight">
                Tasbih Digital
            </h1>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors active:scale-95"
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                    onClick={onSettingsClick}
                    className="p-2.5 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors active:scale-95"
                    aria-label="Open settings"
                >
                    <Settings size={20} />
                </button>
            </div>
        </header>
    );
}
