import { useCounterStore } from '@/store/useCounterStore';
import clsx from 'clsx';

export function CounterList() {
    const counters = useCounterStore((s) => s.counters);
    const currentCounterId = useCounterStore((s) => s.currentCounterId);
    const selectCounter = useCounterStore((s) => s.selectCounter);

    if (counters.length <= 1) return null;

    return (
        <div className="px-4 py-3 border-t border-gray-200/50 dark:border-dark-700/50">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Your Counters
            </h3>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {counters.map((counter) => {
                    const isActive = counter.id === currentCounterId;
                    const progress = Math.min((counter.count / counter.target) * 100, 100);

                    return (
                        <button
                            key={counter.id}
                            onClick={() => selectCounter(counter.id)}
                            className={clsx(
                                'flex-shrink-0 min-w-[120px] p-3 rounded-xl transition-all active:scale-95',
                                isActive
                                    ? 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30 ring-2 ring-primary-500'
                                    : 'bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600'
                            )}
                        >
                            {/* Counter name */}
                            <p className={clsx(
                                'text-sm font-medium truncate mb-1',
                                isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                            )}>
                                {counter.name}
                            </p>

                            {/* Count */}
                            <p className="text-lg font-bold tabular-nums" style={{ color: counter.color }}>
                                {counter.count}
                                <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
                                    /{counter.target}
                                </span>
                            </p>

                            {/* Progress bar */}
                            <div className="mt-2 h-1 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${progress}%`,
                                        backgroundColor: counter.color,
                                    }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
