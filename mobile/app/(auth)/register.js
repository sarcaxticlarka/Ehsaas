import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Image, Modal, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from 'expo-router';
import { ChevronRight, ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const AGE_OPTIONS = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Step 2
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [ageCategory, setAgeCategory] = useState('');

  const { register } = useAuth();
  const router = useRouter();

  const handleNextStep = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please fill out all basic details.');
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    try {
      await register(name, email, password, {
        gender,
        profession,
        ageCategory
      });
      // RootLayout will handle the redirect
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert('Registration Failed', error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ padding: 32, flexGrow: 1, justifyContent: 'center' }}>
        
        {step === 2 && (
          <TouchableOpacity 
            onPress={() => setStep(1)}
            className="w-10 h-10 bg-surface rounded-full items-center justify-center border border-gray-100 shadow-sm mb-6 absolute top-16 left-8 z-10"
          >
            <ArrowLeft color="#1A1A1A" size={24} />
          </TouchableOpacity>
        )}

        <View className="mb-8 mt-12">
          {step === 1 && (
            <Image 
              source={require('../../assets/transparent_logo.png')} 
              style={{ width: 100, height: 100, marginBottom: 24 }} 
              resizeMode="contain"
            />
          )}
          <Text className="text-4xl font-bold text-accent mb-2">
            {step === 1 ? 'Create Account' : 'A bit about you'}
          </Text>
          <Text className="text-muted text-lg">
            {step === 1 ? 'Join our mindfulness community' : 'Help us personalize your experience (Optional)'}
          </Text>
        </View>

        {step === 1 ? (
          <View className="space-y-4">
            <View className="bg-[#EFDECF]/20 px-6 py-5 rounded-3xl border border-gray-100">
              <TextInput
                className="text-lg text-accent"
                placeholder="Full Name"
                placeholderTextColor="#9D9D9D"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View className="bg-[#EFDECF]/20 px-6 py-5 rounded-3xl border border-gray-100">
              <TextInput
                className="text-lg text-accent"
                placeholder="Email Address"
                placeholderTextColor="#9D9D9D"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View className="bg-[#EFDECF]/20 px-6 py-5 rounded-3xl border border-gray-100 flex-row items-center justify-between">
              <TextInput
                className="text-lg text-accent flex-1"
                placeholder="Password"
                placeholderTextColor="#9D9D9D"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-2">
                {showPassword ? <EyeOff size={22} color="#9D9D9D" /> : <Eye size={22} color="#9D9D9D" />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              className="bg-accent flex-row items-center justify-between p-5 rounded-3xl mt-6 shadow-lg"
              onPress={handleNextStep}
            >
              <Text className="text-white text-xl font-bold ml-2">Continue</Text>
              <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <ChevronRight color="white" size={24} />
              </View>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-8">
              <Text className="text-muted text-lg">Already have an account? </Text>
              <Link href="/login">
                <Text className="text-accent text-lg font-bold">Login</Text>
              </Link>
            </View>
          </View>
        ) : (
          <View className="space-y-6">
            
            <View>
              <Text className="text-accent font-bold mb-3 text-lg">Profession</Text>
              <View className="bg-[#EFDECF]/20 px-6 py-4 rounded-3xl border border-gray-100">
                <TextInput
                  className="text-lg text-accent"
                  placeholder="e.g. Software Engineer, Student"
                  placeholderTextColor="#9D9D9D"
                  value={profession}
                  onChangeText={setProfession}
                />
              </View>
            </View>

            <View>
              <Text className="text-accent font-bold mb-3 text-lg">Age Category</Text>
              <View className="flex-row flex-wrap gap-2">
                {AGE_OPTIONS.map((age) => (
                  <TouchableOpacity
                    key={age}
                    onPress={() => setAgeCategory(age)}
                    className={`px-4 py-3 rounded-full border ${ageCategory === age ? 'bg-accent border-accent' : 'bg-surface border-gray-200'}`}
                  >
                    <Text className={ageCategory === age ? 'text-white font-bold' : 'text-accent'}>{age}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text className="text-accent font-bold mb-3 text-lg">Gender</Text>
              <View className="flex-row flex-wrap gap-2">
                {GENDER_OPTIONS.map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setGender(g)}
                    className={`px-4 py-3 rounded-full border ${gender === g ? 'bg-accent border-accent' : 'bg-surface border-gray-200'}`}
                  >
                    <Text className={gender === g ? 'text-white font-bold' : 'text-accent'}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              className="bg-accent flex-row items-center justify-center p-5 rounded-3xl mt-4 shadow-lg"
              onPress={handleRegister}
            >
              <Text className="text-white text-xl font-bold">Complete Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Loading Modal */}
      <Modal visible={isSubmitting} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="bg-white p-10 rounded-4xl items-center shadow-2xl">
            <ActivityIndicator size="large" color="#1A1A1A" />
            <Text className="mt-4 text-xl font-bold text-accent">Creating your account...</Text>
            <Text className="text-muted mt-2">Just a moment</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
