import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import client from '../../api/client';
import MoodIcon from '../../components/MoodIcon';
import format from 'date-fns/format';
import { useFocusEffect, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function History() {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const { data } = await client.get('/moods/history');
      setEntries(data);
    } catch (error) {
      console.error('Failed to fetch history', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const renderItem = ({ item }) => (
    <View className="bg-surface p-4 mb-4 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <MoodIcon mood={item.mood} size={24} />
          <Text className="ml-2 text-lg font-bold text-text">{item.mood}</Text>
        </View>
        <Text className="text-muted text-sm">{format(new Date(item.timestamp), 'MMM d, h:mm a')}</Text>
      </View>
      
      <View className="flex-row items-center mb-2">
        <Text className="text-muted">Intensity: </Text>
        <View className="h-2 flex-1 bg-gray-100 rounded-full mx-2">
          <View 
            className="h-2 bg-primary rounded-full" 
            style={{ width: `${item.intensity * 10}%` }}
          />
        </View>
        <Text className="text-text font-semibold">{item.intensity}</Text>
      </View>
      
      {item.reflection ? (
        <Text className="text-text text-base italic mt-1 leading-5">"{item.reflection}"</Text>
      ) : null}
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-muted mt-4">Loading your journey...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 150 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4FD1C5" />
        }
        ListHeaderComponent={
          <View className="mb-8">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 bg-surface rounded-full items-center justify-center border border-gray-100 shadow-sm mb-6"
            >
              <ArrowLeft color="#1A1A1A" size={24} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-accent">Your Journey</Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Text className="text-muted text-lg">No entries yet. How are you feeling?</Text>
          </View>
        }
      />
    </View>
  );
}
