import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Use live Render URL for production, local for development
const BASE_URL = __DEV__ 
  ? (Platform.OS === 'android' ? 'http://10.0.2.2:5001/api' : 'http://localhost:5001/api')
  : 'https://ehsaas-l14s.onrender.com/api';

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
