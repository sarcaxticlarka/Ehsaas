# Ehsaas - Mental Wellness & Mood Tracking App

## Project Structure
- `mobile/`: React Native (Expo) frontend.
- `server/`: Node.js/Express backend with MongoDB.

## Getting Started

### Backend (Server)
1. Navigate to `server/`
2. Ensure MongoDB is running on `mongodb://localhost:27017/ehsaas` (or update `.env`)
3. Install dependencies: `npm install`
4. Start the server: `npm start` (or `npx nodemon index.js`)

### Frontend (Mobile)
1. Navigate to `mobile/`
2. Install dependencies: `npm install --legacy-peer-deps`
3. Start Expo: `npx expo start`
4. Use Expo Go on your mobile device or an emulator to scan the QR code.

## Key Features
- **Mood Tracking**: Log your daily emotions with intensity and reflections.
- **Journaling**: Reflect on your thoughts alongside your mood.
- **History**: View your emotional journey over time.
- **Authentication**: Secure login and registration.
