import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.tasbih.digital',
    appName: 'Tasbih Digital',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        AdMob: {
            // AdMob App ID for Android - loaded from environment variable
            appId: process.env.VITE_ADMOB_APP_ID || '',
        }
    }
};

export default config;
