# 📱 Ehsaas: Advanced Mental Wellness Ecosystem

**Ehsaas** (meaning *Feelings* or *Awareness*) is a premium, data-driven mental health application designed to bridge the gap between daily emotional chaos and long-term psychological clarity. It combines modern UI aesthetics with intelligent backend processing to provide a safe, private space for emotional growth.

---

## 🚀 Core Pillars of Ehsaas

### 1. 📊 Emotional Intelligence & Heatmapping
Ehsaas doesn't just log moods; it visualizes your life's emotional rhythm.
- **Daily Mood Logging:** Quick, emoji-based mood captures with optional intensity and text reflections.
- **Dynamic Heatmaps:** A GitHub-style monthly calendar view that color-codes your days, allowing you to spot seasonal or weekly patterns in your well-being.
- **Intelligent Trends:** Interactive line charts showing your emotional trajectory over the last 7 days.

### 2. 🤖 AI Copilot & CBT Venting Guide
A dedicated, intelligent space to offload thoughts without judgment.
- **Compassionate Listening:** An AI-driven chat interface where users can vent freely.
- **CBT-Based Grounding:** The engine is programmed with Cognitive Behavioral Therapy (CBT) principles to provide empathetic, therapeutic responses that help users reframe negative thoughts.
- **Organic Interactions:** Simulated "human-like" typing delays to ensure the experience feels conversational and supportive.

### 3. 🌬️ Guided Mindfulness (4-7-8 Technique)
An integrated module for instant physiological stress relief.
- **Interactive Breathing:** A custom-animated breathing guide that leads users through the science-backed 4-7-8 technique.
- **Native Experience:** Smooth, distraction-free animations that expand and contract to guide your breath, ideal for panic attacks or sleep preparation.

### 4. 🔥 Retention & Habit Formation
Ehsaas uses "Positive Nudges" to ensure consistent self-reflection.
- **Streak Tracking:** Visual fire-streaks that reward users for consecutive days of self-care.
- **Smart Push Notifications:** Local, daily reminders scheduled for **8:00 PM** to encourage evening reflection before sleep.
- **Demographic Personalization:** Profiles that track profession, gender, and age categories to surface more relevant wellness insights.

---

## 🛠 Technical Architecture

### **Frontend: The Mobile Core**
- **Framework:** React Native (Expo SDK 54+) using `expo-router` for file-based navigation.
- **Styling:** **NativeWind (Tailwind CSS)** for a sleek, consistent, and responsive Design System.
- **State Management:** Secure React Context API (`AuthContext`) for global user state and error handling.
- **Visuals:** `react-native-calendars`, `lucide-react-native`, and custom `Animated` API for the breathing module.

### **Backend: The Logic Hub**
- **Runtime:** Node.js with Express.js.
- **Database:** MongoDB (Atlas/Local) with Mongoose for structured, high-performance data modeling.
- **Security:** Industry-standard **JWT (JSON Web Tokens)** for encrypted session management.
- **Logic:** Custom Aggregation Pipelines for generating lightweight, high-speed calendar and trend data.

---

## 🛤 The User Journey

1. **Onboarding:** Start with a beautiful, 4-card welcome screen that explains the app's power.
2. **Registration:** A two-step process capturing basic credentials and personal demographics to tailor the experience.
3. **Daily Reflection:** Choose a mood emoji, write what's on your mind, and save it to your secure vault.
4. **Analytics:** Visit the statistics tab to see your 7-day trend and your color-coded monthly heatmap.
5. **Support:** Use the AI Copilot to talk through a hard day or use the Breathing Exercise to calm down instantly.
6. **Growth:** Watch your streak grow and receive a gentle notification every evening to keep the habit alive.

---

## 🔒 Safety & Privacy
- **Local Autonomy:** Push notifications are handled locally on the device (no data leaves your phone for reminders).
- **Secure Vault:** Reflections are stored in a private MongoDB collection, protected by unique User IDs and hashed passwords.
- **Error Handling:** A global `ErrorBoundary` and Auth-level Modal system ensure the app never crashes silently, always giving the user a clear path back to safety.

---

*“Ehsaas isn’t just an app; it’s a mirror for your mind.”*
