// Sound utility using Web Audio API
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;

    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        } catch (e) {
            console.warn('AudioContext not supported:', e);
            return null;
        }
    }
    return audioContext;
};

// Generate a soft click sound
export const playClickSound = (enabled: boolean = true): void => {
    if (!enabled) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        // Create oscillator for click
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Configure sound - soft, high-frequency click
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

        // Quick fade out for soft click
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
        console.warn('Sound playback failed:', e);
    }
};

// Play success sound (reaching target)
export const playSuccessSound = (enabled: boolean = true): void => {
    if (!enabled) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - happy chord

        notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

            gainNode.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);

            oscillator.start(ctx.currentTime + i * 0.1);
            oscillator.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
    } catch (e) {
        console.warn('Sound playback failed:', e);
    }
};

// Resume audio context (needed for iOS)
export const resumeAudioContext = async (): Promise<void> => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
        await ctx.resume();
    }
};
