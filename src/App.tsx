import { useState, useEffect } from 'react';
import { useCounterStore } from '@/store/useCounterStore';
import {
    Header,
    CounterDisplay,
    CounterButton,
    ControlPanel,
    CounterList,
    SettingsModal,
    TargetModal,
    AddCounterModal,
} from '@/components';
import { adMobService } from '@/services/admob';

function App() {
    const settings = useCounterStore((s) => s.settings);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [targetOpen, setTargetOpen] = useState(false);
    const [addCounterOpen, setAddCounterOpen] = useState(false);

    // Initialize AdMob when running as native app
    useEffect(() => {
        const initAds = async () => {
            if (adMobService.isNative()) {
                await adMobService.initialize();
                await adMobService.showBanner();
            }
        };
        initAds();

        // Cleanup on unmount
        return () => {
            if (adMobService.isNative()) {
                adMobService.removeBanner();
            }
        };
    }, []);

    // Apply theme class to document
    useEffect(() => {
        const root = document.documentElement;
        if (settings.theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [settings.theme]);

    // Prevent pull-to-refresh on mobile
    useEffect(() => {
        const preventDefault = (e: TouchEvent) => {
            if (e.touches.length > 1) return;
            const touch = e.touches[0];
            if (touch.clientY > 0) return;
            e.preventDefault();
        };

        document.addEventListener('touchmove', preventDefault, { passive: false });
        return () => document.removeEventListener('touchmove', preventDefault);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-950 flex flex-col">
            <Header onSettingsClick={() => setSettingsOpen(true)} />

            <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
                <CounterDisplay />

                {/* Spacer for AdMob Banner (Centered) */}
                <div className="h-[60px] w-full" aria-hidden="true" />

                <CounterButton />
                <ControlPanel
                    onAddCounter={() => setAddCounterOpen(true)}
                    onSetTarget={() => setTargetOpen(true)}
                />
            </main>

            <CounterList />

            {/* Modals */}
            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <TargetModal isOpen={targetOpen} onClose={() => setTargetOpen(false)} />
            <AddCounterModal isOpen={addCounterOpen} onClose={() => setAddCounterOpen(false)} />
        </div>
    );
}

export default App;
