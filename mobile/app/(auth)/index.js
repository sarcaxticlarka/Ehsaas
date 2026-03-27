import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, HeartPulse, Wind, Bell } from 'lucide-react-native';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FDF6F0]">
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F0" />

      {/* Background decorative circles */}
      <View className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FAD9C1]/30" style={{ top: -80, right: -40 }} />
      <View className="absolute w-80 h-80 rounded-full bg-[#D1EAE3]/30" style={{ bottom: 60, left: -60 }} />
      <View className="absolute w-40 h-40 rounded-full bg-[#E1DFFF]/30" style={{ top: 200, left: -20 }} />

      <View className="flex-1 px-8 pt-6 pb-10 justify-between">
        {/* Hero Section */}
        <View className="items-center mt-8">
          <Image 
            source={require('../../assets/transparent_logo.png')} 
            style={{ width: 120, height: 120, marginBottom: 20 }} 
            resizeMode="contain"
          />
          <Text className="text-5xl font-extrabold text-[#1A1A1A] text-center mb-3">
            Meet <Text style={{ color: '#276749' }}>Ehsaas</Text>
          </Text>
          <Text className="text-[#6D6D6D] text-lg text-center font-medium px-2 leading-7">
            Your intelligent companion for emotional clarity, mental resilience, and guided mindfulness.
          </Text>
        </View>

        {/* Feature Cards */}
        <View className="mt-8">
          <View className="flex-row items-center bg-white/70 p-5 rounded-3xl mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
            <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4" style={{ backgroundColor: '#FAD9C1' }}>
              <HeartPulse color="#e65100" size={22} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-[#1A1A1A] mb-0.5">Emotion Tracking</Text>
              <Text className="text-[#6D6D6D] text-sm">Daily mood logs & monthly heatmap insights.</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white/70 p-5 rounded-3xl mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
            <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4" style={{ backgroundColor: '#E1DFFF' }}>
              <Sparkles color="#651fff" size={22} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-[#1A1A1A] mb-0.5">AI Copilot</Text>
              <Text className="text-[#6D6D6D] text-sm">Vent freely to a compassionate, CBT-trained guide.</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white/70 p-5 rounded-3xl mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
            <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4" style={{ backgroundColor: '#D1EAE3' }}>
              <Wind color="#276749" size={22} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-[#1A1A1A] mb-0.5">Guided Breathing</Text>
              <Text className="text-[#6D6D6D] text-sm">4-7-8 technique for instant calmness.</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white/70 p-5 rounded-3xl" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
            <View className="w-12 h-12 rounded-2xl items-center justify-center mr-4" style={{ backgroundColor: '#B2DFFF' }}>
              <Bell color="#005ea2" size={22} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-[#1A1A1A] mb-0.5">Smart Reminders</Text>
              <Text className="text-[#6D6D6D] text-sm">Gentle nudges to keep your streak going.</Text>
            </View>
          </View>
        </View>

        {/* CTA Buttons */}
        <View className="mt-8">
          <TouchableOpacity 
            onPress={() => router.push('/register')}
            className="w-full py-5 rounded-full items-center shadow-lg mb-3"
            style={{ backgroundColor: '#1A1A1A' }}
            activeOpacity={0.85}
          >
            <Text className="text-white text-xl font-bold">Get Started — It's Free</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => router.push('/login')}
            className="w-full py-5 rounded-full items-center"
            style={{ backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#1A1A1A' }}
            activeOpacity={0.85}
          >
            <Text className="text-xl font-bold" style={{ color: '#1A1A1A' }}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
