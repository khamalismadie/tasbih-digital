# Digital Tasbih / Prayer Counter

A beautiful, mobile-first digital tasbih (prayer counter) app built with React, TypeScript, and Tailwind CSS. Available as both PWA and native Android app with AdMob monetization.

## ✨ Features

- **🔢 Counter**: Large, accessible tap button with haptic and sound feedback
- **📊 Progress Tracking**: Visual progress indicator toward your target
- **🎯 Custom Targets**: Set goals (33, 99, 100, 1000, or custom)
- **📱 Multiple Counters**: Track different prayers simultaneously
- **🌙 Dark Mode**: Easy on the eyes during night prayers
- **💾 Persistence**: Counts saved to localStorage
- **📲 PWA Ready**: Installable on mobile devices
- **♿ Accessible**: Keyboard navigation and screen reader support
- **📢 AdMob Ads**: Banner ads for monetization (Android)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Android Studio (for Android builds)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Android Build

```bash
# Build web assets
npm run build

# Sync with Android project
npx cap sync android

# Open in Android Studio
npx cap open android

# Or run directly (if device connected)
npx cap run android
```

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand with localStorage persistence
- **Build**: Vite
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa
- **Native**: Capacitor
- **Ads**: @capacitor-community/admob

## 📱 AdMob Configuration

⚠️ **Important**: AdMob credentials should NOT be committed to version control.

### Setup Steps:

1. **Create `.env` file** in project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your AdMob credentials:
   ```env
   VITE_ADMOB_APP_ID=ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx
   VITE_ADMOB_BANNER_AD_UNIT_ID=ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx
   ```

3. **For Android builds**, add to `android/local.properties`:
   ```properties
   ADMOB_APP_ID=ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx
   ```

The `.env` and `android/local.properties` files are gitignored and will not be committed.

## 📱 Usage

1. **Tap to Count**: Tap the large center button to increment
2. **Reset**: Tap reset to save current count to history and start over
3. **Add Counter**: Create new counters for different prayers
4. **Set Target**: Choose from presets (33, 99, 100, 1000) or custom
5. **Theme**: Toggle dark/light mode in the header

## 📄 License

MIT
