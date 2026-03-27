import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background justify-center p-8"
    >
      <View className="mb-12">
        <Image 
          source={require('../../assets/transparent_logo.png')} 
          style={{ width: 100, height: 100, marginBottom: 24 }} 
          resizeMode="contain"
        />
        <Text className="text-4xl font-bold text-accent mb-2">Welcome Back</Text>
        <Text className="text-muted text-lg">Sign in to continue your journey</Text>
      </View>

      <View className="space-y-4">
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
        <View className="bg-[#EFDECF]/20 px-6 py-5 rounded-3xl border border-gray-100">
          <TextInput
            className="text-lg text-accent"
            placeholder="Password"
            placeholderTextColor="#9D9D9D"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity 
        className="bg-accent flex-row items-center justify-between p-5 rounded-3xl mt-10 shadow-lg"
        onPress={handleLogin}
      >
        <Text className="text-white text-xl font-bold ml-2">Login</Text>
        <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <ChevronRight color="white" size={24} />
        </View>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-8">
        <Text className="text-muted text-lg">Need an account? </Text>
        <Link href="/register">
          <Text className="text-accent text-lg font-bold">Sign Up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
