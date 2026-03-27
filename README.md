# 📱 Ehsaas: Advanced Mental Wellness Ecosystem

<div align="center">
  <img src="./mobile/assets/transparent_logo.png" width="120" height="120" />
  <h1>Ehsaas</h1>
  <p><i>Feelings & Awareness — An intelligent companion for emotional clarity.</i></p>
</div>

---

## 🚀 Overview
**Ehsaas** is a premium, data-driven mental health application designed to bridge the gap between daily emotional chaos and long-term psychological clarity. It combines modern UI aesthetics with intelligent backend processing to provide a safe, private space for emotional growth.

## 🛠 Project Structure
- **`mobile/`**: The React Native (Expo SDK 54+) frontend. Uses **NativeWind** for styling and **Lucide** for iconography.
- **`server/`**: The Node.js / Express.js backend. Uses **MongoDB** and **Mongoose** for persistent storage.

---

## ✨ Key Features

### 1. 📊 Emotional Intelligence & Heatmapping
- **Daily Mood Logging**: Selection-based mood captures with intensity and reflections.
- **Dynamic Heatmaps**: A GitHub-style monthly calendar view (via `react-native-calendars`) to spot emotional patterns.
- **Intelligent Trends**: 7-day interactive line charts for emotional trajectory analysis.

### 2. 🤖 AI Copilot & CBT Venting Guide
- **Compassionate Listening**: An AI-driven chat interface for free venting.
- **CBT-Based Grounding**: Programmed with Cognitive Behavioral Therapy principles for empathetic, therapeutic response generation.
- **Natural Interaction**: Simulated typing delays for an organic, human-like experience.

### 3. 🌬️ Guided Mindfulness
- **4-7-8 Breathing Technique**: A custom-animated native module to guide users through instant stress relief exercises.

### 4. 🔥 Retention & Habit Formation
- **Streak Tracking**: Rewards consistency with visual fire-streaks.
- **Smart Push Notifications**: Local, daily reminders scheduled for **8:00 PM** to encourage evening reflection.

---

## 🚦 Getting Started

### Backend Setup
1.  Navigate to `server/`:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env` with your `MONGODB_URI` and `JWT_SECRET`.
4.  Start the engine:
    ```bash
    node index.js
    ```

### Mobile Setup
1.  Navigate to `mobile/`:
    ```bash
    cd mobile
    ```
2.  Install core dependencies:
    ```bash
    npm install
    ```
3.  Ensure Expo CLI is ready:
    ```bash
    npx expo start -c
    ```
4.  Scan the QR code with **Expo Go** on your physical device.

---

## 🔒 Safety & Privacy
- **JWT Security**: Industry-standard encrypted session management.
- **Local Autonomy**: Push notifications are handled locally on-device.
- **Global Error Handling**: Robust `ErrorBoundary` ensures user sessions remain stable even during network issues.

---

*“Ehsaas isn’t just an app; it’s a mirror for your mind.”*
