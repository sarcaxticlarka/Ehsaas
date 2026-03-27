import { Stack, router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, LogBox } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../global.css';
import { AlertCircle } from 'lucide-react-native';
import { registerForPushNotificationsAsync, scheduleDailyReminder } from '../utils/notifications';

// Expo Go SDK 53 aggressively logs a console.error for Android push notifications even if we only want local ones.
// We ignore this specific LogBox error so it doesn't block the UI with a red screen.
LogBox.ignoreLogs(['expo-notifications: Android Push notifications']);

const RootLayoutNav = () => {
  const { user, loading, error, setError } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // Request Push Notification Permissions & Schedule Daily Reminder
    registerForPushNotificationsAsync().then((token) => {
      if (token) scheduleDailyReminder();
    });

    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    
    if (user && inAuthGroup) {
      // If we have a user and we are still in the auth section, GO HOME
      router.replace('/(tabs)');
    } else if (!user && !inAuthGroup) {
      // If we have NO user and we are NOT in the auth section, GO AUTH
      router.replace('/(auth)');
    }
  }, [user, loading, segments]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>

      <Modal visible={!!error} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/60 px-8">
          <View className="bg-white w-full rounded-4xl p-8 items-center border border-red-100 shadow-2xl">
            <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6">
              <AlertCircle size={40} color="#EF4444" />
            </View>
            <Text className="text-2xl font-bold text-accent mb-2 text-center">Something went wrong</Text>
            <Text className="text-muted text-center mb-10 leading-6 text-lg">
              There was an issue processing your request. We are fixing the error and will be back to home soon.
            </Text>
            <TouchableOpacity 
              onPress={() => { setError(null); router.replace('/'); }}
              className="bg-accent w-full p-5 rounded-3xl items-center shadow-lg"
            >
              <Text className="text-white text-xl font-bold">Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

export function ErrorBoundary({ error, retry }) {
  useEffect(() => {
    console.error('Fatal App Error:', error);
  }, [error]);

  return (
    <View className="flex-1 items-center justify-center bg-[#FDF6F0] px-8">
      <View className="bg-white w-full rounded-4xl p-8 items-center border border-red-100 shadow-2xl">
        <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6">
          <AlertCircle size={40} color="#EF4444" />
        </View>
        <Text className="text-2xl font-bold text-accent mb-2 text-center">Oops! Something went wrong.</Text>
        <Text className="text-muted text-center mb-10 leading-6 text-lg">
          An unexpected error occurred. We have logged it securely to help us debug and fix it.
        </Text>
        <TouchableOpacity 
          onPress={() => {
            router.replace('/');
            retry(); // Retry rendering
          }}
          className="bg-accent w-full p-5 rounded-3xl items-center shadow-lg"
        >
          <Text className="text-white text-xl font-bold">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
