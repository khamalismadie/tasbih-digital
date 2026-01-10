import { useState, useRef } from 'react';
import { useCounterStore } from '@/store/useCounterStore';
import { triggerHaptic } from '@/utils/haptics';
import { playClickSound, playSuccessSound, resumeAudioContext } from '@/utils/sound';

export function CounterButton() {
    const increment = useCounterStore((s) => s.increment);
    const counter = useCounterStore((s) => s.getCurrentCounter());
    const settings = useCounterStore((s) => s.settings);

    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleIdRef = useRef(0);

    if (!counter) return null;

    const handlePress = async (e: React.MouseEvent | React.TouchEvent) => {
        // Resume audio context on first interaction (iOS requirement)
        await resumeAudioContext();

        // Get ripple position
        const button = buttonRef.current;
        if (button) {
            const rect = button.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const newRipple = { id: rippleIdRef.current++, x, y };
            setRipples((prev) => [...prev, newRipple]);

            // Remove ripple after animation
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 600);
        }

        setIsPressed(true);

        // Increment counter
        const prevCount = counter.count;
        increment();

        // Haptic feedback
        if (settings.vibration) {
            const isTargetReached = (prevCount + 1) % counter.target === 0;
            triggerHaptic(isTargetReached ? 'success' : 'tap');
        }

        // Sound feedback
        if (settings.sound) {
            const isTargetReached = (prevCount + 1) % counter.target === 0;
            if (isTargetReached) {
                playSuccessSound(true);
            } else {
                playClickSound(true);
            }
        }
    };

    const handleRelease = () => {
        setIsPressed(false);
    };

    return (
        <div className="flex items-center justify-center py-8">
            <button
                ref={buttonRef}
                onMouseDown={handlePress}
                onMouseUp={handleRelease}
                onMouseLeave={handleRelease}
                onTouchStart={handlePress}
                onTouchEnd={handleRelease}
                className={`
          relative w-48 h-48 rounded-full 
          bg-gradient-to-br from-primary-400 to-primary-600 
          dark:from-primary-500 dark:to-primary-700
          shadow-xl shadow-primary-500/30 dark:shadow-primary-600/20
          flex items-center justify-center
          transition-all duration-150 ease-out
          overflow-hidden
          focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-600
          active:shadow-lg
          ${isPressed ? 'scale-95 shadow-lg' : 'scale-100 hover:scale-[1.02] animate-glow'}
        `}
                style={{
                    background: isPressed
                        ? `linear-gradient(to bottom right, ${counter.color}dd, ${counter.color})`
                        : `linear-gradient(to bottom right, ${counter.color}bb, ${counter.color})`,
                }}
                aria-label="Tap to count"
            >
                {/* Ripple effects */}
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute w-8 h-8 bg-white/30 rounded-full animate-ripple pointer-events-none"
                        style={{ left: ripple.x - 16, top: ripple.y - 16 }}
                    />
                ))}

                {/* Button content */}
                <span className="text-white text-2xl font-semibold select-none">
                    Tap
                </span>
            </button>
        </div>
    );
}
