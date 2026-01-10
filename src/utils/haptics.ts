// Haptic feedback utility using Vibration API
type HapticPattern = 'tap' | 'success' | 'error' | 'heavy';

const patterns: Record<HapticPattern, number | number[]> = {
    tap: 10,           // Short tap for counting
    success: [50, 50, 100], // Celebration pattern for reaching target
    error: [100, 50, 100],  // Error pattern
    heavy: 50,          // Heavy tap for reset
};

// Check if vibration is supported
export const isVibrationSupported = (): boolean => {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
};

// Trigger haptic feedback
export const triggerHaptic = (pattern: HapticPattern = 'tap'): void => {
    if (!isVibrationSupported()) return;

    try {
        navigator.vibrate(patterns[pattern]);
    } catch (e) {
        // Silently fail if vibration fails
        console.warn('Vibration failed:', e);
    }
};

// Cancel any ongoing vibration
export const cancelHaptic = (): void => {
    if (!isVibrationSupported()) return;
    navigator.vibrate(0);
};
