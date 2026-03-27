import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

const moods = [
  { id: 'Happy', emoji: '😊', color: '#FAD9C1' },
  { id: 'Calm', emoji: '😌', color: '#D1EAE3' },
  { id: 'Angry', emoji: '😠', color: '#FFB2B2' },
  { id: 'Sad', emoji: '😢', color: '#B2DFFF' },
  { id: 'Tired', emoji: '😴', color: '#E1DFFF' },
  { id: 'Stressed', emoji: '😰', color: '#D1D1D1' },
];

export default function WriteReflection() {
  const router = useRouter();
  const { refreshUser, setError } = useAuth();
  const [reflection, setReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert('Selection Required', 'Please select your current mood first.');
      return;
    }
    if (!reflection.trim()) {
      Alert.alert('Reflection Required', 'Please write a brief reflection before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await client.post('/moods', {
        mood: selectedMood,
        intensity: 5,
        reflection: reflection
      });
      await refreshUser();
      Alert.alert('Success', 'Your reflection has been recorded.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error(error);
      setError('Failed to save reflection. We are looking into it.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Write Reflection</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>How are you feeling right now?</Text>

        {/* Mood Selection */}
        <View style={styles.moodGrid}>
          {moods.map(m => {
            const isSelected = selectedMood === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                onPress={() => setSelectedMood(m.id)}
                style={[
                  styles.moodBox, 
                  { backgroundColor: m.color },
                  isSelected ? styles.selectedMoodBox : styles.unselectedMoodBox
                ]}
              >
                <Text style={styles.emojiText}>{m.emoji}</Text>
                <Text style={styles.moodIdText}>{m.id}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Reflection Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>What's making you feel this way?</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            placeholder="Write your thoughts here..."
            placeholderTextColor="#9D9D9D"
            value={reflection}
            onChangeText={setReflection}
            textAlignVertical="top"
          />
        </View>

        {/* Submit */}
        <TouchableOpacity 
          style={[styles.submitButton, submitting ? styles.submitButtonDisabled : styles.submitButtonActive]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <CheckCircle2 color="#FFFFFF" size={24} />
              <Text style={styles.submitText}>Save Reflection</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerText: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#9D9D9D',
    marginBottom: 24,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  moodBox: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  selectedMoodBox: {
    borderColor: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  unselectedMoodBox: {
    borderColor: 'transparent',
    opacity: 0.8,
  },
  emojiText: {
    fontSize: 36,
    marginBottom: 4,
  },
  moodIdText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  inputContainer: {
    marginBottom: 40,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    fontSize: 18,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    minHeight: 150,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 24,
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  submitButtonActive: {
    backgroundColor: '#1A1A1A',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});
