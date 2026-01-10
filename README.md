# Digital Tasbih / Prayer Counter

A beautiful, mobile-first digital tasbih (prayer counter) web app built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🔢 Counter**: Large, accessible tap button with haptic and sound feedback
- **📊 Progress Tracking**: Visual progress indicator toward your target
- **🎯 Custom Targets**: Set goals (33, 99, 100, 1000, or custom)
- **📱 Multiple Counters**: Track different prayers simultaneously
- **🌙 Dark Mode**: Easy on the eyes during night prayers
- **💾 Persistence**: Counts saved to localStorage
- **📲 PWA Ready**: Installable on mobile devices
- **♿ Accessible**: Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

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

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand with localStorage persistence
- **Build**: Vite
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa

## 📱 Usage

1. **Tap to Count**: Tap the large center button to increment
2. **Reset**: Tap reset to save current count to history and start over
3. **Add Counter**: Create new counters for different prayers
4. **Set Target**: Choose from presets (33, 99, 100, 1000) or custom
5. **Theme**: Toggle dark/light mode in the header

## 📄 License

MIT
