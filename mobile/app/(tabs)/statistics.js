import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import client from '../../api/client';
import { useRouter, useFocusEffect } from 'expo-router';
import { ChevronDown, ArrowUpRight, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function Statistics() {
  const router = useRouter();
  const { setError } = useAuth();
  const [data, setData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchInsights();
    }, [])
  );

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const [statsRes, suggRes, calRes] = await Promise.all([
        client.get('/moods/analytics'),
        client.get('/moods/suggestions'),
        client.get('/moods/calendar')
      ]);
      setData(statsRes.data);
      setSuggestions(suggRes.data || []);
      setCalendarData(calRes.data || {});
    } catch (error) {
      console.error('Failed to fetch insights', error);
      setError('Could not load your analytics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  const hasTrendsData = data?.trends && data.trends.length > 0;
  // Chart-kit fails if given an empty array (which is truthy in JS, so || [0] didn't work previously).

  const chartData = {
    labels: hasTrendsData ? data.trends.map(t => t._id.slice(5)) : ["No Data"],
    datasets: [
      {
        data: hasTrendsData ? data.trends.map(t => t.avgIntensity) : [0],
        color: (opacity = 1) => `rgba(26, 26, 26, ${opacity})`,
        strokeWidth: 3
      }
    ]
  };

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header with Back Button */}
      <View className="mb-6 flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-surface rounded-full items-center justify-center border border-gray-100 shadow-sm"
        >
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-surface px-4 py-2 rounded-full border border-gray-100">
          <Text className="text-accent font-bold mr-2">This Week</Text>
          <ChevronDown size={16} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl font-bold text-accent mb-8">Your Insights</Text>

      {/* Intelligent Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <View className="mb-10">
          <Text className="text-xl font-bold text-accent mb-4">Personalized Advice</Text>
          {suggestions.map((sugg, i) => (
            <View key={i} className="bg-surface p-5 rounded-3xl mb-4 border border-gray-100 flex-row items-center shadow-sm">
              <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center mr-4">
                <Text className="text-2xl">{sugg.icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-accent mb-1">{sugg.title}</Text>
                <Text className="text-muted leading-relaxed">{sugg.message}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Line Chart */}
      <View className="bg-surface p-4 rounded-4xl border border-gray-100 shadow-sm mb-10">
        <Text className="text-xl font-bold text-accent mb-6 px-2">Mood Intensity (7 Days)</Text>
        
        {hasTrendsData ? (
          <LineChart
            data={chartData}
            width={width - 80}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(26, 26, 26, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(157, 157, 157, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "6", strokeWidth: "2", stroke: "#EFDECF" }
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        ) : (
          <View className="h-[220px] items-center justify-center px-4">
            <Text className="text-muted text-center text-lg italic">
              Record a reflection to see your mood trends over time.
            </Text>
          </View>
        )}
      </View>

      {/* Monthly Calendar Heatmap */}
      <View className="mb-10">
        <Text className="text-xl font-bold text-accent mb-6">Monthly Heatmap</Text>
        <View className="bg-surface rounded-4xl border border-gray-100 shadow-sm overflow-hidden p-2">
          <Calendar
            markedDates={calendarData}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#1A1A1A',
              selectedDayBackgroundColor: '#1A1A1A',
              selectedDayTextColor: '#1A1A1A',
              todayTextColor: '#276749',
              dayTextColor: '#1A1A1A',
              textDisabledColor: '#d9e1e8',
              dotColor: '#1A1A1A',
              selectedDotColor: '#ffffff',
              arrowColor: '#1A1A1A',
              monthTextColor: '#1A1A1A',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
          />
        </View>
      </View>

      {/* Mood Distribution */}
      <View className="mb-10">
        <Text className="text-xl font-bold text-accent mb-6">Mood Distribution</Text>
        <View className="flex-row flex-wrap">
          {data?.distribution?.map((item, index) => (
            <View 
              key={index} 
              className="bg-primary/20 px-4 py-3 rounded-2xl mr-3 mb-3 border border-primary/30"
            >
              <Text className="text-accent font-bold">{item._id}: {item.count}</Text>
            </View>
          ))}
          {(!data?.distribution || data.distribution.length === 0) && (
            <Text className="text-muted italic">No reflections yet this week.</Text>
          )}
        </View>
      </View>
      
      {/* Reflection Frequency Card */}
      <View className="bg-accent p-6 rounded-4xl shadow-lg">
        <Text className="text-white/60 text-sm mb-2">Consistency</Text>
        <Text className="text-white text-2xl font-bold mb-4">Keep going!</Text>
        <Text className="text-white/80 leading-relaxed">
          You've logged {data?.trends?.length || 0} reflections in the last 7 days. Regular reflections help you identify emotional patterns.
        </Text>
      </View>
    </ScrollView>
  );
}
