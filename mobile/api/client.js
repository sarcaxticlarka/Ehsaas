import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Use localhost for iOS simulator and 10.0.2.2 for Android emulator
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5001/api' : 'http://localhost:5001/api';

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
