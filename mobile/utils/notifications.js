import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Expo Go SDK 53 removed Android Remote Notification bindings completely, meaning even a static import crashes the app.
const isExpoGoAndroid = Platform.OS === 'android' && Constants.appOwnership === 'expo';

let Notifications = null;
if (!isExpoGoAndroid) {
  Notifications = require('expo-notifications');

  // How the app should act when a notification is received while the app is in the foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function registerForPushNotificationsAsync() {
  if (isExpoGoAndroid || !Notifications) {
    console.log('Push notifications are intentionally bypassed on Android within Expo Go to prevent native module crashes.');
    return null;
  }
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Ehsaas Daily Reminders',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D1EAE3',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    // Request permission if not already granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('User denied push notification permissions.');
      return null;
    }

    // Usually you retrieve the token here if you have a backend pushing these out.
    // For local notifications, the permission grant is enough.
    // token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for real Push Notifications (But local works on some simulators)');
  }

  return token;
}

export async function scheduleDailyReminder() {
  if (isExpoGoAndroid || !Notifications) return;
  try {
    // 1. Clear any existing scheduled notifications so we don't accidentally send multiples
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 2. Schedule a recurring Local Push Notification for 8:00 PM every day
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "How are you feeling today?",
        body: "Take 1 minute to log your mood and maintain your consistency streak! 🔥",
        sound: true,
        data: { link: '/write-reflection' },
      },
      trigger: {
        // Daily trigger configuration
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
    
    console.log("Scheduled Ehsaas Daily 8 PM Reminder Successfully.");
  } catch (error) {
    console.error("Failed to schedule daily notification", error);
  }
}

export async function sendInstantTestNotification() {
  if (isExpoGoAndroid || !Notifications) {
    console.log("Instant test notification ignored: Unsupported environment.");
    return;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ehsaas Push Test 🎉",
      body: "Notifications are successfully wired up!",
      sound: true,
    },
    trigger: null, // trigger immediately
  });
}
