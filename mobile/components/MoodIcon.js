import React from 'react';
import { Smile, Frown, Sun, CloudRain, Zap, Coffee, LucideIcon } from 'lucide-react-native';

const moodConfig = {
  'Happy': { icon: Smile, color: '#F6AD55' },
  'Sad': { icon: Frown, color: '#63B3ED' },
  'Calm': { icon: Sun, color: '#4FD1C5' },
  'Angry': { icon: Zap, color: '#F56565' },
  'Stressed': { icon: CloudRain, color: '#B794F4' },
  'Excited': { icon: Zap, color: '#ED64A6' },
  'Tired': { icon: Coffee, color: '#A0AEC0' },
};

export default function MoodIcon({ mood, size = 24, color }) {
  const config = moodConfig[mood] || { icon: Smile, color: '#A0AEC0' };
  const Icon = config.icon;
  return <Icon color={color || config.color} size={size} />;
}

export { moodConfig };
