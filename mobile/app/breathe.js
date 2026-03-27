import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Breathe() {
  const router = useRouter();
  
  // Animation Values
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;
  
  // State Labels
  const [instruction, setInstruction] = useState('Get Ready...');
  const [timeLeft, setTimeLeft] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);

  // Constants
  const CIRCLE_SIZE = width * 0.5;
  const MAX_SCALE = 1.7;

  useEffect(() => {
    // Initial Countdown
    let prepTimer = 3;
    const countdown = setInterval(() => {
      prepTimer -= 1;
      if (prepTimer > 0) {
        setTimeLeft(prepTimer);
      } else {
        clearInterval(countdown);
        setIsActive(true);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (!isActive || !sessionActive) return;

    let isMounted = true;
    let currentInhale, currentHold, currentExhale;
    let timerInterval;

    const runBreathingCycle = () => {
      if (!isMounted || !sessionActive) return;

      // --- INHALE (4 Seconds) ---
      setInstruction('Breathe In');
      setTimeLeft(4);
      
      Animated.parallel([
        Animated.timing(scale, {
          toValue: MAX_SCALE,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();

      let seconds = 4;
      timerInterval = setInterval(() => {
        seconds -= 1;
        if (seconds > 0) setTimeLeft(seconds);
      }, 1000);

      // --- HOLD (7 Seconds) ---
      currentHold = setTimeout(() => {
        if (!isMounted || !sessionActive) return;
        clearInterval(timerInterval);
        
        setInstruction('Hold');
        setTimeLeft(7);
        seconds = 7;
        
        timerInterval = setInterval(() => {
          seconds -= 1;
          if (seconds > 0) setTimeLeft(seconds);
        }, 1000);

        // --- EXHALE (8 Seconds) ---
        currentExhale = setTimeout(() => {
          if (!isMounted || !sessionActive) return;
          clearInterval(timerInterval);
          
          setInstruction('Breathe Out');
          setTimeLeft(8);

          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 8000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 8000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            })
          ]).start();

          seconds = 8;
          timerInterval = setInterval(() => {
            seconds -= 1;
            if (seconds > 0) setTimeLeft(seconds);
          }, 1000);

          // Loop
          currentInhale = setTimeout(() => {
            clearInterval(timerInterval);
            runBreathingCycle();
          }, 8000);

        }, 7000);
      }, 4000);
    };

    runBreathingCycle();

    return () => {
      isMounted = false;
      clearInterval(timerInterval);
      clearTimeout(currentInhale);
      clearTimeout(currentHold);
      clearTimeout(currentExhale);
      scale.stopAnimation();
      opacity.stopAnimation();
    };
  }, [isActive, sessionActive]);

  const handleClose = () => {
    setSessionActive(false);
    router.back();
  };

  return (
    <View className="flex-1 bg-background justify-center items-center relative">
      {/* Header */}
      <View className="absolute top-16 left-6 right-6 flex-row justify-between items-center z-10">
        <TouchableOpacity 
          onPress={handleClose}
          className="w-12 h-12 bg-surface rounded-full items-center justify-center shadow-sm border border-gray-100"
        >
          <X size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View className="bg-surface px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          <Text className="text-accent font-bold">4-7-8 Technique</Text>
        </View>
      </View>

      {/* Breathing Circle */}
      <View className="justify-center items-center">
        <Animated.View 
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
            backgroundColor: '#D1EAE3', // Primary Theme Teal
            transform: [{ scale }],
            opacity: opacity,
            position: 'absolute',
          }}
        />
        
        <View 
          className="bg-white rounded-full items-center justify-center shadow-xl border-4 border-white z-10"
          style={{ width: CIRCLE_SIZE * 0.9, height: CIRCLE_SIZE * 0.9 }}
        >
          <Text className="text-4xl text-accent font-bold mb-2">{instruction}</Text>
          <Text className="text-6xl text-primary font-bold">{timeLeft}</Text>
        </View>
      </View>

      {/* Footer Instructions */}
      <View className="absolute bottom-20 px-8 items-center">
        <Text className="text-muted text-center leading-relaxed text-lg">
          Inhale deeply through your nose, hold your breath gently, and exhale fully through your mouth.
        </Text>
      </View>
    </View>
  );
}
