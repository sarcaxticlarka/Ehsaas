import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Play, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const content = [
  { id: 1, title: 'Diversity And Inclusion', color: '#FAD9C1', icon: '🌸' },
  { id: 2, title: 'Arabic Mental Health', color: '#D1EAE3', icon: '👳‍♂️' },
  { id: 3, title: 'The Ability to Defend Your Own', color: '#E1DFFF', icon: '🌿' },
  { id: 4, title: 'Mindfulness & Focus', color: '#FFB2B2', icon: '🧘' },
];

export default function Resources() {
  const router = useRouter();
  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-3xl font-bold text-accent mb-6">Active Exercises</Text>
      
      <TouchableOpacity 
        onPress={() => router.push('/breathe')}
        className="bg-primary p-6 rounded-4xl mb-10 flex-row items-center border border-primary/20 shadow-sm"
      >
        <View className="flex-1 mr-4">
          <Text className="text-2xl font-bold text-accent mb-2">Guided Breathing</Text>
          <Text className="text-[#276749] leading-relaxed font-medium">Use the 4-7-8 technique to naturally lower cortisol levels.</Text>
        </View>
        <View className="w-16 h-16 bg-white/40 rounded-full items-center justify-center border-2 border-white/50">
          <Text className="text-4xl">🌬️</Text>
        </View>
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-accent mb-8">Wellness Library</Text>
      {content.map((item) => (
        <View 
          key={item.id} 
          style={{ backgroundColor: item.color }}
          className="rounded-4xl p-6 mb-6 flex-row items-center justify-between border border-white/20 shadow-sm"
        >
          <View className="flex-row items-center flex-1">
            <View className="w-16 h-16 bg-white/30 rounded-3xl items-center justify-center mr-4">
              <Text className="text-3xl">{item.icon}</Text>
            </View>
            <Text className="text-xl font-bold text-accent mr-2 flex-1 leading-tight">{item.title}</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-gray-600/10 rounded-full items-center justify-center">
            <Play color="#1A1A1A" fill="#1A1A1A" size={18} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
