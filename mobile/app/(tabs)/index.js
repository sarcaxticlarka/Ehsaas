import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, Alert, ActivityIndicator, Modal } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import client from '../../api/client';
import { Search, ChevronRight, MoreHorizontal, CheckCircle2, Bell, BellDot, X, ArrowLeft, MessageCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const moods = [
  { id: 'Happy', emoji: '😊', color: '#FAD9C1' },
  { id: 'Calm', emoji: '😌', color: '#D1EAE3' },
  { id: 'Angry', emoji: '😠', color: '#FFB2B2' },
  { id: 'Sad', emoji: '😢', color: '#B2DFFF' },
  { id: 'Tired', emoji: '😴', color: '#E1DFFF' },
  { id: 'Stressed', emoji: '😰', color: '#D1D1D1' },
];

export default function Home() {
  const { user, refreshUser, setError } = useAuth();
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsVisible, setNotificationsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshUser().catch(err => {
        console.error('Failed to refresh user', err);
        setError('Connection error. Please check your internet.');
      });
      fetchNotifications();
    }, [])
  );

  const fetchNotifications = async () => {
    try {
      const { data } = await client.get('/auth/notifications');
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      // We don't always show a modal for a minor notifications fetch failure, 
      // but the user asked for "any error", so we'll show it.
      setError('Failed to fetch your latest notifications.');
    }
  };

  const markNotificationsRead = async () => {
    setNotificationsVisible(false);
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const calculateProgress = () => {
    const streak = user?.streakCount || 0;
    return Math.min(Math.round((streak / 7) * 100), 100);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ paddingTop: 60, paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header Section */}
      <View className="px-6 pb-8">
        <View className="flex-row items-center justify-between mb-8">
          <Image 
            source={require('../../assets/transparent_logo.png')} 
            style={{ width: 40, height: 40 }} 
            resizeMode="contain"
          />
          <TouchableOpacity 
            onPress={() => setNotificationsVisible(true)}
            className="w-10 h-10 bg-surface rounded-full border border-gray-200 items-center justify-center relative"
          >
            {notifications.some(n => !n.read) ? (
              <BellDot size={20} color="#1A1A1A" />
            ) : (
              <Bell size={20} color="#1A1A1A" />
            )}
            {notifications.some(n => !n.read) && (
              <View className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border border-white" />
            )}
          </TouchableOpacity>
        </View>

        <Text className="text-muted text-lg mb-1">Daily reflection</Text>
        <View className="flex-row items-center mb-1">
          <Text className="text-4xl text-accent font-medium leading-tight">
            Hello, {user?.name?.split(' ')[0] || 'There'}
          </Text>
          <View className="w-10 h-10 rounded-full overflow-hidden ml-3 border-2 border-primary">
            <Image 
              source={{ uri: user?.profilePic || 'https://i.pravatar.cc/100?u=' + (user?.email || 'test') }} 
              className="w-full h-full" 
            />
          </View>
        </View>
        <Text className="text-4xl text-accent font-medium leading-tight">
          How do you feel about your <Text className="font-bold">current emotions?</Text>
        </Text>
      </View>

      {/* Notifications Modal */}
      <Modal visible={isNotificationsVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-5xl p-8 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-2xl font-bold text-accent">Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsVisible(false)} className="bg-gray-100 p-2 rounded-full">
                <X size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications.map((n, i) => (
                <View key={i} className={`p-5 rounded-3xl mb-4 border ${n.read ? 'bg-gray-50 border-gray-100' : 'bg-primary/10 border-primary/20'}`}>
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="font-bold text-accent text-lg">{n.title}</Text>
                    {!n.read && <View className="w-2 h-2 bg-primary rounded-full" />}
                  </View>
                  <Text className="text-muted leading-5">{n.message}</Text>
                </View>
              ))}
              {notifications.length === 0 && (
                <View className="items-center py-10">
                  <Text className="text-muted italic">No notifications yet.</Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity 
              onPress={markNotificationsRead}
              className="bg-accent p-5 rounded-3xl items-center mt-6"
            >
              <Text className="text-white text-xl font-bold">Mark all as read</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Improved Reflection Bar (Removed Whitish Area) */}
      <TouchableOpacity 
        onPress={() => router.push('/write-reflection')}
        className="px-6 mb-10"
      >
        <View className="bg-orange-100/20 flex-row items-center px-6 py-6 rounded-4xl border border-orange-200/30">
          <Text className="flex-1 text-lg text-accent/60 font-medium">What's on your mind?..</Text>
          <View className="w-12 h-12 bg-accent rounded-2xl items-center justify-center -rotate-12 shadow-sm">
            <ChevronRight color="white" size={24} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Daily Mood Log */}
      <View className="px-6 mb-10">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-bold text-accent">Daily Mood Log</Text>
          <TouchableOpacity>
            <MoreHorizontal color="#1A1A1A" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row pb-2">
          {moods.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => setSelectedMood(m.id)}
              style={{ backgroundColor: m.color }}
              className={`w-14 h-14 rounded-full items-center justify-center mr-4 border ${selectedMood === m.id ? 'border-accent border-4' : 'border-white/50'}`}
            >
              <Text className="text-2xl">{m.emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Progress Card */}
      <View className="px-6">
        <View className="bg-surface rounded-4xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-accent">Your progress</Text>
            <View className="flex-row items-center bg-orange-50 px-3 py-1 rounded-full">
              <Text className="text-orange-500 font-bold mr-1">🔥 {user?.streakCount || 0}</Text>
              <Text className="text-orange-400 text-xs">streak</Text>
            </View>
          </View>
          
          <View className="flex-row items-end justify-between">
            <View>
              <Text className="text-7xl font-bold text-accent">{calculateProgress()}%</Text>
              <Text className="text-muted text-sm mt-3 w-32">Of the weekly goal completed</Text>
            </View>
            <View className="flex-row flex-wrap w-20 h-20 items-center justify-center">
               {Array.from({ length: 9 }).map((_, i) => (
                 <View key={i} className={`w-3 h-3 rounded-full m-1 ${i < (user?.streakCount || 0) ? 'bg-orange-400' : 'bg-gray-100'}`} />
               ))}
            </View>
          </View>
        </View>
      </View>

      {/* AI Copilot Card */}
      <TouchableOpacity 
        onPress={() => router.push('/chat')}
        className="px-6 mt-6 mb-10"
      >
        <View className="bg-[#1A1A1A] flex-row items-center px-6 py-6 rounded-4xl border border-gray-800 shadow-xl relative overflow-hidden">
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full" />
          <View className="flex-1 mr-4 z-10">
            <Text className="text-xl font-bold text-white mb-1">Talk to Ehsaas AI</Text>
            <Text className="text-gray-400 font-medium leading-tight">Venting freely can instantly relieve emotional pressure.</Text>
          </View>
          <View className="w-14 h-14 bg-white/10 rounded-full items-center justify-center border border-white/20 z-10 backdrop-blur-md">
            <MessageCircle color="#ffffff" size={24} />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
