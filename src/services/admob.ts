import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// AdMob Configuration - loaded from environment variables
// Create a .env file with your credentials (see .env.example)
const ADMOB_CONFIG = {
    // Your AdMob App ID
    appId: import.meta.env.VITE_ADMOB_APP_ID || '',

    // Banner Ad Unit ID (iklan header)
    bannerAdUnitId: import.meta.env.VITE_ADMOB_BANNER_AD_UNIT_ID || '',

    // Test Ad Unit IDs (use these during development)
    testBannerAdUnitId: import.meta.env.VITE_ADMOB_TEST_BANNER_AD_UNIT_ID || 'ca-app-pub-3940256099942544/6300978111',
};

// Check if in development mode
const IS_DEVELOPMENT = typeof window !== 'undefined' && window.location.hostname === 'localhost';

class AdMobService {
    private initialized = false;
    private bannerShowing = false;

    /**
     * Initialize AdMob - must be called before showing any ads
     */
    async initialize(): Promise<void> {
        if (this.initialized) return;

        try {
            await AdMob.initialize({
                // Test mode during development
                testingDevices: IS_DEVELOPMENT ? ['YOUR_TEST_DEVICE_ID'] : [],
                initializeForTesting: IS_DEVELOPMENT,
            });

            this.initialized = true;
            console.log('AdMob initialized successfully');
        } catch (error) {
            console.error('AdMob initialization failed:', error);
        }
    }

    /**
     * Show banner ad at the top of the screen
     */
    async showBanner(): Promise<void> {
        if (!this.initialized) {
            await this.initialize();
        }

        if (this.bannerShowing) return;

        try {
            const options: BannerAdOptions = {
                adId: IS_DEVELOPMENT
                    ? ADMOB_CONFIG.testBannerAdUnitId
                    : ADMOB_CONFIG.bannerAdUnitId,
                adSize: BannerAdSize.ADAPTIVE_BANNER,
                position: BannerAdPosition.TOP_CENTER,
                margin: 0,
                isTesting: IS_DEVELOPMENT,
            };

            await AdMob.showBanner(options);
            this.bannerShowing = true;
            console.log('Banner ad shown');
        } catch (error) {
            console.error('Failed to show banner ad:', error);
        }
    }

    /**
     * Hide the banner ad
     */
    async hideBanner(): Promise<void> {
        if (!this.bannerShowing) return;

        try {
            await AdMob.hideBanner();
            this.bannerShowing = false;
            console.log('Banner ad hidden');
        } catch (error) {
            console.error('Failed to hide banner ad:', error);
        }
    }

    /**
     * Remove the banner ad completely
     */
    async removeBanner(): Promise<void> {
        try {
            await AdMob.removeBanner();
            this.bannerShowing = false;
            console.log('Banner ad removed');
        } catch (error) {
            console.error('Failed to remove banner ad:', error);
        }
    }

    /**
     * Resume the banner ad (after being paused)
     */
    async resumeBanner(): Promise<void> {
        try {
            await AdMob.resumeBanner();
            console.log('Banner ad resumed');
        } catch (error) {
            console.error('Failed to resume banner ad:', error);
        }
    }

    /**
     * Check if running in Capacitor native environment
     */
    isNative(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        return typeof win.Capacitor !== 'undefined' && win.Capacitor.isNativePlatform();
    }
}

// Export singleton instance
export const adMobService = new AdMobService();

// Export configuration for reference
export { ADMOB_CONFIG };
